# Supabase Migrations

Bu klasör Supabase veritabanı migration dosyalarını içerir.

## ⚠️ ÖNEMLİ: Sıfırdan Kurulum

Eğer daha önce tablolar oluşturduysanız, önce temizlik yapın.

## Kurulum Adımları

### 1. Supabase Dashboard'dan SQL Editor kullanarak:

1. [Supabase Dashboard](https://supabase.com/dashboard) → Projenizi seçin
2. Sol menüden **SQL Editor** seçin
3. **New Query** butonuna tıklayın
4. Migration dosyalarını **SIRASIYLA** çalıştırın:

#### Adım 1: Temizlik (Eğer daha önce tablo oluşturduysanız)
```sql
-- 000_clean_start.sql içeriğini kopyalayıp çalıştırın
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS search_history CASCADE;
```

#### Adım 2: Tabloları Oluştur
```sql
-- 001_initial_schema.sql içeriğini kopyalayıp çalıştırın
```

#### Adım 3: RLS Politikalarını Ekle
```sql
-- 002_enable_rls.sql içeriğini kopyalayıp çalıştırın
```

### 2. Tek Seferde Tüm Migration'ları Çalıştır

Aşağıdaki SQL kodunu kopyalayıp SQL Editor'de çalıştırabilirsiniz:

```sql
-- Temizlik
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS search_history CASCADE;

-- Tabloları oluştur
CREATE TABLE businesses (
  id BIGSERIAL PRIMARY KEY,
  place_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  website TEXT,
  rating DECIMAL,
  user_ratings_total INTEGER,
  types TEXT,
  business_status TEXT,
  location JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE search_history (
  id BIGSERIAL PRIMARY KEY,
  search_type TEXT NOT NULL,
  location TEXT NOT NULL,
  results_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- İndeksler
CREATE INDEX idx_businesses_place_id ON businesses(place_id);
CREATE INDEX idx_businesses_name ON businesses(name);
CREATE INDEX idx_search_history_created_at ON search_history(created_at DESC);

-- RLS Etkinleştir
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Politikalar
CREATE POLICY "Enable all access for businesses"
  ON businesses
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for search_history"
  ON search_history
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Doğrulama

Migration'ların başarılı olduğunu doğrulamak için:

```sql
-- Tabloları kontrol et
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('businesses', 'search_history');

-- RLS politikalarını kontrol et
SELECT schemaname, tablename, policyname FROM pg_policies 
WHERE tablename IN ('businesses', 'search_history');

-- Test insert
INSERT INTO businesses (place_id, name, address, phone, website, rating, user_ratings_total, types, business_status, location)
VALUES ('test_123', 'Test İşletme', 'Test Adres', '0555 555 5555', 'test.com', 4.5, 100, 'restoran', 'OPERATIONAL', '{"lat": 41.0082, "lng": 28.9784}');

-- Test select
SELECT * FROM businesses WHERE place_id = 'test_123';

-- Test verilerini temizle
DELETE FROM businesses WHERE place_id = 'test_123';
```

## Migration Dosyaları

- **000_clean_start.sql**: Mevcut tabloları temizle
- **001_initial_schema.sql**: Temel tablo yapıları ve indeksler
- **002_enable_rls.sql**: Row Level Security politikaları
