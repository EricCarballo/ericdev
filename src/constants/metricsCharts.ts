export interface MetricsChart {
  readonly pts: readonly (readonly [number, number])[];
  readonly line: string;
  readonly area: string;
  readonly color: string;
}

function pathThresholds(pts: readonly (readonly [number, number])[]): number[] {
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    cum.push(cum[i - 1] + Math.sqrt(dx * dx + dy * dy));
  }
  const total = cum[cum.length - 1];
  return cum.map((d) => d / total);
}

export const METRICS_CHARTS: readonly MetricsChart[] = [
  {
    pts: [
      [0, 34],
      [14, 28],
      [28, 22],
      [42, 18],
      [56, 14],
      [70, 12],
      [100, 8],
    ],
    line: 'M 0,34 L 14,28 L 28,22 L 42,18 L 56,14 L 70,12 L 100,8',
    area: 'M 0,34 L 14,28 L 28,22 L 42,18 L 56,14 L 70,12 L 100,8 L 100,44 L 0,44 Z',
    color: '#a78bfa',
  },
  {
    pts: [
      [0, 36],
      [12, 18],
      [24, 30],
      [36, 12],
      [48, 26],
      [60, 10],
      [72, 22],
      [100, 8],
    ],
    line: 'M 0,36 L 12,18 L 24,30 L 36,12 L 48,26 L 60,10 L 72,22 L 100,8',
    area: 'M 0,36 L 12,18 L 24,30 L 36,12 L 48,26 L 60,10 L 72,22 L 100,8 L 100,44 L 0,44 Z',
    color: '#fbbf24',
  },
  {
    pts: [
      [0, 38],
      [16, 32],
      [32, 28],
      [48, 20],
      [64, 16],
      [80, 12],
      [100, 8],
    ],
    line: 'M 0,38 L 16,32 L 32,28 L 48,20 L 64,16 L 80,12 L 100,8',
    area: 'M 0,38 L 16,32 L 32,28 L 48,20 L 64,16 L 80,12 L 100,8 L 100,44 L 0,44 Z',
    color: '#34d399',
  },
] as const;

export const METRICS_CHART_THRESHOLDS = METRICS_CHARTS.map((chart) => pathThresholds(chart.pts));

export const METRICS_CHART_TEXT_COLORS = [
  'text-[#a78bfa]',
  'text-[#fbbf24]',
  'text-[#34d399]',
] as const;

export const METRICS_ANIMATION_DURATIONS = [2800, 3200, 3000] as const;
export const METRICS_ANIMATION_DELAYS = [0, 150, 300] as const;
