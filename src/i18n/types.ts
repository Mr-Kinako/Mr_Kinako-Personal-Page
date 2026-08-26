export interface TranslationSchema {
  nav: {
    home: string;
    media: string;
    goals: string;
  };
  home: {
    welcome: string;
    aboutMeButton: string;
  };
  aboutMe: {
    header: string;
    hello: string;
    names: string;
    moreInfo: string;
    spoiler: string;
  };
  media: {
  title: string;
  }
  goals: {
    title: string;
    description: string;
    loading: string;
    goalsCount: string;
    emptyTask: string;
    emptyProject: string;
    loadMore: string;
    priorityModalTitle: string;
    priorityModal: {
      range: string;
      backlogScore: string;
      criticalAnomalies: string;
      abstractionParams: string;
      updateNote: string;
    };
    stats: {
      "all-projects": string;
      "abandoned-projects": string;
      "work-priority": string;
      "all-goals": string;
      "in-process-goals": string;
      "awaiting-goals": string;
      "completed-goals": string;
      "abandoned-goals": string;
    };
    status: {
      completed: string;
      inProcess: string;
      awaiting: string;
      frozen: string;
      abandoned: string;
    };
    priority: {
      high: string;
      medium: string;
      low: string;
    };
  };
  commandLine: {
    placeholder: string;
    expand: string;
    minimize: string;
    fullscreenUnavailable: string;
    close: string;
    unknown: string;
    systemError: string;
  };
  commands: {
    help: { description: string };
    info: { description: string };
    clear: { description: string };
    update: { description: string };
    theme: { description: string };
  };
  footer: {
    license: string;
    sourceCode: string;
    madeWith: string;
  };
  language: {
    ru: string;
    en: string;
  };
}

export interface ProjectTranslations {
  title: string;
  description: string;
  tasks: Record<string, { title: string; description: string }>;
}

export type Locale = "ru" | "en";
