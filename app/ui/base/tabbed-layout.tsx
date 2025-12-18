"use client";

import { Children, ReactNode, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface TabbedLayoutProps {
    children: ReactNode;
    titles: string[]; // Manually passed list of names
}

export default function TabbedLayout({ children, titles }: TabbedLayoutProps) {
    const [active, setActive] = useState(0);
    const [tabsVisible, setTabsVisible] = useState(true);

    // Convert children to an array so we can pick the active one by index
    const contentArray = Children.toArray(children);

    return (
        <div
            dir="rtl"
            className="relative flex h-full min-h-0 w-full flex-col"
        >
            {/* Tab Bar Container */}
            <AnimatePresence>
                {tabsVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pt-6">
                            <div
                                className="grid gap-1 rounded-2xl bg-slate-200/50 p-1.5 backdrop-blur-sm"
                                style={{
                                    gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))`,
                                }}
                            >
                                {titles.map((title, i) => {
                                    const isActive = i === active;
                                    return (
                                        <button
                                            key={title}
                                            onClick={() => setActive(i)}
                                            className={clsx(
                                                "relative flex items-center justify-center rounded-xl px-3 py-2.5 text-sm transition-colors focus:outline-none",
                                                isActive ? "text-indigo-700 font-bold" : "text-slate-500 hover:text-slate-700"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-xl bg-white shadow-sm"
                                                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                                                />
                                            )}
                                            <span className="relative z-10 truncate">{title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="relative flex-1 min-h-0 p-6">
                <div className="h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className="h-full overflow-auto p-6"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {/* Render the content corresponding to the active index */}
                            {contentArray[active]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
                <button
                    onClick={() => setTabsVisible((v) => !v)}
                    className={clsx(
                        "flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 text-white",
                        tabsVisible ? "bg-slate-800 hover:bg-slate-700" : "bg-indigo-600 hover:bg-indigo-500"
                    )}
                >
                    {tabsVisible ? (
                        <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            مخفی‌کردن منو
                        </>
                    ) : (
                        <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            نمایش منو
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
