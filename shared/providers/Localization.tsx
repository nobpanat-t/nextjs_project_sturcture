"use client";
import { dictionaries, type Dictionary, type Language } from "@/core/i18n/dictionaries";
import { createContext, useContext, useState } from "react";


type LanguageContextType = {
    lang: Language;
    dict: Dictionary;
    setLang: (l: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLangState] = useState<Language>("th");

    const setLang = (l: Language) => {
        setLangState(l);
        localStorage.setItem("lang", l);
    };

    return (
        <LanguageContext.Provider value={{ lang, dict: dictionaries[lang], setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useTranslation must be used within LanguageProvider");
    return context;
};