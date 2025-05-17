
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ShieldCheck, Truck, Tag, Zap } from 'lucide-react';

    const HomePage = () => {
      const features = [
        {
          icon: <ShieldCheck className="h-10 w-10 text-primary" />,
          title: 'Garansi Panjang',
          description: 'Produk kami dilindungi garansi resmi untuk ketenangan pikiran Anda.',
        },
        {
          icon: <Truck className="h-10 w-10 text-primary" />,
          title: 'Pengiriman Cepat',
          description: 'Kami memastikan baterai Anda sampai dengan cepat dan aman.',
        },
        {
          icon: <Tag className="h-10 w-10 text-primary" />,
          title: 'Harga Kompetitif',
          description: 'Dapatkan baterai berkualitas tinggi dengan harga terbaik di pasaran.',
        },
        {
          icon: <Zap className="h-10 w-10 text-primary" />,
          title: 'Performa Optimal',
          description: 'Baterai kami dirancang untuk memberikan performa maksimal bagi kendaraan Anda.',
        },
      ];

      return (
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32"
          >
            <div className="container mx-auto px-4 text-center">
              <div className="relative max-w-4xl mx-auto">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute -top-16 -left-16 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl opacity-50 animate-pulse"
                />
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-16 -right-16 w-32 h-32 bg-secondary/20 rounded-full filter blur-2xl opacity-50 animate-pulse"
                />
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">Energi Terpercaya</span> untuk Perjalanan Anda
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Temukan baterai otomotif berkualitas tinggi yang dirancang untuk performa maksimal dan daya tahan luar biasa.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" className="btn-primary shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
                      <Link to="/catalog">Lihat Katalog Produk</Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-accent/50 transition-shadow duration-300 border-primary text-primary hover:bg-primary/10">
                      <Link to="/contact">Hubungi Kami</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 md:mt-24 max-w-5xl mx-auto"
              >
                <img  
                  className="rounded-lg shadow-2xl object-cover w-full h-auto max-h-[400px]" 
                  alt="Mobil modern dengan baterai otomotif di sebelahnya"
                 src="https://images.unsplash.com/photo-1676337167752-2062c6ca7366" />
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <section className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Keunggulan <span className="gradient-text">OtoBaterai</span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
                Kami berkomitmen untuk menyediakan produk dan layanan terbaik bagi pelanggan kami.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-border/50"
                  >
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <motion.h2 
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Siap Mengganti Baterai Kendaraan Anda?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              >
                Jangan biarkan baterai lemah menghambat perjalanan Anda. Pilih OtoBaterai untuk kualitas dan performa terbaik.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="bg-background text-primary hover:bg-background/90 border-transparent shadow-lg">
                  <Link to="/catalog">Jelajahi Pilihan Baterai</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </div>
      );
    };

    export default HomePage;
  