
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { BatteryCharging, Facebook, Instagram, Twitter } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      const footerLinks = [
        { to: '/about', text: 'Tentang Kami' },
        { to: '/catalog', text: 'Produk' },
        { to: '/blog', text: 'Blog' },
        { to: '/contact', text: 'Hubungi Kami' },
        { to: '/privacy-policy', text: 'Kebijakan Privasi' },
        { to: '/terms-of-service', text: 'Syarat Layanan' },
      ];

      const socialLinks = [
        { href: '#', icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
        { href: '#', icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
        { href: '#', icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
      ];

      return (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-muted/50 border-t border-border/40 text-muted-foreground"
        >
          <div className="container py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <BatteryCharging className="h-8 w-8 text-primary" />
                  <span className="font-bold text-xl text-foreground">OtoBaterai</span>
                </Link>
                <p className="text-sm">
                  Solusi baterai otomotif terpercaya untuk kendaraan Anda. Kualitas terbaik dengan harga kompetitif.
                </p>
              </div>
              
              <div>
                <p className="font-semibold text-foreground mb-4">Tautan Cepat</p>
                <ul className="space-y-2">
                  {footerLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-sm hover:text-primary transition-colors">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-4">Ikuti Kami</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-sm mt-4">
                  Dapatkan update terbaru dan promo menarik dari kami.
                </p>
              </div>
            </div>

            <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm">
                &copy; {currentYear} OtoBaterai. Semua hak dilindungi.
              </p>
              <p className="text-sm mt-2 sm:mt-0">
                Dibuat dengan ❤️ oleh Hostinger Horizons
              </p>
            </div>
          </div>
        </motion.footer>
      );
    };

    export default Footer;
  