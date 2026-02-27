import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Take the 60-second assessment',
    description: 'We personalize your coffee stack based on your workflow, schedule, and goals.',
    icon: '🎯',
  },
  {
    number: '02',
    title: 'Receive your monthly box',
    description: 'Fresh-roasted, traceable coffee matched to your calendar. Delivered to your door.',
    icon: '📦',
  },
  {
    number: '03',
    title: 'Join the Kernel Community',
    description: 'Exclusive events, content, and perks. Connect with other digital professionals.',
    icon: '👥',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Workflow, Delivered
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to optimized focus
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="relative space-y-4">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>

                {/* Icon */}
                <div className="text-5xl">{step.icon}</div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector (hidden on last item) */}
                {step.number !== '03' && (
                  <div className="hidden md:block absolute top-20 -right-4 text-4xl text-primary/20">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" asChild className="text-lg px-8">
              <a href="#subscription">Start Your Trial (€4.95)</a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Join 2,500+ digital professionals optimizing their workflow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
