import { useState, useCallback, useEffect } from "react";
import { ThemeService, type Theme } from "./ThemeService";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => ThemeService.getCurrent());

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "app-theme" && e.newValue) {
        setThemeState(e.newValue as Theme);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    ThemeService.set(t);
    setThemeState(t);
  }, []);

  return { theme, setTheme, themes: ThemeService.getAll() };
}
