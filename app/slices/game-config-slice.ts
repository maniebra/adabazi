import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GameConfig} from "@/app/types/game-config";

const initialState: GameConfig = {
    singleGuesser: true,
    timeToGuess: 1,
    scoreToActor: 5,
    scoreToGuesser: 5,
    simpleMode: true
};

const gameConfigSlice = createSlice({
    name: "gameConfig",
    initialState,
    reducers: {
        setGameConfig: (_state, action: PayloadAction<GameConfig>) => {
            return action.payload;
        },

        resetGameConfig: () => {
            return initialState;
        },

        updateGameConfig: (
            state,
            action: PayloadAction<Partial<GameConfig>>
        ) => {
            Object.assign(state, action.payload);
        },
    },
});

export const {
    setGameConfig,
    resetGameConfig,
    updateGameConfig,
} = gameConfigSlice.actions;

export default gameConfigSlice.reducer;
