"use client";

import {useAppSelector} from "@/app/hooks/redux-hooks";
import Wheel from "@/app/ui/sections/wheel"
import WordPickerWidget from "@/app/ui/sections/word-picker";
import GuessResultWidget from "@/app/ui/sections/guess-result";

export default function PickerTab() {
    const singleGuesser = useAppSelector(
        state => state.gameConfig.singleGuesser
    );

    const simpleMode = useAppSelector(
        state => state.gameConfig.simpleMode
    )

    return (
        <div title="بازی!">
            <div>
                <div className="flex w-full justify-evenly">
                    {singleGuesser && (
                        <Wheel buttonText="حدس می‌زنه!" role="guesser"/>
                    )}

                    <Wheel buttonText="بازی می‌کنه!" role="actor"/>
                </div>
            </div>

            {!simpleMode &&
                <div className="mt-4 flex flex-row gap-8 w-full justify-evenly">
                    <WordPickerWidget/>
                    <GuessResultWidget/>
                </div>}
        </div>
    );
}
