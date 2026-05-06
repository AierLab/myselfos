import { useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';
import ProgressiveImage from '../components/ProgressiveImage';

gsap.registerPlugin(ScrollTrigger);

export default function HiddenArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const copy = t.hidden;
  const hiddenCards = copy.cards;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.2 });
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {hiddenCards.map((card, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="relative group rounded-2xl overflow-hidden card-glow opacity-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <ProgressiveImage
                  src={card.image}
                  alt={card.name}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark locked overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/50 to-forest-deep/30" />

                {/* Lock icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest-deep/80 border border-gold/30 flex items-center justify-center animate-pulse-glow">
                    <Lock size={28} className="text-gold sm:w-8 sm:h-8" />
                  </div>
                </div>

                {/* Forest glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,90,50,0.15)_0%,_transparent_70%)]" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-ivory/20 bg-ivory/5 text-ivory/50 text-xs font-inter mb-3">
                    <Lock size={10} />
                    {copy.lockedTag}
                  </div>
                  <p className="font-cinzel text-gold text-sm tracking-wider">{card.title}</p>
                  <h3 className="font-playfair text-2xl sm:text-3xl text-ivory font-semibold mt-1">
                    {card.name}
                  </h3>
                  <p className="text-ivory/50 font-inter text-sm italic mt-3">
                    "{card.copy}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
