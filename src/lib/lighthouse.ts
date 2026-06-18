type Rgb = readonly [number, number, number];

const RED: Rgb = [239, 68, 68];
const ORANGE: Rgb = [249, 115, 22];
const GREEN: Rgb = [34, 197, 94];

function lerpRgb(a: Rgb, b: Rgb, t: number): string {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

export function lighthouseColor(value: number): string {
  if (value < 50) return lerpRgb(RED, ORANGE, value / 50);
  if (value < 90) return lerpRgb(ORANGE, GREEN, (value - 50) / 40);
  return lerpRgb(ORANGE, GREEN, 1);
}

export const LIGHTHOUSE_CIRCLE_LENGTH = 283;
