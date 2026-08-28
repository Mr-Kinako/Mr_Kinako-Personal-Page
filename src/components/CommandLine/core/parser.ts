import { ParsedCommand } from "./types";

/**
 * Безопасно парсит введенную пользователем строку.
 * @param input Строка ввода из терминала
 * @returns ParsedCommand или null, если строка пустая/невалидная
 */
export function parseCommand(input: string): ParsedCommand | null {
  console.log("[kinako.sh:parser] Начало разбора ввода:", JSON.stringify(input));

  try {
    const trimmed = input.trim();

    if (!trimmed) {
      console.log("[kinako.sh:parser] Введена пустая строка, пропуск.");
      return null;
    }

    // Разбиваем строку по пробелам, игнорируя дублирующиеся пробелы
    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const result: ParsedCommand = {
      name: commandName,
      args,
      raw: input,
    };

    console.log("[kinako.sh:parser] Успешно распаршено:", result);
    return result;
  } catch (error) {
    console.error("[kinako.sh:parser] Критическая ошибка при парсинге ввода:", error);
    return null;
  }
}
