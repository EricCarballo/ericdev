import { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import SkillsCarousel from '@/components/SkillsCarousel';
import type { UITranslations } from '@/i18n/ui';

export type HeroCopy = UITranslations['hero'] & {
  skills: Pick<UITranslations['skills'], 'categories' | 'hardSkillsLabel'>;
  cv: UITranslations['cv'];
};

interface HeroProps {
  copy: HeroCopy;
  email: string;
}

export default function Hero({ copy, email }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = copy.roles[roleIndex] ?? '';
    const speed = isDeleting ? 40 : 80;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          window.setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % copy.roles.length);
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [copy.roles, displayText, isDeleting, roleIndex]);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden pb-16 pt-24 md:pb-24">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="reveal mb-6 flex justify-center">
            <span className="status-badge">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {copy.available}
            </span>
          </div>

          <h1 className="reveal delay-100 text-balance font-heading text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-metallic inline-block">
              {copy.heading}{' '}
              <span className="gradient-text">{copy.headingHighlight}</span>
            </span>
          </h1>

          <div className="reveal delay-200 mb-8 mt-6 flex h-12 items-center justify-center">
            <p className="font-mono text-xl text-muted-foreground md:text-2xl">
              <span className="text-primary">&gt;</span>{' '}
              <span className="text-foreground/90">{displayText}</span>
              <span className="typewriter-cursor ml-0.5 text-primary">|</span>
            </p>
          </div>

          <div className="reveal delay-300 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="btn-primary group w-full sm:w-auto">
              {copy.viewProjects}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={`mailto:${email}`} className="btn-ghost w-full sm:w-auto">
              {copy.contact}
            </a>
            <a
              href={copy.cv.url}
              download={copy.cv.fileName}
              className="btn-ghost w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              {copy.downloadCv}
            </a>
          </div>
        </div>

        <div className="reveal delay-400 mt-14 lg:mt-16">
          <SkillsCarousel
            categories={copy.skills.categories}
            hardSkillsLabel={copy.skills.hardSkillsLabel}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-background via-background/70 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
