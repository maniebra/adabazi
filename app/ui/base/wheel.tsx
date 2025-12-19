"use client";

import { useState, useMemo } from "react";
import { getRandomInt, getWeightedIndex } from "@/app/utils/random-utils";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks/redux-hooks";
import {setActor, setGuesser} from "@/app/lib/slices/game-slice";

export default function WeightedWheel(props: {
    buttonText: string;
    role: "actor" | "guesser";
}) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const dispatch = useAppDispatch();

    const participants = useAppSelector(
        state => state.participants.list
    );

    const { names, weights } = useMemo(() => ({
        names: participants.map(p => p.name),
        weights: participants.map(p => p.weight),
    }), [participants]);

    const radius = 130;
    const step = 360 / names.length;

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
                console.log(winnerName);
            } else {
                dispatch(setGuesser(winnerName));
                console.log(winnerName);
            }

            setIsSpinning(false);
        }, 2500);
    }

    return (
        <div className="flex flex-col items-center gap-10 p-8" dir="rtl">
            <div className="group relative">
                <div
                    className="relative w-80 h-28 rounded-2xl border-1 border-zinc-300 flex items-center justify-center overflow-hidden"
                    style={{ perspective: "1200px" }}
                >
                    <div className="absolute inset-0 z-20 pointer-events-none"/>
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-14 bg-blue-600/10 border-y border-blue-300/60 z-10 pointer-events-none"/>

                    <div
                        className="relative w-full h-full transition-transform duration-[2500ms]"
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
                <span className="text-zinc-900 text-2xl font-black">
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
                className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all ${
                    isSpinning
                        ? "bg-zinc-400 text-zinc-700 cursor-not-allowed"
                        : "bg-orange-600 text-white hover:bg-orange-500 hover:scale-105 active:scale-95"
                }`}
            >
                {isSpinning ? "در حال قرعه‌کشی..." : props.buttonText}
            </button>
        </div>
    );
}
