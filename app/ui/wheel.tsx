"use client";

import { useState, useMemo } from "react";

// 1. Data structure: Map of Name to Weight
const PARTICIPANTS: Record<string, number> = {

};

const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getWeightedIndex = (weights: number[]) => {
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) return i;
        random -= weights[i];
    }
    return 0;
};

export default function WeightedWheel() {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    // Memoize processing the data map
    const { names, weights } = useMemo(() => ({
        names: Object.keys(PARTICIPANTS),
        weights: Object.values(PARTICIPANTS)
    }), []);

    const radius = 130;
    const step = 360 / names.length;

    function spin() {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);

        // Use our weighted utility
        const targetIndex = getWeightedIndex(weights);

        // Animation logic
        const extraTurns = getRandomInt(5, 10);
        const newRotation = rotation + (extraTurns * 360) + (targetIndex * step);

        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWinner(names[targetIndex]);
        }, 2500);
    }

    return (
        <div className="flex flex-col items-center gap-10 p-8 font-[vazirmatn,system-ui]" dir="rtl">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />

                <div
                    className="relative w-80 h-32 rounded-[2rem] bg-zinc-900 border-4 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden"
                    style={{ perspective: "1200px" }}
                >
                    <div className="absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-14 bg-emerald-500/10 border-y border-emerald-500/30 z-10 pointer-events-none backdrop-blur-[2px]" />

                    <div
                        className="relative w-full h-full transition-transform duration-[2500ms] cubic-bezier(0.15, 0, 0.15, 1)"
                        style={{
                            transform: `rotateX(${rotation}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {names.map((name, i) => (
                            <div
                                key={name}
                                className="absolute inset-0 flex items-center justify-center backface-hidden"
                                style={{
                                    transform: `rotateX(${-i * step}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <span className="text-zinc-100 text-2xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
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
                className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 ${
                    isSpinning
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20"
                }`}
            >
                {isSpinning ? "در حال قرعه‌کشی..." : "شروع قرعه‌کشی"}
            </button>

            {winner && !isSpinning && (
                <div className="text-emerald-500 font-bold text-xl animate-bounce">
                    تبریک! برنده: {winner}
                </div>
            )}
        </div>
    );
}
