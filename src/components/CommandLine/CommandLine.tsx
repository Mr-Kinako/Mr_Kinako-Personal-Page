import React, { useState, useRef, useEffect } from "react";
import { HistoryItem, WindowState } from "./types";
import { parseCommand } from "./core/parser";
import { executeCommand } from "./core/CommandExec";
import styles from "./CommandLine.module.scss";

export const CommandLine: React.FC = () => {
  const [windowState, setWindowState] = useState<WindowState>({
    isOpen: true,
    isMinimized: false,
    isFullscreen: false,
  });

  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл вниз при добавлении новых записей
  useEffect(() => {
    if (!windowState.isMinimized && windowState.isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, windowState.isMinimized, windowState.isOpen]);

  const handleClose = () => {
    // console.log("[kinako.sh:ui] Закрытие консоли.");
    setWindowState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleToggleMinimize = () => {
    // console.log("[kinako.sh:ui] Переключение сворачивания консоли.");
    setWindowState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = inputVal;
    if (!rawInput.trim()) return;

    setInputVal("");
    console.log("[kinako.sh:ui] Ввод пользователя:", rawInput);

    try {
      const parsed = parseCommand(rawInput);

      if (!parsed) {
        return;
      }

      // Специальная обработка команды -clear на уровне React-состояния
      if (parsed.name === "-clear") {
        console.log("[kinako.sh:ui] Выполнение очистки буфера истории");
        setHistory([]);
        return;
      }

      const execResult = await executeCommand(parsed);

      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        command: rawInput,
        output: execResult.output,
        timestamp: new Date(),
        isError: !execResult.success,
      };

      setHistory((prev) => [...prev, newItem]);
    } catch (uiError) {
      console.error("[kinako.sh:ui] Ошибка верхнего уровня при обработке ввода:", uiError);
    }
  };

  if (!windowState.isOpen) {
    return null;
  }

  return (
    <div className={styles.terminalContainer}>
      {/* Шапка окна */}
      <div className={styles.header}>
        <div className={styles.title}>kinako.sh</div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleToggleMinimize}
            title={windowState.isMinimized ? "Развернуть" : "Свернуть"}
          >
            {windowState.isMinimized ? "🗕" : "🗕"}
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.disabled}`}
            disabled
            title="Полноэкранный режим недоступен (ожидает реализации перемещения)"
          >
            🗖
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.closeBtn}`}
            onClick={handleClose}
            title="Закрыть"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Тело терминала */}
      {!windowState.isMinimized && (
        <div className={styles.body} onClick={() => inputRef.current?.focus()}>
          <div className={styles.historyList}>
            {history.map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.promptLine}>
                  <span className={styles.promptSymbol}>kinako.sh&gt;</span>
                  <span className={styles.commandText}>{item.command}</span>
                </div>
                {item.output && (
                  <div className={`${styles.outputLine} ${item.isError ? styles.errorOutput : ""}`}>
                    {item.output}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Строка ввода */}
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <span className={styles.promptSymbol}>kinako.sh&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Введите команду (-help)..."
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};
