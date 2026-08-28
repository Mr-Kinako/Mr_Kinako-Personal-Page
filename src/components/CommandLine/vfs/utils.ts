import { VFS_ROOT } from "./structure";
import { VFSNode } from "./types";

// Превращает относительный путь в абсолютный (например cd ../projects)
export const resolvePath = (cwd: string, target: string): string => {
  if (!target) return cwd;
  if (target === "/") return "/home"; // По дефолту кидаем в home

  const currentParts = target.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  const targetParts = target.split("/").filter(Boolean);

  for (const part of targetParts) {
    if (part === ".") continue;
    if (part === "..") {
      currentParts.pop();
    } else {
      currentParts.push(part);
    }
  }

  return "/" + currentParts.join("/");
};

// Ищет ноду (папку или файл) по абсолютному пути
export const getNodeByPath = (absolutePath: string): VFSNode | null => {
  const parts = absolutePath.split("/").filter(Boolean);
  let current: VFSNode = VFS_ROOT;

  for (const part of parts) {
    if (current.type !== "dir" || !current.children || !current.children[part]) {
      return null; // Путь не найден
    }
    current = current.children[part];
  }

  return current;
};
