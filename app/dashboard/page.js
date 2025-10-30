'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import SearchForm from '@/components/SearchForm'
import ResultsTable from '@/components/ResultsTable'
import ExportButtons from '@/components/ExportButtons'
import StatsCards from '@/components/StatsCards'
import { Card, CardContent } from '@/components/ui/Card'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalSearches: 0,
    totalBusinesses: 0,
    todaySearches: 0,
  })
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadStats()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const loadStats = async () => {
    try {
      const { data: searches } = await supabase
        .from('search_history')
        .select('*')
      
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id')

      const today = new Date().toISOString().split('T')[0]
      const todaySearches = searches?.filter(s => 
        s.created_at.startsWith(today)
      ).length || 0

      setStats({
        totalSearches: searches?.length || 0,
        totalBusinesses: businesses?.length || 0,
        todaySearches,
      })
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error)
    }
  }

  const [apiSource, setApiSource] = useState('openstreetmap')

  const handleSearch = async (searchParams) => {
    setLoading(true)
    setResults([])
    try {
      const headers = { 'Content-Type': 'application/json' }
      
      // Google API kullanılıyorsa API key'i ekle
      if (apiSource === 'google') {
        const apiKey = localStorage.getItem('google_places_api_key')
        if (!apiKey) {
          alert('Google Places API kullanmak için ayarlardan API anahtarı girmelisiniz.')
          setLoading(false)
          return
        }
        headers['x-google-api-key'] = apiKey
      }

      const response = await fetch('/api/search', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...searchParams,
          apiSource,
        }),
      })
      const data = await response.json()
      
      if (!response.ok) {
        alert(data.error || 'Arama sırasında bir hata oluştu')
        return
      }
      
      setResults(data.results || [])
      loadStats()
    } catch (error) {
      console.error('Arama hatası:', error)
      alert('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">İşletmeleri arayın ve verilerinizi yönetin</p>
        </div>

        <StatsCards stats={stats} />

        <SearchForm 
          onSearch={handleSearch} 
          loading={loading}
          apiSource={apiSource}
          onApiSourceChange={setApiSource}
        />

        {results.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Sonuçlar ({results.length})
                </h2>
                <ExportButtons data={results} />
              </div>
              <ResultsTable data={results} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
