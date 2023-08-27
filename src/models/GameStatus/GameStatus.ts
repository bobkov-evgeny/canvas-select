import {types} from "mobx-state-tree";
import {Participant} from "./Participant";
import {IDistributedBlock, IParticipant, SliderConfig} from "../../types/WinnerSelectSlider.types";
import {shuffleArray} from "../../utils";

export const GameStatus = types.model('GameStatus', {
    participants: types.optional(types.array(Participant), []),
    isRunning: types.optional(types.boolean, false),
    winner: types.optional(types.string, '')
}).views((self) => ({
    get currentGameBank() {
        return self.participants.reduce((acc, v) => acc+v.betAmount, 0);
    },
})).actions((self) => ({
    getDistributedBlocks(): IDistributedBlock[] {
        const blocks: any[] = [];

        self.participants.forEach(participant => {
            const numBlocks = Math.round((participant.betAmount / self.currentGameBank) * SliderConfig.BLOCKS_IN_ROW);
            for (let i = 0; i < numBlocks; i++) {
                blocks.push({
                    participant,
                    width: SliderConfig.BLOCK_WIDTH,
                    height: SliderConfig.BLOCK_HEIGHT
                });
            }
        });

        return shuffleArray(blocks).map((block, i) => ({
            ...block,
            x: (i * (SliderConfig.BLOCK_WIDTH + SliderConfig.BLOCKS_INTERVAL)),
            y: 0,
        }));
    },

    calculateChancesToWin(participant: IParticipant): number {
        if(!participant.betAmount) {
            return 0
        }

        return Number((participant.betAmount / self.currentGameBank * 100).toFixed(2));
    },

    startGame() {
        if (!self.isRunning) {
            self.winner = '';
            self.isRunning = true;
        }
    },

    setIsRunning(newStatus: boolean) {
        self.isRunning = newStatus;
    },

    setWinner(winner: string) {
        self.winner = winner
    },

    resetAllBets() {
        self.participants.forEach(player => player.resetBetAmount())
        self.winner = '';
    }
}))