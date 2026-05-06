import { useEffect, useRef } from 'react';
import { FlaskConical, Eye, FileText, Vote, MonitorPlay, Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';
import ProgressiveImage from '../components/ProgressiveImage';

gsap.registerPlugin(ScrollTrigger);

const icons = [FlaskConical, Eye, FileText, Vote, MonitorPlay];

export default function MilestoneSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.milestone;
  const milestones = copy.items;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (progressRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 0.2, duration: 1.2, ease: 'power2.out', transformOrigin: 'left' });
        },
        once: true,
      });
      triggers.push(st);
    }

    if (contentRef.current) {
      const st = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
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
      id="milestones"
      ref={sectionRef}
      className="relative z-10 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative group max-w-[420px] lg:max-w-[480px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-900/30 via-purple-500/10 to-violet-900/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="relative gold-border-glow rounded-2xl overflow-hidden">
                <ProgressiveImage
                  src={copy.image}
                  alt={copy.imageAlt}
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 100vw"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-forest-deep/95 to-transparent">
                  <p className="font-cinzel text-gold text-xs sm:text-sm tracking-widest uppercase">{copy.imageKicker}</p>
                  <p className="font-inter text-ivory/70 text-xs sm:text-sm mt-1">{copy.imageSub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2 opacity-0">
            <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">
              {copy.kicker}
            </p>
            <h2 className="section-title">
              {copy.title}
              <br />
              <span className="text-ivory/70">{copy.sub}</span>
            </h2>
            <p className="mt-6 text-ivory/60 font-inter text-base sm:text-lg leading-relaxed">
              {copy.description}
            </p>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="h-2 bg-forest-light rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full progress-gold rounded-full origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gold text-xs font-inter">{copy.progressLeft}</span>
                <span className="text-ivory/40 text-xs font-inter">{copy.progressRight}</span>
              </div>
            </div>

            {/* Milestone steps */}
            <div className="mt-8 space-y-4">
              {milestones.map((milestone, index) => {
                const Icon = icons[index];
                return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                    milestone.complete
                      ? 'border-gold/30 bg-gold/5'
                      : 'border-ivory/10 bg-ivory/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    milestone.complete ? 'bg-gold/20' : 'bg-ivory/5'
                  }`}>
                    <Icon size={18} className={milestone.complete ? 'text-gold' : 'text-ivory/30'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-inter ${milestone.complete ? 'text-gold' : 'text-ivory/40'}`}>
                        {milestone.label}
                      </span>
                      {milestone.complete && (
                        <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-inter">{copy.complete}</span>
                      )}
                    </div>
                    <p className={`text-sm font-inter ${milestone.complete ? 'text-ivory' : 'text-ivory/40'}`}>
                      {milestone.text}
                    </p>
                  </div>
                </div>
                )
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200/70 text-xs font-inter leading-relaxed">
                {copy.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
