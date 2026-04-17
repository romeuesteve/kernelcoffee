'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: 'This is the first coffee I\'ve ever noticed has a roast profile, not just a brand.',
    name: 'Marta Riera',
    role: 'Product designer · Barcelona',
    handle: '@martadesigns',
  },
  {
    text: 'My 9am deep-work block actually starts at 9am now. That alone is worth it.',
    name: 'Arnau Piqué',
    role: 'Engineer · Remote',
    handle: '@arnau.dev',
  },
  {
    text: 'I used to drink coffee to stay awake. Now I drink it to stay precise.',
    name: 'Júlia Bosch',
    role: 'Founder · Hivecamp',
    handle: '@juliabosch',
  },
  {
    text: 'The cadence is the product. It turns a chaotic habit into a ritual.',
    name: 'Pol Vega',
    role: 'Creative director',
    handle: '@polvega',
  },
];

export function Voices() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-quote]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-quotes-grid]',
          start: 'top 82%',
        },
      });

      // infinite ticker
      const ticker = document.querySelector('[data-voice-ticker]');
      if (ticker) {
        gsap.to(ticker, {
          xPercent: -50,
          repeat: -1,
          duration: 55,
          ease: 'none',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-32 md:py-40 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center justify-between mb-14 md:mb-20">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            <span className="h-px w-10 bg-border" />
            <span>§ Voices from the beta</span>
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground hidden sm:block">
            n = 147 operators
          </div>
        </div>

        <div
          data-quotes-grid
          className="grid md:grid-cols-2 gap-px bg-border mb-20"
        >
          {QUOTES.map((q) => (
            <figure
              key={q.handle}
              data-quote
              className="group bg-background p-8 md:p-10 flex flex-col justify-between gap-8 hover:bg-card transition-colors duration-500"
            >
              <blockquote className="font-serif italic text-2xl md:text-3xl leading-tight tracking-tight">
                "{q.text}"
              </blockquote>
              <figcaption className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{q.name}</div>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                    {q.role}
                  </div>
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary">
                  {q.handle}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* press / partner ticker */}
      <div className="border-y border-border/40 py-5 overflow-hidden bg-card/30">
        <div
          data-voice-ticker
          className="flex whitespace-nowrap will-change-transform font-serif italic text-3xl md:text-5xl text-muted-foreground/80 tracking-tight"
        >
          {Array.from({ length: 2 }).map((_, g) => (
            <div key={g} className="flex items-center gap-10 pr-10">
              <span>Product Hunt</span>
              <span className="text-primary">·</span>
              <span>Designer News</span>
              <span className="text-primary">·</span>
              <span>Sifted</span>
              <span className="text-primary">·</span>
              <span>Hacker News</span>
              <span className="text-primary">·</span>
              <span>Métode</span>
              <span className="text-primary">·</span>
              <span>Perfect Daily Grind</span>
              <span className="text-primary">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
