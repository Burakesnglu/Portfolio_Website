# Next.js Portfolyo ve Admin Paneli Projesi

Modern bir web geliştirici portfolyo sitesi ve admin paneli.

## 🚀 Teknolojiler

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database & Auth**: Supabase
- **Animasyonlar**: Framer Motion
- **State Yönetimi**: React Query
- **Form Yönetimi**: React Hook Form + Zod

## 📋 Özellikler

- Responsive portfolyo sitesi
- Proje showcase
- İletişim formu
- Admin paneli
  - Proje ekleme, düzenleme ve silme
  - Dashboard ve istatistikler

## 🛠 Kurulum

1. Projeyi klonlayın
```bash
git clone https://github.com/your-username/nextjs-portfolio.git
cd nextjs-portfolio
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Supabase projesi oluşturun ve `.env.local` dosyasını kurun
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

5. Tarayıcınızda http://localhost:3000 adresine gidin

## 📁 Proje Yapısı

```
/app
  /portfolio - Portfolyo ile ilgili sayfalar
    /page.tsx - Ana sayfa
    /projects/[id]/page.tsx - Proje detay sayfası
    /about/page.tsx - Hakkımda sayfası
    /contact/page.tsx - İletişim sayfası
  /admin - Admin paneli (korumalı rotalar)
    /page.tsx - Admin dashboard
    /projects/page.tsx - Proje yönetimi
    /projects/new/page.tsx - Yeni proje ekle
    /projects/[id]/edit/page.tsx - Proje düzenleme
  /api - API rotaları
    /projects/route.ts - Projeler API
    /projects/[id]/route.ts - Tek proje API
  /components - Tekrar kullanılabilir bileşenler
    /ui - Temel UI bileşenleri
    /layout - Layout bileşenleri
    /forms - Form bileşenleri
    /projects - Proje kartları ve listeleme
  /lib - Yardımcı fonksiyonlar
    /supabase.ts - Supabase istemci yapılandırması
    /auth.ts - Auth yardımcıları
    /utils.ts - Genel yardımcı fonksiyonlar
    /validators.ts - Form validasyon şemaları
```

## 🚀 Deployment

1. GitHub repositorysini oluşturun
2. Vercel hesabı oluşturun ve projeyi deploy edin
3. Vercel'de gerekli çevre değişkenlerini (environment variables) ekleyin

## 📝 Lisans

MIT

## ✨ Credits

Tasarım ve geliştirme: [Your Name] 