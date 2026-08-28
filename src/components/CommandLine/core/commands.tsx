import { CommandDefinition } from "./types";
import { executeHelp } from "../commands/help";
import { executeInfo } from "../commands/info";
import { executeClear } from "../commands/clear";
import { executeUpdate } from "../commands/update";
import { executeTheme } from "../commands/theme";

export const COMMANDS_REGISTRY: Record<string, CommandDefinition> = {
  "-help": {
    name: "-help",
    description: "Вывод информации о командах и описание",
    help: "-help\n-help <команда>\n\nПоказывает список команд или подробную справку.",
    execute: (args) => {
      const helpData = Object.values(COMMANDS_REGISTRY).map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        help: cmd.help,
      }));
      return executeHelp(helpData, args[0]);
    },
  },
  "-info": {
    name: "-info",
    description: "Информация о консоли kinako.sh и версия",
    help: "-info\n\nВыводит версию консоли и системную информацию.",
    execute: () => executeInfo(),
  },
  "-clear": {
    name: "-clear",
    description: "Очистка буфера вывода консоли",
    help: "-clear\n\nОчищает всю историю текущей сессии.",
    execute: () => executeClear(),
  },
  "-update": {
    name: "-update",
    description: "Информация о последнем обновлении",
    help: "-update\n\nПоказывает дату и описание последнего обновления.",
    execute: () => executeUpdate(),
  },
  "-theme": {
    name: "-theme",
    description: "Переключение и настройка цветовых тем",
    help: "-theme\n-theme list\n-theme <theme-name>\n\nСохраняет выбор в localStorage.",
    execute: (args) => executeTheme(args),
  },
};
