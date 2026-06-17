/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export interface LenisInstance {
  scrollTo(
    target: number | string | HTMLElement,
    options?: { duration?: number; immediate?: boolean; onComplete?: () => void }
  ): void;
  destroy(): void;
  raf(time: number): void;
  on(event: 'scroll', callback: () => void): void;
}

declare global {
  interface Window {
    lenis?: LenisInstance;
    ScrollTrigger?: typeof ScrollTriggerType;
    __navScrolling?: boolean;
    __navTarget?: HTMLElement | null;
  }
}

export {};
