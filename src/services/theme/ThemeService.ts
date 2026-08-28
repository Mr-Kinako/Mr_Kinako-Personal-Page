export type Theme =
  "dark" | "deep-teal" | "deep-violet" | "orange" | "red" | "green" | "mint" | "auto";

const THEMES: Theme[] = [
  "dark",
  "deep-teal",
  "deep-violet",
  "orange",
  "red",
  "green",
  "mint",
  "auto",
];
const STORAGE_KEY = "app-theme";
const DEFAULT_THEME: Theme = "dark";

const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  "deep-teal": "Deep Teal",
  "deep-violet": "Deep Violet",
  orange: "Orange",
  red: "Red",
  green: "Green",
  mint: "Mint",
  auto: "Auto",
};

export const ThemeService = {
  getAll(): readonly Theme[] {
    return THEMES;
  },

  getLabel(theme: Theme): string {
    return THEME_LABELS[theme];
  },

  getCurrent(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && THEMES.includes(saved)) return saved;
    return DEFAULT_THEME;
  },

  set(theme: Theme): void {
    if (!THEMES.includes(theme)) return;

    const html = document.documentElement;

    if (theme === "auto") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", theme);
    }

    localStorage.setItem(STORAGE_KEY, theme);
  },

  init(): void {
    this.set(this.getCurrent());
  },

  isValid(theme: string): theme is Theme {
    return THEMES.includes(theme as Theme);
  },
};
