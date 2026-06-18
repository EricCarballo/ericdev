import { useEffect, useState } from 'react';
import { ArrowUpRight, Mail, Terminal } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import type { FooterProps } from '@/interfaces/components/footer';

export default function Footer({ copy }: FooterProps) {
  const [year, setYear] = useState<number | null>(null);
  const { footer, lighthouse, profile } = copy;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
      return;
    }
    const sectionId = href.replace('#', '');
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/10 bg-background/95 pt-12 md:pt-20">

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-mono text-xl font-bold">
                eric<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="max-w-sm leading-relaxed text-muted-foreground">{footer.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary"
                aria-label={profile.linkedin.label}
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label={footer.navigation}>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {footer.navigation}
            </h2>
            <ul className="space-y-4">
              {footer.links.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      className="group flex w-fit cursor-pointer items-center gap-1 text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href)}
                      className="group flex w-fit cursor-pointer items-center gap-1 text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('#top')}
                  aria-label="Back to top"
                  className="group flex w-fit items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <svg width="12" height="10" viewBox="0 0 14 12" fill="currentColor" aria-hidden="true">
                    <path d="M7 0L14 12H0L7 0Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {footer.technologies}
            </h2>
            <ul className="space-y-4">
              {lighthouse.techStack.map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/10 pt-8 text-sm text-muted-foreground md:flex-row">
          <div>© {year ?? '2026'} {footer.copyright}</div>
          <div className="rounded bg-muted/30 px-2 py-1 font-mono text-xs text-muted-foreground">
            Astro 4 · Tailwind 3
          </div>
        </div>
      </div>
    </footer>
  );
}
