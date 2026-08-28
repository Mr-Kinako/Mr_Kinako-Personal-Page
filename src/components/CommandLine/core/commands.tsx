import { CommandDefinition } from "./types";
import { executeHelp } from "../commands/help";
import { executeInfo } from "../commands/info";
import { executeClear } from "../commands/clear";
import { executeUpdate } from "../commands/update";
import { executeTheme } from "../commands/theme";

/** Реестр всех зарегистрированных команд kinako.sh */
export const COMMANDS_REGISTRY: Record<string, CommandDefinition> = {
  "-help": {
    name: "-help",
    description: "Вывод информации о командах и описание",
    execute: () => {
      // Собираем массив команд для генерации справки
      const helpData = Object.values(COMMANDS_REGISTRY).map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
      }));
      return executeHelp(helpData);
    },
  },
  "-info": {
    name: "-info",
    description: "Информация о консоли kinako.sh и версия",
    execute: () => executeInfo(),
  },
  "-clear": {
    name: "-clear",
    description: "Очистка буфера вывода консоли",
    execute: () => executeClear(),
  },
  "-update": {
    name: "-update",
    description: "Информация о последнем обновлении",
    execute: () => executeUpdate(),
  },
  "-theme": {
    name: "-theme",
    description: "Переключение и настройка цветовых тем",
    execute: (args) => executeTheme(args),
  },
};
