import { ExecutionResult } from "../core/types";

export function executeClear(): ExecutionResult {
  console.log("[kinako.sh:cmd:clear] Выполнение команды -clear");

  try {
    return {
      success: true,
      output: null, // UI обработает этот вывод и очистит массив строк
    };
  } catch (error) {
    console.error("[kinako.sh:cmd:clear] Ошибка при вызове команды очистки:", error);
    return {
      success: false,
      output: "Ошибка: сбой при очистке консоли.",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
