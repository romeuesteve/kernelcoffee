'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Scan your week',
    body: 'Take the 30-second workflow quiz. We map your calendar shape, deep-work blocks and crash points.',
  },
  {
    n: '02',
    title: 'Compile your stack',
    body: 'We assemble a personalized roast lineup — one for deep focus, one for meetings, one for the late sprint.',
  },
  {
    n: '03',
    title: 'Ship on cron',
    body: 'Roasted to order, shipped within 48h, recurring on your cadence. Pause, skip, or re-tune anytime.',
  },
];

export function Ritual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-step]', {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-steps-grid]',
          start: 'top 80%',
        },
      });

      gsap.from('[data-ritual-title]', {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-ritual-title]',
          start: 'top 85%',
        },
      });

      // Subtle parallax on the numbers
      gsap.utils.toArray<HTMLElement>('[data-step-number]').forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ritual"
      ref={rootRef}
      className="relative py-32 md:py-48 border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-14 md:mb-20">
          <span className="h-px w-10 bg-border" />
          <span>§ The Ritual</span>
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-24">
          <div className="md:col-span-7 overflow-hidden">
            <h2
              data-ritual-title
              className="font-serif italic tracking-[-0.03em] leading-[1.05] text-[9vw] md:text-[72px] will-change-transform"
            >
              From calendar chaos
              <br />
              to a <span className="text-primary">deploy-ready</span> day.
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-base md:text-lg leading-relaxed text-muted-foreground">
            Three steps between ordering your first bag and owning a morning
            that starts without friction. No barista skills required.
          </p>
        </div>

        <div data-steps-grid className="grid md:grid-cols-3 gap-px bg-border">
          {STEPS.map((s) => (
            <div
              key={s.n}
              data-step
              className="group relative bg-background p-8 md:p-10 min-h-[320px] flex flex-col justify-between hover:bg-card transition-colors duration-500"
            >
              <div
                data-step-number
                className="font-serif italic text-[120px] md:text-[160px] leading-none text-primary/10 select-none pointer-events-none absolute -top-6 right-6 will-change-transform"
              >
                {s.n}
              </div>
              <div className="relative">
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  Step {s.n}
                </div>
                <h3 className="mt-5 font-serif italic text-3xl md:text-4xl tracking-tight">
                  {s.title}
                </h3>
              </div>
              <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
