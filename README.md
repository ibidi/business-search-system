<div align="center">

# 🔍 İşletme Arama Sistemi

**Türkiye'deki işletmeleri kolayca bulun ve iletişim bilgilerine anında ulaşın**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Özellikler](#-özellikler) · [Kurulum](#-kurulum) · [Kullanım](#-kullanım) · [Katkıda Bulunun](#-katkıda-bulunun)

</div>

---

## 📖 Hakkında

Modern, açık kaynak bir işletme arama platformu. Pazarlama ekipleri, araştırmacılar ve iş sahipleri için tasarlandı. **Tamamen ücretsiz** OpenStreetMap API'si veya isteğe bağlı Google Places API desteği ile çalışır.

### 🎯 Kullanım Senaryoları

- 👔 **Pazarlama Ekipleri**: Hedef kitle analizi ve müşteri bulma
- 🔬 **Araştırmacılar**: Sektör verileri toplama ve analiz
- 💼 **İş Sahipleri**: Rakip analizi ve pazar araştırması
- 🎨 **Freelancer'lar**: Potansiyel müşteri keşfi

---

## ✨ Özellikler

### 🔍 Gelişmiş Arama
- **Çoklu Filtre**: İşletme türü, adı, il, ilçe/semt
- **Çift API Desteği**: OpenStreetMap (ücretsiz) veya Google Places API
- **Akıllı Sonuçlar**: 50+ işletme tek aramada
- **Gerçek Zamanlı**: Güncel işletme bilgileri

### 📊 Veri Yönetimi
- **Excel Export**: Profesyonel formatlı tablolar
- **PDF Export**: Landscape formatında raporlar
- **WhatsApp Entegrasyonu**: Direkt paylaşım
- **Veritabanı**: Supabase ile otomatik kayıt

### 📈 Analitik Dashboard
- **İstatistikler**: Toplam arama, işletme sayısı
- **Trend Analizi**: En çok aranan türler ve konumlar
- **Geçmiş**: Detaylı arama geçmişi
- **Görselleştirme**: Modern kartlar ve grafikler

### 🎨 Modern Tasarım
- **Shadcn UI**: Minimal ve şık arayüz
- **Responsive**: Mobil, tablet, desktop uyumlu
- **Dark Mode Ready**: Kolay tema desteği
- **Accessibility**: WCAG standartlarına uygun

### 🔐 Güvenlik
- **Authentication**: Supabase Auth ile güvenli giriş
- **RLS**: Row Level Security politikaları
- **API Key Yönetimi**: Güvenli localStorage
- **HTTPS**: Production'da zorunlu

---

## 🛠️ Teknoloji Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
<br>Next.js 16
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br>Tailwind CSS
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=supabase" width="48" height="48" alt="Supabase" />
<br>Supabase
</td>
</tr>
</table>

**Frontend**: Next.js 16, React 19, Tailwind CSS, Shadcn UI  
**Backend**: Next.js API Routes, Supabase  
**Database**: PostgreSQL (Supabase)  
**Authentication**: Supabase Auth  
**APIs**: OpenStreetMap Overpass API, Google Places API (opsiyonel)  
**Export**: ExcelJS, jsPDF  
**Icons**: Lucide React

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Supabase hesabı (ücretsiz)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/ibidi/business-search-system.git
cd business-search-system
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Kurulumu

#### a) Authentication'ı Etkinleştirin
1. [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Providers
2. Email provider'ı etkinleştirin
3. "Confirm email" seçeneğini kapatın (geliştirme için)

#### b) Veritabanı Tablolarını Oluşturun

SQL Editor'de `supabase/QUICK_SETUP.sql` dosyasını çalıştırın.

Detaylı kurulum için: [supabase/README.md](supabase/README.md)

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacak.

---

## 📁 Proje Yapısı

```
business-search-system/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication sayfaları
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/           # Dashboard sayfaları
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                 # API routes
│   └── layout.js
├── components/              # React bileşenleri
│   ├── ui/                  # Shadcn UI bileşenleri
│   ├── DashboardLayout.js
│   ├── SearchForm.js
│   ├── ResultsTable.js
│   └── ExportButtons.js
├── lib/                     # Utility fonksiyonlar
│   ├── googlePlaces.js      # OpenStreetMap API
│   ├── googlePlacesAPI.js   # Google Places API
│   └── supabase.js          # Supabase client
├── utils/                   # Helper fonksiyonlar
│   └── exportHelpers.js     # Excel/PDF export
├── supabase/               # Database migrations
│   └── migrations/
└── public/                 # Statik dosyalar
```

---

## 🎮 Kullanım

### 1. Kayıt Olun
- `/register` sayfasından hesap oluşturun
- E-posta ve şifre ile kayıt olun

### 2. Arama Yapın
- Dashboard'da işletme türünü seçin
- İl, ilçe ve işletme adı girin (opsiyonel)
- API kaynağını seçin (OpenStreetMap veya Google Places)
- "Ara" butonuna tıklayın

### 3. Sonuçları İnceleyin
- Excel tablo formatında sonuçları görün
- İşletme adı, adres, telefon, website, puan bilgilerine erişin

### 4. Dışa Aktarın
- **Excel**: Profesyonel formatlı tablo
- **PDF**: Landscape formatında rapor
- **WhatsApp**: Direkt paylaşım

### 5. Analitik
- Arama geçmişinizi görüntüleyin
- İstatistikleri inceleyin
- Trend analizleri yapın

---

## 🔑 API Kullanımı

### OpenStreetMap (Ücretsiz)
- ✅ API key gerekmez
- ✅ Sınırsız istek (makul kullanımda)
- ✅ Türkiye'de iyi kapsama

### Google Places API (Opsiyonel)
1. [Google Cloud Console](https://console.cloud.google.com/) → Proje oluşturun
2. Places API'yi etkinleştirin
3. API anahtarı oluşturun
4. Dashboard → Ayarlar → API key'i girin

**Maliyet**: Aylık $200 ücretsiz kredi (~540 arama)

---

## 🤝 Katkıda Bulunun

Katkılarınızı bekliyoruz! 

### Nasıl Katkıda Bulunabilirsiniz?

1. **Fork** edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

Detaylı bilgi için: [CONTRIBUTING.md](CONTRIBUTING.md)

### Katkı Alanları

- 🐛 Bug düzeltmeleri
- ✨ Yeni özellikler
- 📝 Dokümantasyon iyileştirmeleri
- 🎨 UI/UX geliştirmeleri
- 🌍 Çeviri (i18n)
- ⚡ Performance optimizasyonları

---

## 📝 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

---

## 👨‍💻 Geliştirici

**İbrahim**  
GitHub: [@ibidi](https://github.com/ibidi)

---

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [OpenStreetMap](https://www.openstreetmap.org/) - Ücretsiz harita verileri
- [Shadcn UI](https://ui.shadcn.com/) - UI bileşenleri
- [Lucide](https://lucide.dev/) - İkonlar

---

## 📞 İletişim

Sorularınız veya önerileriniz için:
- **Issues**: [GitHub Issues](https://github.com/ibidi/business-search-system/issues)
- **Pull Requests**: [GitHub PRs](https://github.com/ibidi/business-search-system/pulls)

---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ in Turkey

</div>
