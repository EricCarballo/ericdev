import { useCallback, useEffect, useRef, useState } from 'react';
import {
  METRICS_ANIMATION_DELAYS,
  METRICS_ANIMATION_DURATIONS,
  METRICS_CHART_THRESHOLDS,
} from '@/constants/metricsCharts';
import type { MetricItem } from '@/interfaces/i18n/ui-translations';

const STROKE_LENGTH = 1000;
const REPLAY_SPIN_MS = 3600;
const REPLAY_DELAY_MS = 350;

export function useMetricsAnimation(items: MetricItem[]) {
  const [ecgOn, setEcgOn] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[][]>([[], [], []]);
  const animatingRef = useRef(false);
  const rafRef = useRef(0);
  const timeout1Ref = useRef(0);
  const timeout2Ref = useRef(0);

  const runAnimation = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setEcgOn(true);

    countRefs.current.forEach((el, index) => {
      if (!el) return;
      const item = items[index];
      el.textContent = `${item?.prefix ?? ''}0${item?.suffix ?? ''}`;
    });
    lineRefs.current.forEach((el) => {
      if (el) el.style.strokeDashoffset = String(STROKE_LENGTH);
    });
    dotRefs.current.forEach((dots) =>
      dots.forEach((el) => {
        if (el) el.style.opacity = '0';
      }),
    );

    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      let running = false;

      items.forEach((item, index) => {
        const started = elapsed - METRICS_ANIMATION_DELAYS[index];
        if (started < 0) {
          running = true;
          return;
        }

        const progress = Math.min(started / METRICS_ANIMATION_DURATIONS[index], 1);
        const ease = 1 - (1 - progress) ** 3;
        const current = Math.round(item.value * ease);

        const countEl = countRefs.current[index];
        if (countEl) {
          countEl.textContent = `${item.prefix ?? ''}${current}${item.suffix ?? ''}`;
        }

        const lineEl = lineRefs.current[index];
        if (lineEl) {
          lineEl.style.strokeDashoffset = String(STROKE_LENGTH * (1 - ease));
        }

        dotRefs.current[index].forEach((dotEl, dotIndex) => {
          if (!dotEl) return;
          dotEl.style.opacity = ease >= METRICS_CHART_THRESHOLDS[index][dotIndex] ? '1' : '0';
        });

        if (progress < 1) running = true;
      });

      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [items]);

  const replayAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setSpinning(true);
    setEcgOn(false);
    window.clearTimeout(timeout1Ref.current);
    window.clearTimeout(timeout2Ref.current);
    timeout1Ref.current = window.setTimeout(() => {
      runAnimation();
      timeout2Ref.current = window.setTimeout(() => {
        setSpinning(false);
        animatingRef.current = false;
      }, REPLAY_SPIN_MS);
    }, REPLAY_DELAY_MS);
  }, [runAnimation]);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timeout1Ref.current);
      window.clearTimeout(timeout2Ref.current);
    },
    [],
  );

  return {
    ecgOn,
    spinning,
    runAnimation,
    replayAnimation,
    countRefs,
    lineRefs,
    dotRefs,
  };
}

export type MetricsAnimationState = ReturnType<typeof useMetricsAnimation>;
