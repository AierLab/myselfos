import { useEffect, useRef } from 'react';
import { Sparkles, Lock, Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';
import ProgressiveImage from '../components/ProgressiveImage';

gsap.registerPlugin(ScrollTrigger);

export default function CelestialEdition() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.celestial;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (imageRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 });
        },
        once: true,
      });
      triggers.push(st);
    }

    if (contentRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3 });
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
      {/* Celestial background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(100,180,220,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(180,200,220,0.05)_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1 opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-300/30 bg-sky-300/10 mb-6">
              <Sparkles size={14} className="text-sky-300" />
              <span className="text-sky-300 text-xs font-inter tracking-wider uppercase">
                {copy.tag}
              </span>
            </div>

            <h2 className="section-title">
              {copy.title}
              <br />
              <span className="text-sky-200/70 text-3xl sm:text-4xl lg:text-5xl">{copy.sub}</span>
            </h2>

            <p className="mt-6 text-ivory/60 font-inter text-base sm:text-lg leading-relaxed">
              {copy.description}
            </p>

            <div className="mt-8 p-6 rounded-2xl border border-sky-300/15 bg-sky-900/5">
              <p className="text-sky-200/80 font-cinzel text-lg tracking-wider italic">
                {copy.quote}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-sky-300/20 text-sky-300/60 text-xs font-inter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-sky-300/15 bg-sky-300/5">
              <Info size={16} className="text-sky-300 flex-shrink-0 mt-0.5" />
              <p className="text-sky-200/60 text-xs font-inter leading-relaxed">
                {copy.note}
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2 flex justify-center opacity-0">
            <div className="relative group max-w-[420px] lg:max-w-[480px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-900/20 via-blue-500/10 to-sky-900/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="relative rounded-2xl overflow-hidden border border-sky-300/20">
                <ProgressiveImage
                  src={copy.image}
                  alt={copy.imageAlt}
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 100vw"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-forest-deep/30" />

                {/* Lock overlay */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-forest-deep/80 border border-sky-300/30 flex items-center justify-center">
                    <Lock size={16} className="text-sky-300" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="font-cinzel text-sky-300 text-sm tracking-wider">INFJ × Aquarius</p>
                  <p className="font-playfair text-ivory text-xl sm:text-2xl font-semibold mt-1">
                    {copy.imageTitle}
                  </p>
                  <p className="text-sky-200/50 text-xs font-inter mt-2">
                    {copy.imageSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
