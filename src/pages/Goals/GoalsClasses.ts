import s from "./Goals.module.scss";
import { constantPriorities, constantStatuses } from "./GoalsDataOriginal";

export const STATUS_CLASSES: Record<string, string> = {
  [constantStatuses.completed]: s.statusCompleted,
  [constantStatuses.inProcess]: s.statusInProcess,
  [constantStatuses.awaiting]: s.statusAwaiting,
  [constantStatuses.frozen]: s.statusFrozen,
  [constantStatuses.abandoned]: s.statusAbandoned,
};

export const PRIORITY_CLASSES: Record<string, string> = {
  [constantPriorities.high]: s.priorityHigh,
  [constantPriorities.medium]: s.priorityMedium,
  [constantPriorities.low]: s.priorityLow,
};
