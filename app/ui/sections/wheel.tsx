"use client";

import { useState, useMemo } from "react";
import { getRandomInt, getWeightedIndex } from "@/app/utils/random-utils";
import { useAppSelector, useAppDispatch } from "@/app/hooks/redux-hooks";
import { setActor, setGuesser } from "@/app/slices/game-slice";

const VISIBLE_SLOTS = 11; // must be odd

export default function WeightedWheel(props: {
    buttonText: string;
    role: "actor" | "guesser";
}) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [centerIndex, setCenterIndex] = useState(0);

    const dispatch = useAppDispatch();

    const participants = useAppSelector(state => state.participants.list);
    const simpleMode = useAppSelector(state => state.gameConfig.simpleMode);
    const singleGuesser = useAppSelector(state => state.gameConfig.singleGuesser);

    const names = participants.map(p => p.name);
    const weights = participants.map(p => p.weight);

    const radius =
        !singleGuesser ? 230 :
            simpleMode ? 180 :
                130;

    const step = 360 / VISIBLE_SLOTS;
    const half = Math.floor(VISIBLE_SLOTS / 2);

    const visibleNames = useMemo(() => {
        if (names.length === 0) return [];
        return Array.from({ length: VISIBLE_SLOTS }, (_, i) => {
            const idx = (centerIndex + i - half + names.length) % names.length;
            return names[idx];
        });
    }, [names, centerIndex]);

    function spin() {
        if (isSpinning || names.length === 0) return;

        setIsSpinning(true);

        const targetIndex = getWeightedIndex(weights);
        const winnerName = names[targetIndex];

        const extraTurns = getRandomInt(5, 9);
        const targetRotation = rotation + extraTurns * 360;

        setRotation(targetRotation);
        setCenterIndex(targetIndex);

        setTimeout(() => {
            if (props.role === "actor") {
                dispatch(setActor(winnerName));
            } else {
                dispatch(setGuesser(winnerName));
            }
            setIsSpinning(false);
        }, 2500);
    }

    const wheelSize =
        !singleGuesser
            ? "h-52 w-[36rem]"
            : simpleMode
                ? "h-40 w-[28rem]"
                : "h-28 w-80";

    const textSize =
        !singleGuesser
            ? "text-4xl"
            : simpleMode
                ? "text-3xl"
                : "text-2xl";

    return (
        <div className="flex flex-col items-center gap-10 p-8 text-zinc-100" dir="rtl">
            <div className="relative">
                <div
                    className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-2xl ${wheelSize}`}
                    style={{ perspective: "1400px" }}
                >
                    <div className="absolute inset-x-6 top-1/2 z-10 h-16 -translate-y-1/2 border-y border-emerald-500/40 bg-emerald-500/10 pointer-events-none" />

                    <div
                        className="relative h-full w-full transition-transform duration-[2500ms] ease-out"
                        style={{
                            transform: `rotateX(${rotation}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {visibleNames.map((name, i) => (
                            <div
                                key={`${name}-${i}`}
                                className="absolute inset-0 flex items-center justify-center"
                                style={{
                                    transform: `rotateX(${(i - half) * step}deg) translateZ(${radius}px)`,
                                    opacity: i === half ? 1 : 0.45,
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <span className={`font-black tracking-tight ${textSize}`}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={spin}
                disabled={isSpinning}
                className={`rounded-2xl px-12 py-4 text-xl font-bold transition-all ${
                    isSpinning
                        ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
                        : "bg-red-500/80 hover:bg-red-500 hover:scale-105 active:scale-95"
                }`}
            >
                {isSpinning ? "در حال قرعه‌کشی..." : props.buttonText}
            </button>
        </div>
    );
}
