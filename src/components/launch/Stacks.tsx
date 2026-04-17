'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Stack = {
  id: string;
  code: string;
  name: string;
  role: string;
  tag: string;
  image: string;
  caffeine: string;
  focus: string;
  profile: string;
  notes: string[];
  swatch: string;
};

const STACKS: Stack[] = [
  {
    id: 'deep-work',
    code: '001 / A',
    name: 'DEEP_WORK',
    role: 'Long-form focus · 2–4h',
    tag: 'Bold roast',
    image: '/DeepWork.png',
    caffeine: 'High',
    focus: '3h 45m',
    profile: 'Dark chocolate · hazelnut',
    notes: ['Single origin · Colombia', 'Forest canopy shade', 'Anaerobic wash'],
    swatch: 'from-[#2b1d14] to-[#3a2417]',
  },
  {
    id: 'debug-mode',
    code: '002 / B',
    name: 'DEBUG_MODE',
    role: 'Analytic problem-solving',
    tag: 'Medium roast',
    image: '/DebugMode.png',
    caffeine: 'Medium',
    focus: '2h 30m',
    profile: 'Citrus · cacao nib',
    notes: ['Single origin · Ethiopia', 'High-altitude · 1950m', 'Natural processing'],
    swatch: 'from-[#3a2b1a] to-[#5a3820]',
  },
  {
    id: 'flow-state',
    code: '003 / C',
    name: 'FLOW_STATE',
    role: 'Creative & continuous',
    tag: 'Light-medium roast',
    image: '/FlowState.png',
    caffeine: 'Balanced',
    focus: '4h+',
    profile: 'Stone fruit · almond',
    notes: ['Single origin · Kenya', 'Rift valley lot', 'Washed process'],
    swatch: 'from-[#2a2419] to-[#453a24]',
  },
];

export function Stacks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // progress bar
        ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => '+=' + getDistance(),
          onUpdate: (self) => {
            const bar = document.querySelector<HTMLElement>('[data-stacks-bar]');
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            const counter = document.querySelector<HTMLElement>('[data-stacks-counter]');
            if (counter) {
              const idx = Math.min(
                STACKS.length - 1,
                Math.floor(self.progress * STACKS.length * 0.999),
              );
              counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(STACKS.length).padStart(2, '0')}`;
            }
          },
        });

        return () => {
          tween.kill();
        };
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stacks"
      ref={rootRef}
      className="relative border-t border-border/50"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-28 md:pt-40 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
              <span className="h-px w-10 bg-border" />
              <span>§ The Stacks</span>
            </div>
            <h2 className="font-serif italic tracking-[-0.03em] leading-[1.05] text-[9vw] md:text-[72px]">
              Three roasts,
              <br />
              three cognitive <span className="text-primary">modes</span>.
            </h2>
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground max-w-xs">
            Scroll horizontally through the launch lineup. Each stack is tuned
            to a specific kind of work.
          </div>
        </div>
      </div>

      {/* Pinned horizontal track */}
      <div
        ref={pinRef}
        className="relative md:h-screen md:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="md:h-full flex flex-col md:flex-row gap-6 md:gap-0 px-6 md:px-0 pb-16 md:pb-0 will-change-transform"
        >
          {STACKS.map((s, i) => (
            <StackCard key={s.id} stack={s} index={i} />
          ))}
          {/* trailing spacer for breathing room at end of scroll */}
          <div className="hidden md:block shrink-0 w-[10vw]" />
        </div>

        {/* progress bar + counter (desktop only) */}
        <div className="hidden md:flex absolute bottom-8 left-10 right-10 items-center gap-6 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground z-20">
          <span data-stacks-counter>01 / 03</span>
          <div className="flex-1 h-px bg-border relative overflow-hidden">
            <div
              data-stacks-bar
              className="absolute inset-0 bg-foreground origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span>Horizontal scroll</span>
        </div>
      </div>
    </section>
  );
}

function StackCard({ stack: s, index }: { stack: Stack; index: number }) {
  return (
    <article
      className={
        'relative shrink-0 md:w-screen md:h-screen md:px-[8vw] md:py-24 ' +
        'flex flex-col md:flex-row items-stretch gap-10 md:gap-16 ' +
        'border-t border-border/40 md:border-t-0'
      }
    >
      {/* image side */}
      <div className="relative md:flex-1 md:max-w-[46%] aspect-[4/5] md:aspect-auto overflow-hidden rounded-xl md:rounded-2xl bg-card">
        <div
          className={
            'absolute inset-0 bg-gradient-to-br ' + s.swatch + ' opacity-90'
          }
        />
        <img
          src={s.image}
          alt={s.name}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-90"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-white/80">
          <span>{s.code}</span>
          <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            {s.tag}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/70">
            Kernel // {s.name}
          </div>
        </div>
      </div>

      {/* content side */}
      <div className="md:flex-1 flex flex-col justify-center">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-5">
          Stack · {s.code}
        </div>
        <h3 className="font-sans font-semibold tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
          {s.name}
        </h3>
        <p className="mt-5 font-serif italic text-xl md:text-2xl text-muted-foreground max-w-md">
          {s.role}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
          <MetaCell label="Caffeine" value={s.caffeine} />
          <MetaCell label="Focus window" value={s.focus} />
          <MetaCell label="Profile" value={s.profile} />
        </div>

        <ul className="mt-10 space-y-2 font-mono text-[12px] tracking-[0.15em] uppercase text-muted-foreground">
          {s.notes.map((n) => (
            <li key={n} className="flex items-center gap-3">
              <span className="h-1 w-4 bg-primary" />
              {n}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center gap-4">
          <a
            href={`/products/${s.id === 'deep-work' ? 'critical-hotfix' : s.id === 'debug-mode' ? 'debug-mode' : 'stable-release'}`}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View stack
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h11m0 0L7 2m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            From €24 · monthly
          </span>
        </div>
      </div>
    </article>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-serif italic text-lg md:text-xl">{value}</div>
    </div>
  );
}
