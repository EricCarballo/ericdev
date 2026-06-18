import { CheckCircle2, RotateCcw, Search, Smartphone, Zap } from 'lucide-react';
import type { LighthouseMetricItem } from '@/interfaces/i18n/ui-translations';
import { lighthouseColor, LIGHTHOUSE_CIRCLE_LENGTH } from '@/lib/lighthouse';
import { useIntersectionOnce } from '@/hooks/useIntersectionOnce';
import { useLighthouseAnimation } from '@/hooks/useLighthouseAnimation';
import type { OptimizationsProps } from '@/interfaces/components/optimizations';

const ICON_MAP = {
  zap: Zap,
  search: Search,
  check: CheckCircle2,
  mobile: Smartphone,
} as const;

export default function Optimizations({ copy }: OptimizationsProps) {
  const { spinning, runAnimation, replayAnimation, circleRefs, numRefs, iconRefs } =
    useLighthouseAnimation(copy.metrics);
  const sectionRef = useIntersectionOnce(runAnimation);

  return (
    <section ref={sectionRef} id="optimizations" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[600px] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 justify-center opacity-20">
        <div className="absolute h-[300px] w-[600px] bg-gradient-to-r from-green-500/15 via-emerald-500/15 to-teal-500/15" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="mb-1 whitespace-nowrap text-[clamp(1.5rem,7vw,3rem)] font-bold tracking-tight md:text-5xl">
            <span>{copy.title}</span>
            <span className="text-green-500">{copy.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl bg-gradient-to-r from-emerald-400 via-foreground to-green-500 bg-clip-text text-sm font-medium text-transparent drop-shadow-sm sm:text-base md:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="reveal flex flex-col gap-4 delay-150">
            <div className="glass overflow-hidden rounded-3xl border-green-500/20 p-5 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground">
                    {copy.reportFile}
                  </div>
                  <button
                    type="button"
                    onClick={replayAnimation}
                    disabled={spinning}
                    title={copy.replay}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-foreground/[0.08] bg-foreground/[0.06] transition-colors duration-200 hover:border-foreground/[0.18] hover:bg-foreground/[0.14] disabled:pointer-events-none"
                  >
                    <RotateCcw
                      className={`h-3 w-3 text-muted-foreground/40 transition-colors duration-200 ${spinning ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {copy.metrics.map((metric: LighthouseMetricItem, index) => {
                  const Icon = ICON_MAP[metric.icon];
                  return (
                    <div key={metric.label} className="flex flex-col items-center gap-2">
                      <div className="relative flex h-16 w-16 items-center justify-center">
                        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            className="stroke-muted/30"
                            strokeWidth="8"
                          />
                          <circle
                            ref={(el) => {
                              circleRefs.current[index] = el;
                            }}
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            strokeWidth="8"
                            strokeDasharray={LIGHTHOUSE_CIRCLE_LENGTH}
                            strokeDashoffset={LIGHTHOUSE_CIRCLE_LENGTH}
                            strokeLinecap="round"
                            style={{ stroke: lighthouseColor(0) }}
                          />
                        </svg>
                        <span
                          ref={(el) => {
                            numRefs.current[index] = el;
                          }}
                          className="text-base font-bold"
                          style={{ color: lighthouseColor(0) }}
                        >
                          0
                        </span>
                      </div>
                      <div className="text-center">
                        <span
                          ref={(el) => {
                            iconRefs.current[index] = el;
                          }}
                          className="block"
                          style={{ color: lighthouseColor(0) }}
                        >
                          <Icon className="mx-auto mb-1 h-3.5 w-3.5" />
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-2xl border border-green-500/10 px-5 py-4">
              <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {copy.techUsed}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {copy.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="chip transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal space-y-6 delay-300">
            {copy.features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-muted/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
