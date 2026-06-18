import { useCallback, useEffect, useRef, useState } from 'react';
import { LIGHTHOUSE_CIRCLE_LENGTH, lighthouseColor } from '@/lib/lighthouse';
import type { LighthouseMetricItem } from '@/interfaces/i18n/ui-translations';

const DURATION_MS = 1600;
const REPLAY_DELAY_MS = 350;

export function useLighthouseAnimation(metrics: LighthouseMetricItem[]) {
  const [spinning, setSpinning] = useState(false);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animatingRef = useRef(false);
  const rafRef = useRef(0);
  const timeoutRef = useRef(0);

  const resetVisuals = useCallback(() => {
    circleRefs.current.forEach((el) => {
      if (!el) return;
      el.style.strokeDashoffset = String(LIGHTHOUSE_CIRCLE_LENGTH);
      el.style.stroke = lighthouseColor(0);
    });
    numRefs.current.forEach((el) => {
      if (!el) return;
      el.textContent = '0';
      el.style.color = lighthouseColor(0);
    });
    iconRefs.current.forEach((el) => {
      if (el) el.style.color = lighthouseColor(0);
    });
  }, []);

  const runAnimation = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    resetVisuals();

    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      let running = false;

      metrics.forEach((metric, index) => {
        const progress = Math.min(elapsed / DURATION_MS, 1);
        const ease = 1 - (1 - progress) ** 3;
        const current = Math.round(metric.value * ease);
        const color = lighthouseColor(current);

        const circle = circleRefs.current[index];
        if (circle) {
          circle.style.strokeDashoffset = String(LIGHTHOUSE_CIRCLE_LENGTH * (1 - current / 100));
          circle.style.stroke = color;
        }

        const num = numRefs.current[index];
        if (num) {
          num.textContent = String(current);
          num.style.color = color;
        }

        const icon = iconRefs.current[index];
        if (icon) icon.style.color = color;

        if (progress < 1) running = true;
      });

      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [metrics, resetVisuals]);

  const replayAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setSpinning(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      runAnimation();
      timeoutRef.current = window.setTimeout(() => {
        setSpinning(false);
        animatingRef.current = false;
      }, DURATION_MS + 300);
    }, REPLAY_DELAY_MS);
  }, [runAnimation]);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  return {
    spinning,
    runAnimation,
    replayAnimation,
    circleRefs,
    numRefs,
    iconRefs,
  };
}
