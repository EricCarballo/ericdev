import type { UITranslations } from '@/interfaces/i18n/ui-translations';
import type { AboutCopy } from '@/interfaces/components/about';
import type { FooterCopy } from '@/interfaces/components/footer';
import type { HeroCopy } from '@/interfaces/components/hero';
import type { OptimizationsCopy } from '@/interfaces/components/optimizations';
import type { ProjectsCopy } from '@/interfaces/components/projects';
import type { SkillsCopy } from '@/interfaces/components/skills';

export function buildHeroCopy(t: UITranslations): HeroCopy {
  return {
    ...t.hero,
    skills: {
      categories: t.skills.categories,
      hardSkillsLabel: t.skills.hardSkillsLabel,
    },
    cv: t.cv,
  };
}

export function buildSkillsCopy(t: UITranslations): SkillsCopy {
  return {
    skills: t.skills,
    profile: {
      email: t.profile.email,
      linkedin: t.profile.linkedin,
    },
    experience: t.experience,
    education: t.education,
    certifications: t.certifications,
    methodologies: t.methodologies,
    metrics: t.metrics,
  };
}

export function buildProjectsCopy(t: UITranslations): ProjectsCopy {
  return { projects: t.projects };
}

export function buildAboutCopy(t: UITranslations): AboutCopy {
  return {
    about: t.about,
    profile: t.profile,
  };
}

export function buildFooterCopy(t: UITranslations): FooterCopy {
  return {
    footer: t.footer,
    lighthouse: { techStack: t.lighthouse.techStack },
    profile: {
      email: t.profile.email,
      linkedin: t.profile.linkedin,
    },
  };
}

export function buildOptimizationsCopy(t: UITranslations): OptimizationsCopy {
  return t.lighthouse;
}

export interface PageCopy {
  hero: HeroCopy;
  skills: SkillsCopy;
  projects: ProjectsCopy;
  about: AboutCopy;
  footer: FooterCopy;
  lighthouse: OptimizationsCopy;
  email: string;
}

export function buildPageCopy(t: UITranslations): PageCopy {
  return {
    hero: buildHeroCopy(t),
    skills: buildSkillsCopy(t),
    projects: buildProjectsCopy(t),
    about: buildAboutCopy(t),
    footer: buildFooterCopy(t),
    lighthouse: buildOptimizationsCopy(t),
    email: t.profile.email,
  };
}
