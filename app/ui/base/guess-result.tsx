"use client";

import {useAppDispatch, useAppSelector} from "@/app/lib/hooks/redux-hooks";
import {updateParticipant} from "@/app/lib/slices/participant-slice";
import {removeWord} from "@/app/lib/slices/word-slice";
import {setCurrentWord} from "@/app/lib/slices/game-slice";

export default function GuessResultWidget() {
    const dispatch = useAppDispatch();

    const actor = useAppSelector(state => state.game.actor);
    const guesser = useAppSelector(state => state.game.guesser);
    const currentWord = useAppSelector(state => state.game.currentWord);

    const {
        score_to_actor,
        score_to_guesser,
    } = useAppSelector(state => state.gameConfig);

    const participants = useAppSelector(
        state => state.participants.list
    );

    const applyScore = (name: string, delta: number) => {
        const p = participants.find(p => p.name === name);
        if (!p) return;

        dispatch(
            updateParticipant({
                name,
                patch: {score: p.score + delta},
            })
        );
    };

    const consumeWord = () => {
        if (!currentWord) return;

        dispatch(removeWord(currentWord));
        dispatch(setCurrentWord(null));
    };

    const onGuessed = () => {
        if (!actor || !currentWord) return;

        applyScore(actor, score_to_actor);

        if (guesser) {
            applyScore(guesser, score_to_guesser);
        }

        consumeWord();
    };

    const onNotGuessed = () => {
        consumeWord();
    };

    return (
        <div className="w-full max-w-md rounded-2xl text-xl bg-white border border-zinc-200 p-4 flex gap-3">
            <button
                onClick={onGuessed}
                disabled={!actor || !currentWord}
                className="flex-1 rounded-xl bg-emerald-500 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
            >
                حدس زد!
            </button>

            <button
                onClick={onNotGuessed}
                disabled={!currentWord}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-40"
            >
                حدس نزد!
            </button>
        </div>
    );
}
