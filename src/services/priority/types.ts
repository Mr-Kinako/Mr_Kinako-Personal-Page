export interface PriorityConfig {
  awaitingWeight: number;
  abandonedWeight: number;
  abandonedProjectWeight: number;
  highPriorityWeight: number;
  mediumPriorityWeight: number;
  lowPriorityWeight: number;
  inProcessWeight: number;
  completedWeight: number;
  completedHighWeight: number;
  completedMediumWeight: number;
  abandonedHighAnomaly: number;
  awaitingHighAnomaly: number;
  abandonedMediumAnomaly: number;
  longtimeMax: number;
  longtimeWeight: number;
  deadlineMax: number;
  deadlineWeight: number;
  moralMax: number;
  moralFactorBase: number;
  myselfPriceMax: number;
  priorityMin: number;
  priorityMax: number;
  decayIntervalHours: number;
  decayRatePerInterval: number;
}

export interface RawStats {
  allProjectsCount: number;
  awaitingGoals: number;
  inProcessGoals: number;
  completedGoals: number;
  abandonedGoals: number;
  goalPriorityHigh: number;
  goalPriorityMedium: number;
  goalPriorityLow: number;
  abandonedHighGoals: number;
  awaitingHighGoals: number;
  abandonedMediumGoals: number;
  completedHighGoals: number;
  completedMediumGoals: number;
  totalActiveGoals: number;
}

export interface PriorityData {
  value: number;
  timestamp: number;
  version: number;
}

export type PriorityListener = (value: number) => void;
