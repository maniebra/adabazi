"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function toFarsiDigits(value: string | number) {
    return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export default function CountdownWidget({
                                            duration = 1,
                                        }: {
    duration?: number;
}) {
    const totalSeconds = duration * 60;
    const [remainingSec, setRemainingSec] = useState(totalSeconds);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!running) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setRemainingSec((prev) => {
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
    const percentage = (remainingSec / totalSeconds) * 100;

    return (
        <div className="flex items-center justify-center p-6">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 transition-all hover:shadow-indigo-100/50">

                <div className="flex flex-col items-center justify-between gap-6 py-6 px-6 sm:flex-row">
                    {/* Time Display */}
                    <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              زمان باقی‌مانده
            </span>
                        <span className="text-3xl font-black text-slate-800 tabular-nums">
              {toFarsiDigits(minutes)}:{toFarsiDigits(seconds.toString().padStart(2, "0"))}
            </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {!running ? (
                                <motion.button
                                    key="start"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    onClick={() => {
                                        if (remainingSec === 0) setRemainingSec(totalSeconds);
                                        setRunning(true);
                                    }}
                                    className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-900 active:scale-95"
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
                                    className="flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-2.5 text-sm font-bold text-orange-600 transition-all hover:bg-rose-100 active:scale-95"
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
                            className="rounded-xl bg-slate-100 p-2.5 text-slate-500 transition-colors hover:bg-slate-200"
                            title="بازنشانی"
                        >
                            <ResetIcon />
                        </button>
                    </div>
                </div>

                <div className="h-1.5 w-full bg-slate-100">
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                        className="h-full bg-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const ResetIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);
