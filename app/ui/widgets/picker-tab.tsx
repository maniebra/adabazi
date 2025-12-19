"use client";

import { useAppSelector } from "@/app/lib/hooks/redux-hooks";
import Wheel from "@/app/ui/base/wheel"
import WordPickerWidget from "@/app/ui/base/word-picker";

export default function PickerTab() {
    const singleGuesser = useAppSelector(
        state => state.gameConfig.single_guesser
    );

    return (
        <div title="بازی!">
            <div className="flex w-full justify-evenly">
                {singleGuesser && (
                    <Wheel buttonText="حدس می‌زنه!" />
                )}

                <Wheel buttonText="بازی می‌کنه!" />
            </div>

            <div className="mt-4">
                <WordPickerWidget />
            </div>
        </div>
    );
}
