import { ExecutionResult } from "../core/types";
import { ThemeService } from "@/services/theme";

export function executeTheme(args: string[]): ExecutionResult {
  const available = ThemeService.getAll();
  const current = ThemeService.getCurrent();
  const currentLabel = ThemeService.getLabel(current);

  if (args.length === 0) {
    return {
      success: true,
      output: [
        `Текущая тема: ${currentLabel} [${current}]`,
        `Доступные: ${available.join(", ")}`,
        `Использование: -theme <название>`,
      ].join("\n"),
    };
  }

  const arg = args[0].toLowerCase();

  if (arg === "list") {
    const list = available
      .map((t) => `  ${t === current ? "▸" : " "} ${ThemeService.getLabel(t)} [${t}]`)
      .join("\n");
    return { success: true, output: `Темы:\n${list}` };
  }

  if (!ThemeService.isValid(arg)) {
    return {
      success: false,
      output: `Неизвестная тема: "${arg}"\nДоступные: ${available.join(", ")}`,
    };
  }

  ThemeService.set(arg);
  return { success: true, output: `Тема изменена на: ${arg}` };
}
