"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux-hooks";
import { updateParticipant } from "@/app/slices/participant-slice";
import { removeWord } from "@/app/slices/word-slice";
import { setCurrentWord, setGuesser } from "@/app/slices/game-slice";
import clsx from "clsx";

export default function GuessResultWidget() {
    const dispatch = useAppDispatch();

    const actor = useAppSelector(state => state.game.actor);
    const guesser = useAppSelector(state => state.game.guesser);
    const currentWord = useAppSelector(state => state.game.currentWord);
    const singleGuesser = useAppSelector(state => state.gameConfig.singleGuesser);
    const { scoreToActor, scoreToGuesser } =
        useAppSelector(state => state.gameConfig);
    const participants = useAppSelector(state => state.participants.list);

    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedGuesser, setSelectedGuesser] = useState<string | null>(null);

    const applyScore = (name: string, delta: number) => {
        const p = participants.find(p => p.name === name);
        if (!p) return;

        dispatch(
            updateParticipant({
                name,
                patch: { score: p.score + delta },
            })
        );
    };

    const consumeWord = () => {
        if (!currentWord) return;
        dispatch(removeWord(currentWord));
        dispatch(setCurrentWord(null));
    };

    const resolveRound = (finalGuesser: string | null) => {
        if (!actor || !currentWord) return;

        applyScore(actor, scoreToActor);

        if (finalGuesser && scoreToGuesser > 0) {
            applyScore(finalGuesser, scoreToGuesser);
            dispatch(setGuesser(finalGuesser));
        }

        consumeWord();
        setModalOpen(false);
        setSelectedGuesser(null);
        setSearch("");
    };

    const onGuessed = () => {
        if (!actor || !currentWord) return;

        if (scoreToGuesser === 0) {
            resolveRound(null);
            return;
        }

        if (!singleGuesser) {
            setModalOpen(true);
            return;
        }

        resolveRound(guesser);
    };

    const onNotGuessed = () => {
        if (!currentWord) return;
        consumeWord();
    };

    const filteredParticipants = participants.filter(p =>
        p.name.includes(search)
    );

    return (
        <>
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-4 flex gap-3 shadow-2xl shadow-black/40">
                <button
                    onClick={onGuessed}
                    disabled={!actor || !currentWord}
                    className="flex-1 rounded-xl bg-emerald-500/80 py-3 text-xl font-bold text-zinc-100 hover:bg-emerald-500 disabled:opacity-40 active:scale-95"
                >
                    حدس زد!
                </button>

                <button
                    onClick={onNotGuessed}
                    disabled={!currentWord}
                    className="flex-1 rounded-xl bg-red-500/80 py-3 text-xl font-bold text-zinc-100 hover:bg-red-500 disabled:opacity-40 active:scale-95"
                >
                    حدس نزد!
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex h-[420px] w-full max-w-sm flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-4 shadow-2xl shadow-black/50">
                        <div className="mb-2 text-lg font-bold text-zinc-100">
                            انتخاب حدس‌زننده
                        </div>

                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="جستجوی نام..."
                            className="mb-3 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                        />

                        <div className="flex-1 space-y-1 overflow-y-auto">
                            {filteredParticipants.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setSelectedGuesser(p.name)}
                                    className={clsx(
                                        "w-full rounded-lg px-3 py-2 text-right text-sm transition-colors",
                                        selectedGuesser === p.name
                                            ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                                            : "text-zinc-300 hover:bg-zinc-800"
                                    )}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="flex-1 rounded-xl bg-zinc-800 py-2 text-sm font-bold text-zinc-300 hover:bg-zinc-700"
                            >
                                لغو
                            </button>

                            <button
                                onClick={() => resolveRound(selectedGuesser)}
                                disabled={!selectedGuesser}
                                className="flex-1 rounded-xl bg-emerald-500/80 py-2 text-sm font-bold text-zinc-100 hover:bg-emerald-500 disabled:opacity-40"
                            >
                                تایید
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
