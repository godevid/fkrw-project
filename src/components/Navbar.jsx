
    import React, { useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
    import { Menu, BatteryCharging, Sun, Moon } from 'lucide-react';
    import { useTheme } from '@/components/ThemeProvider';
    import { motion } from 'framer-motion';

    const Navbar = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { theme, setTheme } = useTheme();

      const navLinks = [
        { to: '/', text: 'Beranda' },
        { to: '/catalog', text: 'Katalog Produk' },
        { to: '/blog', text: 'Blog' },
        { to: '/about', text: 'Tentang Kami' },
        { to: '/contact', text: 'Kontak' },
      ];

      const NavLinkItem = ({ to, text, onClick }) => (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-primary' : 'text-foreground/80'
            }`
          }
        >
          {text}
        </NavLink>
      );

      return (
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BatteryCharging className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">OtoBaterai</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLinkItem key={link.to} to={link.to} text={link.text} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Buka menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-xs bg-background">
                  <div className="p-4">
                    <Link to="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                      <BatteryCharging className="h-8 w-8 text-primary" />
                      <span className="font-bold text-xl text-foreground">OtoBaterai</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <NavLinkItem key={link.to} to={link.to} text={link.text} onClick={() => setIsMobileMenuOpen(false)} />
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>
      );
    };

    export default Navbar;
  