import { RotateCcw } from 'lucide-react';
import {
  METRICS_CHARTS,
  METRICS_CHART_TEXT_COLORS,
} from '@/constants/metricsCharts';
import type { MetricsAnimationState } from '@/hooks/useMetricsAnimation';
import type { MetricItem } from '@/interfaces/i18n/ui-translations';

interface MetricsGridProps {
  title: string;
  items: MetricItem[];
  animation: MetricsAnimationState;
}

export default function MetricsGrid({ title, items, animation }: MetricsGridProps) {
  const { ecgOn, spinning, replayAnimation, countRefs, lineRefs, dotRefs } = animation;

  return (
    <div className="reveal delay-200 mt-8">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="relative select-none overflow-hidden rounded-xl border border-foreground/[0.06] bg-background dark:bg-foreground/[0.04] sm:rounded-2xl"
          >
            {index === items.length - 1 && (
              <button
                type="button"
                onClick={replayAnimation}
                disabled={spinning}
                title="Replay"
                className="absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-foreground/[0.08] bg-foreground/[0.06] transition-colors duration-200 hover:border-foreground/[0.18] hover:bg-foreground/[0.14] disabled:pointer-events-none"
              >
                <RotateCcw
                  className={`h-3 w-3 text-muted-foreground/40 transition-colors duration-200 ${spinning ? 'animate-spin' : ''}`}
                />
              </button>
            )}
            <div className="px-3 pb-2 pt-3 sm:px-4 sm:pt-4 sm:pb-3">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 sm:mb-2 sm:text-[10px]">
                {item.label}
              </p>
              <span
                ref={(el) => {
                  countRefs.current[index] = el;
                }}
                className={`text-xl font-black tabular-nums leading-none sm:text-2xl md:text-3xl ${METRICS_CHART_TEXT_COLORS[index]}`}
              >
                {item.prefix ?? ''}0{item.suffix ?? ''}
              </span>
            </div>
            <svg
              viewBox="0 0 100 44"
              preserveAspectRatio="none"
              className="block w-full"
              style={{ height: 70, transform: 'translateZ(0)' }}
              aria-hidden="true"
            >
              {[11, 22, 33].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.07"
                  strokeWidth="0.5"
                />
              ))}
              <defs>
                <linearGradient id={`kpi-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={METRICS_CHARTS[index].color} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={METRICS_CHARTS[index].color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={METRICS_CHARTS[index].area}
                fill={`url(#kpi-grad-${index})`}
                style={{
                  opacity: ecgOn ? 1 : 0,
                  transition: ecgOn ? `opacity 1200ms ease-out ${index * 150 + 80}ms` : 'none',
                }}
              />
              <path
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                d={METRICS_CHARTS[index].line}
                fill="none"
                pathLength={1000}
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  stroke: METRICS_CHARTS[index].color,
                  strokeDasharray: 1000,
                  strokeDashoffset: 1000,
                }}
              />
              {METRICS_CHARTS[index].pts.map(([x, y], dotIndex) => (
                <circle
                  key={dotIndex}
                  ref={(el) => {
                    dotRefs.current[index][dotIndex] = el;
                  }}
                  cx={x}
                  cy={y}
                  r="1"
                  fill={METRICS_CHARTS[index].color}
                  style={{ opacity: 0 }}
                />
              ))}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
