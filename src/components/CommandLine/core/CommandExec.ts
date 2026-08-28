import { ParsedCommand, ExecutionResult } from "./types";
import { COMMANDS_REGISTRY } from "./commands";

export async function executeCommand(
  parsed: ParsedCommand,
  t: (key: string, vars?: Record<string, string | number>) => string,
): Promise<ExecutionResult> {
  const startTime = performance.now();
  console.log(`[kinako.sh:exec] Старт: "${parsed.name}"`, { args: parsed.args, raw: parsed.raw });

  try {
    // ← Универсальный -h / --help для ЛЮБОЙ команды
    if (parsed.args.includes("-h") || parsed.args.includes("--help")) {
      const helpData = Object.values(COMMANDS_REGISTRY).map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        help: cmd.help,
      }));
      return executeHelp(helpData, parsed.name);
    }

    const commandDef = COMMANDS_REGISTRY[parsed.name];

    if (!commandDef) {
      console.warn(`[kinako.sh:exec] Команда "${parsed.name}" не найдена.`);
      return {
        success: false,
        output: t("commandLine.unknown", { command: parsed.name }),
      };
    }

    const result = await Promise.resolve(commandDef.execute(parsed.args));
    console.log(`[kinako.sh:exec] Успех: "${parsed.name}"`, result);
    return result;
  } catch (criticalError) {
    console.error(`[kinako.sh:exec] СБОЙ "${parsed.name}":`, criticalError);
    const errInstance =
      criticalError instanceof Error ? criticalError : new Error(String(criticalError));

    return {
      success: false,
      output: t("commandLine.systemError", { command: parsed.name }),
      error: errInstance,
    };
  } finally {
    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`[kinako.sh:exec] Завершение "${parsed.name}" (${duration}ms)`);
  }
}

// Локальный импорт executeHelp чтобы избежать цикла
import { executeHelp } from "../commands/help";
