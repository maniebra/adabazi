"use client"

import Wheel from "@/app/ui/base/wheel";
import {useAppDispatch} from "@/app/lib/hooks/redux-hooks";
import {useEffect} from "react";
import {addBatch} from "@/app/lib/slices/participant-slice";

export default function PickerTab() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(addBatch([
            { name: "Ali", score: 10, weight: 1 },
            { name: "Sara", score: 8, weight: 0.9 },
        ]));
    }, [dispatch]);

    return <div title="بازی!">
        <div className="flex flex-dir w-full justify-evenly">
            <Wheel buttonText="حدس میزنه!"></Wheel>
            <Wheel buttonText="بازی می‌کنه!"></Wheel>
        </div>
    </div>
}