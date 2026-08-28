import { useState } from "react";

export const useVFS = (initialPath = "/home") => {
  const [cwd, setCwd] = useState(initialPath);

  return {
    cwd,
    setCwd,
    // Сокращаем путь для красивого отображения (например /home/projects -> ~/projects)
    displayPath: cwd.replace(/^\/home/, "~"),
  };
};
