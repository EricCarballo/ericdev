import { Mail, MapPin } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import type { UITranslations } from '@/i18n/ui';

export interface AboutCopy {
  about: UITranslations['about'];
  profile: UITranslations['profile'];
}

interface AboutProps {
  copy: AboutCopy;
}

export default function About({ copy }: AboutProps) {
  const { about, profile } = copy;

  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-10">
          <p className="section-label text-center md:text-left">{profile.aboutTitle}</p>
          <h2 className="section-title text-center md:text-left">
            {about.title} <span className="text-primary">{about.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal order-2 space-y-5 leading-relaxed text-muted-foreground delay-150 lg:order-1 lg:col-span-7">
            <p className="text-base md:text-lg">{profile.bio}</p>
            <p className="text-sm font-medium text-foreground/80">{profile.name}</p>
          </div>

          <div className="reveal order-1 flex flex-col items-center gap-6 lg:order-2 lg:col-span-5">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 scale-[3] rounded-full bg-blue-500/10 dark:bg-blue-500/10" />
              <div className="group relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full shadow-lg shadow-black/5 ring-1 ring-border/60 ring-offset-4 ring-offset-background dark:shadow-[0_0_80px_20px_rgba(99,102,241,0.06)] dark:ring-indigo-400/20">
                <img
                  src="/imgs/ing-eric.webp"
                  alt={profile.name}
                  loading="lazy"
                  width={224}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
              </div>
              <div className="animate-float absolute -top-2 -right-4 rounded-2xl border border-border/50 bg-card p-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-foreground">{profile.role}</span>
                </div>
              </div>
              <div className="animate-float anim-delay-1 absolute -bottom-2 -right-2 rounded-2xl border border-border/50 bg-card p-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-medium text-foreground">{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="glass flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm font-semibold">{profile.emailCta}</span>
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
