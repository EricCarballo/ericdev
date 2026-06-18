import { ChevronRight, Mail } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import type { SkillsCopy } from '@/interfaces/components/skills';

interface SkillsSectionHeaderProps {
  skills: SkillsCopy['skills'];
  profile: SkillsCopy['profile'];
}

export default function SkillsSectionHeader({ skills, profile }: SkillsSectionHeaderProps) {
  return (
    <div className="reveal mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="section-label">{skills.sectionLabel}</p>
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
  );
}
