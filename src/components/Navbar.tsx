'use client';

import { useState, useEffect } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, User, ShoppingCart } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isHomepage = currentPath === '/';

  const navLinks = [
    { 
      key: 'shop',
      label: 'Shop', 
      href: '/products',
    },
    { 
      key: 'how-it-works',
      label: 'How It Works', 
      href: isHomepage ? '#how-it-works' : '/#how-it-works',
    },
    { 
      key: 'content',
      label: 'Content', 
      href: isHomepage ? '#content-ecosystem' : '/#content-ecosystem',
    },
    { 
      key: 'community',
      label: 'Community', 
      href: isHomepage ? '#gamification' : '/#gamification',
    },
    { 
      key: 'companies',
      label: 'For Companies', 
      href: '/partners',
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors">
            <img src="/logo.svg" alt="Kernel Coffee Logo" className="h-8 w-auto" />
            Kernel Coffee
          </a>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.key}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <a 
            href="/dashboard"
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </a>

          <button 
            className="p-2 hover:bg-accent rounded-md transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              0
            </span>
          </button>

          <Button size="sm" asChild className="hidden sm:inline-flex">
            <a href={isHomepage ? '#cron-job' : '/products#cron-job'}>Subscribe</a>
          </Button>
          
          {/* Mobile menu button */}
          <button 
            className="sm:hidden p-2 hover:bg-accent rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-8 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" asChild className="w-full mt-4">
              <a href={isHomepage ? '#cron-job' : '/products#cron-job'} onClick={() => setIsMobileMenuOpen(false)}>Subscribe</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
