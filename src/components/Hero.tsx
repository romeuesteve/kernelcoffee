import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pl-[60%]">
      <div className="container mx-auto px-8">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold leading-tight">Kernel Coffee</h1>
          <p className="text-2xl text-muted-foreground">Tech-powered fuel for developers</p>
          <div className="flex gap-4 items-center">
            <Button size="lg" asChild>
              <a href="#products">Shop Now</a>
            </Button>
            <code className="text-sm font-mono px-3 py-1 rounded bg-secondary text-secondary-foreground">
              ./brew --optimize
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
