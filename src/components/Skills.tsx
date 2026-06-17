import { useEffect, useRef, useState } from 'react';
import {
  Award,
  Briefcase,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Mail,
  Rocket,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import type { MetricItem, UITranslations } from '@/i18n/ui';

export interface SkillsCopy {
  skills: UITranslations['skills'];
  profile: Pick<UITranslations['profile'], 'email' | 'linkedin'>;
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
        <div className="reveal mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">{skills.hardSkillsLabel}</p>
            <h2 className="section-title">
              {skills.title}
              <span className="text-primary">{skills.titleHighlight}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:max-w-md lg:shrink-0">
            <a
              href={`mailto:${profile.email}`}
              className="glass group flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-foreground/10 px-4 py-3 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">{skills.contactMe}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-foreground/10 px-4 py-3 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <LinkedInIcon className="h-4 w-4 text-primary" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">{skills.linkedinCta}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <article className="reveal delay-100 glow-card mb-6 overflow-hidden rounded-3xl border border-foreground/10 bg-background dark:bg-white/[0.03]">
          <div className="h-1 w-full bg-gradient-to-r from-violet-500/80 via-indigo-500/80 to-violet-400/60" />
          <div className="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:gap-10">
            <div className="lg:w-[34%] lg:shrink-0 lg:border-r lg:border-foreground/10 lg:pr-8">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                  <Briefcase className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {skills.workExperience}
                  </p>
                  <h3 className="mt-1 text-xl font-bold leading-tight text-foreground md:text-2xl">
                    {experience.role}
                  </h3>
                </div>
              </div>
              <p className="mb-3 text-base font-semibold text-primary">{experience.company}</p>
              <span className="inline-flex rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 font-mono text-xs text-muted-foreground">
                {experience.period}
              </span>
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-violet-500/15 bg-violet-500/5 px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {visibleBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-3.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {hasMoreBullets && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/10"
                >
                  {expanded ? (
                    <>
                      {experience.showLess}
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      {experience.showMore}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </article>

        <div className="reveal delay-150 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-5 dark:bg-white/[0.03] md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {skills.educationTitle}
                </h3>
              </div>
              {education.items.map((item) => (
                <div
                  key={item.degree}
                  className="flex gap-4 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-4"
                >
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 sm:flex">
                    <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 text-sm font-semibold leading-snug text-foreground">{item.degree}</h4>
                    <div className="mb-1 text-xs font-medium text-primary">{item.institution}</div>
                    <div className="font-mono text-xs text-muted-foreground">{item.period}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-5 dark:bg-white/[0.03] md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {skills.methodologiesTitle}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {methodologies.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl border border-border/50 bg-foreground/[0.04] px-3 py-2.5 text-center text-[11px] font-medium leading-snug text-foreground/85 sm:text-left"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-5 dark:bg-white/[0.03] md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                {skills.certificationsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4 md:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                    <Rocket className="h-3 w-3" aria-hidden="true" />
                    {certifications.hackathonBadge}
                  </span>
                </div>
                <h4 className="mb-1 text-sm font-semibold leading-tight text-foreground md:text-base">
                  {certifications.nasa.role}
                </h4>
                <div className="mb-2 text-xs font-medium text-primary md:text-sm">
                  {certifications.nasa.event}
                </div>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {certifications.nasa.description}
                </p>
                <a
                  href={certifications.nasa.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/10 px-3.5 py-2 text-xs font-semibold text-violet-700 transition-colors hover:border-violet-500/40 hover:bg-violet-500/15 dark:text-violet-300"
                >
                  {certifications.viewCertificate}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="flex flex-col">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {certifications.certificationsSection}
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {certifications.certs.map((cert) => (
                    <li
                      key={cert}
                      className="flex h-full flex-col rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-3"
                    >
                      <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <Award className="h-2.5 w-2.5" aria-hidden="true" />
                        {certifications.certificationBadge}
                      </span>
                      <p className="text-xs font-medium leading-snug text-foreground/90">{cert}</p>
                    </li>
                  ))}
                </ul>
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
