"use client"

import TabbedLayout from "@/app/ui/base/tabbed-layout";
import PickerTab from "@/app/ui/layouts/picker-tab";
import SettingsTab from "@/app/ui/layouts/settings-tab";
import Timer from "@/app/ui/base/timer";
import LeaderboardTable from "@/app/ui/sections/leaderboard-table";
import {useAppSelector} from "@/app/hooks/redux-hooks";

function SimpleMode() {
    return  <main className="h-[100vh] w-full ">
        <section className="w-full h-2/3">
            <TabbedLayout titles={["بازی!", "تنظیمات"]}>
                <PickerTab/>
                <SettingsTab/>
            </TabbedLayout>
        </section>
        <section className="h-1/3 w-full">
            <Timer/>
        </section>
    </main>
}

function AdvancedMode() {
    return <main className="h-[100vh] w-full flex flex-row  ">
        <section className="w-2/3 h-full">
            <TabbedLayout titles={["بازی!", "تنظیمات"]}>
                <PickerTab/>
                <SettingsTab/>
            </TabbedLayout>
        </section>
        <section className="w-1/3 h-full">
            <Timer/>
            <LeaderboardTable/>
        </section>
    </main>
}

export default function Home() {
    const simpleMode = useAppSelector(
        state => state.gameConfig.simpleMode
    )


    return (simpleMode) ? <SimpleMode /> : <AdvancedMode />
}
