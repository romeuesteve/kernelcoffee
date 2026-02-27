import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    icon: '📈',
    title: 'Productivity Boost',
    description: 'Workflow-classified coffee keeps your team focused and energized.',
  },
  {
    icon: '🎁',
    title: 'Employee Perk That Matters',
    description: 'Show your team you care about their performance and well-being.',
  },
  {
    icon: '🎯',
    title: 'Matched to Every Role',
    description: 'Deep Work for devs, Flow State for designers, Debug Mode for problem-solvers.',
  },
  {
    icon: '💼',
    title: 'Simple Billing',
    description: 'Consolidated invoicing, volume discounts, and flexible delivery schedules.',
  },
];

export function B2BSection() {
  return (
    <section id="b2b" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Fuel Your Entire Team
                </h2>
                <p className="text-xl text-muted-foreground">
                  Kernel Coffee for tech offices, coworking spaces, and events.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="space-y-2">
                    <div className="text-3xl">{benefit.icon}</div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Office Sample
                </Button>
                <p className="text-sm text-muted-foreground">
                  We'll send a variety pack so your team can find their perfect workflow.
                </p>
              </div>
            </div>

            {/* Right: Contact Card */}
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Tell us about your office and we'll create a custom proposal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    placeholder="Acme Tech SL"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Size</label>
                  <select className="w-full px-4 py-2 rounded-md border border-input bg-background">
                    <option>1-10 people</option>
                    <option>11-50 people</option>
                    <option>51-200 people</option>
                    <option>200+ people</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  />
                </div>

                <Button className="w-full" variant="secondary">
                  Request Sample Pack
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  No commitment • Free sample for qualified offices • Response within 24h
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
