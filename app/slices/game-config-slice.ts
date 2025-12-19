import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GameConfig} from "@/app/types/game-config";

const initialState: GameConfig = {
    single_guesser: true,
    time_to_guess: 1,
    score_to_actor: 5,
    score_to_guesser: 5,
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
