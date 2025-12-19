"use client";

import { useState } from "react";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks/redux-hooks";
import {GameConfig} from "@/app/types/game-config";
import {resetGameConfig, setGameConfig} from "@/app/lib/slices/game-config-slice";


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
            className="w-full rounded-2xl bg-white border-1 border-zinc-200 p-4 space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(setGameConfig(draft));
            }}
        >
            {/* Single guesser */}
            <label className="flex items-center justify-between text-sm">
                <span>حدس‌زننده تکی</span>
                <input
                    type="checkbox"
                    checked={draft.single_guesser}
                    onChange={(e) => update("single_guesser", e.target.checked)}
                />
            </label>

            {/* Time to guess */}
            <label className="flex flex-col text-sm gap-1">
                <span>زمان حدس (دقیقه)</span>
                <input
                    type="number"
                    min={1}
                    value={draft.time_to_guess}
                    onChange={(e) =>
                        update("time_to_guess", Number(e.target.value))
                    }
                    className="rounded-lg border px-3 py-1.5"
                />
            </label>

            {/* Score to actor */}
            <label className="flex flex-col text-sm gap-1">
                <span>امتیاز بازی‌کننده</span>
                <input
                    type="number"
                    min={0}
                    value={draft.score_to_actor}
                    onChange={(e) =>
                        update("score_to_actor", Number(e.target.value))
                    }
                    className="rounded-lg border px-3 py-1.5"
                />
            </label>

            {/* Score to guesser */}
            <label className="flex flex-col text-sm gap-1">
                <span>امتیاز حدس‌زننده</span>
                <input
                    type="number"
                    min={0}
                    value={draft.score_to_guesser}
                    onChange={(e) =>
                        update("score_to_guesser", Number(e.target.value))
                    }
                    className="rounded-lg border px-3 py-1.5"
                />
            </label>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 text-white py-2 text-sm"
                >
                    ذخیره
                </button>

                <button
                    type="button"
                    className="flex-1 rounded-xl bg-zinc-100 text-zinc-700 py-2 text-sm"
                    onClick={() => {
                        dispatch(resetGameConfig());
                        setDraft({
                            single_guesser: false,
                            time_to_guess: 1,
                            score_to_actor: 5,
                            score_to_guesser: 5,
                        });
                    }}
                >
                    بازنشانی
                </button>
            </div>
        </form>
    );
}
