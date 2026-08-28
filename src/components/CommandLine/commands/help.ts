import { ExecutionResult } from "../core/types";

export interface CommandHelpInfo {
  name: string;
  description: string;
  help?: string;
}

/** Рисует рамку вокруг строк с автоматической шириной */
function box(lines: string[], title?: string): string {
  const contentWidth = Math.max(title ? title.length : 0, ...lines.map((l) => l.length));
  const inner = contentWidth + 2; // 1 пробел слева + 1 справа

  const top = `╔${"═".repeat(inner)}╗`;
  const sep = `╠${"═".repeat(inner)}╣`;
  const bottom = `╚${"═".repeat(inner)}╝`;

  const out: string[] = [top];

  if (title) {
    const pad = inner - title.length;
    const left = Math.floor(pad / 2);
    const right = pad - left;
    out.push(`║${" ".repeat(left)}${title}${" ".repeat(right)}║`);
    out.push(sep);
  }

  for (const line of lines) {
    const pad = inner - line.length - 2; // вычитаем 2 боковых пробела
    out.push(`║ ${line}${" ".repeat(Math.max(0, pad))} ║`);
  }

  out.push(bottom);
  return out.join("\n");
}

export function executeHelp(commandsList: CommandHelpInfo[], target?: string): ExecutionResult {
  try {
    // === Детальная справка по одной команде ===
    if (target && target !== "-help") {
      const cmd = commandsList.find((c) => c.name === target);
      if (!cmd) {
        return { success: false, output: `Команда "${target}" не найдена.` };
      }

      const lines: string[] = [cmd.name, "", cmd.description];

      if (cmd.help) {
        lines.push("", "Использование:");
        cmd.help.split("\n").forEach((h) => lines.push(`  ${h}`));
      }

      return {
        success: true,
        output: box(lines, "Справка"),
      };
    }

    // === Общий список ===
    const maxNameLen = Math.max(...commandsList.map((c) => c.name.length));
    const listLines = commandsList.map(
      (cmd) => `${cmd.name.padEnd(maxNameLen)} — ${cmd.description}`,
    );

    return {
      success: true,
      output: [
        box(listLines, "Доступные команды kinako.sh"),
        "",
        "Используйте: -help <команда>  или  <команда> -h",
      ].join("\n"),
    };
  } catch (error) {
    return {
      success: false,
      output: "Ошибка: не удалось сформировать справку.",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
