import type { UITranslations } from '@/i18n/ui';

export type OptimizationsCopy = UITranslations['lighthouse'];

export interface OptimizationsProps {
  copy: OptimizationsCopy;
}
