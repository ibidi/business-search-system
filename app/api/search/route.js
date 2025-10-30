import { NextResponse } from 'next/server'
import { searchPlaces } from '@/lib/googlePlaces'
import { searchWithGooglePlaces } from '@/lib/googlePlacesAPI'
import { saveSearchHistory, saveBusinesses } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { type, location, apiSource, filters } = await request.json()

    if (!type || !location) {
      return NextResponse.json(
        { error: 'İşletme türü ve konum gerekli' },
        { status: 400 }
      )
    }

    let results = []

    // API kaynağına göre arama yap
    if (apiSource === 'google') {
      // Google Places API kullan
      const apiKey = request.headers.get('x-google-api-key')
      
      if (!apiKey) {
        return NextResponse.json(
          { error: 'Google Places API kullanmak için ayarlardan API anahtarı girmelisiniz.' },
          { status: 400 }
        )
      }

      results = await searchWithGooglePlaces(type, location, apiKey, filters)
    } else {
      // OpenStreetMap kullan
      results = await searchPlaces(type, location, filters)
    }

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: 'Bu kriterlere uygun işletme bulunamadı. Lütfen farklı bir şehir veya işletme türü deneyin.' },
        { status: 404 }
      )
    }

    // Supabase'e kaydet
    await saveSearchHistory({ type, location }, results)
    await saveBusinesses(results)

    return NextResponse.json({ results })
  } catch (error) {
    console.error('API hatası:', error)
    return NextResponse.json(
      { error: error.message || 'Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
