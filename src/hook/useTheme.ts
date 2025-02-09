import { useEffect, useState } from "react";

export const useThemeDetector = () => {
    const [ isDarkTheme, setIsDarkTheme ] = useState<boolean | null>(null); // Initial null prevents mismatches.

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Detect the current theme on the client
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            setIsDarkTheme(darkThemeMq.matches);

            const mqListener = (e: MediaQueryListEvent) => {
                setIsDarkTheme(e.matches);
            };

            darkThemeMq.addEventListener("change", mqListener);
            return () => {
                darkThemeMq.removeEventListener("change", mqListener);
            };
        }
    }, []);

    return isDarkTheme;
};