import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import { useRef, useState } from 'react';

const workflows = [
  {
    id: 'stable-release',
    name: 'STABLE_RELEASE',
    price: { monthly: 29.99, annual: 288 },
    image: '/FlowState.png',
    description: 'Linear, constant energy. The standard daily coffee for predictable focus.',
    perfect: 'Perfect for: Coding sessions, design sprints, writing, everyday work.',
    features: [
      'Consistent energy release',
      'No caffeine crash',
      '4-hour focus window',
      'Premium beans',
      'Scientifically roasted',
      'Reliable performance',
    ],
    buttonVariant: 'default' as const,
  },
  {
    id: 'debug-mode',
    name: 'DEBUG_MODE',
    price: { monthly: 32.99, annual: 318 },
    image: '/DebugMode.png',
    description: 'Medium roast, balanced profile. Clarity and mental acuity for long sessions.',
    perfect: 'Perfect for: Problem-solving, debugging, brainstorming, complex tasks.',
    features: [
      'Balanced cognitive profile',
      'Sustained mental clarity',
      'Complex flavor notes',
      'Enhanced focus',
      'Memory support',
      'Extended work sessions',
    ],
    buttonVariant: 'outline' as const,
  },
  {
    id: 'critical-hotfix',
    name: 'CRITICAL_HOTFIX',
    price: { monthly: 34.99, annual: 338 },
    image: '/DeepWork.png',
    description: 'High caffeine, fast absorption. Emergency fuel for deadlines and late nights.',
    perfect: 'Perfect for: Emergency deadlines, lack of sleep, intense sprints.',
    features: [
      'Maximum caffeine content',
      'Rapid absorption',
      'Emergency energy boost',
      'Maximum alertness',
      'Quick mental reset',
      'When you need it NOW',
    ],
    buttonVariant: 'outline' as const,
  },
  {
    id: 'safe-mode',
    name: 'SAFE_MODE',
    price: { monthly: 24.99, annual: 238 },
    image: '/GenericProduct.png',
    description: 'Low stimulation or decaf. For nighttime coding without disrupting sleep.',
    perfect: 'Perfect for: Late-night work, sensitive to caffeine, evening sessions.',
    features: [
      'Minimal stimulation',
      'Sleep-friendly',
      'Smooth taste',
      'All-day drinkability',
      'No anxiety',
      'Evening coding safe',
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
          <span className="relative">Monthly Cron Job</span>
        </button>

        <button
          onClick={() => handleSwitch('1')}
          className={cn(
            'relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors',
            selected === '1' ? 'text-foreground bg-background' : 'text-muted-foreground',
          )}
        >
          <span className="relative flex items-center gap-2">Annual Cron Job</span>
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
    <section id="cron-job" className="py-24 bg-secondary/10" ref={pricingRef}>
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
                    <img src={workflow.image} alt={workflow.name} className="h-full w-full object-cover rounded-lg" />
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
                    asChild
                  >
                    <a href="#assessment">Start {workflow.name} Cron Job</a>
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
              Free gift with your first box • Cancel your Cron Job anytime • No commitment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
