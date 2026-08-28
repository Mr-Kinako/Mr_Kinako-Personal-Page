import type { TranslationSchema } from "../types";

export const en = {
  nav: {
    home: "Home",
    media: "Media",
    goals: "Goals",
  },
  home: {
    welcome: "Welcome to my personal space.",
    aboutMeButton: "About Me",
  },
  aboutMe: {
    header: "A little bit about me",
    hello: "I'm Mr. Kinako, or just Kinako.",
    names: "You can also call me: Kino, Kina, Kinak, Little Fox.",
    moreInfo:
      "I mostly love playing games and watching YouTube. And also listening to music, or rather I adore it. I don't really do much in life yet, just a little interested in programming, already have some understanding of it.",
    spoiler: "My heart is currently occupied by only one person.",
  },
  media: {
    title: "Media Gallery",
  },
  goals: {
    title: "My recorded goals",
    description:
      "Here is a general summary of data, in the form of the quantity of something specific.",
    loading: "Loading goals...",
    goalsCount: "goals",
    emptyTask: "A task exists, but its main fields are missing.",
    emptyProject: "Tasks for this project have not yet been formed.",
    loadMore: "Show more projects [{{count}}]",
    priorityModalTitle: "Work Priority System",
    priorityModal: {
      range: "Priority is in a strict range from 1.000 (high) to 40.000 (low).",
      backlogScore: "Backlog Score: Accounts for abandoned and pending tasks.",
      criticalAnomalies:
        "Critical Anomalies: Abandoned tasks with high/medium priority strongly lower the number.",
      abstractionParams: "Abstraction parameters: longtime, deadline, moral and myself price.",
      storage: "Storage: IndexedDB — data persists even if browser cache is cleared.",
      autoUpdate: "Auto-update: recalculated every 3 hours + manual reset via console.",
      decay: "Decay: priority slowly increases when no tasks are completed.",
      versioning: "Versioning: algorithm auto-updates when the formula changes.",
      i18n: "Localization: full RU/EN support for projects, tasks and stats.",
      updateNote:
        "Updates automatically every 3 hours, on goal changes, or algorithm version bump.",
    },
    stats: {
      "all-projects": "Total number of projects",
      "abandoned-projects": "Temporarily abandoned projects",
      "work-priority": "Work priority (increases in case of downtime)",
      "all-goals": "Total goals (excluding completed)",
      "in-process-goals": "Goals in progress",
      "awaiting-goals": "Awaiting goals",
      "completed-goals": "Completed goals",
      "abandoned-goals": "Abandoned goals",
    },
    status: {
      completed: "Completed",
      inProcess: "In Progress",
      awaiting: "Awaiting",
      frozen: "Frozen",
      abandoned: "Abandoned",
    },
    priority: {
      high: "High",
      medium: "Medium",
      low: "Low",
    },
  },
  commandLine: {
    placeholder: "Type a command (-help)...",
    expand: "Expand",
    minimize: "Minimize",
    fullscreenUnavailable: "Fullscreen mode unavailable (waiting for move implementation)",
    close: "Close",
    unknown: 'Command "{{command}}" not found. Type -help for a list of available commands.',
    systemError: '[System Error] An internal error occurred while executing command "{{command}}".',
  },
  commands: {
    help: { description: "Display information about commands and description" },
    info: { description: "Information about kinako.sh console and version" },
    clear: { description: "Clear console output buffer" },
    update: { description: "Information about the latest update" },
    theme: { description: "Switch and customize color themes" },
  },
  footer: {
    license: "MIT License",
    sourceCode: "Source code",
    madeWith: "Made with foxy love and mango🥭",
  },
  language: {
    ru: "Русский",
    en: "English",
  },
} satisfies TranslationSchema;
