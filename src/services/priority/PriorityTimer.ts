import { DEFAULT_CONFIG } from "./constants";

type TickListener = () => void;

export class PriorityTimer {
  private timerId: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<TickListener>();

  constructor(private intervalHours: number = DEFAULT_CONFIG.decayIntervalHours) {}

  start() {
    if (this.timerId) return;
    const ms = this.intervalHours * 60 * 60 * 1000;
    this.timerId = setInterval(() => this.notify(), ms);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  subscribe(cb: TickListener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }
}
