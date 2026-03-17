import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Book, Mic, Clock, ArrowRight, Play } from 'lucide-react';

const articles = [
  {
    title: 'Caffeine Half-Life: Timing Your Deep Work Sessions',
    excerpt: 'Learn how to work with your body\'s caffeine metabolism for maximum focus and productivity.',
    category: 'Performance',
    readTime: '5 min read',
    icon: Book,
  },
  {
    title: 'Why Acidity Matters for Focus',
    excerpt: 'The science behind low-acid coffee and sustained cognitive performance during long coding sessions.',
    category: 'Science',
    readTime: '4 min read',
    icon: Book,
  },
  {
    title: 'The Neurochemistry of Flow State',
    excerpt: 'How caffeine, L-theanine, and other compounds affect your brain and productivity.',
    category: 'Neuroscience',
    readTime: '7 min read',
    icon: Book,
  },
];

const episodes = [
  {
    number: '042',
    title: 'Debugging Your Morning Routine',
    guest: 'Sarah Chen, Senior Dev @ Stripe',
    duration: '45 min',
  },
  {
    number: '041',
    title: 'Flow State Architecture',
    guest: 'Alex Rivera, Tech Lead @ Vercel',
    duration: '52 min',
  },
  {
    number: '040',
    title: 'Coffee Culture in Remote Teams',
    guest: 'Maria García, CTO @ RemoteFirst',
    duration: '38 min',
  },
];

export function ContentEcosystem() {
  return (
    <section id="content-ecosystem" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Level Up Your Knowledge
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Cron Job includes access to exclusive content on coffee science, productivity, and tech culture.
            </p>
          </div>

          {/* Kernel Knowledge - Blog Section */}
          <div className="mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Kernel Knowledge</h3>
                  <p className="text-sm text-muted-foreground">Science-backed articles on coffee and productivity</p>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <a href="#">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.title} className="hover:translate-y-[-4px] transition-transform duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full" asChild>
                      <a href="#">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Kernel Talks - Podcast Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Kernel Talks</h3>
                  <p className="text-sm text-muted-foreground">Interviews with tech leaders on productivity and culture</p>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <a href="#">
                  Listen Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {episodes.map((episode) => (
                <Card key={episode.number} className="hover:translate-y-[-4px] transition-transform duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                        #{episode.number}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {episode.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{episode.title}</CardTitle>
                    <CardDescription className="mt-2">{episode.guest}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full" asChild>
                      <a href="#">
                        Listen Episode
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-2">Join the Cron Job, Get Full Access</h4>
                <p className="text-muted-foreground mb-6">
                  New articles every week, podcast episodes with industry leaders, and exclusive member-only content.
                </p>
                <Button size="lg" asChild>
                  <a href="#cron-job">Start Your Cron Job</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
