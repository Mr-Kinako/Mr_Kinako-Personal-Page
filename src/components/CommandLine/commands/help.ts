import { ExecutionResult } from "../core/types";

export interface CommandHelpInfo {
  name: string;
  description: string;
}

export function executeHelp(commandsList: CommandHelpInfo[]): ExecutionResult {
  console.log("[kinako.sh:cmd:help] Выполнение команды -help");

  try {
    const formattedHelp = commandsList
      .map((cmd) => `${cmd.name.padEnd(12, " ")} — ${cmd.description}`)
      .join("\n");

    const outputText = `Доступные команды kinako.sh:\n\n${formattedHelp}`;

    console.log("[kinako.sh:cmd:help] Список команд успешно сформирован");
    return {
      success: true,
      output: outputText,
    };
  } catch (error) {
    console.error("[kinako.sh:cmd:help] Ошибка при формировании справочной информации:", error);
    return {
      success: false,
      output: "Ошибка: не удалось сформировать справку по командам.",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
