import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WordsState {
    list: string[];
}

const initialState: WordsState = {
    list: [],
};

const wordsSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        addWord: (state, action: PayloadAction<string>) => {
            state.list.push(action.payload);
        },

        addBatch: (state, action: PayloadAction<string[]>) => {
            state.list.push(...action.payload);
        },

        removeWord: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(w => w !== action.payload);
        },

        removeAll: (state) => {
            state.list = [];
        },
    },
});

export const {
    addWord,
    addBatch,
    removeWord,
    removeAll,
} = wordsSlice.actions;

export default wordsSlice.reducer;
