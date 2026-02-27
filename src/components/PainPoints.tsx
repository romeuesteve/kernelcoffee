export function PainPoints() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              The Midday Slump is Killing Your Flow
            </h2>
            <p className="text-xl text-muted-foreground">
              Generic coffee doesn't account for what you're actually doing.
            </p>
          </div>

          {/* Pain Points */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-6xl">💻</div>
              <h3 className="text-xl font-semibold">The 2pm Crash</h3>
              <p className="text-muted-foreground">
                You're deep in code when the caffeine crash hits. Focus gone, momentum lost.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl">⚡</div>
              <h3 className="text-xl font-semibold">Wrong Fuel</h3>
              <p className="text-muted-foreground">
                Generic coffee doesn't match your workflow. You need energy, not anxiety.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl">🎯</div>
              <h3 className="text-xl font-semibold">Inconsistent Performance</h3>
              <p className="text-muted-foreground">
                Some days you're in the zone, others you're fighting brain fog.
              </p>
            </div>
          </div>

          {/* Transition */}
          <div className="pt-8 border-t border-border">
            <p className="text-2xl font-semibold">
              What if your coffee worked <span className="text-primary">with</span> your workflow?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
