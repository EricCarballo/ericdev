import { useState } from 'react';
import { Briefcase, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { SkillsCopy } from '@/interfaces/components/skills';

interface ExperienceCardProps {
  skills: SkillsCopy['skills'];
  experience: SkillsCopy['experience'];
}

export default function ExperienceCard({ skills, experience }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleBullets = expanded
    ? experience.bullets
    : experience.bullets.slice(0, experience.visibleCount);
  const hasMoreBullets = experience.bullets.length > experience.visibleCount;

  return (
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
  );
}
