import { ParsedCommand, ExecutionResult } from './types';
import { COMMANDS_REGISTRY } from './commands';

/**
 * Главный диспетчер выполнения команд.
 * Гарантирует отказоустойчивость: перехватывает любые runtime-ошибки внутри команд.
 */
export async function executeCommand(
  parsed: ParsedCommand,
  t: (key: string, vars?: Record<string, string | number>) => string
): Promise<ExecutionResult> {
  const startTime = performance.now();
  console.log(`[kinako.sh:exec] Старт выполнения команды: "${parsed.name}"`, {
    args: parsed.args,
    raw: parsed.raw,
  });

  try {
    const commandDef = COMMANDS_REGISTRY[parsed.name];

    if (!commandDef) {
      console.warn(`[kinako.sh:exec] Команда "${parsed.name}" не найдена в реестре.`);
      return {
        success: false,
        output: t("commandLine.unknown", { command: parsed.name }),
      };
    }

    // Выполняем логику команды (поддерживает как синхронный, так и async вызов)
    const result = await Promise.resolve(commandDef.execute(parsed.args));

    console.log(`[kinako.sh:exec] Команда "${parsed.name}" успешно завершена.`, result);
    return result;

  } catch (criticalError) {
    // Верхнеуровневый перехват: если в самом коде команды произошла необработанная ошибка
    console.error(
      `[kinako.sh:exec] КРИТИЧЕСКИЙ СБОЙ при исполнении "${parsed.name}":`,
      criticalError
    );

    const errInstance = criticalError instanceof Error
      ? criticalError
      : new Error(String(criticalError));

    return {
      success: false,
      output: t("commandLine.systemError", { command: parsed.name }),
      error: errInstance,
    };
  } finally {
    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`[kinako.sh:exec] Завершение цикла обработки "${parsed.name}" (${duration}ms)`);
  }
}
