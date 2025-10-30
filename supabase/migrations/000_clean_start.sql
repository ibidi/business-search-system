-- Mevcut tabloları ve politikaları tamamen temizle
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS search_history CASCADE;

-- Tüm politikaları temizle (eğer varsa)
DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON businesses;
DROP POLICY IF EXISTS "Anyone can insert businesses" ON businesses;
DROP POLICY IF EXISTS "Anyone can update businesses" ON businesses;
DROP POLICY IF EXISTS "Search history is viewable by everyone" ON search_history;
DROP POLICY IF EXISTS "Anyone can insert search history" ON search_history;
