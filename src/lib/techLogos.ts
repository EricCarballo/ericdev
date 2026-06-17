export interface TechLogo {
  name: string;
  slug: string | null;
}

const TECH_SLUGS: Record<string, string | null> = {
  React: 'react',
  'Next.js': 'nextdotjs',
  TypeScript: 'typescript',
  'Tailwind CSS': 'tailwindcss',
  JavaScript: 'javascript',
  CSS: 'css',
  NestJS: 'nestjs',
  'Node.js': 'nodedotjs',
  SQL: null,
  PostgreSQL: 'postgresql',
  MongoDB: 'mongodb',
  Git: 'git',
  GitHub: 'github',
  'VS Code': 'visualstudiocode',
  Postman: 'postman',
  'Docker Desktop': 'docker',
  UiPath: 'uipath',
};

export function resolveTechLogo(name: string): TechLogo {
  const slug = TECH_SLUGS[name];
  if (slug === undefined) {
    return { name, slug: name.toLowerCase().replace(/\s+/g, '') };
  }
  return { name, slug };
}

export function techLogoUrl(slug: string): string {
  return `/icons/tech/${slug}.svg`;
}
