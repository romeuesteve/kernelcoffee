import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 1800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pl-[60%]">
      <div 
        className="container mx-auto px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          transition: 'opacity 800ms ease-out, transform 800ms ease-out',
        }}
      >
        <div className="space-y-6">
          <h1 className="text-6xl font-bold leading-tight flex items-center gap-4">
            <img 
              src="/logo.svg" 
              alt="Kernel Coffee Logo"
              className="h-16 w-auto"
              style={{
                opacity: isLogoVisible ? 1 : 0,
                transform: isLogoVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease-out, transform 500ms ease-out',
              }}
            />
            <span>Kernel Coffee</span>
          </h1>
          <p className="text-2xl text-muted-foreground">Tech-powered fuel for developers</p>
          <div className="flex gap-4 items-center">
            <Button size="lg" asChild>
              <a href="#products">Shop Now</a>
            </Button>
            <code className="text-sm font-mono px-3 py-1 rounded bg-secondary text-secondary-foreground">
              ./brew --optimize
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
