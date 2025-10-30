'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TrendingUp, Search, MapPin, Calendar } from 'lucide-react'

export default function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const [stats, setStats] = useState({
    totalSearches: 0,
    totalBusinesses: 0,
    topType: '',
    topLocation: '',
  })
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadData()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const loadData = async () => {
    try {
      // Arama geçmişi
      const { data: history } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      setSearchHistory(history || [])

      // İstatistikler
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id')

      // En çok aranan tür
      const typeCounts = {}
      history?.forEach(h => {
        typeCounts[h.search_type] = (typeCounts[h.search_type] || 0) + 1
      })
      const topType = Object.keys(typeCounts).reduce((a, b) => 
        typeCounts[a] > typeCounts[b] ? a : b, ''
      )

      // En çok aranan konum
      const locationCounts = {}
      history?.forEach(h => {
        locationCounts[h.location] = (locationCounts[h.location] || 0) + 1
      })
      const topLocation = Object.keys(locationCounts).reduce((a, b) => 
        locationCounts[a] > locationCounts[b] ? a : b, ''
      )

      setStats({
        totalSearches: history?.length || 0,
        totalBusinesses: businesses?.length || 0,
        topType: topType || 'Henüz yok',
        topLocation: topLocation || 'Henüz yok',
      })
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analitik</h1>
          <p className="text-muted-foreground mt-1">Arama geçmişiniz ve istatistikler</p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Arama</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSearches}</div>
              <p className="text-xs text-muted-foreground">Tüm zamanlar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam İşletme</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBusinesses}</div>
              <p className="text-xs text-muted-foreground">Veritabanında</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Çok Aranan</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{stats.topType}</div>
              <p className="text-xs text-muted-foreground">İşletme türü</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popüler Konum</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.topLocation}</div>
              <p className="text-xs text-muted-foreground">En çok aranan şehir</p>
            </CardContent>
          </Card>
        </div>

        {/* Arama Geçmişi */}
        <Card>
          <CardHeader>
            <CardTitle>Arama Geçmişi</CardTitle>
            <CardDescription>Son 50 aramanız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Henüz arama yapmadınız
                </div>
              ) : (
                searchHistory.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(search.created_at).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {search.search_type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {search.location}
                      </div>
                    </div>
                    <Badge variant="outline">
                      {search.results_count} sonuç
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
