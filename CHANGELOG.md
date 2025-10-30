# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-30

### 🎉 Initial Release

Modern, açık kaynak işletme arama platformu.

### ✨ Features

#### Arama Sistemi
- **Çoklu API Desteği**: OpenStreetMap (ücretsiz) ve Google Places API
- **Gelişmiş Filtreler**: İşletme türü, adı, il, ilçe/semt
- **Akıllı Sonuçlar**: 50+ işletme tek aramada
- **Gerçek Zamanlı Veriler**: Güncel işletme bilgileri

#### Veri Yönetimi
- **Excel Export**: Profesyonel formatlı tablolar (ExcelJS)
- **PDF Export**: Landscape formatında raporlar (jsPDF)
- **WhatsApp Entegrasyonu**: Direkt paylaşım özelliği
- **Otomatik Kayıt**: Supabase ile veritabanı entegrasyonu

#### Analitik Dashboard
- **İstatistikler**: Toplam arama, işletme sayısı
- **Trend Analizi**: En çok aranan türler ve konumlar
- **Arama Geçmişi**: Detaylı geçmiş kayıtları
- **Görselleştirme**: Modern kartlar ve grafikler

#### Kullanıcı Yönetimi
- **Authentication**: Supabase Auth ile güvenli giriş
- **Kayıt Sistemi**: E-posta ve şifre ile kayıt
- **Profil Yönetimi**: Kullanıcı bilgileri güncelleme
- **API Key Yönetimi**: Google Places API key saklama

#### Tasarım
- **Shadcn UI**: Modern ve minimal arayüz
- **Responsive**: Mobil, tablet, desktop uyumlu
- **Dark Mode Ready**: Kolay tema desteği
- **Accessibility**: WCAG standartlarına uygun

### 🛠️ Tech Stack

- **Frontend**: Next.js 16.0, React 19.0
- **Styling**: Tailwind CSS 3.4, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **APIs**: OpenStreetMap Overpass API, Google Places API
- **Export**: ExcelJS 4.4, jsPDF 3.0
- **Icons**: Lucide React

### 🔐 Security

- Row Level Security (RLS) politikaları
- Güvenli API key yönetimi
- HTTPS zorunluluğu (production)
- Environment değişkenleri ile hassas veri koruması

### 📝 Documentation

- Detaylı README.md
- Kurulum rehberi
- API kullanım kılavuzu
- Katkıda bulunma rehberi
- Issue şablonları

### 🌍 Supported Regions

- Türkiye (tüm iller ve ilçeler)
- OpenStreetMap global kapsama

### 📊 Supported Business Types

- Restoran
- Otel
- Eczane
- Tekstil
- Kafe
- Market
- Kuaför
- Spor Salonu
- Banka
- Hastane

### 🎯 Use Cases

- Pazarlama ekipleri için hedef kitle analizi
- Araştırmacılar için sektör verileri toplama
- İş sahipleri için rakip analizi
- Freelancer'lar için müşteri bulma

---

## [Unreleased]

### Planned Features

- [ ] Harita görünümü (Google Maps / OpenStreetMap)
- [ ] Toplu işletme karşılaştırma
- [ ] CSV import/export
- [ ] API endpoint'leri (REST API)
- [ ] Çoklu dil desteği (i18n)
- [ ] Dark mode
- [ ] E-posta bildirimleri
- [ ] Favori işletmeler
- [ ] Notlar ve etiketler
- [ ] Gelişmiş filtreleme
- [ ] Veri görselleştirme grafikleri

---

## Release Notes Template

### [Version] - YYYY-MM-DD

#### Added
- New features

#### Changed
- Changes in existing functionality

#### Deprecated
- Soon-to-be removed features

#### Removed
- Removed features

#### Fixed
- Bug fixes

#### Security
- Security improvements

---

**Full Changelog**: https://github.com/ibidi/business-search-system/commits/main
