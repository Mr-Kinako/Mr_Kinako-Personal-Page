import React, { useRef, useEffect, useMemo } from "react";
import s from "./Background.module.scss";

const getCssVariable = (variableName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }
  return "";
};

const createWaveStyle = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fallbackColor: string,
): string | CanvasGradient => {
  const gradientStr = getCssVariable("--accent-gradient");
  const accentStr = getCssVariable("--accent");

  if (gradientStr.includes("gradient")) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const colors = gradientStr.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\([^)]+\)/g);

    if (colors && colors.length >= 2) {
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[colors.length - 1]);
      return gradient;
    }
  }

  return accentStr || fallbackColor;
};

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numLines = 6;

  const linesConfig = useMemo(() => {
    return Array.from({ length: numLines }, (_, i) => {
      const rand = pseudoRandom(i * 12.34);

      let lineType: 1 | 2 | 3 = 1;
      if (rand > 0.8) {
        lineType = 3;
      } else if (rand > 0.5) {
        lineType = 2;
      }

      let lineWidth = 1;
      let baseAmp = 30;
      let speed = 0.008;
      let freq1 = 0.002;
      let freq2 = 0.005;
      let alpha = 0.3;

      switch (lineType) {
        case 1: // Маленькие: подвижные, частые гибкие изгибы
          lineWidth = 1.8;
          baseAmp = 35 + pseudoRandom(i * 3.1) * 20;
          speed = 0.012 + pseudoRandom(i * 4.2) * 0.008;
          freq1 = 0.003 + pseudoRandom(i * 5.3) * 0.002;
          freq2 = 0.007 + pseudoRandom(i * 6.4) * 0.003;
          alpha = 0.2 + pseudoRandom(i * 7.5) * 0.25;
          break;

        case 2: // Средние: плавная пластика и баланс
          lineWidth = 2.6;
          baseAmp = 55 + pseudoRandom(i * 2.1) * 30;
          speed = 0.006 + pseudoRandom(i * 3.2) * 0.004;
          freq1 = 0.002 + pseudoRandom(i * 4.3) * 0.0015;
          freq2 = 0.004 + pseudoRandom(i * 5.4) * 0.002;
          alpha = 0.4 + pseudoRandom(i * 6.5) * 0.2;
          break;

        case 3: // Большие: глубокие, размашистые и медленные волны
          lineWidth = 3.8;
          baseAmp = 85 + pseudoRandom(i * 1.1) * 40;
          speed = 0.003 + pseudoRandom(i * 2.2) * 0.002;
          freq1 = 0.001 + pseudoRandom(i * 3.3) * 0.0008;
          freq2 = 0.002 + pseudoRandom(i * 4.4) * 0.001;
          alpha = 0.65 + pseudoRandom(i * 5.5) * 0.2;
          break;
      }

      return {
        lineType,
        lineWidth,
        baseAmp,
        speed,
        freq1,
        freq2,
        alpha,
        yOffset: (pseudoRandom(i * 45.67) - 0.5) * 40,
        phaseShift: (i / numLines) * Math.PI * 2,
        // Разные фазы модуляции для эффекта "перетекания" между линиями
        modPhase: pseudoRandom(i * 88.1) * Math.PI * 2,
      };
    });
  }, [numLines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let cachedStyle: string | CanvasGradient = "#3b82f6";

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cachedStyle = createWaveStyle(ctx, canvas.width, canvas.height, "#3b82f6");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = cachedStyle;

      const centerY = canvas.height / 2;
      const lineSpacing = 16;
      const step = 25; // Шаг для сглаживания кривыми Безье

      for (let i = 0; i < numLines; i++) {
        const config = linesConfig[i];
        ctx.lineWidth = config.lineWidth;

        const yBase = centerY + (i - (numLines - 1) / 2) * lineSpacing + config.yOffset;
        const t = time * config.speed + config.phaseShift;

        // Модуляция амплитуды («дыхание» волны без случайного шума)
        const ampMod = Math.sin(time * 0.005 + config.modPhase) * 0.35 + 0.85;
        const currentAmp = config.baseAmp * ampMod;

        // Вычисляем ключевые точки
        const points: { x: number; y: number }[] = [];
        for (let x = -step; x <= canvas.width + step * 2; x += step) {
          // Гармонический синтез: сложение двух синусоид
          const wave1 = Math.sin(x * config.freq1 + t);
          const wave2 = Math.cos(x * config.freq2 - t * 0.7);

          const y = yBase + (wave1 + wave2 * 0.5) * currentAmp;
          points.push({ x, y });
        }

        // Отрисовка сглаженной линии через квадратичные кривые Безье
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);

          for (let j = 1; j < points.length - 1; j++) {
            const xc = (points[j].x + points[j + 1].x) / 2;
            const yc = (points[j].y + points[j + 1].y) / 2;
            ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
          }
        }

        const edgeFactor = 1 - Math.abs(i - (numLines - 1) / 2) / (numLines / 1.6);
        ctx.globalAlpha = Math.max(0.05, config.alpha * Math.max(0, edgeFactor));

        ctx.stroke();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [linesConfig]);

  return (
    <div className={s.backgroundContainer}>
      <canvas className={s.canvas} ref={canvasRef} />
    </div>
  );
};
