import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/language';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.faq;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (contentRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
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
      id="faq"
      ref={sectionRef}
      className="relative z-10 section-padding"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-gold text-xs sm:text-sm font-inter tracking-[0.25em] uppercase mb-4">{copy.kicker}</p>
          <h2 className="section-title">{copy.title}</h2>
        </div>

        <div ref={contentRef} className="opacity-0">
          <Accordion type="single" collapsible className="space-y-4">
            {copy.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-panel rounded-xl border-0 px-5 sm:px-6 py-1 overflow-hidden"
              >
                <AccordionTrigger className="text-ivory font-playfair text-base sm:text-lg font-semibold hover:text-gold transition-colors text-left [&[data-state=open]]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-ivory/60 font-inter text-sm sm:text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
