import {configureStore} from "@reduxjs/toolkit";
import participantsReducer from "@/app/lib/slices/participant-slice";

export const store = configureStore({
    reducer: {
        participants: participantsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
