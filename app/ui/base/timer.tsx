"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toFarsiDigits } from "@/app/utils/persian-utils";
import { useAppSelector } from "@/app/hooks/redux-hooks";
import { PauseIcon, PlayIcon, ResetIcon } from "@/app/ui/base/icons";

export default function CountdownWidget() {
    const timeToGuessMin = useAppSelector(state => state.gameConfig.timeToGuess);
    const simpleMode = useAppSelector(state => state.gameConfig.simpleMode);

    const totalSeconds = timeToGuessMin * 60;

    const [remainingSec, setRemainingSec] = useState(totalSeconds);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        setRunning(false);
        setRemainingSec(totalSeconds);
    }, [totalSeconds]);

    useEffect(() => {
        if (!running) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setRemainingSec(prev => {
                if (prev <= 1) {
                    setRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    const minutes = Math.floor(remainingSec / 60);
    const seconds = remainingSec % 60;
    const percentage =
        totalSeconds === 0 ? 0 : (remainingSec / totalSeconds) * 100;

    return (
        <div className="flex items-center justify-center p-6">
            <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-900/70 backdrop-blur-md shadow-2xl shadow-black/40 ring-1 ring-zinc-800">
                <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 sm:flex-row">
                    <div className={`flex flex-col ${simpleMode ? "items-center w-full" : "items-center sm:items-start"}`}>
                        {!simpleMode && (
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                زمان باقی‌مانده
                            </span>
                        )}
                        <motion.span
                            key={remainingSec}
                            animate={simpleMode ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.6 }}
                            className={`font-black tabular-nums ${
                                remainingSec <= 10
                                    ? "text-red-400"
                                    : "text-emerald-300"
                            } ${
                                simpleMode
                                    ? "text-7xl sm:text-8xl tracking-tight"
                                    : "text-3xl sm:text-5xl"
                            }`}
                        >
                            {toFarsiDigits(minutes)}:
                            {toFarsiDigits(seconds.toString().padStart(2, "0"))}
                        </motion.span>
                    </div>

                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {!running ? (
                                <motion.button
                                    key="start"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    onClick={() => {
                                        if (remainingSec === 0) {
                                            setRemainingSec(totalSeconds);
                                        }
                                        setRunning(true);
                                    }}
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600/80 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-500 active:scale-95"
                                >
                                    <PlayIcon /> شروع
                                </motion.button>
                            ) : (
                                <motion.button
                                    key="stop"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    onClick={() => setRunning(false)}
                                    className="flex items-center gap-2 rounded-xl bg-red-500/15 px-5 py-2.5 text-sm font-bold text-red-300 hover:bg-red-500/25 active:scale-95"
                                >
                                    <PauseIcon /> توقف
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => {
                                setRunning(false);
                                setRemainingSec(totalSeconds);
                            }}
                            className="rounded-xl bg-zinc-800/80 p-2.5 text-zinc-400 hover:bg-zinc-700"
                            title="بازنشانی"
                        >
                            <ResetIcon />
                        </button>
                    </div>
                </div>

                <div className="h-1.5 w-full bg-zinc-800">
                    <motion.div
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                        className={`h-full ${
                            remainingSec <= 10
                                ? "bg-red-500"
                                : "bg-emerald-500"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}
