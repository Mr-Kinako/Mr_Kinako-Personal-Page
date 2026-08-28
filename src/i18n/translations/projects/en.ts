import type { ProjectTranslations } from "../../types";

export const projectsEn: Record<string, ProjectTranslations> = {
  "web-osu-lazer-server": {
    title: "Osu! Lazer Server (web-development)",
    description:
      'One of the private servers for the game "Osu!" version Lazer, created in the RU segment. Custom client and much more (and planned). Also my first more serious real project.',
    tasks: {
      "10": {
        title: "File structure refactoring",
        description: "",
      },
      "11": {
        title: "File architecture refactoring",
        description: "",
      },
      "19": {
        title: "Add language switching",
        description: "For starters, you can add two main ones: RU/EN.",
      },
      "20": {
        title: "Improve theme switching",
        description: "Fix issues and add proper console integration.",
      },
      "21": {
        title: "Improve header adaptation",
        description:
          "Header behavior on narrow screens is less predictable, need to make it more predictable.",
      },
      "22": {
        title: "Improve clan system (its UI and interaction)",
        description: "For starters, in the near future, compile a list of tasks here.",
      },
      "23": {
        title: "Pull changes",
        description:
          "Ability to change only mosu!wiki for now. Instead of instant changes, they should be sent to the server for review. There should also be an admin panel for people who will review these edits. If the edit is accepted - the edits are applied to some current edited branch, and the change itself is archived in an archive of changes conditionally up to 7 days. If rejected - the changes are not applied, and the current branch of edits is removed from the queue.",
      },
      "100": {
        title: "Creation and comments about Taiko&Catch",
        description:
          "Add new TaikoRX & CatchRX modes to the rankings route. Make a fallback with information that this mode will be available in the near future when selected.",
      },
      "101": {
        title: "Registration",
        description:
          "Country selection: List color and text color should be different, not the same.",
      },
      "102": {
        title: "Activity display",
        description:
          'Make a green icon near the avatar when the player is online, and gray when offline, instead of the "Offline" text.',
      },
    },
  },

  "mr-kinako-personal-page": {
    title: "Mr_Kinako Personal-Page",
    description: "Well, my own page, hosted on Vercel.",
    tasks: {
      "1": {
        title: "Rethink the badge approach",
        description:
          'We will need to radically change the general summary in "/goals" so that it does not interfere initially, and is also beautifully presented. You can also add "Tabs" for projects, limiting to two or three cards per container tab.',
      },
      "2": {
        title: "Improve goal categorization",
        description:
          "Add two categories: Completed/Uncompleted. You can also add a priority filter, adding a medium priority by default.",
      },
      "100": {
        title: "Improve bg",
        description:
          "Probably enough to play with variations of bg types generating them with pure code. Using conditional linear-gradient.",
      },
      "101": {
        title: "Work out the color palette",
        description:
          'Experiment with colors, with combinations; Look at a couple dozen modern sites for general clarity/picture; Work out "_variables.scss", from sorting to category, also taking out all the most common color variants in the project, bringing them to one form; We will need to rethink the use of "$variables" and "--variable".',
      },
      "102": {
        title: "Rethink the project",
        description: "File structure, internal file structure, dependencies",
      },
      "103": {
        title: "Work on adaptation",
        description:
          "A little work on general adaptation, fix possible issues. Also additionally improve readability, layout where needed for screen readers, and in general work on UX.",
      },
      "104": {
        title: "Bring to working and acceptable state",
        description:
          'The "/goals" route needs to be brought to a working state. Other fixes later.',
      },
    },
  },

  "mk-unified-api-host": {
    title: "MK Unified API Host",
    description:
      "My own server, the implementation of which should be unique: One server for all my projects, including for others as tests on my side. Will be developed with special care.",
    tasks: {
      "1": {
        title: "Work out feedback actions",
        description:
          "Add several endpoints for working with feedbacks. In the future, I will record a more detailed list here, but for now it is abandoned due to circumstances.",
      },
    },
  },

  "cozybar-discord-server": {
    title: 'Discord Server "CozyBar(sik)"',
    description:
      "Discord server aimed at simple user communication, probably also for joint games. It will mainly be oriented towards furry themes, but will also be open to ordinary or other users.",
    tasks: {
      "1": {
        title: "",
        description: "",
      },
    },
  },
} satisfies Record<string, ProjectTranslations>;
