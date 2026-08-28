import { VFSNode } from "./types";

export const VFS_ROOT: VFSNode = {
  type: "dir",
  name: "root",
  children: {
    home: {
      type: "dir",
      name: "home",
      children: {
        "readme.txt": {
          type: "file",
          name: "readme.txt",
          content: "Привет! Это стартовый файл.\nВведи 'help' для списка команд.",
        },
        "about.md": { type: "file", name: "about.md", content: "# Обо мне\nЯ разработчик." },
        projects: {
          type: "dir",
          name: "projects",
          children: {
            "portfolio.js": {
              type: "file",
              name: "portfolio.js",
              content: "console.log('My Work');",
            },
          },
        },
      },
    },
    etc: {
      type: "dir",
      name: "etc",
      children: {
        "config.json": { type: "file", name: "config.json", content: '{"theme": "dark"}' },
      },
    },
  },
};
