"use client"

import Wheel from "@/app/ui/base/wheel";
import {useAppDispatch} from "@/app/lib/hooks/redux-hooks";
import {useEffect} from "react";
import {addBatch} from "@/app/lib/slices/participant-slice";

export default function PickerTab() {
    return <div title="بازی!">
        <div className="flex flex-dir w-full justify-evenly">
            <Wheel buttonText="حدس میزنه!"></Wheel>
            <Wheel buttonText="بازی می‌کنه!"></Wheel>
        </div>
    </div>
}