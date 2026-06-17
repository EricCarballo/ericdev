import { useEffect, useRef, useState } from 'react';
import {
  Award,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Mail,
  Phone,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { useReveal } from '@/hooks/useReveal';
import type { MetricItem, UITranslations } from '@/i18n/ui';

export interface SkillsCopy {
  skills: UITranslations['skills'];
  profile: Pick<
    UITranslations['profile'],
    'email' | 'phone' | 'phoneDisplay' | 'linkedin'
  >;
  experience: UITranslations['experience'];
  education: UITranslations['education'];
  certifications: UITranslations['certifications'];
  methodologies: UITranslations['methodologies'];
  metrics: UITranslations['metrics'];
}

interface SkillsProps {
  copy: SkillsCopy;
}

const CHARTS = [
  {
    pts: [
      [0, 34],
      [14, 28],
      [28, 22],
      [42, 18],
      [56, 14],
      [70, 12],
      [100, 8],
    ] as [number, number][],
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
    ] as [number, number][],
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
    ] as [number, number][],
    line: 'M 0,38 L 16,32 L 32,28 L 48,20 L 64,16 L 80,12 L 100,8',
    area: 'M 0,38 L 16,32 L 32,28 L 48,20 L 64,16 L 80,12 L 100,8 L 100,44 L 0,44 Z',
    color: '#34d399',
  },
] as const;

function pathThresholds(pts: [number, number][]): number[] {
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    cum.push(cum[i - 1] + Math.sqrt(dx * dx + dy * dy));
  }
  const total = cum[cum.length - 1];
  return cum.map((d) => d / total);
}

const THRESHOLDS = CHARTS.map((c) => pathThresholds(c.pts));

const CHART_COLORS = ['text-[#a78bfa]', 'text-[#fbbf24]', 'text-[#34d399]'] as const;

