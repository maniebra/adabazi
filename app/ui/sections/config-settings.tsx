"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux-hooks";
import { GameConfig } from "@/app/types/game-config";
import { resetGameConfig, setGameConfig } from "@/app/slices/game-config-slice";

export default function GameConfigForm() {
    const dispatch = useAppDispatch();
    const config = useAppSelector(state => state.gameConfig);

    const [draft, setDraft] = useState<GameConfig>(config);

    const update = <K extends keyof GameConfig>(
        key: K,
        value: GameConfig[K]
    ) => {
        setDraft(prev => ({ ...prev, [key]: value }));
    };

    return (
        <form
            className="w-full space-y-4 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-4 text-zinc-100 shadow-2xl shadow-black/40"
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(setGameConfig(draft));
            }}
        >
            <label className="flex items-center justify-between text-sm text-zinc-300">
                <span>حدس‌زننده تکی</span>
                <input
                    type="checkbox"
                    checked={draft.singleGuesser}
                    onChange={(e) => update("singleGuesser", e.target.checked)}
                    className="accent-emerald-500"
                />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
                <span>زمان حدس (دقیقه)</span>
                <input
                    type="number"
                    min={1}
                    value={draft.timeToGuess}
                    onChange={(e) =>
                        update("timeToGuess", Number(e.target.value))
                    }
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-100 focus:border-emerald-500 focus:outline-none"
                />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
                <span>امتیاز بازی‌کننده</span>
                <input
                    type="number"
                    min={0}
                    value={draft.scoreToActor}
                    onChange={(e) =>
                        update("scoreToActor", Number(e.target.value))
                    }
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-100 focus:border-emerald-500 focus:outline-none"
                />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-300">
                <span>امتیاز حدس‌زننده</span>
                <input
                    type="number"
                    min={0}
                    value={draft.scoreToGuesser}
                    onChange={(e) =>
                        update("scoreToGuesser", Number(e.target.value))
                    }
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-100 focus:border-emerald-500 focus:outline-none"
                />
            </label>

            <label className="flex items-center justify-between text-sm text-zinc-300">
                <span>حالت ساده</span>
                <input
                    type="checkbox"
                    checked={draft.simpleMode}
                    onChange={(e) => update("simpleMode", e.target.checked)}
                    className="accent-red-500"
                />
            </label>

            <div className="flex gap-2 pt-2">
                <button
                    type="submit"
                    className="flex-1 rounded-xl bg-emerald-500/80 py-2 text-sm font-bold text-zinc-950 hover:bg-emerald-500 active:scale-95"
                >
                    ذخیره
                </button>

                <button
                    type="button"
                    className="flex-1 rounded-xl bg-red-500/15 py-2 text-sm font-bold text-red-300 hover:bg-red-500/25 active:scale-95"
                    onClick={() => {
                        dispatch(resetGameConfig());
                        setDraft({
                            singleGuesser: false,
                            timeToGuess: 1,
                            scoreToActor: 5,
                            scoreToGuesser: 5,
                            simpleMode: true,
                        });
                    }}
                >
                    بازنشانی
                </button>
            </div>
        </form>
    );
}
