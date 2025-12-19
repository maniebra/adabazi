"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/app/hooks/redux-hooks";
import { addBatch, resetParticipants } from "@/app/slices/participant-slice";
import { Participant } from "@/app/types/participant";

export default function UploadParticipantsButton() {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        const text = await file.text();

        const participants: Participant[] = text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => {
                const [name, weightRaw] = line.split("-").map(s => s.trim());
                const weight = Number(weightRaw);

                if (!name || Number.isNaN(weight)) return null;

                return {
                    name,
                    weight,
                    score: 0,
                };
            })
            .filter((p): p is Participant => p !== null);

        dispatch(resetParticipants());
        dispatch(addBatch(participants));
    };

    return (
        <div className="relative h-40 rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-4 text-zinc-100 shadow-2xl shadow-black/40">
            <h1 className="pb-4 text-2xl font-bold text-emerald-300">
                محل بارگذاری فایل شرکت‌کنندگان
            </h1>
            <p className="text-sm text-zinc-400">
                فایل txt شرکت‌کنندگان مسابقه را در اینجا بارگذاری نمایید.
            </p>

            <button
                onClick={() => inputRef.current?.click()}
                className="absolute bottom-4 left-4 rounded-xl bg-red-500/80 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-red-500 active:scale-95"
            >
                بارگذاری
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".txt"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.currentTarget.value = "";
                }}
            />
        </div>
    );
}
