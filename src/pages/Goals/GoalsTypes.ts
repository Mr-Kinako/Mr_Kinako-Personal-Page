export interface GoalStatItem {
  id: string;
  title: string;
  count: number;
}

export type goalStatCategory = Record<string, GoalStatItem>;

export interface GoalsItem {
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface ProjectData {
  title: string;
  description?: string;
  content?: Record<string, GoalsItem>;
}
