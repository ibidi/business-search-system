'use client'

import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardContent } from './ui/Card'

const BUSINESS_TYPES = [
  { value: 'restoran', label: 'Restoran' },
  { value: 'otel', label: 'Otel' },
  { value: 'eczane', label: 'Eczane' },
  { value: 'tekstil', label: 'Tekstil' },
  { value: 'kafe', label: 'Kafe' },
  { value: 'market', label: 'Market' },
  { value: 'kuaför', label: 'Kuaför' },
  { value: 'spor salonu', label: 'Spor Salonu' },
  { value: 'banka', label: 'Banka' },
  { value: 'hastane', label: 'Hastane' },
]

const API_SOURCES = [
  { value: 'openstreetmap', label: 'OpenStreetMap (Ücretsiz)' },
  { value: 'google', label: 'Google Places API' },
]

export default function SearchForm({ onSearch, loading, apiSource, onApiSourceChange }) {
  const [type, setType] = useState('restoran')
  const [businessName, setBusinessName] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({
      type,
      location: city || 'İstanbul',
      filters: {
        businessName,
        city,
        district,
      }
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* API Seçimi */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Veri Kaynağı
            </label>
            <select
              value={apiSource}
              onChange={(e) => onApiSourceChange(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {API_SOURCES.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* İşletme Türü */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                İşletme Türü
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {BUSINESS_TYPES.map((bt) => (
                  <option key={bt.value} value={bt.value}>
                    {bt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* İşletme Adı */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                İşletme Adı (Opsiyonel)
              </label>
              <Input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Örn: Kahve Dünyası"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* İl */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                İl
              </label>
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Örn: İstanbul"
              />
            </div>

            {/* İlçe/Semt */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                İlçe/Semt (Opsiyonel)
              </label>
              <Input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Örn: Kadıköy"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <SearchIcon className="mr-2 h-4 w-4" />
            {loading ? 'Aranıyor...' : 'Ara'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
