import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    actor: string | null;
    guesser: string | null;
    currentWord: string | null;
}

const initialState: GameState = {
    actor: null,
    guesser: null,
    currentWord: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setActor: (state, action: PayloadAction<string>) => {
            state.actor = action.payload;
        },

        setGuesser: (state, action: PayloadAction<string | null>) => {
            state.guesser = action.payload;
        },

        setCurrentWord: (state, action: PayloadAction<string | null>) => {
            state.currentWord = action.payload;
        },

        resetRound: (state) => {
            state.actor = null;
            state.guesser = null;
            state.currentWord = null;
        },
    },
});

export const {
    setActor,
    setGuesser,
    setCurrentWord,
    resetRound,
} = gameSlice.actions;

export default gameSlice.reducer;
