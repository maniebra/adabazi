import {configureStore} from "@reduxjs/toolkit";
import participantsReducer from "@/app/slices/participant-slice";
import gameConfigReducer from "@/app/slices/game-config-slice";
import wordReducer from "@/app/slices/word-slice";
import gameReducer from "@/app/slices/game-slice";

export const store = configureStore({
    reducer: {
        participants: participantsReducer,
        gameConfig: gameConfigReducer,
        words: wordReducer,
        game: gameReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
