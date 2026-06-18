import type { UITranslations } from '@/i18n/ui';
import type { DemoCredentialRow } from '@/interfaces/components/projects';

export interface DemoCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  title: string;
  closeLabel: string;
  columns: UITranslations['projects']['demoCredentialsColumns'];
  rows: DemoCredentialRow[];
}
