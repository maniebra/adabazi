"use client";

import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks/redux-hooks";
import {updateParticipant} from "@/app/slices/participant-slice";
import {removeWord} from "@/app/slices/word-slice";
import {setCurrentWord, setGuesser} from "@/app/slices/game-slice";

export default function GuessResultWidget() {
    const dispatch = useAppDispatch();

    const actor = useAppSelector(state => state.game.actor);
    const guesser = useAppSelector(state => state.game.guesser);
    const currentWord = useAppSelector(state => state.game.currentWord);
    const singleGuesser = useAppSelector(
        state => state.gameConfig.singleGuesser
    );
    const {scoreToActor, scoreToGuesser} =
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
                patch: {score: p.score + delta},
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
            <div className="w-full max-w-md rounded-2xl bg-white border border-zinc-200 p-4 flex gap-3">
                <button
                    onClick={onGuessed}
                    disabled={!actor || !currentWord}
                    className="flex-1 rounded-xl bg-emerald-500 py-3 text-xl font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
                >
                    حدس زد!
                </button>

                <button
                    onClick={onNotGuessed}
                    disabled={!currentWord}
                    className="flex-1 rounded-xl bg-red-600 py-3 text-xl font-bold text-white hover:bg-red-700 disabled:opacity-40"
                >
                    حدس نزد!
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-sm h-[420px] rounded-2xl bg-white p-4 flex flex-col">
                        <div className="text-lg font-bold text-zinc-800 mb-2">
                            انتخاب حدس‌زننده
                        </div>

                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="جستجوی نام..."
                            className="w-full rounded-lg border px-3 py-2 text-sm mb-3"
                        />

                        <div className="flex-1 overflow-y-auto space-y-1">
                            {filteredParticipants.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setSelectedGuesser(p.name)}
                                    className={`w-full text-right rounded-lg px-3 py-2 text-sm ${
                                        selectedGuesser === p.name
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-zinc-100"
                                    }`}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="flex-1 rounded-xl bg-zinc-100 py-2 text-sm font-bold"
                            >
                                لغو
                            </button>

                            <button
                                onClick={() => resolveRound(selectedGuesser)}
                                disabled={!selectedGuesser}
                                className="flex-1 rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white disabled:opacity-40"
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
