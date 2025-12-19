"use client";

import { Children, ReactNode, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface TabbedLayoutProps {
    children: ReactNode;
    titles: string[];
}

export default function TabbedLayout({ children, titles }: TabbedLayoutProps) {
    const [active, setActive] = useState(0);
    const [tabsVisible, setTabsVisible] = useState(true);

    const contentArray = Children.toArray(children);

    return (
        <div dir="rtl" className="relative flex h-full min-h-0 w-full flex-col  text-zinc-100">
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
                                className="grid gap-1 rounded-2xl bg-zinc-900/70 p-1.5 backdrop-blur-md border border-zinc-800"
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
                                                isActive
                                                    ? "text-emerald-300"
                                                    : "text-zinc-400 hover:text-red-300"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-xl bg-zinc-800/80 border border-emerald-500/40 shadow shadow-emerald-900/30"
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

            <div className="relative flex-1 min-h-0 p-6">
                <div className="h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-2xl shadow-black/40">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className="h-full overflow-auto p-6"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {contentArray[active]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
                <button
                    onClick={() => setTabsVisible((v) => !v)}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase transition-all active:scale-95
                               bg-zinc-900/80 backdrop-blur-md border border-red-500/40
                               text-red-300 hover:bg-red-500/20 hover:text-red-200"
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
