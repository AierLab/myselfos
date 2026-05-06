import { useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

export default function UnknownGate() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.unknown;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (contentRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
        },
        once: true,
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 section-padding overflow-hidden"
    >
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(60,40,100,0.15)_0%,_transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />

      <div ref={contentRef} className="max-w-4xl mx-auto text-center relative opacity-0">
        <div className="relative max-w-[380px] sm:max-w-[420px] mx-auto mb-10 sm:mb-14">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-900/20 via-gold/10 to-violet-900/20 rounded-3xl blur-2xl opacity-30" />
          <div className="relative rounded-2xl overflow-hidden border border-violet-300/20">
            <img
              src={copy.image}
              alt={copy.imageAlt}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/40 to-transparent" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-forest-deep/90 border border-gold/30 flex items-center justify-center animate-pulse-glow">
                <Lock size={32} className="text-gold sm:w-10 sm:h-10" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="font-cinzel text-gold text-sm tracking-wider">{copy.imageKicker}</p>
              <p className="font-playfair text-ivory text-2xl sm:text-3xl font-semibold mt-1">
                {copy.imageTitle}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gold/60 text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">
          {copy.kicker}
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-ivory font-semibold tracking-wide">
          {copy.title}
          <br />
          <span className="text-ivory/50">{copy.sub}</span>
        </h2>
        <p className="mt-6 text-ivory/40 font-inter text-base sm:text-lg leading-relaxed max-w-lg mx-auto italic">
          {copy.description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gold/20" />
          <span className="text-gold/30 text-xs font-inter tracking-[0.3em] uppercase">{copy.footer}</span>
          <div className="h-px w-12 bg-gold/20" />
        </div>
      </div>
    </section>
  );
}
