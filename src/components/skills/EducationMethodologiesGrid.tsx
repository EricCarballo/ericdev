import { GraduationCap, Sparkles } from 'lucide-react';
import type { SkillsCopy } from '@/interfaces/components/skills';

interface EducationMethodologiesGridProps {
  skills: SkillsCopy['skills'];
  education: SkillsCopy['education'];
  methodologies: SkillsCopy['methodologies'];
}

export default function EducationMethodologiesGrid({
  skills,
  education,
  methodologies,
}: EducationMethodologiesGridProps) {
  return (
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
  );
}
