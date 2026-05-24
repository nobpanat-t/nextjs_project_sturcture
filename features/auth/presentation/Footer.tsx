"use client"

import ChangeLanguageButton from "@/shared/components/ChangeLanguagButton"
import ChangeThemeButton from "@/shared/components/ChangeThemeButton"

export default function Footer() {
    return (
        <footer
            className="absolute bottom-4 right-4 grid grid-cols-2 gap-2"
        >
            <ChangeLanguageButton />
            <ChangeThemeButton />
        </footer>
    )
}