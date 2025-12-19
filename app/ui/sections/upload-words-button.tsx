"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/app/hooks/redux-hooks";
import {
    addBatch,
    removeAll,
} from "@/app/slices/word-slice";

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
        <div className="border-1 border-zinc-200 h-40 p-4 rounded-2xl relative">
            <h1 className="text-2xl font-bold pb-4">محل بارگذاری فایل کلمات</h1>
            <p>
                فایل کلمات خود را با فرمت .txt در اینجا بارگذاری نمایید
            </p>
            <button
                onClick={() => inputRef.current?.click()}
                className="rounded-xl bg-blue-700 px-4 py-2  text-white hover:bg-blue-600 active:scale-95 absolute bottom-4 left-4"
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
