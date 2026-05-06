import { useEffect, useRef } from 'react';
import { Heart, Brain, Box } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

const icons = [Heart, Brain, Box];

export default function WhatIs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const copy = t.whatIs;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15 });
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
          <p className="section-subtitle mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {copy.features.map((feature, index) => {
            const Icon = icons[index];
            return (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="glass-panel rounded-2xl p-6 sm:p-8 card-glow opacity-0"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                <Icon size={24} className="text-gold" />
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl text-ivory font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-ivory/60 font-inter text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
