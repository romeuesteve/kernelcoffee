'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function LaunchNav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.2 },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ' +
        (scrolled
          ? 'backdrop-blur-xl bg-background/70 border-b border-border/40'
          : 'bg-transparent')
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/launch" className="flex items-center gap-2.5 group">
          <img
            src="/logo.svg"
            alt="Kernel"
            className="h-7 w-auto transition-transform duration-500 group-hover:rotate-[-6deg]"
          />
          <span className="font-mono text-[13px] tracking-[0.18em] uppercase">
            Kernel<span className="text-primary">/</span>Coffee
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-mono text-[12px] tracking-[0.18em] uppercase text-muted-foreground">
          <a href="#stacks" className="hover:text-foreground transition-colors">
            Stacks
          </a>
          <a href="#manifesto" className="hover:text-foreground transition-colors">
            Manifesto
          </a>
          <a href="#ritual" className="hover:text-foreground transition-colors">
            Ritual
          </a>
        </div>

        <a
          href="#subscribe"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-foreground animate-pulse" />
          Early access
        </a>
      </div>
    </nav>
  );
}
