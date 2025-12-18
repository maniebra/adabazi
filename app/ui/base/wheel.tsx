"use client";
import {useState, useMemo} from "react";
import {getRandomInt, getWeightedIndex} from "@/app/utils/random-utils";
import {useAppSelector} from "@/app/lib/hooks/redux-hooks";

export default function WeightedWheel(props: { buttonText: string }) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const participants = useAppSelector(
        state => state.participants.list
    );

    const {names, weights} = useMemo(() => ({
        names: participants.map(p => p.name),
        weights: participants.map(p => p.weight),
    }), [participants]);


    const radius = 130;
    const step = 360 / names.length;

    function spin() {
        if (isSpinning) return;
        setIsSpinning(true);

        const targetIndex = getWeightedIndex(weights);
        const extraTurns = getRandomInt(5, 10);

        const currentPosition = rotation % 360;

        const targetAngle = targetIndex * step;
        let deltaRotation = targetAngle - currentPosition;

        if (deltaRotation < 0) {
            deltaRotation += 360;
        }

        const newRotation = rotation + deltaRotation + (extraTurns * 360);

        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
        }, 2500);
    }

    return (
        <div className="flex flex-col items-center gap-10 p-8" dir="rtl">
            <div className="group relative">
                <div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-blue-950 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"/>
                <div
                    className="relative w-80 h-32 rounded-3xl bg-zinc-100 border-4 border-zinc-200 flex items-center justify-center overflow-hidden"
                    style={{perspective: "1200px"}}
                >
                    <div className="absolute inset-0 z-20 pointer-events-none"/>
                    <div
                        className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-14 bg-blue-600/10 border-y border-blue-300/60 z-10 pointer-events-none"/>
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
                                className="absolute inset-0 flex items-center justify-center"
                                style={{
                                    transform: `rotateX(${-i * step}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <span className="text-zinc-900 text-2xl font-black tracking-tight">
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
                        ? "bg-zinc-400 text-zinc-700 cursor-not-allowed"
                        : "bg-orange-600 text-white hover:bg-orange-500 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20"
                }`}
            >
                {isSpinning ? "در حال قرعه‌کشی..." : props.buttonText}
            </button>
        </div>
    );
}
