import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Target, Code, Flame, Lightbulb, Check } from 'lucide-react';

const workflows = [
  {
    name: 'STABLE_RELEASE',
    icon: Target,
    description: 'Consistent energy for daily work',
    amount: '250g',
  },
  {
    name: 'DEBUG_MODE',
    icon: Code,
    description: 'Mental clarity for complex tasks',
    amount: '250g',
  },
  {
    name: 'CRITICAL_HOTFIX',
    icon: Flame,
    description: 'Emergency fuel for deadlines',
    amount: '250g',
  },
  {
    name: 'SAFE_MODE',
    icon: Lightbulb,
    description: 'Low stimulation for late nights',
    amount: '250g',
  },
];

export function DiscoveryPack() {
  return (
    <section id="discovery-pack" className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium text-primary">Perfect for First-Timers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Discover Your Perfect Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Not sure which workflow matches your coding style? Try all four and find your perfect match.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Pack Visual */}
            <div className="relative">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Discovery Pack</h3>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground line-through">€59.99</div>
                        <div className="text-3xl font-bold text-primary">€39.99</div>
                      </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-primary" />
                        <span className="font-medium">1kg Total (4 × 250g packs)</span>
                      </div>

                      {workflows.map((workflow) => (
                        <div key={workflow.name} className="flex items-start gap-3">
                          <workflow.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-medium">{workflow.name}</div>
                            <div className="text-sm text-muted-foreground">{workflow.description}</div>
                          </div>
                          <div className="text-sm font-medium">{workflow.amount}</div>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-border" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Free tasting guide included</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Workflow assessment access</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Free shipping</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discount Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-primary/80 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Save 33%
              </div>
            </div>

            {/* Right: Benefits */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Start with Discovery?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every developer processes caffeine differently. The Discovery Pack lets you experiment
                  with all four workflows to find which one matches your coding style, work schedule, and
                  cognitive preferences.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Try All Four Workflows</h4>
                    <p className="text-sm text-muted-foreground">
                      Sample STABLE_RELEASE, DEBUG_MODE, CRITICAL_HOTFIX, and SAFE_MODE side by side
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Find Your Match</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the included guide to track your focus, energy, and productivity with each workflow
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upgrade with Confidence</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply the price of Discovery Pack to your first Cron Job and get €10 off
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full" asChild>
                <a href="#cron-job">Get Discovery Pack (€39.99)</a>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                One-time purchase • No commitment • Free shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
