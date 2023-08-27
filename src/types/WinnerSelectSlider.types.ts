export enum SliderConfig {
    BLOCK_WIDTH = 78,
    BLOCK_HEIGHT = 78,
    BLOCKS_INTERVAL = 10,
    POINTER_X_POSITION = 500,
    SPIN_TIME_MS = 3000,
    ACCELERATE_SPEED = 0.5,
    SLOWDOWN_SPEED = 0.08,
    MAX_ALLOWED_SPEED = 35,
    BLOCKS_IN_ROW = 250
}

export interface IParticipant {
    avatar: string,
    betAmount: number,
    name: string,
    makeBet: (newBet: number) => void;
}

export interface IDistributedBlock {
    height: number,
    width: number,
    participant: IParticipant,
    x: number,
    y: number
}


