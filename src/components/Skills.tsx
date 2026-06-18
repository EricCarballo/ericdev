import { useMetricsAnimation } from '@/hooks/useMetricsAnimation';
import { useIntersectionOnce } from '@/hooks/useIntersectionOnce';
import type { SkillsProps } from '@/interfaces/components/skills';
import CertificationsBlock from '@/components/skills/CertificationsBlock';
import EducationMethodologiesGrid from '@/components/skills/EducationMethodologiesGrid';
import ExperienceCard from '@/components/skills/ExperienceCard';
import MetricsGrid from '@/components/skills/MetricsGrid';
import SkillsSectionHeader from '@/components/skills/SkillsSectionHeader';

export default function Skills({ copy }: SkillsProps) {
  const { skills, profile, experience, education, certifications, methodologies, metrics } = copy;
  const metricsAnimation = useMetricsAnimation(metrics.items);
  const sectionRef = useIntersectionOnce(metricsAnimation.runAnimation);

  return (
    <section ref={sectionRef} id="skills" className="section-pad relative">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SkillsSectionHeader skills={skills} profile={profile} />
        <ExperienceCard skills={skills} experience={experience} />

        <div className="reveal delay-150 flex flex-col gap-4">
          <EducationMethodologiesGrid
            skills={skills}
            education={education}
            methodologies={methodologies}
          />
          <CertificationsBlock skills={skills} certifications={certifications} />
        </div>

        <MetricsGrid title={metrics.title} items={metrics.items} animation={metricsAnimation} />
      </div>
    </section>
  );
}
