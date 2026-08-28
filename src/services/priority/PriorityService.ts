import { PriorityStorage } from "./PriorityStorage";
import { calculatePriority } from "./PriorityCalculator";
import { PriorityTimer } from "./PriorityTimer";
import { ALGORITHM_VERSION, DEFAULT_CONFIG } from "./constants";
import type { RawStats, PriorityData, PriorityListener } from "./types";

class PriorityServiceClass {
  private timer: PriorityTimer;
  private listeners = new Set<PriorityListener>();
  private statsProvider: (() => RawStats) | null = null;
  private lastComputed: PriorityData | null = null;

  constructor() {
    this.timer = new PriorityTimer(DEFAULT_CONFIG.decayIntervalHours);
    this.timer.subscribe(() => this.handleTimerTick());
  }

  /** Подключить источник статистики (чистая функция, без React) */
  setStatsProvider(provider: () => RawStats) {
    this.statsProvider = provider;
  }

  /** Получить текущий приоритет (из кэша или пересчитать) */
  async getPriority(): Promise<number> {
    if (this.lastComputed) return this.lastComputed.value;

    const stored = await PriorityStorage.get();
    if (stored && stored.version === ALGORITHM_VERSION) {
      const ageHours = (Date.now() - stored.timestamp) / (1000 * 60 * 60);
      if (ageHours < 24) {
        this.lastComputed = stored;
        return stored.value;
      }
    }
    return this.forceRecalculate();
  }

  /** Принудительный пересчёт + сохранение + уведомление слушателей */
  async forceRecalculate(): Promise<number> {
    if (!this.statsProvider) throw new Error("Stats provider not set");
    const stats = this.statsProvider();
    const data = this.compute(stats, 0);
    this.lastComputed = data;
    await PriorityStorage.set(data);
    this.listeners.forEach((cb) => cb(data.value));
    return data.value;
  }

  /** Очистить хранилище и кэш */
  async clear(): Promise<void> {
    this.lastComputed = null;
    await PriorityStorage.clear();
  }

  /** Подписка на изменения приоритета */
  subscribe(cb: PriorityListener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  /** Запустить автообновление по таймеру */
  startAutoUpdate() {
    this.timer.start();
  }

  /** Остановить таймер */
  stopAutoUpdate() {
    this.timer.stop();
  }

  private async handleTimerTick() {
    if (!this.statsProvider) return;
    const stats = this.statsProvider();

    // Игнорируем заброшенные/замороженные проекты:
    // они уже не влияют на completedGoals, а decay срабатывает
    // только при отсутствии completed задач
    const stored = await PriorityStorage.get();
    const lastTs = stored?.timestamp ?? Date.now();
    const decayHours = (Date.now() - lastTs) / (1000 * 60 * 60);

    const data = this.compute(stats, decayHours);
    this.lastComputed = data;
    await PriorityStorage.set(data);
    this.listeners.forEach((cb) => cb(data.value));
  }

  private compute(stats: RawStats, decayHours: number): PriorityData {
    const value = calculatePriority(stats, DEFAULT_CONFIG, decayHours);
    return {
      value,
      timestamp: Date.now(),
      version: ALGORITHM_VERSION,
    };
  }
}

export const PriorityService = new PriorityServiceClass();
