import { useEffect, useRef, useState } from 'react';
import { Lock, Unlock, Eye, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';
import ProgressiveImage from '../components/ProgressiveImage';

gsap.registerPlugin(ScrollTrigger);

function StatusBadge({ status, percent, labels }: { status: 'unlocked' | 'partial' | 'locked' | 'celestial' | 'sealed'; percent?: string; labels: { locked: string; celestial: string; sealed: string } }) {
  const configs = {
    unlocked: { icon: Unlock, text: percent || '100%', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10' },
    partial: { icon: Eye, text: percent || '70%', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' },
    locked: { icon: Lock, text: labels.locked, color: 'text-ivory/50 border-ivory/20 bg-ivory/5' },
    celestial: { icon: Sparkles, text: labels.celestial, color: 'text-sky-300 border-sky-300/40 bg-sky-300/10' },
    sealed: { icon: Lock, text: labels.sealed, color: 'text-violet-300 border-violet-300/40 bg-violet-300/10' },
  };

  const config = configs[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.color} text-xs font-inter tracking-wider`}>
      <config.icon size={12} />
      {config.text}
    </div>
  );
}

export default function UnlockArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { t } = useLanguage();
  const copy = t.unlock;
  const cards = copy.cards;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (gridRef.current) {
      const st = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            gridRef.current!.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
          );
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
      id="unlock-archive"
      ref={sectionRef}
      className="relative z-10 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">{copy.kicker}</p>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {copy.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative group rounded-2xl overflow-hidden card-glow cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <ProgressiveImage
                  src={card.image}
                  alt={card.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Status overlay */}
                {card.status !== 'unlocked' && (
                  <div className="absolute inset-0 locked-overlay" />
                )}

                {/* Hover info overlay */}
                <div className={`absolute inset-0 bg-forest-deep/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
                  hoveredCard === card.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <p className="text-gold font-cinzel text-lg tracking-wider mb-2">{card.title}</p>
                  <p className="text-ivory/70 font-inter text-sm text-center leading-relaxed">{card.hoverCopy}</p>
                </div>

                {/* Top status badge */}
                <div className="absolute top-3 left-3 z-10">
                  <StatusBadge status={card.status} percent={'percent' in card ? card.percent : undefined} labels={copy.status} />
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest-deep/95 to-transparent">
                  <p className="text-gold font-cinzel text-sm sm:text-base tracking-wider">{card.title}</p>
                  <p className="text-ivory/60 font-inter text-xs mt-0.5">{card.subtitle}</p>
                  <p className="text-ivory/40 font-inter text-[10px] sm:text-xs mt-1">{card.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
