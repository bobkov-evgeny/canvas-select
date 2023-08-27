import {Instance, types} from "mobx-state-tree";
import {createContext, useContext} from "react";
import {GameStatus} from "./GameStatus";
import Avatar1 from "../resources/avatar1.jpg";
import Avatar2 from "../resources/avatar2.jpg";
import Avatar3 from "../resources/avatar3.jpeg";
import Avatar4 from "../resources/avatar4.jpg";
import Avatar5 from "../resources/avatar5.jpeg";

const Root = types.model('Root', {
    gameStatus: GameStatus
}).views((self) => ({
    get isRunning() {
        return self.gameStatus.isRunning;
    }
}));

const initialState = Root.create({
    gameStatus: {
        participants: [
            { name: 'Player 1', betAmount: 0, avatar: Avatar1 },
            { name: 'Player 2', betAmount: 0, avatar: Avatar2 },
            { name: 'Player 3', betAmount: 0, avatar: Avatar3 },
            { name: 'Player 4', betAmount: 0, avatar: Avatar4 },
            { name: 'Player 5', betAmount: 0, avatar: Avatar5 }
        ],
        isRunning: false
    }
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof Root>;

const RootStoreContext = createContext<RootInstance | null>(null);
export const { Provider: MstProvider } = RootStoreContext;

export function useMst(): RootInstance {
    const store = useContext(RootStoreContext);

    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }

    return store;
}