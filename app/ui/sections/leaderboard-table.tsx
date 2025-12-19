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
            /* h-full ensures it takes parent height; flex-col allows internal scrolling logic */
            className={clsx(
                "flex ml-6 h-[calc(100%-11.1rem)] w-[calc(100%-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50",
                className
            )}
        >
            {/* Fixed Header */}
            <div className="grid grid-cols-[60px_1fr_80px] items-center bg-slate-50/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 backdrop-blur-md z-10">
                <div>رتبه</div>
                <div>نام شرکت‌کننده</div>
                <div className="text-left">امتیاز</div>
            </div>

            {/* Scrollable Body - flex-1 takes up the remaining space */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                {sorted.map((p, idx) => {
                    const rank = idx + 1;

                    return (
                        <div
                            key={p.name}
                            className="group grid grid-cols-[60px_1fr_80px] items-center px-6 py-4 transition-colors hover:bg-indigo-50/30"
                        >
                            {/* Rank Column */}
                            <div className="relative">
                <span
                    className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-lg font-bold",
                        rank === 1 && "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
                        rank === 2 && "bg-slate-200 text-slate-700 ring-1 ring-slate-300",
                        rank === 3 && "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
                        rank > 3 && "text-slate-400"
                    )}
                >
                  {toFarsiDigits(rank)}
                </span>
                            </div>

                            {/* Name Column */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="h-2 w-2 shrink-0 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors" />
                                <div className="truncate text-slate-700">
                                    {p.name}
                                </div>
                            </div>

                            {/* Score Column */}
                            <div className="text-left text-base font-black text-indigo-600">
                                {toFarsiDigits(p.score)}
                            </div>
                        </div>
                    );
                })}

                {sorted.length === 0 && (
                    <div className="flex h-full items-center justify-center py-12 text-slate-400 text-sm italic">
                        لیست خالی است...
                    </div>
                )}
            </div>

            {/* Optional: Simple Footer info if list is long */}
            {sorted.length > 0 && (
                <div className="bg-slate-50 px-6 py-2 border-t border-slate-100 text-[10px] text-slate-400 text-left uppercase font-medium">
                    کل شرکت‌کنندگان: {toFarsiDigits(sorted.length)}
                </div>
            )}
        </div>
    );
}
