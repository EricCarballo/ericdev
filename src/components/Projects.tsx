import { useState } from 'react';
import { ArrowRight, KeyRound } from 'lucide-react';
import DemoCredentialsModal from '@/components/DemoCredentialsModal';
import type { UITranslations } from '@/i18n/ui';

export interface ProjectsCopy {
  projects: UITranslations['projects'];
}

interface ProjectsProps {
  copy: ProjectsCopy;
}

function getHostname(url: string, fallback: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return fallback;
  }
}

export default function Projects({ copy }: ProjectsProps) {
  const { projects: pr } = copy;
  const [credentialsOpen, setCredentialsOpen] = useState(false);

  const menuSyncProject = pr.items.find((item) => item.demoCredentials && item.demoCredentials.length > 0);

  return (
    <>
      <section id="projects" className="section-pad relative">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="reveal mb-10 flex flex-col items-center text-center md:mb-12 md:items-start md:text-left">
            <p className="section-label">{pr.sectionLabel}</p>
            <h2 className="section-title mb-2">
              {pr.title}
              <span className="text-primary">{pr.titleHighlight}</span>
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {pr.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
            {pr.items.map((project, index) => {
              const reversed = index % 2 === 1;
              const indexLabel = String(index + 1).padStart(2, '0');
              const hostname = getHostname(project.url, project.appName.toLowerCase());
              const hasDemoCredentials =
                project.demoCredentials !== undefined && project.demoCredentials.length > 0;

              return (
                <article key={project.appName} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                    <div
                      className={`reveal delay-100 lg:col-span-7 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/img browser-frame relative block"
                      >
                        <div className="absolute inset-0 z-10 bg-gradient-to-br from-violet-500/30 via-transparent to-emerald-500/20 opacity-40 transition-opacity duration-700 group-hover/img:opacity-70" />
                        <div className="relative z-20 flex h-9 items-center gap-2 border-b border-foreground/10 bg-card px-4">
                          <div className="browser-dot bg-red-500/80" />
                          <div className="browser-dot bg-yellow-500/80" />
                          <div className="browser-dot bg-green-500/80" />
                          <div className="mx-auto rounded-md bg-foreground/5 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                            {hostname}
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/5 pt-0 sm:aspect-[16/10]">
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            width={800}
                            height={500}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover/img:scale-[1.03] sm:object-cover sm:object-top"
                          />
                        </div>
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/40 opacity-0 transition-all duration-300 group-hover/img:opacity-100">
                          <span className="flex translate-y-4 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-transform duration-300 group-hover/img:translate-y-0">
                            {pr.visitSite} <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    </div>

                    <div
                      className={`reveal delay-200 flex flex-col justify-center lg:col-span-5 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-3 md:mb-6">
                        <span className="font-mono text-5xl font-black leading-none text-foreground/10 select-none">
                          {indexLabel}
                        </span>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                          {project.eyebrow}
                        </span>
                      </div>

                      <h3 className="mb-1 text-2xl font-black leading-tight text-foreground sm:text-3xl md:text-4xl">
                        {project.appName}
                      </h3>
                      <p className="mb-2 font-mono text-xs text-muted-foreground sm:text-sm md:mb-4">
                        {project.title}
                      </p>

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

                      <div className="relative z-20 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-3.5 text-sm font-bold text-background shadow-xl shadow-foreground/10 transition-all duration-300 hover:bg-foreground/90 sm:w-auto"
                          aria-label={`${pr.visitSite} — ${project.appName}`}
                        >
                          {pr.visitSite}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>

                        {hasDemoCredentials && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setCredentialsOpen(true);
                            }}
                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-violet-500/25 bg-violet-500/10 px-6 py-3.5 text-sm font-semibold text-violet-700 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/15 dark:text-violet-300 sm:w-auto"
                          >
                            <KeyRound className="h-4 w-4" aria-hidden="true" />
                            {pr.demoCredentialsOpen}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {menuSyncProject?.demoCredentials && (
        <DemoCredentialsModal
          isOpen={credentialsOpen}
          onClose={() => setCredentialsOpen(false)}
          projectName={menuSyncProject.appName}
          title={pr.demoCredentialsTitle}
          closeLabel={pr.demoCredentialsClose}
          columns={pr.demoCredentialsColumns}
          rows={menuSyncProject.demoCredentials}
        />
      )}
    </>
  );
}
