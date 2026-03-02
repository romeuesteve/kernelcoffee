import { Card, CardContent } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/text-effect';
import { User, Coffee, Users, MessageCircle, Trophy, Book } from 'lucide-react';

const stats = [
  { value: '2,500+', label: 'Subscribers' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '90%', label: 'Retention Rate' },
  { value: '50+', label: 'Tech Office Partners' },
];

const testimonials = [
  {
    quote: "Finally, coffee that gets my workflow. No more 3pm crashes, just sustained focus through my entire sprint.",
    author: 'Marc',
    role: 'Product Designer @ SaaS Startup',
    icon: User,
  },
  {
    quote: "Our entire office swears by Debug Mode. Productivity is up, and the team actually looks forward to coffee breaks.",
    author: 'Elena',
    role: 'CTO @ Barcelona Coworking',
    icon: User,
  },
  {
    quote: "I was skeptical about the workflow concept, but Flow State has changed how I approach my entire day.",
    author: 'David',
    role: 'Senior Developer @ FinTech',
    icon: User,
  },
];

const partners = [
  { name: 'Tech Office BCN', type: 'Coworking' },
  { name: 'Startup Grind', type: 'Events' },
  { name: 'Barcelona Devs', type: 'Community' },
  { name: 'SaaStock', type: 'Conference' },
];

export function SocialProof() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <TextEffect per='word' preset='slide' as='h2' className='text-4xl md:text-5xl font-bold' delay={0.2} enableScrollTrigger>
              Join 2,500+ Digital Professionals
            </TextEffect>
            <TextEffect per='char' preset='fade' delay={0.5} className='text-xl text-muted-foreground' enableScrollTrigger>
              See why developers, designers, and tech teams are making the switch
            </TextEffect>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="relative">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-16 w-16">
                    <testimonial.icon className="h-full w-full" />
                  </div>
                  <blockquote className="text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logo Wall - Partners */}
          <div className="text-center space-y-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">Trusted by tech offices and communities</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner) => (
                <div key={partner.name} className="text-center space-y-1">
                  <div className="text-xl font-semibold">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">{partner.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Preview */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Join the Kernel Community</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Monthly Kernel Talks, exclusive tutorials, early access to new workflows, and member-only events.
                Your subscription includes full community access.
              </p>
              <div className="relative overflow-hidden">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎤 Kernel Talks</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Book className="h-5 w-5" /> Tutorials</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎁 Early Access</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Users className="h-5 w-5" /> Member Events</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><MessageCircle className="h-5 w-5" /> Discord Community</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Trophy className="h-5 w-5" /> Challenges</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎓 Workshops</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Coffee className="h-5 w-5" /> Virtual Coffee Chats</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎤 Kernel Talks</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Book className="h-5 w-5" /> Tutorials</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎁 Early Access</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Users className="h-5 w-5" /> Member Events</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><MessageCircle className="h-5 w-5" /> Discord Community</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Trophy className="h-5 w-5" /> Challenges</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap">🎓 Workshops</span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background whitespace-nowrap"><Coffee className="h-5 w-5" /> Virtual Coffee Chats</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
