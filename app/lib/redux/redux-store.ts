import {configureStore} from "@reduxjs/toolkit";
import participantsReducer from "@/app/lib/slices/participant-slice";
import gameConfigReducer from "@/app/lib/slices/game-config-slice";
import wordReducer from "@/app/lib/slices/word-slice";

export const store = configureStore({
    reducer: {
        participants: participantsReducer,
        gameConfig: gameConfigReducer,
        words: wordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
