export type NodeType = "file" | "dir";

export interface VFSNode {
  type: NodeType;
  name: string;
  content?: string; // Только для файлов
  children?: Record<string, VFSNode>; // Только для папок
}
