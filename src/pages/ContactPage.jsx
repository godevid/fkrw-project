
    import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { Phone, Mail, MapPin, Send } from 'lucide-react';

    const ContactPage = () => {
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form data submitted:', formData);
        toast({
          title: 'Pesan Terkirim!',
          description: 'Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.',
          variant: 'default',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      };

      const contactInfo = [
        { icon: <Phone className="h-6 w-6 text-primary" />, title: 'Telepon', content: '(021) 123-4567', href: 'tel:+62211234567' },
        { icon: <Mail className="h-6 w-6 text-primary" />, title: 'Email', content: 'info@otobaterai.com', href: 'mailto:info@otobaterai.com' },
        { icon: <MapPin className="h-6 w-6 text-primary" />, title: 'Alamat', content: 'Jl. Otomotif Raya No. 123, Jakarta Pusat, Indonesia' },
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
              Hubungi <span className="gradient-text">Kami</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika ada pertanyaan atau membutuhkan bantuan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border/50"
            >
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Nama Lengkap</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Nama Anda" 
                    required 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Alamat Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="email@example.com" 
                    required 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium">Subjek</Label>
                  <Input 
                    type="text" 
                    id="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    placeholder="Subjek pesan Anda" 
                    required 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Pesan</Label>
                  <Textarea 
                    id="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tulis pesan Anda di sini..." 
                    rows={5} 
                    required 
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full btn-primary py-3 text-base" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Informasi Kontak</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-md border border-border/50"
                    >
                      <div className="flex-shrink-0 mt-1">{info.icon}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        {info.href ? (
                          <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors break-all">{info.content}</a>
                        ) : (
                          <p className="text-muted-foreground break-all">{info.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Lokasi Kami</h2>
                <div className="aspect-w-16 aspect-h-9 bg-muted rounded-lg shadow-md overflow-hidden border border-border/50">
                  {/* Replace with OpenStreetMap iframe or a static image if dynamic map is complex */}
                  <iframe
                    title="Lokasi OtoBaterai"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=106.8200,-6.1780,106.8300,-6.1700&layer=mapnik&marker=-6.174,106.825"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                 <p className="text-xs text-muted-foreground mt-2">Peta disediakan oleh OpenStreetMap.</p>
              </div>
            </motion.div>
          </div>
        </div>
      );
    };

    export default ContactPage;
  