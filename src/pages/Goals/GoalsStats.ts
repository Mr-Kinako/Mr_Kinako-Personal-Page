import { GoalsData, constantPriorities, constantStatuses } from "./GoalsDataOriginal";
import type { RawStats } from "@/services/priority/types";

export function calculateRawStats(): RawStats {
  const allProjectsList = Object.values(GoalsData);
  const allGoals = allProjectsList.flatMap((proj) => Object.values(proj.content || {}));

  const awaitingGoals = allGoals.filter((g) => g.status === constantStatuses.awaiting).length;
  const inProcessGoals = allGoals.filter((g) => g.status === constantStatuses.inProcess).length;
  const completedGoals = allGoals.filter((g) => g.status === constantStatuses.completed).length;
  const abandonedGoals = allGoals.filter((g) => g.status === constantStatuses.abandoned).length;

  const goalPriorityHigh = allGoals.filter((g) => g.priority === constantPriorities.high).length;
  const goalPriorityMedium = allGoals.filter(
    (g) => g.priority === constantPriorities.medium,
  ).length;
  const goalPriorityLow = allGoals.filter((g) => g.priority === constantPriorities.low).length;

  const abandonedHighGoals = allGoals.filter(
    (g) => g.status === constantStatuses.abandoned && g.priority === constantPriorities.high,
  ).length;
  const awaitingHighGoals = allGoals.filter(
    (g) => g.status === constantStatuses.awaiting && g.priority === constantPriorities.high,
  ).length;
  const abandonedMediumGoals = allGoals.filter(
    (g) => g.status === constantStatuses.abandoned && g.priority === constantPriorities.medium,
  ).length;

  const completedHighGoals = allGoals.filter(
    (g) => g.status === constantStatuses.completed && g.priority === constantPriorities.high,
  ).length;
  const completedMediumGoals = allGoals.filter(
    (g) => g.status === constantStatuses.completed && g.priority === constantPriorities.medium,
  ).length;

  return {
    allProjectsCount: allProjectsList.length,
    awaitingGoals,
    inProcessGoals,
    completedGoals,
    abandonedGoals,
    goalPriorityHigh,
    goalPriorityMedium,
    goalPriorityLow,
    abandonedHighGoals,
    awaitingHighGoals,
    abandonedMediumGoals,
    completedHighGoals,
    completedMediumGoals,
    totalActiveGoals: awaitingGoals + inProcessGoals + abandonedGoals,
  };
}

export function calculateAbandonedProjectsCount(allProjectsCount: number): number {
  return allProjectsCount > 0 ? Math.max(0, allProjectsCount - 1) : 0;
}
