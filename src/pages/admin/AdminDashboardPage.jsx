import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Battery, FileText, Users, BarChart } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { motion } from 'framer-motion';

    const AdminDashboardPage = () => {
      const { user } = useAuth();

      const stats = [
        { title: 'Total Produk', value: JSON.parse(localStorage.getItem('products') || '[]').length, icon: <Battery className="h-6 w-6 text-primary" />, to: '/admin/products', color: 'bg-blue-500' },
        { title: 'Total Artikel', value: JSON.parse(localStorage.getItem('articles') || '[]').length, icon: <FileText className="h-6 w-6 text-primary" />, to: '/admin/articles', color: 'bg-green-500' },
        // Mock data for users and sales as backend is not implemented
        { title: 'Pengguna Terdaftar', value: '125', icon: <Users className="h-6 w-6 text-primary" />, to: '#', color: 'bg-yellow-500' },
        { title: 'Penjualan Bulan Ini', value: 'Rp 15.000.000', icon: <BarChart className="h-6 w-6 text-primary" />, to: '#', color: 'bg-red-500' },
      ];

      return (
        <div className="p-4 md:p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Selamat Datang, {user ? user.email.split('@')[0] : 'Admin'}!
            </h1>
            <p className="text-muted-foreground">Berikut adalah ringkasan aktivitas website Anda.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-md">{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <Link to={stat.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Lihat Detail &rarr;
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>Produk baru "Baterai SuperMax Z1" ditambahkan.</li>
                    <li>Artikel "Tips Merawat Aki Saat Musim Hujan" dipublikasikan.</li>
                    <li>Pengguna baru "john.doe@example.com" mendaftar. (Mock)</li>
                    <li>Pesanan #10234 berhasil diproses. (Mock)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Tautan Cepat</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Link to="/admin/products?action=add" className="block">
                    <Button variant="outline" className="w-full justify-start"><Battery className="mr-2 h-4 w-4" /> Tambah Produk</Button>
                  </Link>
                  <Link to="/admin/articles?action=add" className="block">
                    <Button variant="outline" className="w-full justify-start"><FileText className="mr-2 h-4 w-4" /> Tambah Artikel</Button>
                  </Link>
                  <Link to="#" className="block">
                    <Button variant="outline" className="w-full justify-start"><Users className="mr-2 h-4 w-4" /> Kelola Pengguna</Button>
                  </Link>
                   <Link to="#" className="block">
                    <Button variant="outline" className="w-full justify-start"><BarChart className="mr-2 h-4 w-4" /> Lihat Laporan</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      );
    };

    export default AdminDashboardPage;