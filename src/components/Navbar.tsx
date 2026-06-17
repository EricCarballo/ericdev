import { useEffect, useRef, useState } from 'react';
import { Download, Menu, Moon, Sun, Terminal, X, Mail } from 'lucide-react';
import type { UITranslations } from '@/i18n/ui';

export type NavCopy = UITranslations['nav'];

interface NavbarProps {
  lang: 'es' | 'en';
  copy: NavCopy;
  email: string;
  cvUrl: string;
  cvFileName: string;
}

export default function Navbar({ lang, copy, email, cvUrl, cvFileName }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const lastScrollYRef = useRef(0);

  const navLinks = [
    { sectionId: 'top', label: copy.home },
    { sectionId: 'skills', label: copy.skills },
    { sectionId: 'projects', label: copy.projects },
    { sectionId: 'optimizations', label: copy.optimizations },
    { sectionId: 'about', label: copy.about },
    { sectionId: 'contact', label: copy.contact },
  ];

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (menuOpen) return;
      setHidden(currentScrollY > lastScrollYRef.current && currentScrollY > 150);
      setIsScrolled(currentScrollY > 50);
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      window.location.href = `mailto:${email}`;
      setMenuOpen(false);
      return;
    }
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    root.classList.toggle('dark', next === 'dark');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('theme-transitioning'));
    });
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled || menuOpen
            ? 'border-b border-border/50 bg-background/95 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 lg:px-6">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="group flex cursor-pointer items-center gap-3"
            aria-label="eric.dev"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/[0.08] bg-foreground/10 transition-colors group-hover:border-foreground/20 group-hover:bg-foreground/15">
              <Terminal className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base">
              eric<span className="text-muted-foreground">.dev</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label={copy.navigation}>
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => scrollToSection(link.sectionId)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="inline-flex items-center gap-2">
            <a
              href={cvUrl}
              download={cvFileName}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-border/50 bg-transparent px-3 text-xs font-semibold text-foreground transition-all hover:bg-foreground/10 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              {copy.downloadCv}
            </a>

            <nav
              aria-label="Language selector"
              className="flex rounded-full border border-border/50 bg-transparent p-0.5"
            >
              <a
                href="/"
                hrefLang="es"
                lang="es"
                aria-current={lang === 'es' ? 'page' : undefined}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors sm:px-3 ${
                  lang === 'es'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {copy.languageEs}
              </a>
              <a
                href="/en/"
                hrefLang="en"
                lang="en"
                aria-current={lang === 'en' ? 'page' : undefined}
                className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors sm:px-3 ${
                  lang === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {copy.languageEn}
              </a>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={theme === 'dark' ? copy.themeLight : copy.themeDark}
              className="group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-transparent text-foreground transition-all hover:bg-foreground/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 ml-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border/50 bg-foreground/5 text-foreground transition-all hover:bg-foreground/10 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background/90 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <div
        className={`fixed bottom-0 right-0 top-0 z-40 flex w-full max-w-md flex-col overflow-y-auto border-l border-border/50 bg-background transition-transform duration-500 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-20">
          <nav aria-label={copy.navigation} className="mb-8 flex flex-col gap-4">
            <span className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {copy.navigation}
            </span>
            {navLinks.map((link, i) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => scrollToSection(link.sectionId)}
                className={`w-fit cursor-pointer text-left text-3xl font-semibold transition-all duration-300 ${
                  menuOpen ? `translate-x-0 opacity-100 nav-delay-${i}` : 'translate-x-8 opacity-0 nav-delay-none'
                }`}
              >
                <span className="text-foreground/70 transition-colors duration-200 hover:text-foreground">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="mb-6 h-px w-full bg-border/50" />
            <a
              href={cvUrl}
              download={cvFileName}
              className="mb-4 flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
            >
              <Download className="h-5 w-5" />
              <span>{copy.downloadCv}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
