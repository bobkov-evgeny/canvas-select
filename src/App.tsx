import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Avatar1 from "./avatar1.jpg";
import Avatar2 from "./avatar2.jpg";
import Avatar3 from "./avatar3.jpeg";
import Avatar4 from "./avatar4.jpg";
import Avatar5 from "./avatar5.jpeg";

const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


//radius 12
function App() {
    const canvasRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [winner, setWinner] = useState(null);

    const participants = [
        { name: 'Player 1', bet: 24, avatar: Avatar1 },
        { name: 'Player 2', bet: 21, avatar: Avatar2 },
        { name: 'Player 3', bet: 22, avatar: Avatar3 },
        { name: 'Player 4', bet: 21, avatar: Avatar4 },
        { name: 'Player 5', bet: 21, avatar: Avatar5 }
        // Добавьте остальных участников с их ставками и цветами
    ];

    const blockWidth = 78;
    const blockHeight = 78;
    const blockInterval = 30; // Увеличьте интервал между блоками
    const pointerX = 700;
    const spinTime = 10000
    const maxAllowedSpeed = 10

    const allBids = participants.reduce((acc, v) => acc+v.bet, 0);

    const createDistributedBlocks = () => {
        const maxBlocks = 125;
        const blocks: any[] = [];

        participants.forEach(participant => {
            // const numBlocks = Math.floor((participant.bet / 100) * maxBlocks);
            const numBlocks = Math.round(participant.bet / (allBids / maxBlocks));

            for (let i = 0; i < numBlocks; i++) {
                blocks.push({
                    participant,
                    width: blockWidth,
                    height: blockHeight,
                    avatar: participant.avatar
                });
            }
        });

        return shuffleArray(blocks).map((block, i) => ({...block,
            x: i * (blockWidth + blockInterval),
            y: canvasRef.current ? canvasRef.current.height / 2 - blockHeight / 2 : 0,
        }));
    };

    const [distributedBlocks, setDistributedBlocks] = useState(createDistributedBlocks());

    let animationRequestId = null;
    let modifiedSpeed = 0;
    let previousTimestamp = 0;

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationStartTime = 0;

        const animate = timestamp => {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }

            const elapsedTime = timestamp - animationStartTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            distributedBlocks.forEach((block, index) => {
                const {x, y, width, height} = block;
                const image = new Image();
                image.src = block.avatar;

                ctx.drawImage(image, x, y, width, height);

                // Увеличиваем скорость в начале и затем уменьшаем до 0
                if (elapsedTime < spinTime/2) {
                    modifiedSpeed = modifiedSpeed >= maxAllowedSpeed ? maxAllowedSpeed : modifiedSpeed + 0.005 // Увеличиваем скорость по мере времени
                } else {
                    modifiedSpeed = modifiedSpeed <= 0 ? 0 : modifiedSpeed - 0.005; // Уменьшаем скорость по мере времени
                }


                block.x -= modifiedSpeed;

                if ((block.x + blockWidth + blockInterval) < 0) {
                    block.x = (canvas.width - (blockWidth + blockInterval)); // Возвращаем блок на левую сторону поля
                }

                const blockCenterX = block.x + block.width / 2;

                // Проверяем, если блок пересекает указатель
                if (
                    blockCenterX >= pointerX - block.width / 2 &&
                    blockCenterX <= pointerX + block.width / 2
                ) {
                    setWinner(block)
                }
            });

            if(isRunning && modifiedSpeed <= 0) {
                setIsRunning(false);

                if (winner) {
                    console.log("Winner:", winner.participant.name);
                }
            } else if (isRunning) {
                animationRequestId = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationRequestId);
                animationRequestId = null;

                // Определяем победителя на основе блока в центре поля
                const centerBlock = distributedBlocks.find(block => {
                    const blockCenterX = block.x + block.width / 2;
                    return blockCenterX >= 1400 / 2 - block.width / 2 &&
                        blockCenterX <= 1400 / 2 + block.width / 2;
                });

                if (centerBlock) {
                    console.log("Winner:", centerBlock.participant.name);
                }
            }
        };

        if (isRunning) {
            animationRequestId = requestAnimationFrame(animate);
        }

        return () => {
            cancelAnimationFrame(animationRequestId);
        };
    }, [isRunning, pointerX, canvasRef.current, distributedBlocks]);

    const startGame = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    return (
        <div className="casino-app">
            <div className="winner-select-slider">
                <div className="canvas-mask">
                    <canvas
                        ref={canvasRef}
                        width={125 * (blockWidth + blockInterval)} // Изменим ширину поля на ширину окна
                        height={78}
                    />
                </div>

                <div className="pointer">
                    <div className="pointer-indicator" />
                </div>
            </div>


            {/* Переместим кнопку "Start" под поле */}
            <button onClick={startGame} disabled={isRunning}>
                {isRunning ? 'Running...' : 'Start'}
            </button>

            {winner && !isRunning && winner.participant.name}
        </div>
    );
}

export default App;
