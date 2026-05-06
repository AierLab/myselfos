import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../i18n/language';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.hero;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(badgeRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.7)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      .fromTo(imageRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.4);

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep via-forest to-forest-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,70,50,0.4)_0%,_transparent_70%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 mb-6 sm:mb-8">
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-xs sm:text-sm font-inter tracking-wider uppercase">
              {copy.badge}
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-ivory font-semibold leading-tight tracking-wide"
          >
            {copy.titleTop} <span className="text-gold">{copy.titleHighlight}</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-ivory/80">
              {copy.titleSub}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-ivory/60 font-inter leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            {copy.description}
          </p>

          <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => scrollTo('#final-cta')}
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {copy.ctaPrimary}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollTo('#unlock-archive')}
              className="btn-secondary inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {copy.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div ref={imageRef} className="order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-emerald-500/10 to-gold/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="relative gold-border-glow rounded-2xl overflow-hidden max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">
              <img
                src={copy.image}
                alt={copy.imageAlt}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-forest-deep/95 to-transparent">
                <p className="font-cinzel text-gold text-xs sm:text-sm tracking-widest uppercase">{copy.imageKicker}</p>
                <p className="font-inter text-ivory/70 text-xs sm:text-sm mt-1">{copy.imageSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-ivory/50 text-xs font-inter tracking-wider uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}
