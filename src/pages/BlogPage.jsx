
    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Search, CalendarDays, UserCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const initialArticles = [
      { id: 1, title: '5 Tips Memilih Baterai Mobil yang Tepat', slug: 'tips-memilih-baterai-mobil', date: '2025-05-10', author: 'Tim OtoBaterai', excerpt: 'Memilih baterai mobil yang tepat sangat penting untuk performa kendaraan Anda. Berikut adalah 5 tips yang bisa membantu...', image: 'tips_baterai_mobil.jpg', category: 'Tips' },
      { id: 2, title: 'Cara Merawat Baterai Agar Awet dan Tahan Lama', slug: 'merawat-baterai-awet', date: '2025-05-05', author: 'Ahli Baterai', excerpt: 'Perawatan baterai yang baik dapat memperpanjang usia pakainya secara signifikan. Simak cara mudah merawat baterai Anda.', image: 'merawat_baterai.jpg', category: 'Perawatan' },
      { id: 3, title: 'Update Terbaru: Teknologi Baterai Otomotif Terkini', slug: 'teknologi-baterai-terkini', date: '2025-04-28', author: 'Redaksi OtoBaterai', excerpt: 'Industri otomotif terus berkembang, termasuk teknologi baterai. Ketahui inovasi terbaru yang akan mengubah cara kita berkendara.', image: 'teknologi_baterai.jpg', category: 'Berita' },
      { id: 4, title: 'Mengapa Baterai Mobil Soak? Penyebab dan Solusinya', slug: 'penyebab-baterai-soak', date: '2025-04-15', author: 'Tim OtoBaterai', excerpt: 'Baterai mobil soak bisa menjadi masalah besar. Pahami penyebab umumnya dan bagaimana cara mengatasinya.', image: 'baterai_soak.jpg', category: 'Tips' },
      { id: 5, title: 'Perbedaan Baterai Kering dan Baterai Basah untuk Mobil', slug: 'baterai-kering-vs-basah', date: '2025-04-01', author: 'Ahli Baterai', excerpt: 'Masih bingung memilih antara baterai kering dan basah? Artikel ini menjelaskan perbedaan mendasar keduanya.', image: 'baterai_kering_basah.jpg', category: 'Perawatan' },
    ];

    const BlogPage = () => {
      const [articles, setArticles] = useState([]);
      const [filteredArticles, setFilteredArticles] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        // Simulate fetching articles from localStorage or an API
        const storedArticles = JSON.parse(localStorage.getItem('articles'));
        if (storedArticles && storedArticles.length > 0) {
          setArticles(storedArticles);
          setFilteredArticles(storedArticles);
        } else {
          setArticles(initialArticles);
          setFilteredArticles(initialArticles);
          localStorage.setItem('articles', JSON.stringify(initialArticles));
        }
      }, []);

      useEffect(() => {
        const results = articles.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(results);
      }, [searchTerm, articles]);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
      };

      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Blog & <span className="gradient-text">Artikel</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8 md:mb-12">
              Temukan informasi, tips, dan berita terbaru seputar dunia baterai otomotif.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-xl mx-auto"
          >
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Cari artikel..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </motion.div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
                    <CardHeader className="p-0">
                      <img  
                        className="w-full h-48 object-cover" 
                        alt={article.title}
                       src="https://images.unsplash.com/photo-1611657151009-c8018b2010e6" />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <span className="inline-block bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-semibold mb-2">{article.category}</span>
                      <CardTitle className="text-lg font-semibold mb-2 text-foreground hover:text-primary transition-colors">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <UserCircle className="h-3.5 w-3.5 mr-1.5" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t border-border/50">
                      <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                        <Link to={`/blog/${article.slug}`}>Baca Selengkapnya &rarr;</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Tidak ada artikel yang ditemukan.</p>
              <p className="text-sm text-muted-foreground mt-2">Coba kata kunci lain atau periksa kembali nanti.</p>
            </motion.div>
          )}
        </div>
      );
    };

    export default BlogPage;
  