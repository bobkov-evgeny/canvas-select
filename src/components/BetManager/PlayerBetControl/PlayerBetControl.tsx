import React from "react";
import {IPlayerChancesProps} from "../../../types/TotalDisplay.types";
import "./index.css";

// Просто для примера утилили использовал :)
const PlayerBetControl: React.FC<Pick<IPlayerChancesProps, 'player'>> = ({player}) => {

    return (
        <div className='player-bet-control'>
            <div className='player-info-wrapper'>
                <img src={player.avatar} alt={player.name} />
                {player.name}
            </div>

            <button
                className='increase-bet-btn'
                onClick={() => player.makeBet(10)}
            >
                Поставить $10
            </button>
        </div>
    );
};

export default PlayerBetControl;