export default function Skills({ copy }: SkillsProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [expanded, setExpanded] = useState(false);
  const [ecgOn, setEcgOn] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[][]>([[], [], []]);
  const animating = useRef(false);
  const rafRef = useRef(0);
  const timeout1Ref = useRef(0);
  const timeout2Ref = useRef(0);

  const runAnimation = () => {
    cancelAnimationFrame(rafRef.current);
    setEcgOn(true);

    const items = copy.metrics.items;
    const durations = [2800, 3200, 3000];
    const delays = [0, 150, 300];

    countRefs.current.forEach((el, i) => {
      if (!el) return;
      const item = items[i];
      el.textContent = `${item?.prefix ?? ''}0${item?.suffix ?? ''}`;
    });
    lineRefs.current.forEach((el) => {
      if (el) el.style.strokeDashoffset = '1000';
    });
    dotRefs.current.forEach((dots) => dots.forEach((el) => {
      if (el) el.style.opacity = '0';
    }));

    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      let running = false;

      items.forEach((item, i) => {
        const started = elapsed - delays[i];
        if (started < 0) {
          running = true;
          return;
        }
        const p = Math.min(started / durations[i], 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const current = Math.round(item.value * ease);
        const elCount = countRefs.current[i];
        if (elCount) {
          elCount.textContent = `${item.prefix ?? ''}${current}${item.suffix ?? ''}`;
        }
        const elLine = lineRefs.current[i];
        if (elLine) elLine.style.strokeDashoffset = String(1000 * (1 - ease));
        dotRefs.current[i].forEach((el, idx) => {
          if (!el) return;
          const threshold = THRESHOLDS[i][idx];
          el.style.opacity = ease >= threshold ? '1' : '0';
        });
        if (p < 1) running = true;
      });

      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const replayAnimation = () => {
    if (animating.current) return;
    animating.current = true;
    setSpinning(true);
    setEcgOn(false);
    window.clearTimeout(timeout1Ref.current);
    window.clearTimeout(timeout2Ref.current);
    timeout1Ref.current = window.setTimeout(() => {
      runAnimation();
      timeout2Ref.current = window.setTimeout(() => {
        setSpinning(false);
        animating.current = false;
      }, 3600);
    }, 350);
  };

  useEffect(() => {
    if (!ref.current || hasTriggered) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHasTriggered(true);
        obs.disconnect();
        runAnimation();
      },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hasTriggered]);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timeout1Ref.current);
      window.clearTimeout(timeout2Ref.current);
    },
    []
  );

  const { skills, profile, experience, education, certifications, methodologies } = copy;
  const visibleBullets = expanded
    ? experience.bullets
    : experience.bullets.slice(0, experience.visibleCount);
  const hasMoreBullets = experience.bullets.length > experience.visibleCount;

  return (
    <section ref={ref} id="skills" className="section-pad relative">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-10 text-center md:text-left">
          <h2 className="section-title">
            {skills.title}
            <span className="text-primary">{skills.titleHighlight}</span>
          </h2>
        </div>

        <div className="reveal mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href={`mailto:${profile.email}`}
            className="glass group flex cursor-pointer items-center gap-4 rounded-3xl border border-foreground/10 px-6 py-5 text-left transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{skills.contactMe}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/80" />
          </a>
          <a
            href={`tel:+52${profile.phone}`}
            className="glass group flex cursor-pointer items-center gap-4 rounded-3xl border border-foreground/10 px-6 py-5 text-left transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{skills.callMe}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/80" />
          </a>
          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex cursor-pointer items-center gap-4 rounded-3xl border border-foreground/10 px-6 py-5 text-left transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <LinkedInIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{skills.linkedinCta}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/80" />
          </a>
        </div>

        <div className="reveal delay-100 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-8 transition-all duration-300 hover:border-foreground/10 dark:bg-white/[0.04] dark:backdrop-blur-xl lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{skills.workExperience}</h3>
            </div>
            <div className="relative ml-2 space-y-8 border-l border-foreground/10 pl-6">
              <div className="relative pb-2">
                <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <h4 className="font-semibold text-foreground">{experience.role}</h4>
                <div className="mb-1 text-sm font-medium text-primary">{experience.company}</div>
                <div className="mb-3 font-mono text-xs text-muted-foreground">{experience.period}</div>
                <ul className="space-y-2">
                  {visibleBullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed text-muted-foreground/90">
                      {bullet}
                    </li>
                  ))}
                </ul>
                {hasMoreBullets && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="mt-4 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {expanded ? experience.showLess : experience.showMore}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-6 transition-all duration-300 hover:border-foreground/10 dark:bg-white/[0.04] dark:backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                  {skills.educationTitle}
                </h3>
              </div>
              {education.items.map((item) => (
                <div key={item.degree} className="rounded-xl border border-foreground/5 bg-background/30 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-foreground">{item.degree}</h4>
                  <div className="mb-1 text-xs font-medium text-primary">{item.institution}</div>
                  <div className="font-mono text-xs text-muted-foreground">{item.period}</div>
                </div>
              ))}
            </div>

            <div className="glow-card h-full rounded-3xl border border-foreground/5 bg-background p-8 transition-all duration-300 hover:border-foreground/10 dark:bg-white/[0.04] dark:backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                  {skills.certificationsTitle}
                </h3>
              </div>
              <div className="mb-4 rounded-xl border border-foreground/5 bg-background/30 p-4">
                <h4 className="mb-1 text-sm font-semibold leading-tight text-foreground">
                  {certifications.nasa.role}
                </h4>
                <div className="mb-2 text-xs font-medium text-primary">{certifications.nasa.event}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">{certifications.nasa.description}</p>
              </div>
              <ul className="space-y-2">
                {certifications.certs.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-lg border border-border/50 bg-foreground/5 px-3 py-2 text-xs font-medium text-foreground/80"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-6 dark:bg-white/[0.04] dark:backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                  {skills.methodologiesTitle}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {methodologies.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/50 bg-foreground/5 px-2 py-1 text-[10px] font-medium text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="reveal delay-200 mt-8">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {copy.metrics.title}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {copy.metrics.items.map((item: MetricItem, m) => (
              <div
                key={item.label}
                className="relative select-none overflow-hidden rounded-xl border border-foreground/[0.06] bg-background dark:bg-foreground/[0.04] sm:rounded-2xl"
              >
                {m === copy.metrics.items.length - 1 && (
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
                      countRefs.current[m] = el;
                    }}
                    className={`text-xl font-black tabular-nums leading-none sm:text-2xl md:text-3xl ${CHART_COLORS[m]}`}
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
                    <linearGradient id={`kpi-grad-${m}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHARTS[m].color} stopOpacity="0.08" />
                      <stop offset="100%" stopColor={CHARTS[m].color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={CHARTS[m].area}
                    fill={`url(#kpi-grad-${m})`}
                    style={{
                      opacity: ecgOn ? 1 : 0,
                      transition: ecgOn ? `opacity 1200ms ease-out ${m * 150 + 80}ms` : 'none',
                    }}
                  />
                  <path
                    ref={(el) => {
                      lineRefs.current[m] = el;
                    }}
                    d={CHARTS[m].line}
                    fill="none"
                    pathLength={1000}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      stroke: CHARTS[m].color,
                      strokeDasharray: 1000,
                      strokeDashoffset: 1000,
                    }}
                  />
                  {CHARTS[m].pts.map(([x, y], idx) => (
                    <circle
                      key={idx}
                      ref={(el) => {
                        dotRefs.current[m][idx] = el;
                      }}
                      cx={x}
                      cy={y}
                      r="1"
                      fill={CHARTS[m].color}
                      style={{ opacity: 0 }}
                    />
                  ))}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
