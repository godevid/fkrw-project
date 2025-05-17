import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { ArrowLeft, ShoppingCart, Zap, Maximize, Ruler } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';

    const ProductDetailPage = () => {
      const { productId } = useParams();
      const [product, setProduct] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = storedProducts.find(p => p.id.toString() === productId);
        
        if (foundProduct) {
          setProduct({...foundProduct, image: foundProduct.image || 'https://images.unsplash.com/photo-1635865165118-917ed9e20936'});
        }
        setIsLoading(false);
      }, [productId]);

      const formatPrice = (price) => {
        if (typeof price !== 'number') return 'N/A';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
      };

      const handleContactSales = () => {
        toast({
          title: "Menghubungi Sales",
          description: `Anda akan segera dihubungi oleh tim sales kami mengenai ${product.name}.`,
          variant: "default",
          duration: 5000,
        });
        // Potentially redirect to contact page or open mail client
      };

      if (isLoading) {
        return (
          <div className="container mx-auto px-4 py-8 md:py-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
            <p className="mt-4 text-muted-foreground">Memuat detail produk...</p>
          </div>
        );
      }

      if (!product) {
        return (
          <div className="container mx-auto px-4 py-8 md:py-12 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">Maaf, produk yang Anda cari tidak dapat ditemukan.</p>
            <Button asChild variant="outline">
              <Link to="/catalog">Kembali ke Katalog</Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
              <Link to="/catalog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Katalog
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden shadow-xl border-border/50">
                <img-replace 
                  className="w-full h-auto md:h-[450px] object-cover" 
                  alt={product.name} 
                  src={product.image} 
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-bold gradient-text">{product.name}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">Merek: {product.brand} | Tipe: {product.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
                  <p className="text-foreground leading-relaxed">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-5 w-5 mr-2 text-secondary" />
                      <span>Ampere: {product.ampere}Ah</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-5 w-5 mr-2 text-secondary transform rotate-90" />
                      <span>Voltase: {product.voltase}V</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ruler className="h-5 w-5 mr-2 text-secondary" />
                      <span>Ukuran: {product.ukuran}</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleContactSales} size="lg" className="w-full btn-secondary mt-4">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Hubungi Sales untuk Pemesanan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {product.embed3dCode && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground flex items-center">
                    <Maximize className="mr-3 h-6 w-6 text-primary" /> Pratinjau 3D Produk
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Lihat produk ini dalam tampilan 3D interaktif.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="aspect-video bg-muted rounded-md overflow-hidden border border-border"
                    dangerouslySetInnerHTML={{ __html: product.embed3dCode }} 
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Model 3D mungkin memerlukan waktu untuk dimuat. Interaksi mungkin terbatas pada beberapa perangkat.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      );
    };

    export default ProductDetailPage;