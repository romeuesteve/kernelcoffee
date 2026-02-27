export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">&copy; 2024 Kernel Coffee. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <code className="text-sm font-mono px-3 py-1 rounded bg-secondary text-secondary-foreground">
            echo &quot;Happy Brewing!&quot;
          </code>
        </div>
      </div>
    </footer>
  );
}
