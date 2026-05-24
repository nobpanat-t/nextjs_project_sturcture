"use client"

import { MoonIcon, SunIcon } from "../icons";
import { useTheme } from "../providers/Theme";

export default function ChangeThemeButton() {
    const { toggleTheme, theme } = useTheme();
    return <button
        className={`
            bg-black
            text-white
            dark:bg-white/10
            p-3 rounded-full
        `}
        onClick={toggleTheme}
        aria-label="Toggle Theme Button"
    >
        {
            theme == "dark" && (
                <SunIcon />
            )
        }
        {
            theme == "light" && (
                <MoonIcon />
            )
        }

    </button>
}