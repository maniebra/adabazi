import TabbedLayout from "@/app/ui/base/tabbed-layout";
import PickerTab from "@/app/ui/widgets/picker-tab";
import SettingsTab from "@/app/ui/widgets/settings-tab";
import Timer from "@/app/ui/base/timer";
import LeaderboardTable from "@/app/ui/base/leaderboard-table";


export default function Home() {
    return (
        <main className="h-[100vh] w-full flex flex-row  bg-slate-50">
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
    );
}
