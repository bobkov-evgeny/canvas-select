import React from "react";
import {observer} from "mobx-react-lite";
import {useMst} from "../../models/Root";
import PlayerBetControl from "./PlayerBetControl/PlayerBetControl";
import './index.css';

const BetManager = () => {
    const {gameStatus} = useMst();
    const {
        participants,
        startGame,
        resetAllBets,
        isRunning,
        currentGameBank
    } = gameStatus;

    return (
        <div className='bet-manager'>
            <div className='players-list'>
                {participants.map(player => (
                    <PlayerBetControl key={player.name} player={player} />
                ))}
            </div>

            <div className='buttons-wrapper'>
                <button
                    className='start-slider-btn'
                    onClick={startGame}
                    disabled={isRunning || !currentGameBank}
                >
                    {isRunning ? 'Выбираем победителя...' : 'Старт'}
                </button>

                <button
                    className='reset-slider-btn'
                    onClick={resetAllBets}
                    disabled={isRunning || !currentGameBank}
                >
                    Сброс ставок
                </button>
            </div>
        </div>
    );
};

export default observer(BetManager);