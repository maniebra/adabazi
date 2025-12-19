"use client";

import { useState, useMemo } from "react";
import { getRandomInt, getWeightedIndex } from "@/app/utils/random-utils";
import { useAppSelector, useAppDispatch } from "@/app/hooks/redux-hooks";
import { setActor, setGuesser } from "@/app/slices/game-slice";

export default function WeightedWheel(props: {
    buttonText: string;
    role: "actor" | "guesser";
}) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const dispatch = useAppDispatch();

    const participants = useAppSelector(state => state.participants.list);
    const simpleMode = useAppSelector(state => state.gameConfig.simpleMode);
    const singleGuesser = useAppSelector(state => state.gameConfig.singleGuesser);

    const { names, weights } = useMemo(() => ({
        names: participants.map(p => p.name),
        weights: participants.map(p => p.weight),
    }), [participants]);

    const radius =
        !singleGuesser ? 230 :
            simpleMode ? 180 :
                130;

    const step = names.length > 0 ? 360 / names.length : 0;

    function spin() {
        if (isSpinning || names.length === 0) return;

        setIsSpinning(true);

        const targetIndex = getWeightedIndex(weights);
        const winnerName = names[targetIndex];

        const extraTurns = getRandomInt(5, 10);
        const currentPosition = rotation % 360;
        const targetAngle = targetIndex * step;

        let deltaRotation = targetAngle - currentPosition;
        if (deltaRotation < 0) deltaRotation += 360;

        const newRotation = rotation + deltaRotation + extraTurns * 360;
        setRotation(newRotation);

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
                    className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-2xl shadow-black/40 ${wheelSize}`}
                    style={{ perspective: "1400px" }}
                >
                    <div className="absolute inset-x-6 top-1/2 z-10 h-16 -translate-y-1/2 border-y border-emerald-500/40 bg-emerald-500/10 pointer-events-none" />

                    <div
                        className="relative h-full w-full transition-transform duration-[2500ms]"
                        style={{
                            transform: `rotateX(${rotation}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {names.map((name, i) => (
                            <div
                                key={name}
                                className="absolute inset-0 flex items-center justify-center"
                                style={{
                                    transform: `rotateX(${-i * step}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <span
                                    className={`font-black tracking-tight text-zinc-100 ${textSize}`}
                                >
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
                        : "bg-red-500/80 text-zinc-100 hover:bg-red-500 hover:scale-105 active:scale-95"
                }`}
            >
                {isSpinning ? "در حال قرعه‌کشی..." : props.buttonText}
            </button>
        </div>
    );
}
