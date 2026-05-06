import { Mail } from 'lucide-react';
import { useLanguage } from '../i18n/language';

export default function Footer() {
  const { t } = useLanguage();
  const copy = t.footer;
  const hrefs = ['#first-form', '#unlock-archive', '#milestones', '#rewards', '#faq'];

  return (
    <footer className="relative z-10 border-t border-gold/10 bg-forest-deep/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.logo}
                alt="MySelfOS"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <span className="font-cinzel text-gold text-base tracking-widest font-semibold block">
                  MySelfOS
                </span>
                <span className="text-ivory/30 text-xs font-inter tracking-wider">
                  {copy.pocket}
                </span>
              </div>
            </div>
            <p className="text-ivory/40 font-inter text-sm leading-relaxed max-w-xs">
              {copy.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-cinzel text-gold text-sm tracking-wider uppercase mb-4">{copy.archive}</h4>
            <ul className="space-y-2.5">
              {copy.links.map((link, index) => (
                <li key={link}>
                  <a
                    href={hrefs[index]}
                    className="text-ivory/40 hover:text-gold font-inter text-sm transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-gold text-sm tracking-wider uppercase mb-4">{copy.connect}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold/50" />
                <span className="text-ivory/40 font-inter text-sm">wangwenyuu0212@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/25 text-xs font-inter">
            {copy.rights}
          </p>
          <p className="text-ivory/25 text-xs font-inter">
            {copy.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
