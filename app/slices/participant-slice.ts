import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Participant} from "@/app/types/participant";

interface ParticipantsState {
    list: Participant[];
}

const initialState: ParticipantsState = {
    list: [],
};

const participantsSlice = createSlice({
    name: "participants",
    initialState,
    reducers: {
        addParticipant: (state, action: PayloadAction<Participant>) => {
            state.list.push(action.payload);
        },

        addBatch: (state, action: PayloadAction<Participant[]>) => {
            state.list.push(...action.payload);
        },

        updateParticipant: (
            state,
            action: PayloadAction<{
                name: string;
                patch: Partial<Omit<Participant, "name">>;
            }>
        ) => {
            const p = state.list.find(p => p.name === action.payload.name);
            if (!p) return;

            Object.assign(p, action.payload.patch);
        },

        removeParticipant: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(p => p.name !== action.payload);
        },

        resetParticipants: (state) => {
            state.list = [];
        },

    },
});

export const {
    addParticipant,
    addBatch,
    updateParticipant,
    removeParticipant,
    resetParticipants,
} = participantsSlice.actions;

export default participantsSlice.reducer;
