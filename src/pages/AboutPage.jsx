
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, Target, Eye, Award } from 'lucide-react';

    const AboutPage = () => {
      const teamMembers = [
        { name: 'Andi Pratama', role: 'CEO & Founder', image: 'team_andi.jpg', bio: 'Dengan pengalaman lebih dari 10 tahun di industri otomotif, Andi memimpin OtoBaterai dengan visi untuk menjadi penyedia solusi energi terdepan.' },
        { name: 'Siti Aminah', role: 'Head of Operations', image: 'team_siti.jpg', bio: 'Siti memastikan semua operasional berjalan lancar, dari pengadaan produk hingga pengiriman ke pelanggan.' },
        { name: 'Budi Santoso', role: 'Lead Technician', image: 'team_budi.jpg', bio: 'Budi adalah ahli baterai kami, selalu siap memberikan solusi teknis dan saran terbaik untuk kebutuhan baterai Anda.' },
      ];

      const milestones = [
        { year: 2018, event: 'OtoBaterai didirikan dengan misi menyediakan baterai berkualitas.' },
        { year: 2020, event: 'Meluncurkan platform online untuk jangkauan pelanggan yang lebih luas.' },
        { year: 2022, event: 'Menerima penghargaan "Best Automotive Battery Supplier".' },
        { year: 2024, event: 'Memperluas jaringan distribusi ke seluruh Indonesia.' },
      ];

      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Tentang <span className="gradient-text">OtoBaterai</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mengenal lebih dekat perusahaan yang berdedikasi untuk memberikan energi terbaik bagi kendaraan Anda.
            </p>
          </motion.div>

          {/* Company Story Section */}
          <motion.section 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16 grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">Cerita Kami</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                OtoBaterai lahir dari semangat untuk menyediakan solusi energi otomotif yang handal dan terjangkau bagi masyarakat Indonesia. Sejak didirikan, kami berkomitmen untuk terus berinovasi dan meningkatkan kualitas produk serta layanan kami. Kami percaya bahwa setiap perjalanan dimulai dengan energi yang tepat, dan kami hadir untuk memastikan kendaraan Anda selalu siap menemani setiap petualangan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan tim yang berpengalaman dan dedikasi tinggi, kami berusaha menjadi mitra terpercaya Anda dalam urusan baterai otomotif. Kepuasan pelanggan adalah prioritas utama kami.
              </p>
            </div>
            <div>
              <img  
                className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[400px]" 
                alt="Tim OtoBaterai sedang berdiskusi"
               src="https://images.unsplash.com/photo-1676337167752-2062c6ca7366" />
            </div>
          </motion.section>

          {/* Vision & Mission Section */}
          <section className="mb-12 md:mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-card p-6 rounded-lg shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-3">
                  <Eye className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">Visi Kami</h3>
                </div>
                <p className="text-muted-foreground">
                  Menjadi penyedia solusi energi otomotif terdepan dan terpercaya di Indonesia, yang dikenal karena kualitas produk, layanan prima, dan inovasi berkelanjutan.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-card p-6 rounded-lg shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-3">
                  <Target className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">Misi Kami</h3>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Menyediakan produk baterai otomotif berkualitas tinggi dengan harga kompetitif.</li>
                  <li>Memberikan pelayanan pelanggan yang responsif, profesional, dan solutif.</li>
                  <li>Terus berinovasi dalam teknologi dan layanan untuk memenuhi kebutuhan pasar yang dinamis.</li>
                  <li>Membangun hubungan jangka panjang yang saling menguntungkan dengan pelanggan dan mitra bisnis.</li>
                </ul>
              </motion.div>
            </div>
          </section>
          
          {/* Milestones Section */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-primary">Perjalanan Kami</h2>
            <div className="relative">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-border transform -translate-x-1/2"></div>
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`mb-8 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-1/2"></div>
                  <div className="hidden md:block relative px-4">
                    <div className="absolute h-4 w-4 bg-secondary rounded-full top-1/2 -mt-2 transform md:-translate-x-1/2 md:left-0 z-10"></div>
                  </div>
                  <div className="w-full md:w-1/2 md:px-4 py-4">
                    <div className="bg-card p-4 rounded-lg shadow-md border border-border/50">
                      <div className="flex items-center mb-1">
                        <Award className="h-5 w-5 text-secondary mr-2" />
                        <p className="font-semibold text-lg text-foreground">{milestone.year}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Team Section (Optional) */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Tim <span className="gradient-text">Profesional Kami</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-card p-6 rounded-lg shadow-lg text-center border border-border/50 hover:shadow-xl transition-shadow"
                >
                  <img  
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md" 
                    alt={`Foto ${member.name}`}
                   src="https://images.unsplash.com/photo-1643045527298-e85a722d795a" />
                  <h4 className="text-lg font-semibold text-foreground mb-1">{member.name}</h4>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      );
    };

    export default AboutPage;
  