import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const articles = [
  {
    title: 'Caffeine Half-Life: Timing Your Deep Work Sessions',
    excerpt: 'Learn how to work with your body\'s caffeine metabolism for maximum focus.',
    category: 'Performance',
    readTime: '5 min read',
  },
  {
    title: 'Why Acidity Matters for Focus',
    excerpt: 'The science behind low-acid coffee and sustained cognitive performance.',
    category: 'Science',
    readTime: '4 min read',
  },
  {
    title: 'The Neurochemistry of Flow State',
    excerpt: 'How caffeine, L-theanine, and other compounds affect your brain.',
    category: 'Neuroscience',
    readTime: '7 min read',
  },
];

export function ContentSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Kernel Knowledge
            </h2>
            <p className="text-xl text-muted-foreground">
              Learn the science of coffee and performance
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <Card key={article.title} className="hover:translate-y-[-4px] transition-transform duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full">
                    Read Article →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" variant="outline">
              Explore All Articles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
