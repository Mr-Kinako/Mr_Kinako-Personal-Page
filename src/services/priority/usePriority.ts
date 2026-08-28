import { useEffect, useState, useCallback } from "react";
import { PriorityService } from "./PriorityService";

export function usePriority() {
  const [priority, setPriority] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    PriorityService.getPriority().then((val) => {
      if (!mounted) return;
      setPriority(val);
      setLoading(false);
    });

    const unsub = PriorityService.subscribe((val) => {
      if (!mounted) return;
      setPriority(val);
    });

    PriorityService.startAutoUpdate();

    return () => {
      mounted = false;
      unsub();
      PriorityService.stopAutoUpdate();
    };
  }, []);

  const forceUpdate = useCallback(async () => {
    setLoading(true);
    const val = await PriorityService.forceRecalculate();
    setLoading(false);
    return val;
  }, []);

  return { priority, loading, forceUpdate };
}
