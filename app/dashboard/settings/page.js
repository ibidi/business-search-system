'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [fullName, setFullName] = useState('')
  const [googleApiKey, setGoogleApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadSettings()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
      setFullName(user.user_metadata?.full_name || '')
    }
  }

  const loadSettings = () => {
    const savedApiKey = localStorage.getItem('google_places_api_key')
    if (savedApiKey) {
      setGoogleApiKey(savedApiKey)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      if (error) throw error
      
      // API key'i localStorage'a kaydet
      if (googleApiKey) {
        localStorage.setItem('google_places_api_key', googleApiKey)
      } else {
        localStorage.removeItem('google_places_api_key')
      }
      
      alert('Ayarlarınız güncellendi')
    } catch (error) {
      alert('Güncelleme hatası: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground mt-1">Hesap ve API ayarlarınızı yönetin</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Hesap Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>Hesap Bilgileri</CardTitle>
              <CardDescription>Profil bilgilerinizi güncelleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ad Soyad</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input
                    type="password"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? 'Güncelleniyor...' : 'Güncelle'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* API Ayarları */}
          <Card>
            <CardHeader>
              <CardTitle>API Ayarları</CardTitle>
              <CardDescription>
                Google Places API kullanmak için API anahtarınızı girin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Google Places API Key</label>
                  <Input
                    type="password"
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                  />
                  <p className="text-xs text-muted-foreground">
                    API anahtarınız tarayıcınızda güvenli şekilde saklanır.{' '}
                    <a 
                      href="https://developers.google.com/maps/documentation/places/web-service/get-api-key" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      API anahtarı nasıl alınır?
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
