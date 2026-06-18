import type { UITranslations } from '@/i18n/ui';

export interface AboutCopy {
  about: UITranslations['about'];
  profile: UITranslations['profile'];
}

export interface AboutProps {
  copy: AboutCopy;
}
