import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.final;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (contentRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
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
      id="final-cta"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep via-forest to-forest-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,70,50,0.5)_0%,_transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />

      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative opacity-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8">
          <Sparkles size={14} className="text-gold" />
          <span className="text-gold text-xs font-inter tracking-wider uppercase">
            {copy.tag}
          </span>
        </div>

        <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-ivory font-semibold tracking-wide leading-tight">
          {copy.titleTop}
          <br />
          <span className="text-gold">{copy.titleHighlight}</span>
        </h2>

        <p className="mt-8 text-ivory/60 font-inter text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          {copy.description}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary inline-flex items-center justify-center gap-2 text-base px-10 py-5">
            {copy.cta}
            <ArrowRight size={18} />
          </button>
        </div>

        <p className="mt-6 text-ivory/30 text-xs font-inter">
          {copy.note}
        </p>
      </div>
    </section>
  );
}
