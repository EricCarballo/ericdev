import type { UITranslations } from '@/i18n/ui';

export type HeroCopy = UITranslations['hero'] & {
  skills: Pick<UITranslations['skills'], 'categories' | 'hardSkillsLabel'>;
  cv: UITranslations['cv'];
};

export interface HeroProps {
  copy: HeroCopy;
  email: string;
}
