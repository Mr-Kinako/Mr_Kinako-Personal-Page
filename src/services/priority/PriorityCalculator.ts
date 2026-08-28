import type { PriorityConfig, RawStats } from "./types";
import { DEFAULT_CONFIG } from "./constants";
import { calculateAbandonedProjectsCount } from "@/pages/Goals/GoalsStats";

export function calculatePriority(
  stats: RawStats,
  config: PriorityConfig = DEFAULT_CONFIG,
  decayHours: number = 0,
): number {
  const abandonedProjectsCount = calculateAbandonedProjectsCount(stats.allProjectsCount);

  const backlogScore =
    stats.awaitingGoals * config.awaitingWeight +
    stats.abandonedGoals * config.abandonedWeight +
    abandonedProjectsCount * config.abandonedProjectWeight;

  const priorityImpact =
    stats.goalPriorityHigh * config.highPriorityWeight +
    stats.goalPriorityMedium * config.mediumPriorityWeight +
    stats.goalPriorityLow * config.lowPriorityWeight;

  const activeMomentum =
    stats.inProcessGoals * config.inProcessWeight +
    (stats.completedGoals * config.completedWeight +
      (stats.completedHighGoals * config.completedHighWeight +
        stats.completedMediumGoals * config.completedMediumWeight));

  const criticalAnomalies =
    stats.abandonedHighGoals * config.abandonedHighAnomaly +
    stats.awaitingHighGoals * config.awaitingHighAnomaly;

  const importantAnomalies = stats.abandonedMediumGoals * config.abandonedMediumAnomaly;

  // Abstraction parameters (hardcoded for now, can be configurable later)
  const rawLongtime = 1.0;
  const rawDeadline = 0.0;
  const rawMoral = 0.537;
  const rawMyselfPrice = 6.9;

  const longtime = Math.min(config.longtimeMax, Math.max(0.0, rawLongtime));
  const deadline = Math.min(config.deadlineMax, Math.max(0.0, rawDeadline));
  const moral = Math.min(config.moralMax, Math.max(0.0, rawMoral));
  const myselfPrice = Math.min(config.myselfPriceMax, Math.max(0.0, rawMyselfPrice));

  const longtimeWeight = longtime * config.longtimeWeight;
  const deadlineWeight = deadline * config.deadlineWeight;
  const moralFactor = (1.0 - moral) * config.moralFactorBase;

  const stagnationScore =
    backlogScore +
    priorityImpact -
    activeMomentum +
    criticalAnomalies +
    importantAnomalies +
    longtimeWeight +
    deadlineWeight +
    moralFactor +
    myselfPrice;

  let rawPriority = Math.min(
    config.priorityMax,
    Math.max(config.priorityMin, config.priorityMax - stagnationScore),
  );

  // Time decay: priority slowly increases (worsens) over time if no completed tasks
  // Ignores abandoned/frozen projects implicitly because they don't contribute to completedGoals
  if (decayHours > 0 && stats.completedGoals === 0) {
    const intervals = decayHours / config.decayIntervalHours;
    rawPriority += intervals * config.decayRatePerInterval;
    rawPriority = Math.min(config.priorityMax, rawPriority);
  }

  return parseFloat(rawPriority.toFixed(3));
}
