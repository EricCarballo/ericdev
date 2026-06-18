import type { UITranslations } from '@/i18n/ui';

export interface ProjectsCopy {
  projects: UITranslations['projects'];
}

export interface ProjectsProps {
  copy: ProjectsCopy;
}

export type DemoCredentialRow = NonNullable<
  UITranslations['projects']['items'][number]['demoCredentials']
>[number];
