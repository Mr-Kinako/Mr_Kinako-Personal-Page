import type { PriorityConfig } from "./types";

export const DEFAULT_CONFIG: PriorityConfig = {
  awaitingWeight: 1.349,
  abandonedWeight: 0.95,
  abandonedProjectWeight: 1.15,
  highPriorityWeight: 1.45,
  mediumPriorityWeight: 0.75,
  lowPriorityWeight: 0.25,
  inProcessWeight: 0.65,
  completedWeight: 0.35,
  completedHighWeight: 0.7,
  completedMediumWeight: 0.45,
  abandonedHighAnomaly: 3.5,
  awaitingHighAnomaly: 2.0,
  abandonedMediumAnomaly: 0.5,
  longtimeMax: 30.0,
  longtimeWeight: 0.45,
  deadlineMax: 1.0,
  deadlineWeight: 6.0,
  moralMax: 1.0,
  moralFactorBase: 3.0,
  myselfPriceMax: 10.0,
  priorityMin: 1.0,
  priorityMax: 40.0,
  decayIntervalHours: 3,
  decayRatePerInterval: 0.08,
};

export const DB_NAME = "KinakoPriorityDB";
export const DB_VERSION = 1;
export const STORE_NAME = "priority";
export const DATA_KEY = "current";
export const ALGORITHM_VERSION = 1;
