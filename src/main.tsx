import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n/I18nProvider.tsx";
import { PriorityService } from "./services/priority/PriorityService.ts";
import { ThemeService } from "./services/theme/ThemeService.ts";
import { calculateRawStats } from "./pages/Goals/GoalsStats.ts";

import "@/styles/_variables.scss";
import "@/styles/_theme.scss";
import "./main.scss";
import App from "./App.tsx";

PriorityService.setStatsProvider(calculateRawStats);
ThemeService.init();

if (typeof window !== "undefined") {
  (window as any).forceUpdatePriority = async () => {
    await PriorityService.clear();
    const value = await PriorityService.forceRecalculate();
    console.log("[Priority] Recalculated: ", value);
  };
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
