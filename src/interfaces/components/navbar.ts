import type { Lang } from '@/i18n/utils';
import type { UITranslations } from '@/i18n/ui';

export type NavCopy = UITranslations['nav'];

export interface NavbarProps {
  lang: Lang;
  copy: NavCopy;
  email: string;
  cvUrl: string;
  cvFileName: string;
}
