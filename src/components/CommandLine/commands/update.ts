import { ExecutionResult } from "../core/types";

const LAST_UPDATE_DATE = "2026-08-08";

export function executeUpdate(): ExecutionResult {
  console.log("[kinako.sh:cmd:update] Выполнение команды -update");

  try {
    const updateInfo = `Последнее обновление системы kinako.sh: ${LAST_UPDATE_DATE}`;

    console.log("[kinako.sh:cmd:update] Дата обновления успешно отправлена в вывод");
    return {
      success: true,
      output: updateInfo,
    };
  } catch (error) {
    console.error("[kinako.sh:cmd:update] Ошибка при получении информации об обновлении:", error);
    return {
      success: false,
      output: "Ошибка: не удалось получить данные об обновлениях.",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
