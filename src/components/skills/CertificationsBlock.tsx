import { Award, ExternalLink, Rocket } from 'lucide-react';
import type { SkillsCopy } from '@/interfaces/components/skills';

interface CertificationsBlockProps {
  skills: SkillsCopy['skills'];
  certifications: SkillsCopy['certifications'];
}

export default function CertificationsBlock({ skills, certifications }: CertificationsBlockProps) {
  return (
    <div className="glow-card rounded-3xl border border-foreground/5 bg-background p-5 dark:bg-white/[0.03] md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Award className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          {skills.certificationsTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4 md:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
              <Rocket className="h-3 w-3" aria-hidden="true" />
              {certifications.hackathonBadge}
            </span>
          </div>
          <h4 className="mb-1 text-sm font-semibold leading-tight text-foreground md:text-base">
            {certifications.nasa.role}
          </h4>
          <div className="mb-2 text-xs font-medium text-primary md:text-sm">{certifications.nasa.event}</div>
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
            {certifications.nasa.description}
          </p>
          <a
            href={certifications.nasa.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/10 px-3.5 py-2 text-xs font-semibold text-violet-700 transition-colors hover:border-violet-500/40 hover:bg-violet-500/15 dark:text-violet-300"
          >
            {certifications.viewCertificate}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {certifications.certificationsSection}
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {certifications.certs.map((cert) => (
              <li
                key={cert}
                className="flex h-full flex-col rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-3"
              >
                <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <Award className="h-2.5 w-2.5" aria-hidden="true" />
                  {certifications.certificationBadge}
                </span>
                <p className="text-xs font-medium leading-snug text-foreground/90">{cert}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
