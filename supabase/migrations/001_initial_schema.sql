-- İşletmeler tablosu
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

-- Arama geçmişi tablosu
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
