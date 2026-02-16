"use client";
import { createContext, useContext, useState } from "react";

type StyleState = {
    theme: "light" | "dark";
    buttonStyle: string;
    borderRadius: string;
};

type StyleContextType = {
    styles: StyleState;
    setStyles: React.Dispatch<React.SetStateAction<StyleState>>;
};

const StyleContext = createContext<StyleContextType | null>(null);

export function StyleProvider({ children }: { children: React.ReactNode }) {
    const [styles, setStyles] = useState<StyleState>({
        theme: "light",
        buttonStyle: "primary",
        borderRadius: "8px",
    });

    return (
        <StyleContext.Provider value={{ styles, setStyles }
        }>
            {children}
        </StyleContext.Provider>
    );
}

export function useStyle() {
    const ctx = useContext(StyleContext);
    if (!ctx) throw new Error("useStyle must be used inside <StyleProvider>");
    return ctx;
}