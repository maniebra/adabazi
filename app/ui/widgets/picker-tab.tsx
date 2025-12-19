"use client";

import { useAppSelector } from "@/app/lib/hooks/redux-hooks";
import Wheel from "@/app/ui/base/wheel"
import WordPickerWidget from "@/app/ui/base/word-picker";
import GuessResultWidget from "@/app/ui/base/guess-result";

export default function PickerTab() {
    const singleGuesser = useAppSelector(
        state => state.gameConfig.single_guesser
    );

    return (
        <div title="بازی!">
            <div className="flex w-full justify-evenly">
                {singleGuesser && (
                    <Wheel buttonText="حدس می‌زنه!" role="guesser"/>
                )}

                <Wheel buttonText="بازی می‌کنه!" role="actor"/>
            </div>

            <div className="mt-4 flex flex-row gap-8">
                <WordPickerWidget />
                <GuessResultWidget />
            </div>
        </div>
    );
}
