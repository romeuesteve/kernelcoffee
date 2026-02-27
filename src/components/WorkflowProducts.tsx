import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const workflows = [
  {
    id: 'deep-work',
    name: 'Deep Work',
    price: { monthly: 29.99, annual: 288 },
    icon: '🎯',
    description: 'Focus blend. Low-acid, smooth, sustained 4-hour clarity.',
    perfect: 'Perfect for: Coding sessions, design sprints, writing.',
    features: ['Low acidity', 'Sustained energy', 'No jitters', '4-hour focus window'],
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    id: 'debug-mode',
    name: 'Debug Mode',
    price: { monthly: 32.99, annual: 318 },
    icon: '🔧',
    description: 'High-intensity blend. Bold, complex, mental acuity boost.',
    perfect: 'Perfect for: Problem-solving, debugging, brainstorming.',
    features: ['High caffeine', 'Complex flavor', 'Maximum alertness', 'Sharp focus'],
    color: 'from-orange-500/20 to-orange-600/10',
  },
  {
    id: 'flow-state',
    name: 'Flow State',
    price: { monthly: 27.99, annual: 268 },
    icon: '🌊',
    description: 'Light & creative. Gentle focus, no jitters.',
    perfect: 'Perfect for: Standups, collaboration, learning.',
    features: ['Balanced energy', 'Smooth taste', 'Creative clarity', 'All-day drinkability'],
    color: 'from-green-500/20 to-green-600/10',
  },
];

export function WorkflowProducts() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="subscription" className="py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">NEW: Workflow-Based Subscriptions</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Coffee Classified by Workflow
            </h2>
            <p className="text-xl text-muted-foreground">
              Different tasks demand different fuel. Choose your stack.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billing === 'monthly'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-4 py-2 rounded-md transition-colors relative ${
                  billing === 'annual'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Annual
                {billing === 'annual' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {workflows.map((workflow) => {
              const price = billing === 'monthly' ? workflow.price.monthly : workflow.price.annual / 12;
              const period = billing === 'monthly' ? '/month' : '/month (billed annually)';

              return (
                <Card
                  key={workflow.id}
                  className={`relative overflow-hidden hover:translate-y-[-8px] transition-all duration-300 hover:shadow-xl hover:border-primary/50`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${workflow.color} opacity-50 pointer-events-none`} />

                  <CardHeader className="relative">
                    <div className="text-6xl mb-4">{workflow.icon}</div>
                    <CardTitle className="text-2xl">{workflow.name}</CardTitle>
                    <CardDescription className="text-base">{workflow.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative space-y-4">
                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">€{price.toFixed(2)}</span>
                        <span className="text-muted-foreground">{period}</span>
                      </div>
                      {billing === 'annual' && (
                        <p className="text-sm text-green-600 font-medium">
                          Save €{((workflow.price.monthly * 12) - workflow.price.annual).toFixed(2)}/year
                        </p>
                      )}
                    </div>

                    {/* Perfect For */}
                    <div className="p-3 rounded-lg bg-background/50 border border-border">
                      <p className="text-sm font-medium">{workflow.perfect}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {workflow.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <span className="text-primary">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="relative">
                    <Button className="w-full" size="lg">
                      Start {workflow.name} Trial
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Cancel anytime • Free shipping
                    </p>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              🎁 <strong>Free gift</strong> with your first box • Cancel anytime • No commitment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
