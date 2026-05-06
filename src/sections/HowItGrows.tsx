import { useEffect, useRef } from 'react';
import { Footprints, Eye, Globe, Archive, Package } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

const icons = [Footprints, Eye, Globe, Archive, Package];

export default function HowItGrows() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.how;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(step, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.12 });
        },
        once: true,
      });
      triggers.push(st);
    });

    if (lineRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: 'power2.out', transformOrigin: 'top' });
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
    <section ref={sectionRef} className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">{copy.kicker}</p>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {copy.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent origin-top"
          />

          <div className="space-y-10 sm:space-y-12">
            {copy.steps.map((step, index) => {
              const Icon = icons[index];
              return (
              <div
                key={index}
                ref={el => { stepsRef.current[index] = el; }}
                className="relative flex items-start gap-6 sm:gap-8 opacity-0"
              >
                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-forest-deep border border-gold/40 flex items-center justify-center shadow-lg shadow-gold/10">
                  <Icon size={22} className="text-gold sm:w-6 sm:h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 sm:pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold/50 text-xs font-inter tracking-wider">
                      {copy.stepLabel} {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-gold/10" />
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl text-ivory font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ivory/50 font-inter text-sm sm:text-base leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
