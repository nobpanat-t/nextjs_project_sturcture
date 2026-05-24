"use client"

import { MoonIcon, SunIcon } from "../icons";
import { useTranslation } from "../providers/Localization";
import { useTheme } from "../providers/Theme";

export default function ChangeLanguageButton() {
    const { setLang, lang } = useTranslation();
    return <button
        className={`
            bg-black
            text-white
            dark:bg-white/10
            p-3 rounded-full
        `}
        onClick={() => {
            const newLang = lang === "en" ? "th" : "en";
            setLang(newLang);
        }}
        aria-label="Toggle Theme Button"
    >
        {
            lang === "th" && (
                <span>EN</span>
            )
        }
        {
            lang === "en" && (
                <span>TH</span>
            )
        }

    </button>
}