import { ExecutionResult } from "../core/types";

const CLI_VERSION = "v0.1.0-alpha";
const CLI_DESCRIPTION = "kinako.sh — модульный эмулятор веб-терминала с подсистемой VFS.";

export function executeInfo(): ExecutionResult {
  console.log("[kinako.sh:cmd:info] Выполнение команды -info");

  try {
    const infoMessage = `${CLI_DESCRIPTION}\nВерсия: ${CLI_VERSION}\nСтатус: В активной разработке.`;

    console.log("[kinako.sh:cmd:info] Информация успешно получена");
    return {
      success: true,
      output: infoMessage,
    };
  } catch (error) {
    console.error("[kinako.sh:cmd:info] Сбой при получении информации о системе:", error);
    return {
      success: false,
      output: "Ошибка: не удалось получить системную информацию.",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
