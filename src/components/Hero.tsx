import { Button } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/text-effect';
import { Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 md:py-0">
      <div className="container mx-auto max-w-2xl md:max-w-3xl">
        <div className="space-y-6 md:space-y-8 text-center md:text-left md:pl-8 lg:pl-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs md:text-sm font-medium text-primary">2,500+ Developers</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs md:text-sm font-medium text-primary">Specialty Grade</span>
          </div>

          {/* Headline */}
          <TextEffect per='word' as='h1' preset='slide' className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif italic' delay={0.3}>
            Fuel for Deep Work.
          </TextEffect>

          {/* Subhead */}
          <TextEffect per='char' preset='fade' delay={0.4} className='text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed'>
            Specialty coffee classified by workflow. Focus when you need it, energy without the crash.
          </TextEffect>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
            <Button size="lg" asChild className="text-base md:text-lg px-6 md:px-8 py-6 w-full sm:w-auto">
              <a href="#assessment">Discover Your Workflow</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base md:text-lg px-6 md:px-8 py-6 w-full sm:w-auto">
              <a href="#cron-job">Start Your Cron Job (€4.95)</a>
            </Button>
          </div>

          {/* Social Proof - Mini */}
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-muted-foreground">4.9/5 from the community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
