import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/text-effect';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <TextEffect per='word' preset='slide' as='h2' className='text-4xl md:text-6xl font-bold' delay={0.2} enableScrollTrigger>
            Ready to Optimize Your Workflow?
          </TextEffect>

          {/* Subhead */}
          <TextEffect per='char' preset='fade' delay={0.5} className='text-2xl text-muted-foreground' enableScrollTrigger>
            Join 2,500+ digital professionals fueling their best work
          </TextEffect>

          {/* Discount Code */}
          <Card className="inline-block bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Limited Time Offer</div>
                  <div className="font-mono text-xl font-bold text-primary">KERNEL20</div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div className="text-left">
                  <div className="text-sm">Get 20% off</div>
                  <div className="text-sm">your first month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="#subscription">Start 7-Day Trial (€4.95)</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <a href="#assessment">Take Workflow Assessment</a>
            </Button>
          </div>

          {/* Final Trust Elements */}
          <div className="pt-8 space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Free shipping
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Money-back guarantee
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                No commitment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
