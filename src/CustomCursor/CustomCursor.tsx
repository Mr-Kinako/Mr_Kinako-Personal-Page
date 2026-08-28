import { useEffect, useState, CSSProperties } from "react";
import cn from "classnames";
import s from "./CustomCursor.module.scss";

type CursorType = "default" | "pointer" | "beam" | "unavailable";

interface CustomCursorProps {
  framesCount?: number;
  frameSize?: number;
}

export const CustomCursor = ({ framesCount = 24, frameSize = 32 }: CustomCursorProps) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<CursorType>("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;

      if (!target) return;

      // Определяем, над каким элементом мышь
      const isUnAvailable =
        target.closest(":disabled") ||
        target.closest("[aria-disabled='true']") ||
        target.closest(".disabled");

      const isPointer =
        target.closest("a, button, [role='button'], .clickable, input[type='submit']") ||
        window.getComputedStyle(target).cursor === "pointer";

      const isBeam =
        target.closest("input, textarea, [contenteditable='true']") ||
        window.getComputedStyle(target).cursor === "text";

      if (isUnAvailable) {
        setCursorType("unavailable");
      } else if (isPointer) {
        setCursorType("pointer");
      } else if (isBeam) {
        setCursorType("beam");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const customStyle = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    "--frames": framesCount,
    "--frame-size": `${frameSize}px`,
    "--full-width": `-${framesCount * frameSize}px`,
  } as CSSProperties;

  return <div className={cn(s.cursor, s[cursorType])} style={customStyle} />;
};
