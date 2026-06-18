import type { UITranslations } from '@/i18n/ui';

export interface FooterCopy {
  footer: UITranslations['footer'];
  lighthouse: Pick<UITranslations['lighthouse'], 'techStack'>;
  profile: Pick<UITranslations['profile'], 'email' | 'linkedin'>;
}

export interface FooterProps {
  copy: FooterCopy;
}
