-- RLS (Row Level Security) politikalarını etkinleştir
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Businesses tablosu için politikalar
-- Herkes her şeyi yapabilir (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Enable all access for businesses"
  ON businesses
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Search history tablosu için politikalar
-- Herkes her şeyi yapabilir (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Enable all access for search_history"
  ON search_history
  FOR ALL
  USING (true)
  WITH CHECK (true);
