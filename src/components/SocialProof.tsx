import { Card, CardContent } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/text-effect';
import { User, Coffee, Users, MessageCircle, Trophy, Book } from 'lucide-react';

const stats = [
  { value: '2,500+', label: 'Cron Job Members' },
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
    quote: "Our entire office swears by DEBUG_MODE. Productivity is up, and the team actually looks forward to coffee breaks.",
    author: 'Elena',
    role: 'CTO @ Barcelona Coworking',
    icon: User,
  },
  {
    quote: "I was skeptical about the workflow concept, but STABLE_RELEASE has changed how I approach my entire day.",
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
            <CardContent className="p-6 md:p-8 text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Join the Kernel Community</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                Monthly Kernel Talks, exclusive tutorials, early access to new workflows, and member-only events.
                Your Cron Job includes full community access.
              </p>
              <div className="relative">
                <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm">🎤 Kernel Talks</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm"><Book className="h-4 w-4 md:h-5 md:w-5" /> Tutorials</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm">🎁 Early Access</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm"><Users className="h-4 w-4 md:h-5 md:w-5" /> Member Events</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm"><MessageCircle className="h-4 w-4 md:h-5 md:w-5" /> Discord</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm"><Trophy className="h-4 w-4 md:h-5 md:w-5" /> Challenges</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm">🎓 Workshops</span>
                  <span className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-background whitespace-nowrap text-xs md:text-sm"><Coffee className="h-4 w-4 md:h-5 md:w-5" /> Coffee Chats</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
