import React, {ReactElement, useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {useMst} from "../../models/Root";
import {IDistributedBlock, SliderConfig} from "../../types/WinnerSelectSlider.types";
import "./index.css";

const WinnerSelectSlider: React.FC = (): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {gameStatus} = useMst();
    const {
        getDistributedBlocks,
        isRunning,
        setIsRunning,
        setWinner
    } = gameStatus;
    let animationRequestId: number | null = null;

    const checkWinnerBlock = (currentBlocks: IDistributedBlock[]): void => {
        const winnerFound = currentBlocks.find(block => {
            const blockCenterX = block.x + block.width / 2;

            if (
                blockCenterX >= SliderConfig.POINTER_X_POSITION - block.width / 2
                && blockCenterX <= SliderConfig.POINTER_X_POSITION + block.width / 2
            ) {
                return block;
            }

            return false;
        });

        if(winnerFound) {
            setWinner(winnerFound.participant.name);
        }
    };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const distributedBlocks = getDistributedBlocks();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationStartTime = 0;
        let currentSpeed = 0;

        if (!ctx) {
            return;
        }

        const animate = (timestamp: number): void => {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const elapsedTime = timestamp - animationStartTime;

            if (elapsedTime < SliderConfig.SPIN_TIME_MS) {
                currentSpeed = currentSpeed >= SliderConfig.MAX_ALLOWED_SPEED
                    ? SliderConfig.MAX_ALLOWED_SPEED
                    : currentSpeed + SliderConfig.ACCELERATE_SPEED;
            } else {
                currentSpeed -= SliderConfig.SLOWDOWN_SPEED;
            }

            distributedBlocks.forEach((block, i) => {
                const { x, y, width, height } = block;
                const image = new Image();
                image.src = block.participant.avatar;

                ctx.drawImage(image, x, y, width, height);

                block.x -= currentSpeed;

                const blockCenterX = block.x + block.width / 2;
                if ((blockCenterX + SliderConfig.BLOCK_WIDTH / 2 + SliderConfig.BLOCKS_INTERVAL) + currentSpeed <= 0) {
                    block.x = canvas.width - (SliderConfig.BLOCK_WIDTH + SliderConfig.BLOCKS_INTERVAL);
                }
            });

            if (isRunning && currentSpeed <= 0) {
                setIsRunning(false);
                checkWinnerBlock(distributedBlocks);
            } else {
                animationRequestId = requestAnimationFrame(animate);
            }
        };

        if (isRunning) {
            animationRequestId = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRequestId) {
                cancelAnimationFrame(animationRequestId);
            }
        };
    }, [isRunning, canvasRef.current]);

    return (
        <div className="casino-app">
            <div className="winner-select-slider">
                <div className="canvas-mask">
                    <canvas
                        ref={canvasRef}
                        width={SliderConfig.BLOCKS_IN_ROW * (SliderConfig.BLOCK_WIDTH + SliderConfig.BLOCKS_INTERVAL)}
                        height={78}
                    />
                </div>

                <div className="pointer">
                    <div className="pointer-indicator" />
                </div>
            </div>


        </div>
    );
};

export default observer(WinnerSelectSlider);