"use client";



import UploadParticipantsButton from "@/app/ui/sections/upload-participants-button";
import UploadWordsButton from "@/app/ui/sections/upload-words-button";
import GameConfigForm from "@/app/ui/sections/config-settings";

export default function SettingsTab() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
        >
            <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-zinc-950/50 p-4">
                    <h3 className="mb-3 text-sm font-bold text-zinc-100">مدیریت لیست‌ها</h3>
                    <div className="flex flex-col gap-3">
                        <UploadParticipantsButton />
                        <UploadWordsButton />
                    </div>
                </div>
            </div>

            <div className="md:col-span-1">
                <div className="rounded-2xl bg-zinc-950/50 p-4 h-full">
                    <h3 className="mb-3 text-sm font-bold text-zinc-100">تنظیمات بازی</h3>
                    <GameConfigForm />
                </div>
            </div>
        </div>
    );
}
