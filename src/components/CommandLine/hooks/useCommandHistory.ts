import { useState, useEffect } from "react";
import { storage } from "@/utils/storage";

const HISTORY_KEY = "cmd_history";
const MAX_HISTORY = 50;

export const useCommandHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Загрузка из localStorage при маунте
  useEffect(() => {
    const saved = storage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const pushHistory = (cmd: string) => {
    if (!cmd.trim()) return;
    setHistory((prev) => {
      const updated = [cmd, ...prev.filter((c) => c !== cmd)].slice(0, MAX_HISTORY);
      storage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
    setHistoryIndex(-1); // Сбрасываем индекс при новой команде
  };

  const getPreviousCommand = (): string | null => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return history[newIndex];
    }
    return null;
  };

  const getNextCommand = (): string | null => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return history[newIndex];
    }
    if (historyIndex === 0) {
      setHistoryIndex(-1);
      return ""; // Очищаем поле ввода
    }
    return null;
  };

  return { pushHistory, getPreviousCommand, getNextCommand };
};
