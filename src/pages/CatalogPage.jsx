import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Slider } from '@/components/ui/slider';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Search, Filter, Battery, Car, Bike as Motorcycle, Truck as LucideTruck, Eye } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const initialProducts = [
      { id: 1, name: 'Baterai PowerMax Mobil A1', type: 'Mobil', brand: 'PowerMax', price: 1200000, ampere: 60, voltase: 12, ukuran: 'P24 x L13 x T22 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Baterai mobil handal untuk performa optimal.', embed3dCode: '<iframe title="PowerMax A1 3D Model" width="100%" height="400" src="https://sketchfab.com/models/YOUR_MODEL_ID_HERE_A1/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>' },
      { id: 2, name: 'Baterai ElectroRide Motor B2', type: 'Motor', brand: 'ElectroRide', price: 350000, ampere: 7, voltase: 12, ukuran: 'P11 x L7 x T13 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Daya tahan lama untuk motor kesayangan Anda.', embed3dCode: '<iframe title="ElectroRide B2 3D Model" width="100%" height="400" src="https://sketchfab.com/models/YOUR_MODEL_ID_HERE_B2/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>' },
      { id: 3, name: 'Baterai TitanForce Truk C3', type: 'Truk', brand: 'TitanForce', price: 2500000, ampere: 150, voltase: 12, ukuran: 'P50 x L22 x T25 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Kekuatan super untuk kendaraan berat.', embed3dCode: '' },
      { id: 4, name: 'Baterai SparkMobil Mobil D4', type: 'Mobil', brand: 'SparkMobil', price: 950000, ampere: 45, voltase: 12, ukuran: 'P20 x L12 x T20 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Starter handal di segala kondisi.', embed3dCode: '' },
      { id: 5, name: 'Baterai MotoVolt Motor E5', type: 'Motor', brand: 'MotoVolt', price: 420000, ampere: 9, voltase: 12, ukuran: 'P12 x L8 x T14 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Performa tinggi untuk akselerasi maksimal.', embed3dCode: '' },
      { id: 6, name: 'Baterai DuraHaul Truk F6', type: 'Truk', brand: 'DuraHaul', price: 3100000, ampere: 200, voltase: 12, ukuran: 'P52 x L24 x T26 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Tangguh untuk medan berat dan jarak jauh.', embed3dCode: '' },
      { id: 7, name: 'Baterai OptimaMobil G7', type: 'Mobil', brand: 'OptimaMobil', price: 1500000, ampere: 70, voltase: 12, ukuran: 'P26 x L14 x T23 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Teknologi AGM untuk daya tahan ekstra.', embed3dCode: '' },
      { id: 8, name: 'Baterai QuickStart Motor H8', type: 'Motor', brand: 'QuickStart', price: 280000, ampere: 5, voltase: 12, ukuran: 'P10 x L6 x T12 cm', image: 'https://images.unsplash.com/photo-1635865165118-917ed9e20936', description: 'Harga terjangkau, kualitas terjamin.', embed3dCode: '' },
    ];
    
    const CatalogPage = () => {
      const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [vehicleType, setVehicleType] = useState('all');
      const [brand, setBrand] = useState('all');
      const [priceRange, setPriceRange] = useState([0, 4000000]);
      const [brands, setBrands] = useState([]);
      const { toast } = useToast();

      useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts && storedProducts.length > 0) {
          setProducts(storedProducts.map(p => ({...p, image: p.image || 'https://images.unsplash.com/photo-1635865165118-917ed9e20936'})));
        } else {
          localStorage.setItem('products', JSON.stringify(initialProducts));
          setProducts(initialProducts);
        }
      }, []);

      useEffect(() => {
        if (products.length > 0) {
          const uniqueBrands = ['all', ...new Set(products.map(p => p.brand))];
          setBrands(uniqueBrands);
          
          let tempProducts = products;

          if (searchTerm) {
            tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          if (vehicleType !== 'all') {
            tempProducts = tempProducts.filter(p => p.type === vehicleType);
          }
          if (brand !== 'all') {
            tempProducts = tempProducts.filter(p => p.brand === brand);
          }
          tempProducts = tempProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
          
          setFilteredProducts(tempProducts);
        }
      }, [products, searchTerm, vehicleType, brand, priceRange]);
      
      const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
      };

      const vehicleTypes = [
        { value: 'all', label: 'Semua Jenis', icon: <Battery className="h-4 w-4 mr-2" /> },
        { value: 'Mobil', label: 'Mobil', icon: <Car className="h-4 w-4 mr-2" /> },
        { value: 'Motor', label: 'Motor', icon: <Motorcycle className="h-4 w-4 mr-2" /> },
        { value: 'Truk', label: 'Truk', icon: <LucideTruck className="h-4 w-4 mr-2" /> },
      ];

      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Katalog <span className="gradient-text">Produk Baterai</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8 md:mb-12">
              Temukan baterai yang tepat untuk kebutuhan kendaraan Anda.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 p-6 bg-card rounded-lg shadow-lg border border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Cari Produk</label>
                <div className="relative">
                  <Input 
                    id="search"
                    type="text" 
                    placeholder="Nama baterai..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-foreground mb-1">Jenis Kendaraan</label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger id="vehicleType" className="w-full">
                    <SelectValue placeholder="Pilih jenis kendaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map(vt => (
                      <SelectItem key={vt.value} value={vt.value}>
                        <div className="flex items-center">{vt.icon} {vt.label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-foreground mb-1">Merek Baterai</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger id="brand" className="w-full">
                    <SelectValue placeholder="Pilih merek" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(b => (
                      <SelectItem key={b} value={b}>{b === 'all' ? 'Semua Merek' : b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-1">Rentang Harga: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</label>
                <Slider
                  defaultValue={[0, 4000000]}
                  min={0}
                  max={4000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-2"
                />
              </div>
            </div>
          </motion.div>

          {filteredProducts.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
                      <CardHeader className="p-0">
                        <img-replace 
                          className="w-full h-48 object-cover" 
                          alt={product.name}
                         src={product.image || "https://images.unsplash.com/photo-1635865165118-917ed9e20936"} />
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <CardTitle className="text-lg font-semibold mb-1 text-foreground">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>Tipe: {product.type}</p>
                          <p>Merek: {product.brand}</p>
                          <p>Ampere: {product.ampere}Ah</p>
                          <p>Voltase: {product.voltase}V</p>
                          <p>Ukuran: {product.ukuran}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 border-t border-border/50 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
                        <Button asChild variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
                          <Link to={`/product/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Tidak ada produk yang sesuai dengan filter Anda.</p>
              <p className="text-sm text-muted-foreground mt-2">Coba ubah kriteria pencarian atau filter Anda.</p>
            </motion.div>
          )}
        </div>
      );
    };

    export default CatalogPage;