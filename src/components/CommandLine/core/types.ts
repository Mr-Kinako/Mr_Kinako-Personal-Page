export interface ParsedCommand {
  name: string;
  args: string[];
  raw: string;
}

export interface ExecutionResult {
  success: boolean;
  output: React.ReactNode;
  error?: Error;
}

export type CommandHandler = (args: string[]) => ExecutionResult | Promise<ExecutionResult>;

export interface CommandDefinition {
  name: string;
  description: string;
  help?: string;
  execute: CommandHandler;
}
