import { Github, Twitter, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold gradient-text">NovaLend</h3>
            <p className="text-sm text-muted-foreground">
              Next-Generation DeFi Lending Protocol
            </p>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/lend" className="hover:text-primary transition-colors">Lend</a></li>
              <li><a href="/borrow" className="hover:text-primary transition-colors">Borrow</a></li>
              <li><a href="/swap" className="hover:text-primary transition-colors">Swap</a></li>
              <li><a href="/farm" className="hover:text-primary transition-colors">Farm</a></li>
            </ul>
          </div>

          {/* Governance */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/govern" className="hover:text-primary transition-colors">Governance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Forum</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>© 2025 NovaLend. Built on Ethereum & Base. Audited by leading security firms.</p>
        </div>
      </div>
    </footer>
  );
}
