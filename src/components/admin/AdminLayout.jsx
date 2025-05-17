import React from 'react';
    import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
    import { useAuth } from '@/contexts/AuthContext';
    import { BatteryCharging, LayoutDashboard, Package, FileText, Users, Settings, LogOut, Menu, Sun, Moon } from 'lucide-react';
    import { useTheme } from '@/components/ThemeProvider';
    import { motion, AnimatePresence } from 'framer-motion';

    const AdminLayout = ({ children }) => {
      const { logout, user } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const { theme, setTheme } = useTheme();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

      const handleLogout = () => {
        logout();
        navigate('/admin/login');
      };

      const navItems = [
        { to: '/admin', icon: <LayoutDashboard className="h-5 w-5" />, text: 'Dasbor' },
        { to: '/admin/products', icon: <Package className="h-5 w-5" />, text: 'Produk' },
        { to: '/admin/articles', icon: <FileText className="h-5 w-5" />, text: 'Artikel' },
        { to: '#', icon: <Users className="h-5 w-5" />, text: 'Pengguna (Demo)' },
        { to: '#', icon: <Settings className="h-5 w-5" />, text: 'Pengaturan (Demo)' },
      ];

      const NavLinkItem = ({ to, icon, text, onClick }) => (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${
              isActive ? 'bg-muted text-primary font-semibold' : 'text-muted-foreground'
            }`
          }
        >
          {icon}
          {text}
        </NavLink>
      );
      
      const SidebarContent = ({ onLinkClick }) => (
        <>
          <div className="flex h-16 items-center border-b px-4 lg:px-6 shrink-0">
            <Link to="/admin" className="flex items-center gap-2 font-semibold text-foreground">
              <BatteryCharging className="h-7 w-7 text-primary" />
              <span className="text-lg">OtoBaterai Admin</span>
            </Link>
          </div>
          <nav className="flex-1 grid gap-2 p-2 lg:p-4 text-sm font-medium">
            {navItems.map((item) => (
              <NavLinkItem key={item.to} to={item.to} icon={item.icon} text={item.text} onClick={onLinkClick} />
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
             <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" /> Keluar
            </Button>
          </div>
        </>
      );


      return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden border-r bg-card md:flex flex-col"
          >
            <SidebarContent />
          </motion.div>
          <div className="flex flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Buka menu navigasi</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 bg-card w-full sm:max-w-xs">
                  <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1">
                {/* Bisa tambahkan breadcrumbs atau search global di sini jika perlu */}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label={theme === 'light' ? 'Ganti ke mode gelap' : 'Ganti ke mode terang'}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user ? user.email : 'Admin'}
              </span>
            </header>
            <main className="flex-1 p-4 sm:p-6 bg-muted/40 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
          </div>
        </div>
      );
    };

    export default AdminLayout;