import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { languageOptions } from '../i18n/content';
import { useLanguage } from '../i18n/language';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-forest-deep/90 backdrop-blur-xl border-b border-gold/20 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-3"
          >
            <img
              src={t.logo}
              alt="MySelfOS"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
            />
            <span className="font-cinzel text-gold text-sm sm:text-base tracking-widest font-semibold">
              MySelfOS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-ivory/70 hover:text-gold text-sm font-inter tracking-wide transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-ivory/60 text-xs font-inter tracking-wide">{t.languageLabel}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
                className="bg-forest-deep/80 border border-gold/30 rounded-md px-2 py-1 text-xs text-ivory font-inter"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-forest-deep text-ivory">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('#final-cta')}
              className="px-5 py-2 text-sm font-inter text-ivory bg-gold/20 border border-gold/40 rounded-lg hover:bg-gold/30 transition-all duration-300"
            >
              {t.nav.waitlist}
            </button>
          </div>

          <button
            className="md:hidden text-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-forest-deep/95 backdrop-blur-xl border-t border-gold/20">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 pb-2">
              <span className="text-ivory/60 text-xs font-inter tracking-wide">{t.languageLabel}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
                className="bg-forest-deep/80 border border-gold/30 rounded-md px-2 py-1 text-xs text-ivory font-inter"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-forest-deep text-ivory">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="block text-ivory/70 hover:text-gold text-sm font-inter tracking-wide py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo('#final-cta')}
              className="w-full mt-2 px-5 py-3 text-sm font-inter text-ivory bg-gold/20 border border-gold/40 rounded-lg"
            >
              {t.nav.waitlist}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
