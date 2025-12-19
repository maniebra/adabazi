"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux-hooks";
import { setCurrentWord } from "@/app/slices/game-slice";

export default function WordPickerWidget() {
    const dispatch = useAppDispatch();

    const words = useAppSelector(state => state.words.list);
    const currentWord = useAppSelector(state => state.game.currentWord);

    const [revealed, setRevealed] = useState(false);

    const pickWord = () => {
        if (words.length === 0) return;

        const randomIndex = Math.floor(Math.random() * words.length);
        dispatch(setCurrentWord(words[randomIndex]));
        setRevealed(false);
    };

    return (
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-4 text-zinc-100 shadow-2xl shadow-black/40">
            <div
                className={`flex h-24 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-xl font-black transition-all ${
                    revealed ? "blur-0" : "select-none blur-md"
                }`}
            >
                {currentWord ?? "—"}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={pickWord}
                    disabled={words.length === 0}
                    className="flex-1 rounded-xl bg-emerald-500/80 py-2 text-sm font-bold text-zinc-950 hover:bg-emerald-500 active:scale-95 disabled:opacity-40"
                >
                    انتخاب
                </button>

                <button
                    onClick={() => setRevealed(v => !v)}
                    disabled={!currentWord}
                    className="flex-1 rounded-xl bg-red-500/15 py-2 text-sm font-bold text-red-300 hover:bg-red-500/25 active:scale-95 disabled:opacity-40"
                >
                    {revealed ? "پنهان" : "نمایش"}
                </button>
            </div>
        </div>
    );
}
