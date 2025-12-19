"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/app/hooks/redux-hooks";
import { toFarsiDigits } from "@/app/utils/persian-utils";
import clsx from "clsx";

interface LeaderboardTableProps {
    className?: string;
}

export default function LeaderboardTable({ className }: LeaderboardTableProps) {
    const participants = useAppSelector((state) => state.participants.list);

    const sorted = useMemo(() => {
        return [...participants].sort((a, b) => b.score - a.score);
    }, [participants]);

    return (
        <div
            dir="rtl"
            className={clsx(
                "ml-6 flex h-[calc(100%-11.1rem)] w-[calc(100%-3rem)] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-2xl shadow-black/40",
                className
            )}
        >
            <div className="z-10 grid grid-cols-[60px_1fr_80px] items-center border-b border-zinc-800 bg-zinc-900/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400 backdrop-blur-md">
                <div>رتبه</div>
                <div>نام شرکت‌کننده</div>
                <div className="text-left">امتیاز</div>
            </div>

            <div className="custom-scrollbar flex-1 divide-y divide-zinc-800 overflow-y-auto">
                {sorted.map((p, idx) => {
                    const rank = idx + 1;

                    return (
                        <div
                            key={p.name}
                            className="group grid grid-cols-[60px_1fr_80px] items-center px-6 py-4 transition-colors hover:bg-zinc-800/50"
                        >
                            <div className="relative">
                                <span
                                    className={clsx(
                                        "flex h-8 w-8 items-center justify-center rounded-lg font-bold",
                                        rank === 1 &&
                                        "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40",
                                        rank === 2 &&
                                        "bg-zinc-700 text-zinc-200 ring-1 ring-zinc-600",
                                        rank === 3 &&
                                        "bg-red-500/20 text-red-300 ring-1 ring-red-500/40",
                                        rank > 3 && "text-zinc-500"
                                    )}
                                >
                                    {toFarsiDigits(rank)}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="h-2 w-2 shrink-0 rounded-full bg-zinc-700 transition-colors group-hover:bg-emerald-400" />
                                <div className="truncate text-zinc-200">
                                    {p.name}
                                </div>
                            </div>

                            <div className="text-left text-base font-black text-emerald-400">
                                {toFarsiDigits(p.score)}
                            </div>
                        </div>
                    );
                })}

                {sorted.length === 0 && (
                    <div className="flex h-full items-center justify-center py-12 text-sm italic text-zinc-500">
                        لیست خالی است...
                    </div>
                )}
            </div>

            {sorted.length > 0 && (
                <div className="border-t border-zinc-800 bg-zinc-900/80 px-6 py-2 text-left text-[10px] font-medium uppercase text-zinc-500">
                    کل شرکت‌کنندگان: {toFarsiDigits(sorted.length)}
                </div>
            )}
        </div>
    );
}
