# 🎉 İşletme Arama Sistemi v2.0.0

Modern, açık kaynak işletme arama platformu - İlk resmi sürüm!

## 🚀 Highlights

Bu sürümde neler var:

- ✨ **Çift API Desteği**: OpenStreetMap (ücretsiz) veya Google Places API
- 🔍 **Gelişmiş Arama**: İşletme türü, adı, il, ilçe filtreleri
- 📊 **Excel/PDF Export**: Profesyonel raporlar
- 💬 **WhatsApp Entegrasyonu**: Direkt paylaşım
- 📈 **Analitik Dashboard**: İstatistikler ve trend analizi
- 🎨 **Modern UI**: Shadcn UI ile şık tasarım
- 🔐 **Güvenli**: Supabase Auth ve RLS

## ✨ Yeni Özellikler

### Arama Sistemi
- Çoklu API desteği (OpenStreetMap + Google Places)
- İşletme türü, adı, il, ilçe filtreleri
- 50+ işletme sonucu tek aramada
- Gerçek zamanlı güncel veriler

### Veri Yönetimi
- Excel export (ExcelJS ile profesyonel)
- PDF export (landscape format)
- WhatsApp Web entegrasyonu
- Otomatik veritabanı kaydı

### Analitik
- Toplam arama ve işletme istatistikleri
- En çok aranan türler ve konumlar
- Detaylı arama geçmişi
- Modern görselleştirme

### Kullanıcı Deneyimi
- Supabase Auth ile güvenli giriş
- Profil yönetimi
- API key yönetimi
- Responsive tasarım

## 🛠️ Tech Stack

- Next.js 16.0 (Turbopack)
- React 19.0
- Supabase (Auth + Database)
- Tailwind CSS + Shadcn UI
- OpenStreetMap Overpass API
- ExcelJS + jsPDF

## 📦 Kurulum

```bash
# Projeyi klonla
git clone https://github.com/ibidi/business-search-system.git

# Bağımlılıkları yükle
npm install

# Environment değişkenlerini ayarla
cp .env.local.example .env.local

# Supabase'i kur (supabase/README.md)

# Başlat
npm run dev
```

## 📝 Dokümantasyon

- [README.md](https://github.com/ibidi/business-search-system#readme)
- [Kurulum Rehberi](https://github.com/ibidi/business-search-system#-kurulum)
- [Supabase Kurulumu](https://github.com/ibidi/business-search-system/tree/main/supabase)
- [Katkıda Bulunma](https://github.com/ibidi/business-search-system/blob/main/CONTRIBUTING.md)

## 🐛 Bilinen Sorunlar

Şu an bilinen kritik sorun yok. Sorun bulursanız [issue açın](https://github.com/ibidi/business-search-system/issues).

## 🔜 Gelecek Sürümler

v2.1.0'da planlanıyor:
- Harita görünümü
- CSV import/export
- Dark mode
- Çoklu dil desteği

## 🤝 Katkıda Bulunun

Projeye katkıda bulunmak isterseniz:
- [Issues](https://github.com/ibidi/business-search-system/issues)
- [Pull Requests](https://github.com/ibidi/business-search-system/pulls)
- [Katkıda Bulunma Rehberi](https://github.com/ibidi/business-search-system/blob/main/CONTRIBUTING.md)

## 👨‍💻 Geliştirici

**İhsan Baki Doğan**

[![GitHub](https://img.shields.io/badge/GitHub-ibidi-black?style=flat-square&logo=github)](https://github.com/ibidi)
[![Instagram](https://img.shields.io/badge/Instagram-ihsanbakidogan-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/ihsanbakidogan)
[![X](https://img.shields.io/badge/X-ibidicode-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/ibidicode)
[![Website](https://img.shields.io/badge/Website-ihsanbakidogan.com-blue?style=flat-square&logo=google-chrome&logoColor=white)](https://ihsanbakidogan.com)

## 📄 Lisans

MIT License - [LICENSE](https://github.com/ibidi/business-search-system/blob/main/LICENSE)

---

**Full Changelog**: https://github.com/ibidi/business-search-system/commits/v2.0.0

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
