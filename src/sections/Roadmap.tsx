import { useEffect, useRef } from 'react';
import { Smartphone, Package, Radio, Truck, Expand } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

const icons = [Smartphone, Package, Radio, Truck, Expand];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const phasesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.roadmap;
  const phases = copy.phases;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    phasesRef.current.forEach((phase, i) => {
      if (!phase) return;
      const st = ScrollTrigger.create({
        trigger: phase,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(phase, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.7, delay: i * 0.1 });
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
          {/* Vertical line for desktop */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent origin-top -translate-x-1/2"
          />

          <div className="space-y-8 lg:space-y-0">
            {phases.map((phase, index) => {
              const Icon = icons[index];
              return (
              <div
                key={index}
                ref={el => { phasesRef.current[index] = el; }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 opacity-0 ${
                  index % 2 === 0 ? '' : 'lg:[direction:rtl]'
                }`}
              >
                {/* Content */}
                <div className={`lg:p-8 ${index % 2 === 0 ? 'lg:text-right lg:[direction:ltr]' : 'lg:text-left lg:[direction:ltr]'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <span className="text-gold/50 text-xs font-inter tracking-wider">{phase.phase}</span>
                    <div className="h-px w-8 bg-gold/20" />
                    <span className="px-2 py-0.5 rounded-full bg-ivory/5 text-ivory/40 text-[10px] font-inter border border-ivory/10">
                      {phase.status}
                    </span>
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl text-ivory font-semibold mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-ivory/50 font-inter text-sm sm:text-base leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {/* Icon node - centered on line for desktop */}
                <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-forest-deep border border-gold/30 flex items-center justify-center shadow-lg shadow-gold/10 z-10">
                    <Icon size={20} className="text-gold" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block" />
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
