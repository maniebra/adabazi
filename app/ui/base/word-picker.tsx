"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks/redux-hooks";

export default function WordPickerWidget() {
    const words = useAppSelector(state => state.words.list);

    const [currentWord, setCurrentWord] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    const pickWord = () => {
        if (words.length === 0) return;

        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[randomIndex]);
        setRevealed(false); // always blur after pick
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white shadow-sm p-4 space-y-4">
            {/* Word container */}
            <div
                className={`h-24 flex items-center justify-center rounded-xl border text-xl font-bold transition-all
          ${revealed ? "blur-0" : "blur-md select-none"}
        `}
            >
                {currentWord ?? "—"}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                <button
                    onClick={pickWord}
                    disabled={words.length === 0}
                    className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                    انتخاب
                </button>

                <button
                    onClick={() => setRevealed(v => !v)}
                    disabled={!currentWord}
                    className="flex-1 rounded-xl bg-slate-100 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-40"
                >
                    {revealed ? "پنهان" : "نمایش"}
                </button>
            </div>
        </div>
    );
}
