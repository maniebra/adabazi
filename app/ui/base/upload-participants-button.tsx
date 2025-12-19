"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/app/lib/hooks/redux-hooks";
import {addBatch, resetParticipants} from "@/app/lib/slices/participant-slice";
import {Participant} from "@/app/types/participant";


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
        <div className="border-1 border-zinc-200 h-40 rounded-xl relative p-4">
            <h1 className="text-2xl font-bold pb-4">محل بارگذاری فایل شرکت‌کنندگان</h1>
            <p>فایل txt شرکت‌کنندگان مسابقه را در اینجا بارگذاری نمایید.</p>
            <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white absolute bottom-4 left-4"
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
                    e.currentTarget.value = ""; // allow re-uploading same file
                }}
            />
        </div>
    );
}
