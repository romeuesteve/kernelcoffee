import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Zap, Crown, Lock, TrendingUp } from 'lucide-react';

const levels = [
  {
    name: 'Junior',
    icon: Star,
    color: 'from-blue-500 to-blue-600',
    description: 'New to the community',
    benefits: ['Access to Kernel Knowledge', 'Basic Discord access', 'Monthly newsletter'],
    unlocked: true,
  },
  {
    name: 'Mid-Level',
    icon: Zap,
    color: 'from-purple-500 to-purple-600',
    description: '3 months in the Cron Job',
    benefits: ['All Junior benefits, plus:', 'Priority support', 'Exclusive recipes', 'Monthly Q&A sessions'],
    unlocked: true,
  },
  {
    name: 'Senior',
    icon: Trophy,
    color: 'from-amber-500 to-amber-600',
    description: '6 months in the Cron Job',
    benefits: ['All Mid-Level benefits, plus:', 'Voting rights on new workflows', 'Exclusive merchandise', 'Early access to products'],
    unlocked: false,
  },
  {
    name: 'Lead',
    icon: Crown,
    color: 'from-primary to-primary/80',
    description: '12+ months in the Cron Job',
    benefits: ['All Senior benefits, plus:', 'Community moderator', 'Free Discovery Pack quarterly', 'Invited to kernel events'],
    unlocked: false,
  },
];

export function GamificationPreview() {
  return (
    <section id="gamification" className="py-24 bg-gradient-to-br from-secondary/20 via-background to-secondary/20">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium text-primary">Level Up Your Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Grow With the Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The longer you're with us, the more you unlock. Your Cron Job isn't just coffee—it's a progression system.
            </p>
          </div>

          {/* Levels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {levels.map((level) => (
              <Card
                key={level.name}
                className={`relative ${!level.unlocked ? 'opacity-60' : ''} hover:translate-y-[-4px] transition-all duration-200`}
              >
                <CardContent className="p-6">
                  {/* Level Icon */}
                  <div className={`mb-4 h-16 w-16 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white ${!level.unlocked ? 'grayscale' : ''}`}>
                    <level.icon className="h-8 w-8" />
                  </div>

                  {/* Level Name */}
                  <h3 className="text-xl font-bold mb-1">{level.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{level.description}</p>

                  {/* Benefits List */}
                  <ul className="space-y-2 text-sm">
                    {level.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className={benefit.startsWith('All') ? 'font-medium' : ''}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Lock Icon */}
                  {!level.unlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Preview */}
          <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">Your Progress to Senior</h4>
                  <p className="text-sm text-muted-foreground">Keep your Cron Job active to unlock exclusive perks</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">3/6</div>
                  <div className="text-sm text-muted-foreground">months</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-4 rounded-full transition-all duration-500" style={{ width: '50%' }} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Currently: Mid-Level</span>
                  <span className="font-medium text-primary">3 more months to Senior</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button className="w-full" asChild>
                  <a href="#cron-job">Maintain Your Cron Job</a>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Level up automatically by staying active. No additional cost.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits CTA */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Earn Perks</h4>
              <p className="text-sm text-muted-foreground">Unlock exclusive benefits as you level up</p>
            </div>

            <div className="space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Get Recognition</h4>
              <p className="text-sm text-muted-foreground">Show your status in the community</p>
            </div>

            <div className="space-y-2">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Access More</h4>
              <p className="text-sm text-muted-foreground">Senior members get early access & voting rights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
