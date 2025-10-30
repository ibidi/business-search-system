-- ============================================
-- İŞLETME ARAMA SİSTEMİ - SUPABASE KURULUM
-- ============================================
-- Bu SQL kodunu Supabase SQL Editor'de çalıştırın
-- Tüm tabloları temizleyip yeniden oluşturur

-- 1. Temizlik (Hata verirse sorun değil, devam edin)
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS search_history CASCADE;

-- 2. Tabloları oluştur
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

-- 3. İndeksler
CREATE INDEX idx_businesses_place_id ON businesses(place_id);
CREATE INDEX idx_businesses_name ON businesses(name);
CREATE INDEX idx_search_history_created_at ON search_history(created_at DESC);

-- 4. RLS Etkinleştir
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- 5. Politikalar (Herkes her şeyi yapabilir)
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

-- 6. Doğrulama
SELECT 'Tablolar başarıyla oluşturuldu!' as message;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('businesses', 'search_history');

SELECT 'RLS politikaları başarıyla eklendi!' as message;
SELECT tablename, policyname FROM pg_policies 
WHERE tablename IN ('businesses', 'search_history');
