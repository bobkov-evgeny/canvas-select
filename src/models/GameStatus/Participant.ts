import {getRoot, types} from "mobx-state-tree";
import {RootInstance} from "../Root";

export const Participant = types.model('Participant', {
    name: types.string,
    betAmount: types.optional(types.number, 0),
    avatar: types.string
}).actions((self) => ({
    makeBet(betAmount: number) {
        const {gameStatus}: RootInstance = getRoot(self);

        gameStatus.setWinner('');

        if(!gameStatus.isRunning) {
            self.betAmount += betAmount;
        }
    },

    resetBetAmount() {
        self.betAmount = 0
    }
}));