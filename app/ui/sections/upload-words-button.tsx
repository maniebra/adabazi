"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/app/hooks/redux-hooks";
import { addBatch, removeAll } from "@/app/slices/word-slice";

export default function UploadWordsButton() {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        const text = await file.text();

        const words = text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        dispatch(removeAll());
        dispatch(addBatch(words));
    };

    return (
        <div className="relative h-40 rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-4 text-zinc-100 shadow-2xl shadow-black/40">
            <h1 className="pb-4 text-2xl font-bold text-emerald-300">
                محل بارگذاری فایل کلمات
            </h1>
            <p className="text-sm text-zinc-400">
                فایل کلمات خود را با فرمت .txt در اینجا بارگذاری نمایید
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
