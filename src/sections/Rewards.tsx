import { useEffect, useRef } from 'react';
import { Star, Smartphone, Package, Archive, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

const icons = [Star, Smartphone, Package, Archive, Eye];

export default function Rewards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const copy = t.rewards;
  const rewards = copy.items;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1 });
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
    <section
      id="rewards"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
          {rewards.map((reward, index) => {
            const Icon = icons[index];
            return (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className={`relative rounded-2xl p-5 sm:p-6 opacity-0 card-glow ${
                reward.highlight
                  ? 'bg-gradient-to-b from-gold/15 to-gold/5 border-2 border-gold/40'
                  : 'glass-panel'
              }`}
            >
              {reward.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-forest-deep text-xs font-inter font-semibold tracking-wider">
                  {copy.popular}
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                reward.highlight ? 'bg-gold/20' : 'bg-ivory/5'
              }`}>
                <Icon size={22} className={reward.highlight ? 'text-gold' : 'text-ivory/50'} />
              </div>

              <h3 className="font-playfair text-lg text-ivory font-semibold mb-1">
                {reward.tier}
              </h3>

              <ul className="space-y-2.5">
                {reward.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0 mt-2" />
                    <span className="text-ivory/60 font-inter text-xs sm:text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full mt-6 py-3 rounded-lg text-sm font-inter font-medium tracking-wide transition-all duration-300 ${
                reward.highlight
                  ? 'bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30'
                  : 'bg-ivory/5 text-ivory/70 border border-ivory/15 hover:bg-ivory/10'
              }`}>
                {copy.cta}
              </button>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
