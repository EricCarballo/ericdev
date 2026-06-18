import type { UITranslations } from '@/i18n/ui';

export interface SkillsCopy {
  skills: UITranslations['skills'];
  profile: Pick<UITranslations['profile'], 'email' | 'linkedin'>;
  experience: UITranslations['experience'];
  education: UITranslations['education'];
  certifications: UITranslations['certifications'];
  methodologies: UITranslations['methodologies'];
  metrics: UITranslations['metrics'];
}

export interface SkillsProps {
  copy: SkillsCopy;
}
