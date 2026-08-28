import React, { useState, useRef, useEffect } from "react";
import { HistoryItem, WindowState } from "./types";
import { parseCommand } from "./core/parser";
import { executeCommand } from "./core/CommandExec";
import { useTranslation } from "@/i18n";
import styles from "./CommandLine.module.scss";

export const CommandLine: React.FC = () => {
  const [windowState, setWindowState] = useState<WindowState>({
    isOpen: true,
    isMinimized: false,
    isFullscreen: false,
  });

  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!windowState.isMinimized && windowState.isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, windowState.isMinimized, windowState.isOpen]);

  const handleClose = () => {
    setWindowState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleToggleMinimize = () => {
    setWindowState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = inputVal;
    if (!rawInput.trim()) return;

    setInputVal("");

    try {
      const parsed = parseCommand(rawInput);
      if (!parsed) return;

      if (parsed.name === "-clear") {
        setHistory([]);
        return;
      }

      const execResult = await executeCommand(parsed, t);

      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        command: rawInput,
        output: execResult.output,
        timestamp: new Date(),
        isError: !execResult.success,
      };

      setHistory((prev) => [...prev, newItem]);
    } catch (uiError) {
      console.error("[kinako.sh:ui] Ошибка обработки ввода:", uiError);
    }
  };

  if (!windowState.isOpen) return null;

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.header}>
        <div className={styles.title}>kinako.sh</div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleToggleMinimize}
            title={windowState.isMinimized ? t("commandLine.expand") : t("commandLine.minimize")}
          >
            {windowState.isMinimized ? "🗕" : "🗕"}
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.disabled}`}
            disabled
            title={t("commandLine.fullscreenUnavailable")}
          >
            🗖
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.closeBtn}`}
            onClick={handleClose}
            title={t("commandLine.close")}
          >
            ✕
          </button>
        </div>
      </div>

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

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <span className={styles.promptSymbol}>kinako.sh&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t("commandLine.placeholder")}
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};
