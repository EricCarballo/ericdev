import type { UITranslations } from '@/i18n/ui';

export type SkillCategories = UITranslations['skills']['categories'];

export interface SkillsCarouselProps {
  categories: SkillCategories;
  hardSkillsLabel: string;
}
