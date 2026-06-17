import { useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { useReveal } from '@/hooks/useReveal';
import type { UITranslations } from '@/i18n/ui';

export interface AboutCopy {
  about: UITranslations['about'];
  profile: UITranslations['profile'];
}

interface AboutProps {
  copy: AboutCopy;
}

export default function About({ copy }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const { about, profile } = copy;

  return (
    <section ref={ref} id="about" className="section-pad relative">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-8 md:mb-6">
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl">
            {about.title} <span className="text-primary">{about.titleHighlight}</span>
          </h2>
        </div>

        <div className="mx-auto grid grid-cols-1 items-start gap-12 md:grid-cols-3">
          <div className="reveal order-last space-y-5 leading-relaxed text-muted-foreground delay-150 md:order-first md:col-span-2">
            <p>{profile.bio}</p>
            <p className="text-sm text-muted-foreground/80">{profile.name}</p>
          </div>

          <div className="reveal order-first flex flex-col items-center gap-6 md:order-last">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 scale-[3] rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 scale-[4] rounded-full bg-indigo-400/[0.08] blur-[80px]" />
              <div className="group relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full shadow-[0_0_80px_20px_rgba(99,102,241,0.06)] ring-1 ring-indigo-400/20 ring-offset-4 ring-offset-background">
                <img
                  src="/imgs/ing-eric.webp"
                  alt={profile.name}
                  loading="lazy"
                  width={224}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
              </div>
              <span className="absolute bottom-3 left-3 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-background bg-green-500" />
              </span>
              <div className="animate-float absolute -top-2 -right-4 rounded-2xl border border-border/50 bg-background/80 p-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-foreground">{profile.role}</span>
                </div>
              </div>
              <div className="animate-float anim-delay-1 absolute -bottom-2 -right-2 rounded-2xl border border-border/50 bg-background/80 p-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-foreground">{profile.available}</span>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="glass flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm font-semibold">{profile.emailCta}</span>
            </a>

            <div className="flex w-full gap-3">
              <a
                href={`tel:+52${profile.phone}`}
                className="glass flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm font-semibold">{profile.phoneDisplay}</span>
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.linkedin.label}
                className="glass flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
