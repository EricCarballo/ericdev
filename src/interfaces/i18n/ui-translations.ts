export interface MetricItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface LighthouseMetricItem {
  label: string;
  value: number;
  icon: 'zap' | 'search' | 'check' | 'mobile';
}

export interface UITranslations {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  a11y: {
    skipToContent: string;
  };
  hero: {
    heading: string;
    headingHighlight: string;
    roles: string[];
    viewProjects: string;
    contact: string;
    downloadCv: string;
    available: string;
  };
  cv: {
    url: string;
    fileName: string;
  };
  profile: {
    aboutTitle: string;
    name: string;
    role: string;
    bio: string;
    email: string;
    emailCta: string;
    linkedin: {
      url: string;
      label: string;
    };
    location: string;
    available: string;
  };
  skills: {
    title: string;
    titleHighlight: string;
    contactMe: string;
    linkedinCta: string;
    workExperience: string;
    educationTitle: string;
    certificationsTitle: string;
    methodologiesTitle: string;
    sectionLabel: string;
    hardSkillsLabel: string;
    categoryLabels: {
      frontend: string;
      backend: string;
      tools: string;
    };
    fileName: string;
    codeComment: string;
    categories: {
      frontend: string[];
      backend: string[];
      tools: string[];
    };
  };
  education: {
    title: string;
    items: Array<{
      degree: string;
      institution: string;
      period: string;
    }>;
  };
  projects: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    sectionLabel: string;
    visitSite: string;
    demoCredentialsTitle: string;
    demoCredentialsOpen: string;
    demoCredentialsClose: string;
    demoCredentialsColumns: {
      email: string;
      password: string;
      role: string;
      panel: string;
    };
    items: Array<{
      eyebrow: string;
      appName: string;
      title: string;
      description: string;
      url: string;
      image: string;
      imageAlt: string;
      badges: string[];
      demoCredentials?: Array<{
        email: string;
        password: string;
        role: string;
        panel: string;
      }>;
    }>;
  };
  about: {
    title: string;
    titleHighlight: string;
  };
  experience: {
    title: string;
    company: string;
    role: string;
    period: string;
    stack: string[];
    bullets: string[];
    showMore: string;
    showLess: string;
    visibleCount: number;
  };
  certifications: {
    title: string;
    hackathonBadge: string;
    certificationBadge: string;
    certificationsSection: string;
    viewCertificate: string;
    nasa: {
      role: string;
      event: string;
      description: string;
      certificateUrl: string;
    };
    certs: string[];
  };
  methodologies: {
    title: string;
    items: string[];
  };
  metrics: {
    title: string;
    items: MetricItem[];
  };
  lighthouse: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    reportFile: string;
    replay: string;
    techUsed: string;
    metrics: LighthouseMetricItem[];
    features: Array<{ title: string; description: string }>;
    techStack: string[];
  };
  footer: {
    tagline: string;
    navigation: string;
    technologies: string;
    copyright: string;
    links: Array<{ name: string; href: string }>;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    optimizations: string;
    contact: string;
    downloadCv: string;
    navigation: string;
    themeLight: string;
    themeDark: string;
    languageEs: string;
    languageEn: string;
  };
}
