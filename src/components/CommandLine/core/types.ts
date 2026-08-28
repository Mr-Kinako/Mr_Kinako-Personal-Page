export interface ParsedCommand {
  /** Имя команды в нижнем регистре (например, "-help") */
  name: string;
  /** Массив аргументов после имени команды */
  args: string[];
  /** Исходный сырой ввод пользователя */
  raw: string;
}

export interface ExecutionResult {
  /** Успешно ли выполнена команда */
  success: boolean;
  /** Результат вывода: строка или JSX-элемент */
  output: React.ReactNode;
  /** Ошибка, если она возникла во время выполнения */
  error?: Error;
}

export type CommandHandler = (args: string[]) => ExecutionResult | Promise<ExecutionResult>;

export interface CommandDefinition {
  name: string;
  description: string;
  execute: CommandHandler;
}
