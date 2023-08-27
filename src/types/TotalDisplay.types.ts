import {IParticipant} from "./WinnerSelectSlider.types";

export interface IPlayerChancesProps {
    player: IParticipant,
    chancesToWin: number,
    isWinner: boolean
}