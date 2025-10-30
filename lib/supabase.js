import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Arama geçmişini kaydet
export async function saveSearchHistory(searchParams, results) {
  try {
    const { data, error } = await supabase
      .from('search_history')
      .insert([
        {
          search_type: searchParams.type,
          location: searchParams.location,
          results_count: results.length,
          created_at: new Date().toISOString(),
        },
      ])
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Geçmiş kaydetme hatası:', error)
  }
}

// İşletmeleri kaydet
export async function saveBusinesses(businesses) {
  try {
    // is_open alanını kaldır, sadece gerekli alanları gönder
    const cleanedBusinesses = businesses.map(business => ({
      place_id: business.place_id,
      name: business.name,
      address: business.address,
      phone: business.phone,
      website: business.website,
      rating: parseFloat(business.rating) || 0,
      user_ratings_total: business.user_ratings_total || 0,
      types: business.types,
      business_status: business.business_status,
      location: business.location,
    }))

    const { data, error } = await supabase
      .from('businesses')
      .upsert(cleanedBusinesses, { onConflict: 'place_id' })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('İşletme kaydetme hatası:', error)
  }
}
