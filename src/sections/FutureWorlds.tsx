import { useEffect, useRef } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';
import ProgressiveImage from '../components/ProgressiveImage';

gsap.registerPlugin(ScrollTrigger);

const colors = ['from-amber-500/20 to-yellow-500/10', 'from-violet-500/20 to-purple-500/10', 'from-sky-500/20 to-blue-500/10'];

export default function FutureWorlds() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const copy = t.future;
  const worlds = copy.cards;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15 });
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">{copy.kicker}</p>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {worlds.map((world, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="relative group rounded-2xl overflow-hidden card-glow opacity-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <ProgressiveImage
                  src={world.image}
                  alt={world.name}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Color wash overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${colors[index]} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />

                {/* 70% badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400 text-xs font-inter">
                    <Eye size={12} />
                    {world.percent} {copy.revealed}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="font-cinzel text-gold text-sm tracking-wider">{world.title}</p>
                  <h3 className="font-playfair text-xl sm:text-2xl text-ivory font-semibold mt-1">
                    {world.name}
                  </h3>
                  <p className="text-ivory/40 text-xs font-inter mt-2">
                    {copy.footer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="btn-secondary inline-flex items-center gap-2 text-sm">
            {copy.cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
