export function LaunchFooter() {
  return (
    <footer className="relative border-t border-border/50">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 font-mono text-[12px] tracking-[0.18em] uppercase">
          <div>
            <div className="text-muted-foreground mb-3">Kernel</div>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-primary transition-colors">Shop</a></li>
              <li><a href="/partners" className="hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <div className="text-muted-foreground mb-3">Campaign</div>
            <ul className="space-y-2">
              <li><a href="#stacks" className="hover:text-primary transition-colors">Stacks</a></li>
              <li><a href="#manifesto" className="hover:text-primary transition-colors">Manifesto</a></li>
              <li><a href="#subscribe" className="hover:text-primary transition-colors">Early access</a></li>
            </ul>
          </div>
          <div>
            <div className="text-muted-foreground mb-3">Social</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
            </ul>
          </div>
          <div>
            <div className="text-muted-foreground mb-3">Contact</div>
            <ul className="space-y-2">
              <li><a href="mailto:ops@kernel.coffee" className="hover:text-primary transition-colors normal-case tracking-normal font-sans text-sm">ops@kernel.coffee</a></li>
              <li>Barcelona · Remote</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            <img src="/logo.svg" alt="" className="h-6 w-auto opacity-80" />
            Kernel Coffee · v1.0 · © 2026
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            Campaign 01 · Fuel for Deep Work
          </div>
        </div>
      </div>
    </footer>
  );
}
