import { useEffect, useMemo, useState } from 'react';
import { resolveTechLogo, techLogoUrl } from '@/lib/techLogos';
import type { SkillsCarouselProps } from '@/interfaces/components/skills-carousel';

function TechChip({ name, slug }: { name: string; slug: string | null }) {
  const [failed, setFailed] = useState(false);
  const showFallback = slug === null || failed;

  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border/50 bg-card px-4 py-2.5 shadow-sm">
      {showFallback ? (
        <span
          className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-foreground/10 text-[10px] font-bold uppercase text-foreground"
          aria-hidden="true"
        >
          {name.slice(0, 2)}
        </span>
      ) : (
        <img
          src={techLogoUrl(slug)}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] shrink-0 object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <span className="whitespace-nowrap text-sm font-medium text-foreground/90">{name}</span>
    </div>
  );
}

export default function SkillsCarousel({ categories, hardSkillsLabel }: SkillsCarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const technologies = useMemo(() => {
    const names = [...categories.frontend, ...categories.backend, ...categories.tools];
    return names.map((name) => resolveTechLogo(name));
  }, [categories]);

  const track = [...technologies, ...technologies];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {hardSkillsLabel}
      </p>
      {reducedMotion ? (
        <div className="flex flex-wrap justify-center gap-2 pb-2">
          {technologies.map((tech) => (
            <TechChip key={tech.name} name={tech.name} slug={tech.slug} />
          ))}
        </div>
      ) : (
        <div className="tech-marquee relative overflow-hidden">
          <div className="tech-marquee-track flex w-max gap-3 px-3">
            {track.map((tech, i) => (
              <TechChip key={`${tech.name}-${i}`} name={tech.name} slug={tech.slug} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
