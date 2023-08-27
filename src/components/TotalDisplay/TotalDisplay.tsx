import React from "react";
import {observer} from "mobx-react-lite";
import {useMst} from "../../models/Root";
import PlayerChancesItem from "./PlayerChancesItem/PlayerChancesItem";
import CoinsIcon from "../../resources/coins.png";
import "./index.css";

const TotalDisplay: React.FC = () => {
    const {gameStatus} = useMst();
    const {
        currentGameBank,
        participants,
        calculateChancesToWin,
        winner
    } = gameStatus;

    return (
        <div className='total-display'>
            <div className='current-bank-wrapper'>
                <img src={CoinsIcon} alt="coins_icon" />
                <span>{currentGameBank.toFixed(2)}</span>
            </div>

            <div className='bulk-chances'>
                {participants.map(participant => {
                    const chancesToWin = calculateChancesToWin(participant);

                    return (
                        <PlayerChancesItem
                            key={participant.name}
                            player={participant}
                            chancesToWin={chancesToWin}
                            isWinner={winner === participant.name}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default observer(TotalDisplay);