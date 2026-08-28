// src/utils/storage.ts
export const storage = {
  getItem(key: string): string | null {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`localStorage is not accessible:`, e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`localStorage is not writable:`, e);
    }
  },
};
