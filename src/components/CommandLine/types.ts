import React from "react";

export interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: Date;
  isError?: boolean;
}

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean; // Временно заблокировано функционально
}
