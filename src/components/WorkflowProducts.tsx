import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import { useRef, useState } from 'react';
import { Target, Code, Lightbulb, Users } from 'lucide-react';

const workflows = [
  {
    id: 'deep-work',
    name: 'Deep Work',
    price: { monthly: 29.99, annual: 288 },
    icon: Target,
    description: 'Focus blend. Low-acid, smooth, sustained 4-hour clarity.',
    perfect: 'Perfect for: Coding sessions, design sprints, writing.',
    features: [
      'Low acidity',
      'Sustained energy',
      'No jitters',
      '4-hour focus window',
      'Premium beans',
      'Scientifically roasted',
    ],
    buttonVariant: 'outline' as const,
  },
  {
    id: 'debug-mode',
    name: 'Debug Mode',
    price: { monthly: 32.99, annual: 318 },
    icon: Code,
    description: 'High-intensity blend. Bold, complex, mental acuity boost.',
    perfect: 'Perfect for: Problem-solving, debugging, brainstorming.',
    features: [
      'Everything in Deep Work, plus:',
      'High caffeine',
      'Complex flavor',
      'Maximum alertness',
      'Sharp focus',
      'Memory enhancement',
      'Faster reaction time',
    ],
    buttonVariant: 'default' as const,
  },
  {
    id: 'flow-state',
    name: 'Flow State',
    price: { monthly: 27.99, annual: 268 },
    icon: Lightbulb,
    description: 'Light & creative. Gentle focus, no jitters.',
    perfect: 'Perfect for: Standups, collaboration, learning.',
    features: [
      'Balanced energy',
      'Smooth taste',
      'Creative clarity',
      'All-day drinkability',
      'No anxiety',
      'Social friendly',
    ],
    buttonVariant: 'outline' as const,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    icon: Users,
    description: 'Custom solutions for tech offices, coworking spaces, and events.',
    perfect: 'Perfect for: Teams, offices, conferences.',
    features: [
      'Custom workflow blends',
      'Volume pricing',
      'Flexible delivery',
      'Dedicated support',
      'White-label options',
      'Priority processing',
    ],
    buttonVariant: 'outline' as const,
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState('0');

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-muted border border-border p-1">
        <button
          onClick={() => handleSwitch('0')}
          className={cn(
            'relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors',
            selected === '0' ? 'text-foreground bg-background' : 'text-muted-foreground',
          )}
        >
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch('1')}
          className={cn(
            'relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors',
            selected === '1' ? 'text-foreground bg-background' : 'text-muted-foreground',
          )}
        >
          <span className="relative flex items-center gap-2">Annual</span>
        </button>
      </div>
    </div>
  );
};

export function WorkflowProducts() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const togglePricingPeriod = (value: string) => setIsYearly(Number.parseInt(value) === 1);

  return (
    <section id="subscription" className="py-24 bg-secondary/10" ref={pricingRef}>
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Coffee Classified by Workflow
            </h2>
            <p className="text-xl text-muted-foreground">
              Different tasks demand different fuel. Choose your stack.
            </p>
            <PricingSwitch onSwitch={togglePricingPeriod} />
          </div>

          {/* Product Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 mb-4">
                    <workflow.icon className="h-full w-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{workflow.name}</h3>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>

                  {workflow.price ? (
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold">
                        €
                        <NumberFlow
                          format={{
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }}
                          value={isYearly ? workflow.price.annual / 12 : workflow.price.monthly}
                          className="text-4xl font-bold"
                        />
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /month
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold mt-4">Custom Pricing</div>
                  )}

                  {isYearly && workflow.price && (
                    <p className="text-sm text-primary font-medium mt-1">
                      Save €{((workflow.price.monthly * 12 - workflow.price.annual).toFixed(2))}/year
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    variant={workflow.buttonVariant}
                    className="w-full"
                    asChild={workflow.id !== 'enterprise'}
                  >
                    {workflow.id === 'enterprise' ? (
                      <button>Contact Sales</button>
                    ) : (
                      <a href="#assessment">Start {workflow.name} Trial</a>
                    )}
                  </Button>

                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-sm text-muted-foreground">{workflow.perfect}</p>
                    <ul className="space-y-2">
                      {workflow.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    {workflow.id === 'enterprise' ? 'Response within 24h' : 'Cancel anytime • Free shipping'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Free gift with your first box • Cancel anytime • No commitment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
