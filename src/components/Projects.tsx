import { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { UITranslations } from '@/i18n/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectsCopy {
  projects: UITranslations['projects'];
  project: UITranslations['project'];
}

interface ProjectsProps {
  copy: ProjectsCopy;
}

export default function Projects({ copy }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { projects: pr, project } = copy;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-heading', start: 'top 88%' },
        }
      );

      const row = document.querySelector<HTMLElement>('.project-row');
      if (!row) return;

      const imgWrap = row.querySelector<HTMLElement>('.project-img-wrap');
      const content = row.querySelector<HTMLElement>('.project-content');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: 'top 82%' },
      });

      if (imgWrap) {
        tl.fromTo(
          imgWrap,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' }
        );
      }
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.85'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let hostname = 'menusync-app.vercel.app';
  try {
    hostname = new URL(project.url).hostname;
  } catch {
    /* keep default */
  }

  return (
    <section ref={sectionRef} id="projects" className="section-pad relative">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="projects-heading mb-10 flex flex-col items-center text-center opacity-0 md:mb-12">
          <h2 className="mb-1 text-[clamp(1.2rem,6vw,2rem)] font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {pr.title}
            <span className="text-primary">{pr.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl bg-gradient-to-r from-emerald-400 via-foreground to-violet-500 bg-clip-text text-sm font-medium leading-relaxed text-transparent sm:text-base md:text-lg">
            {pr.subtitle}
          </p>
        </div>

        <div className="project-row flex flex-col items-center gap-6 lg:flex-row lg:gap-16">
          <div className="project-img-wrap w-full opacity-0 lg:w-3/5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/img browser-frame relative block"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-violet-500/30 via-transparent to-emerald-500/20 opacity-40 transition-opacity duration-700 group-hover/img:opacity-70" />
              <div className="relative z-20 flex h-9 items-center gap-2 border-b border-foreground/10 bg-background/90 px-4 backdrop-blur-md">
                <div className="browser-dot bg-red-500/80" />
                <div className="browser-dot bg-yellow-500/80" />
                <div className="browser-dot bg-green-500/80" />
                <div className="mx-auto rounded-md bg-foreground/5 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  {hostname}
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/5 pt-0 sm:aspect-[16/10]">
                <img
                  src="/imgs/dashboard.webp"
                  alt={project.imageAlt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover/img:scale-[1.03] sm:object-cover sm:object-top"
                />
              </div>
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/25 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/img:opacity-100">
                <span className="flex translate-y-4 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-transform duration-300 group-hover/img:translate-y-0">
                  {project.visitSite} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>

          <div className="project-content flex w-full flex-col justify-center opacity-0 lg:w-2/5">
            <div className="mb-3 flex flex-wrap items-center gap-3 md:mb-6">
              <span className="font-mono text-5xl font-black leading-none text-foreground/10 select-none">01</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                {project.eyebrow}
              </span>
            </div>

            <h3 className="mb-1 text-2xl font-black leading-tight text-foreground sm:text-3xl md:text-4xl">
              {project.appName}
            </h3>
            <p className="mb-2 font-mono text-xs text-muted-foreground sm:text-sm md:mb-4">{project.title}</p>

            <p className="mb-3 text-xs font-light leading-relaxed text-muted-foreground sm:text-base md:mb-7">
              {project.description}
            </p>

            <div className="mb-3 flex flex-wrap gap-1.5 md:mb-8 md:gap-2">
              {project.badges.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl border border-border/50 bg-foreground/5 px-2 py-1 text-[10px] font-semibold text-foreground/80 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-row items-center gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-2.5 text-xs font-bold text-background shadow-xl shadow-foreground/10 transition-all duration-300 hover:bg-foreground/90 sm:px-6 sm:py-3.5 sm:text-sm"
                aria-label={`${project.visitSite} — ${project.appName}`}
              >
                {project.visitSite}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 sm:h-4 sm:w-4" />
              </a>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/50 px-4 py-2.5 text-xs font-bold text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 sm:px-6 sm:py-3.5 sm:text-sm"
                aria-label={`${project.cta} — ${project.appName}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {project.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
