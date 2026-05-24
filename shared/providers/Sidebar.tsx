"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import SideBarLayout from "../layout/Sidebar";

type SideBarValue = "show" | "hidden";

type SideBarContextType = {
    sidebar: SideBarValue;
    toggleSidebar: () => void;
};

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    const [sidebar, setSidebar] = useState<SideBarValue>("hidden");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("sidebar") as SideBarValue | null;
        const initialTheme = savedTheme || "show";

        setSidebar(initialTheme);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("sidebar", sidebar);

        }
    }, [sidebar, isInitialized]);

    const toggleSidebar = () => {
        setSidebar((prev) => (prev === "show" ? "hidden" : "show"));
    };
    return (

        <SideBarContext.Provider value={{ sidebar, toggleSidebar }}>
            <SideBarLayout>{children}</SideBarLayout>
        </SideBarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SideBarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SideBarProvider");
    }
    return context;
};
