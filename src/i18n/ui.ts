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

export const ui: Record<'es' | 'en', UITranslations> = {
  es: {
    meta: {
      title: 'Eric Jasiel Carballo Leal — Ing. en Software',
      description:
        'Portafolio profesional de Eric Jasiel Carballo Leal. Desarrollador FullStack especializado en Next.js, NestJS.',
      ogImage: '/imgs/ing-eric.webp',
    },
    a11y: {
      skipToContent: 'Saltar al contenido',
    },
    hero: {
      heading: 'Desarrollo software que',
      headingHighlight: 'impulsa el crecimiento de tu negocio',
      roles: [
        'Ing. Eric Carballo',
        'FullStack Developer',
      ],
      viewProjects: 'Ver proyectos',
      contact: 'Contactar',
      downloadCv: 'Descargar CV',
      available: 'Disponible para trabajar',
    },
    cv: {
      url: '/cv/eric-cv.pdf',
      fileName: 'Eric-Carballo-CV.pdf',
    },
    profile: {
      aboutTitle: 'Acerca de mí',
      name: 'Eric Jasiel Carballo Leal',
      role: 'Ing. en Software · FullStack Developer',
      bio: 'Soy una persona apasionada por la tecnología que busca cada día mejorar como Ing. en Software, que le gusta aprender nuevas tecnologías y actualizándose al cambio del mañana.',
      email: 'ecarballo333@gmail.com',
      emailCta: 'Enviar correo',
      linkedin: {
        url: 'https://www.linkedin.com/in/eric-jasiel-carballo-leal-3aa030341/',
        label: 'LinkedIn',
      },
      location: 'Sonora, MX',
      available: 'Disponible para trabajar',
    },
    skills: {
      title: 'Experiencia',
      titleHighlight: ' y formación',
      contactMe: 'Contáctame',
      linkedinCta: 'LinkedIn',
      workExperience: 'Experiencia laboral',
      educationTitle: 'Educación',
      certificationsTitle: 'Certificaciones y Hackathons',
      methodologiesTitle: 'Metodologías y habilidades blandas',
      sectionLabel: 'Trayectoria profesional',
      hardSkillsLabel: 'Stack técnico',
      categoryLabels: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Herramientas',
      },
      fileName: 'skills.ts',
      codeComment: '// Stack principal — Eric Carballo',
      categories: {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'CSS'],
        backend: ['NestJS', 'Node.js', 'SQL', 'PostgreSQL', 'MongoDB'],
        tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker Desktop', 'UiPath'],
      },
    },
    education: {
      title: 'Educación',
      items: [
        {
          degree: 'Ingeniería en Software',
          institution: 'Instituto Tecnológico de Sonora (ITSON)',
          period: '2019 — 2023',
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      titleHighlight: ' destacados',
      subtitle: 'Productos reales con impacto en operaciones y negocio.',
      sectionLabel: 'Portafolio',
      visitSite: 'Visitar sitio',
      demoCredentialsTitle: 'Credenciales de demo',
      demoCredentialsOpen: 'Ver credenciales de demo',
      demoCredentialsClose: 'Cerrar credenciales',
      demoCredentialsColumns: {
        email: 'Email',
        password: 'Contraseña',
        role: 'Rol',
        panel: 'Panel principal',
      },
      items: [
        {
          eyebrow: 'SaaS en producción',
          appName: 'MenuSync',
          title: 'SaaS Integral de Gestión de Restaurantes',
          url: 'https://menusync-app.vercel.app/',
          image: '/imgs/dashboard.webp',
          imageAlt:
            'Captura del panel MenuSync — sistema de gestión para Restaurante Rene\'s',
          description:
            'Aplicación en tiempo real con WebSockets (Socket.io): órdenes sincronizadas entre meseros, cocina y barra, cobros, inventario automático, proveedores, plantilla de empleados con roles y turnos, auditorías de stock y reportes exportables a Excel. Branding personalizable desde el panel.',
          badges: [
            'Next.js',
            'NestJS',
            'PostgreSQL',
            'Socket.io',
            'Prisma ORM',
            'TypeScript',
            'Tailwind CSS',
          ],
          demoCredentials: [
            { email: 'admin@demo.com', password: 'admin123', role: 'SUPER_ADMIN', panel: '/admin' },
            {
              email: 'supervisor@restaurante.com',
              password: 'supervisor123',
              role: 'SUPERVISOR',
              panel: '/admin',
            },
            { email: 'mesero1@restaurante.com', password: 'mesero123', role: 'MESERO', panel: '/mesero' },
            { email: 'mesero2@restaurante.com', password: 'mesero123', role: 'MESERO', panel: '/mesero' },
            { email: 'cocina@restaurante.com', password: 'cocina123', role: 'COCINA', panel: '/cocina' },
            { email: 'barra@restaurante.com', password: 'barra123', role: 'BARRA', panel: '/barra' },
            {
              email: 'cajero@restaurante.com',
              password: 'cajero123',
              role: 'CAJERO',
              panel: '/admin (caja)',
            },
          ],
        },
        {
          eyebrow: 'Landing comercial',
          appName: 'La Chula Tacos',
          title: 'Sitio web para restaurante street-gourmet',
          url: 'https://lachulatacos.vercel.app/',
          image: '/imgs/lachulatacos.webp',
          imageAlt:
            'Captura del sitio La Chula Tacos — landing con menú, galería y ubicación en Navojoa',
          description:
            'Sitio estático para La Chula Tacos en Navojoa, Sonora: home con menú destacado, carta completa con pestañas, página nosotros, galería con lightbox y testimonios. Contenido centralizado, despliegue optimizado en Vercel.',
          badges: ['Astro', 'Tailwind CSS', 'React', 'TypeScript'],
        },
      ],
    },
    about: {
      title: 'Acerca de',
      titleHighlight: 'mí',
    },
    experience: {
      title: 'Experiencia',
      company: 'Soa Software Factory',
      role: 'Desarrollador FullStack',
      period: '2023 — 2025',
      stack: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git'],
      showMore: 'Ver más',
      showLess: 'Ver menos',
      visibleCount: 4,
      bullets: [
        'Desarrollo e implementación de interfaces dinámicas y responsivas con Next.js, Tailwind CSS y TypeScript.',
        'Creación de componentes reutilizables y modulares siguiendo buenas prácticas de arquitectura frontend.',
        'Integración de APIs para mostrar, filtrar y manipular datos en tiempo real en la aplicación.',
        'Mantenimiento y mejora continua de funcionalidades existentes en producción.',
        'Desarrollo backend modular con NestJS y TypeScript: endpoints, lógica de negocio y servicios.',
        'Revisión de código y colaboración en equipo bajo metodología ágil (Daily scrum).',
        'Flujos de trabajo con Git y GitHub en un entorno de desarrollo colaborativo.',
        'Optimización de la experiencia de usuario en interfaces críticas del producto.',
        'Documentación técnica de módulos, APIs y procesos de desarrollo.',
      ],
    },
    certifications: {
      title: 'Certificaciones y Hackathons',
      hackathonBadge: 'Hackathon',
      certificationBadge: 'Certificación',
      certificationsSection: 'Certificaciones',
      viewCertificate: 'Ver certificado',
      nasa: {
        role: 'Desarrollador Frontend',
        event: 'NASA Space Apps Challenge 2024',
        description:
          'Reto: uso de datos de observación terrestre para decisiones agrícolas. Desarrollamos una aplicación con datos satelitales e IA que genera recomendaciones a agricultores mediante gráficos interactivos, con Next.js en frontend y NestJS en backend.',
        certificateUrl:
          'https://drive.google.com/file/d/1KT_1XKP9reOMVl1lvCCuAxksnitsXRXW/view',
      },
      certs: [
        'Next.js (Producción)',
        'Nest (Backend Escalable)',
        'UiPath (Sistemas RPA)',
      ],
    },
    methodologies: {
      title: 'Metodologías y Habilidades Blandas',
      items: [
        'Arquitectura Limpia',
        'Desarrollo Modular',
        'Gitflow',
        'Comunicación Efectiva',
        'Trabajo en Equipo',
        'Adaptabilidad',
        'Pensamiento Crítico Autodidacta',
      ],
    },
    metrics: {
      title: 'Impacto técnico',
      items: [
        {
          value: 2,
          prefix: '+',
          suffix: '',
          label: 'Años de experiencia comercial',
        },
        {
          value: 3,
          label: 'Certificaciones técnicas',
        },
        {
          value: 1,
          label: 'Proyecto SaaS en producción',
        },
      ],
    },
    lighthouse: {
      title: 'Optimización y',
      titleHighlight: 'rendimiento web',
      subtitle:
        'Auditoría Lighthouse de este portafolio: sitio estático con Astro, hidratación selectiva y assets optimizados.',
      reportFile: 'lighthouse-report.json',
      replay: 'Reproducir',
      techUsed: 'Stack del portafolio',
      metrics: [
        { label: 'Performance', value: 67, icon: 'zap' },
        { label: 'Accessibility', value: 96, icon: 'check' },
        { label: 'Best Practices', value: 100, icon: 'mobile' },
        { label: 'SEO', value: 100, icon: 'search' },
      ],
      features: [
        {
          title: 'Islas de interactividad',
          description:
            'Solo los componentes que lo necesitan se hidratan en el cliente, reduciendo JavaScript inicial.',
        },
        {
          title: 'Assets optimizados',
          description:
            'Imágenes WebP, fuentes con display swap y CSS crítico para una carga percibida más rápida.',
        },
      ],
      techStack: [
        'Astro 4',
        'React',
        'TypeScript',
        'Tailwind CSS 3',
        'GSAP',
        'Vercel',
      ],
    },
    footer: {
      tagline: 'Ing. en Software · FullStack Developer especializado en productos web en tiempo real.',
      navigation: 'Navegación',
      technologies: 'Tecnologías',
      copyright: 'Diseñado y desarrollado por Eric Jasiel Carballo Leal.',
      links: [
        { name: 'Inicio', href: '#top' },
        { name: 'Experiencia', href: '#skills' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Optimización', href: '#optimizations' },
        { name: 'Acerca de', href: '#about' },
        { name: 'Contacto', href: 'mailto:ecarballo333@gmail.com' },
      ],
    },
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      skills: 'Experiencia',
      optimizations: 'Optimización',
      contact: 'Contacto',
      downloadCv: 'CV',
      navigation: 'Navegación',
      themeLight: 'Activar modo claro',
      themeDark: 'Activar modo oscuro',
      languageEs: 'ES',
      languageEn: 'EN',
    },
  },
  en: {
    meta: {
      title: 'Eric Jasiel Carballo Leal — Software Engineer',
      description:
        'Professional portfolio of Eric Jasiel Carballo Leal. FullStack Developer specialized in Next.js, NestJS, and real-time architectures.',
      ogImage: '/imgs/ing-eric.webp',
    },
    a11y: {
      skipToContent: 'Skip to content',
    },
    hero: {
      heading: 'Software development that',
      headingHighlight: 'drives your business growth',
      roles: [
        'Eric Carballo — Software Engineer',
        'FullStack Developer',
      ],
      viewProjects: 'View projects',
      contact: 'Get in touch',
      downloadCv: 'Download CV',
      available: 'Open to work',
    },
    cv: {
      url: '/cv/eric-cv.pdf',
      fileName: 'Eric-Carballo-CV.pdf',
    },
    profile: {
      aboutTitle: 'About me',
      name: 'Eric Jasiel Carballo Leal',
      role: 'Software Engineer · FullStack Developer',
      bio: 'I am passionate about technology, constantly striving to improve as a Software Engineer, eager to learn new technologies, and adapting to tomorrow\'s changes.',
      email: 'ecarballo333@gmail.com',
      emailCta: 'Send email',
      linkedin: {
        url: 'https://www.linkedin.com/in/eric-jasiel-carballo-leal-3aa030341/',
        label: 'LinkedIn',
      },
      location: 'Sonora, MX',
      available: 'Open to work',
    },
    skills: {
      title: 'Experience',
      titleHighlight: ' & education',
      contactMe: 'Contact me',
      linkedinCta: 'LinkedIn',
      workExperience: 'Work experience',
      educationTitle: 'Education',
      certificationsTitle: 'Certifications & Hackathons',
      methodologiesTitle: 'Methodologies & soft skills',
      sectionLabel: 'Professional background',
      hardSkillsLabel: 'Tech stack',
      categoryLabels: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools',
      },
      fileName: 'skills.ts',
      codeComment: '// Core stack — Eric Carballo',
      categories: {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'CSS'],
        backend: ['NestJS', 'Node.js', 'SQL', 'PostgreSQL', 'MongoDB'],
        tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker Desktop', 'UiPath'],
      },
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: 'Software Engineering',
          institution: 'Instituto Tecnológico de Sonora (ITSON)',
          period: '2019 — 2023',
        },
      ],
    },
    projects: {
      title: 'Featured',
      titleHighlight: ' projects',
      subtitle: 'Real products with operational and business impact.',
      sectionLabel: 'Portfolio',
      visitSite: 'Visit site',
      demoCredentialsTitle: 'Demo credentials',
      demoCredentialsOpen: 'View demo credentials',
      demoCredentialsClose: 'Close credentials',
      demoCredentialsColumns: {
        email: 'Email',
        password: 'Password',
        role: 'Role',
        panel: 'Main panel',
      },
      items: [
        {
          eyebrow: 'Production SaaS',
          appName: 'MenuSync',
          title: 'Comprehensive Restaurant Management SaaS',
          url: 'https://menusync-app.vercel.app/',
          image: '/imgs/dashboard.webp',
          imageAlt:
            'MenuSync dashboard screenshot — restaurant management system for Restaurante Rene\'s',
          description:
            'Real-time app with WebSockets (Socket.io): synchronized orders between waiters, kitchen and bar, checkout, automatic inventory, suppliers, staff with roles and shifts, stock audits, and Excel exportable reports. Fully customizable branding from the admin panel.',
          badges: [
            'Next.js',
            'NestJS',
            'PostgreSQL',
            'Socket.io',
            'Prisma ORM',
            'TypeScript',
            'Tailwind CSS',
          ],
          demoCredentials: [
            { email: 'admin@demo.com', password: 'admin123', role: 'SUPER_ADMIN', panel: '/admin' },
            {
              email: 'supervisor@restaurante.com',
              password: 'supervisor123',
              role: 'SUPERVISOR',
              panel: '/admin',
            },
            { email: 'mesero1@restaurante.com', password: 'mesero123', role: 'MESERO', panel: '/mesero' },
            { email: 'mesero2@restaurante.com', password: 'mesero123', role: 'MESERO', panel: '/mesero' },
            { email: 'cocina@restaurante.com', password: 'cocina123', role: 'COCINA', panel: '/cocina' },
            { email: 'barra@restaurante.com', password: 'barra123', role: 'BARRA', panel: '/barra' },
            {
              email: 'cajero@restaurante.com',
              password: 'cajero123',
              role: 'CAJERO',
              panel: '/admin (checkout)',
            },
          ],
        },
        {
          eyebrow: 'Commercial landing',
          appName: 'La Chula Tacos',
          title: 'Street-gourmet restaurant website',
          url: 'https://lachulatacosmx.netlify.app/',
          image: '/imgs/lachulatacos.jpg',
          imageAlt:
            'La Chula Tacos website screenshot — landing with menu, gallery, and location in Navojoa',
          description:
            'Static site for La Chula Tacos in Navojoa, Sonora: home with featured menu, full menu with tabs, about page, gallery with lightbox, and testimonials. Centralized content model, optimized Netlify deployment.',
          badges: ['Astro', 'Tailwind CSS', 'React', 'TypeScript'],
        },
      ],
    },
    about: {
      title: 'About',
      titleHighlight: ' me',
    },
    experience: {
      title: 'Experience',
      company: 'Soa Software Factory',
      role: 'FullStack Developer',
      period: '2023 — 2025',
      stack: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git'],
      showMore: 'Show more',
      showLess: 'Show less',
      visibleCount: 4,
      bullets: [
        'Built dynamic, responsive interfaces with Next.js, Tailwind CSS, and TypeScript.',
        'Created reusable, modular components following solid frontend architecture practices.',
        'Integrated APIs to display, filter, and manipulate real-time data in the application.',
        'Maintained and improved existing production features on an ongoing basis.',
        'Developed modular backend with NestJS and TypeScript: endpoints, business logic, and services.',
        'Conducted code reviews and collaborated in an agile team (Daily scrum).',
        'Worked with Git and GitHub in a collaborative development environment.',
        'Optimized user experience on critical product interfaces.',
        'Wrote technical documentation for modules, APIs, and development processes.',
      ],
    },
    certifications: {
      title: 'Certifications & Hackathons',
      hackathonBadge: 'Hackathon',
      certificationBadge: 'Certification',
      certificationsSection: 'Certifications',
      viewCertificate: 'View certificate',
      nasa: {
        role: 'Frontend Developer',
        event: 'NASA Space Apps Challenge 2024',
        description:
          'Challenge: Earth observation data for agricultural decisions. We built an app using satellite data and AI to deliver farmer recommendations through interactive charts, with Next.js on the frontend and NestJS on the backend.',
        certificateUrl:
          'https://drive.google.com/file/d/1KT_1XKP9reOMVl1lvCCuAxksnitsXRXW/view',
      },
      certs: [
        'Next.js (Production)',
        'Nest (Scalable Backend)',
        'UiPath (RPA Systems)',
      ],
    },
    methodologies: {
      title: 'Methodologies & Soft Skills',
      items: [
        'Clean Architecture',
        'Modular Development',
        'Gitflow',
        'Effective Communication',
        'Teamwork',
        'Adaptability',
        'Self-taught Critical Thinking',
      ],
    },
    metrics: {
      title: 'Technical impact',
      items: [
        {
          value: 2,
          prefix: '+',
          suffix: '',
          label: 'Years of commercial experience',
        },
        {
          value: 3,
          label: 'Technical certifications',
        },
        {
          value: 1,
          label: 'SaaS product in production',
        },
      ],
    },
    lighthouse: {
      title: 'Optimization &',
      titleHighlight: 'web performance',
      subtitle:
        'Lighthouse audit of this portfolio: static site with Astro, selective hydration, and optimized assets.',
      reportFile: 'lighthouse-report.json',
      replay: 'Replay',
      techUsed: 'Portfolio stack',
      metrics: [
        { label: 'Performance', value: 67, icon: 'zap' },
        { label: 'Accessibility', value: 96, icon: 'check' },
        { label: 'Best Practices', value: 100, icon: 'mobile' },
        { label: 'SEO', value: 100, icon: 'search' },
      ],
      features: [
        {
          title: 'Interactive islands',
          description:
            'Only components that need it hydrate on the client, reducing initial JavaScript.',
        },
        {
          title: 'Optimized assets',
          description:
            'WebP images, font-display swap, and lean CSS for faster perceived loading.',
        },
      ],
      techStack: [
        'Astro 4',
        'React',
        'TypeScript',
        'Tailwind CSS 3',
        'GSAP',
        'Vercel',
      ],
    },
    footer: {
      tagline: 'Software Engineer · FullStack Developer focused on real-time web products.',
      navigation: 'Navigation',
      technologies: 'Technologies',
      copyright: 'Designed & developed by Eric Jasiel Carballo Leal.',
      links: [
        { name: 'Home', href: '#top' },
        { name: 'Experiencia', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Optimization', href: '#optimizations' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: 'mailto:ecarballo333@gmail.com' },
      ],
    },
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Experiencia',
      optimizations: 'Optimization',
      contact: 'Contact',
      downloadCv: 'CV',
      navigation: 'Navigation',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      languageEs: 'ES',
      languageEn: 'EN',
    },
  },
};
