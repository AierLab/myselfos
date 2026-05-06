import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

export default function FirstForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.firstForm;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (imageRef.current) {
      const st1 = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(imageRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9 });
        },
        once: true,
      });
      triggers.push(st1);
    }

    if (contentRef.current) {
      const st2 = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.2 });
        },
        once: true,
      });
      triggers.push(st2);
    }

    return () => {
      triggers.forEach(st => st.kill());
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="first-form"
      ref={sectionRef}
      className="relative z-10 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="flex justify-center opacity-0">
            <div className="relative group max-w-[420px] lg:max-w-[500px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-900/30 via-gold/10 to-emerald-900/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="relative gold-border-glow rounded-2xl overflow-hidden">
                <img
                  src={copy.image}
                  alt={copy.imageAlt}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-forest-deep/95 border border-gold/30 rounded-full">
                <span className="text-gold text-xs font-inter tracking-wider uppercase">{copy.badge}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">
              {copy.kicker}
            </p>
            <h2 className="section-title">
              {copy.title}
              <br />
              <span className="text-ivory/70">{copy.sub}</span>
            </h2>
            <p className="mt-6 text-ivory/60 font-inter text-base sm:text-lg leading-relaxed">
              {copy.description}
            </p>

            <div className="mt-8 space-y-3">
              {copy.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-gold" />
                  </div>
                  <span className="text-ivory/70 font-inter text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo('#rewards')}
              className="mt-10 btn-primary inline-flex items-center gap-2"
            >
              {copy.cta}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
