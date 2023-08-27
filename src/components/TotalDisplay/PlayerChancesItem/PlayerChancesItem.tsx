import React from "react";
import {IPlayerChancesProps} from "../../../types/TotalDisplay.types";
import Crown from "../../../resources/crown.jpg";
import {getChancesColor} from "../../../utils";
import './index.css';

export const PlayerChancesItem: React.FC<IPlayerChancesProps> = ({player, chancesToWin, isWinner}) => {

    return (
        <div className={`player-chances${isWinner ? ' winner' : ''}`}>
            <img
                className='player-avatar'
                src={player.avatar}
                alt={player.name}
            />

            <span className='player-name'>
                {player.name}
            </span>

            <span
                className='chances-value'
                style={{background: getChancesColor(+chancesToWin)}}
            >
                {chancesToWin}%
            </span>

            {isWinner &&
                <img
                    className="winner-crown"
                    src={Crown}
                    alt='winner_crown'
                />
            }
        </div>
    )
};

export default PlayerChancesItem;