import { GoalsData, constantPriorities, constantStatuses } from "./GoalsData";
import { goalStatCategory } from "./GoalsTypes";
import s from "./Goals.module.scss";

export const STATUS_CLASSES: Record<string, string> = {
   [constantStatuses.completed]: s.statusCompleted,
   [constantStatuses.inProcess]: s.statusInProcess,
   [constantStatuses.awaiting]: s.statusAwaiting,
   [constantStatuses.frozen]: s.statusFrozen,
   [constantStatuses.abandoned]: s.statusAbandoned,
}
export const PRIORITY_CLASSES: Record<string, string> = {
   [constantPriorities.high]: s.priorityHigh,
   [constantPriorities.medium]: s.priorityMedium,
   [constantPriorities.low]: s.priorityLow,
}

export const calculateAllProjectStats = () => {
   const allProjectsList = Object.values(GoalsData);
   const allGoals = allProjectsList.flatMap((proj) => Object.values(proj.content || {}));

   const awaitingGoals = allGoals.filter(g => g.status === constantStatuses.awaiting).length;
   const inProcessGoals = allGoals.filter(g => g.status === constantStatuses.inProcess).length;
   const completedGoals = allGoals.filter(g => g.status === constantStatuses.completed).length;
   const abandonedGoals = allGoals.filter(g => g.status === constantStatuses.abandoned).length;

   const goalPriorityHigh = allGoals.filter(g => g.priority === constantPriorities.high).length;
   const goalPriorityMedium = allGoals.filter(g => g.priority === constantPriorities.medium).length;
   const goalPriorityLow = allGoals.filter(g => g.priority === constantPriorities.low).length;


   const abandonedHighGoals = allGoals.filter(
      g => g.status === constantStatuses.abandoned && g.priority === constantPriorities.high
   ).length;
   const awaitingHighGoals = allGoals.filter(
      g => g.status === constantStatuses.awaiting && g.priority === constantPriorities.high
   ).length;
   const abandonedMediumGoals = allGoals.filter(
      g => g.status === constantStatuses.abandoned && g.priority === constantPriorities.medium
   ).length;

   const completedHighGoals = allGoals.filter(
      g => g.status === constantStatuses.completed && g.priority === constantPriorities.high
   ).length;
   const completedMediumGoals = allGoals.filter(
      g => g.status === constantStatuses.completed && g.priority === constantPriorities.medium
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
};

const PRIORITY_STORAGE_KEY = "currentPriorityData";
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
// const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

interface StoredPriority {
   value: number;
   timestamp: number;
}

export const getGoalsStatsList = (): goalStatCategory => {
   const stats =  calculateAllProjectStats();
   let abandonedProjectsCount: number;
   if (stats.allProjectsCount > 0) {
      abandonedProjectsCount = Math.max(0, stats.allProjectsCount - 1);
   } else {
      abandonedProjectsCount = stats.allProjectsCount;
   }

   let workPriority: number | null = null;
   const savedData = localStorage.getItem(PRIORITY_STORAGE_KEY);

   if (savedData) {
      try {
         const parsed: StoredPriority = JSON.parse(savedData);
         const isExpired = Date.now() - parsed.timestamp > TWENTY_FOUR_HOURS_MS;

         if (!isExpired && typeof parsed.value === "number") {
            workPriority = parsed.value;
         }
      } catch {
         localStorage.removeItem(PRIORITY_STORAGE_KEY);
      }
   }

   if (workPriority === null) {
      const backlogScore = (stats.awaitingGoals * 1.349) + (stats.abandonedGoals * 0.95) + (abandonedProjectsCount * 1.15);
      console.log("backlogScore: " + backlogScore.toFixed(3));

      const priorityImpact = (stats.goalPriorityHigh * 1.45) + (stats.goalPriorityMedium * 0.75) + (stats.goalPriorityLow * 0.25);
      console.log("priorityImpact: " + priorityImpact.toFixed(3));

      const activeMomentum = (stats.inProcessGoals * 0.65) + ((stats.completedGoals * 0.35) + ((stats.completedHighGoals * 0.70) + (stats.completedMediumGoals * 0.45)));
      console.log("activeMomentum: " + activeMomentum.toFixed(3));

      const criticalAnomalies = (stats.abandonedHighGoals * 3.50) + (stats.awaitingHighGoals * 2.00);
      console.log("criticalAnomalies: " + criticalAnomalies.toFixed(3));
      const importantAnomalies = (stats.abandonedMediumGoals * 0.5);
      console.log("importantAnomalies: " + importantAnomalies.toFixed(3));

      const rawLongtime = 1.0;
      const rawDeadline = 0.0;
      const rawMoral = 0.537;
      const rawMyselfPrice = 6.9;
      // ----------
      const longtime = Math.min(30.0, Math.max(0.0, rawLongtime));
      const deadline = Math.min(1.0, Math.max(0.0, rawDeadline));
      const moral = Math.min(1.0, Math.max(0.0, rawMoral));
      const myselfPrice = Math.min(10.0, Math.max(0.0, rawMyselfPrice));

      const longtimeWeight = longtime * 0.45;
      const deadlineWeight = deadline * 6.0;
      const moralFactor = (1.0 - moral) * 3.0;
      console.log("longtimeWeight: " + longtimeWeight.toFixed(3));
      console.log("deadlineWeight: " + deadlineWeight.toFixed(3));
      console.log("moralFactor: " + moralFactor.toFixed(3));

      const stagnationScore = (backlogScore + priorityImpact - activeMomentum)
         + criticalAnomalies + importantAnomalies +
         + longtimeWeight + deadlineWeight
         + moralFactor + myselfPrice;
      console.log("stagnationScore: " + stagnationScore.toFixed(3));

      const rawPriority = Math.min(40.0, Math.max(1.0, 40.0 - stagnationScore));
      workPriority = parseFloat(rawPriority.toFixed(3));
      console.log("calculatedPriority: " + workPriority.toFixed(3));

      localStorage.setItem(
         PRIORITY_STORAGE_KEY,
         JSON.stringify({ value: workPriority, timestamp: Date.now() })
      )
      console.log(localStorage.getItem(PRIORITY_STORAGE_KEY));
   }

   return {
      "all-projects": {
         id: "all-projects",
         title: "Всего кол-во проектов",
         count: stats.allProjectsCount,
      },
      "abandoned-projects": {
         id: "abandoned-projects",
         title: "Временно заброшенные проекты",
         count: abandonedProjectsCount,
      },
      "work-priority": {
         id: "work-priority",
         title: "Приоритет работы (повышается в случае простоя)",
         count: workPriority,
      },
      "all-goals": {
         id: "all-goals",
         title: "Всего целей (за исключением выполненных)",
         count: stats.totalActiveGoals,
      },
      "in-process-goals": {
         id: "in-process-goals",
         title: "Цели в процессе",
         count: stats.inProcessGoals,
      },
      "awaiting-goals": {
         id: "awaiting-goals",
         title: "Ожидают цели",
         count: stats.awaitingGoals,
      },
      "completed-goals": {
         id: "completed-goals",
         title: "Выполненные цели",
         count: stats.completedGoals,
      },
      "abandoned-goals": {
         id: "abandoned-goals",
         title: "Заброшенные цели",
         count: stats.abandonedGoals,
      },
   };
};

if (typeof window !== "undefined") {
   (window as any).forceUpdatePriority = () => {
      const checkStorage = localStorage.getItem(PRIORITY_STORAGE_KEY);
      console.log(checkStorage?.toString());

      if (checkStorage) localStorage.removeItem(PRIORITY_STORAGE_KEY);

      getGoalsStatsList();
      console.log("Приоритет успешно пересчитан. Перезагрузите страницу для обновления.");
   }
}
