"use client";



import UploadParticipantsButton from "@/app/ui/base/upload-participants-button";
import UploadWordsButton from "@/app/ui/base/upload-words-button";
import GameConfigForm from "@/app/ui/widgets/config-settings";

export default function SettingsTab() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
        >
            {/* Upload Section - Grouped together */}
            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <h3 className="mb-3 text-sm font-bold text-slate-600">مدیریت لیست‌ها</h3>
                    <div className="flex flex-col gap-3">
                        <UploadParticipantsButton />
                        <UploadWordsButton />
                    </div>
                </div>
            </div>

            {/* Configuration Form - Usually takes more vertical space */}
            <div className="md:col-span-1">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 h-full">
                    <h3 className="mb-3 text-sm font-bold text-slate-600">تنظیمات بازی</h3>
                    <GameConfigForm />
                </div>
            </div>
        </div>
    );
}
