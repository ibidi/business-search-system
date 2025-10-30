import axios from 'axios'

// Google Places API
export async function searchWithGooglePlaces(type, location, apiKey, filters = {}) {
  try {
    const { city, district, businessName } = filters
    
    // Arama sorgusunu oluştur
    let query = businessName || type
    if (district) query += ` ${district}`
    if (city) query += ` ${city}`
    query += ', Turkey'

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query,
          key: apiKey,
          language: 'tr',
        },
      }
    )

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API hatası: ${response.data.status}`)
    }

    if (response.data.status === 'ZERO_RESULTS') {
      return []
    }

    const places = response.data.results.map((place) => ({
      place_id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating || 'N/A',
      user_ratings_total: place.user_ratings_total || 0,
      types: place.types.join(', '),
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
    }))

    // Detaylı bilgi al
    const detailedPlaces = await Promise.all(
      places.slice(0, 20).map((place) => getPlaceDetails(place.place_id, place, apiKey))
    )

    return detailedPlaces
  } catch (error) {
    console.error('Google Places arama hatası:', error)
    throw error
  }
}

async function getPlaceDetails(placeId, basicInfo, apiKey) {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          fields: 'formatted_phone_number,website,opening_hours,business_status',
          key: apiKey,
          language: 'tr',
        },
      }
    )

    if (response.data.status === 'OK') {
      const details = response.data.result
      return {
        ...basicInfo,
        phone: details.formatted_phone_number || 'Bilgi yok',
        website: details.website || 'Bilgi yok',
        business_status: details.business_status || 'UNKNOWN',
        is_open: details.opening_hours?.open_now ? 'Açık' : 'Kapalı',
      }
    }

    return { ...basicInfo, phone: 'Bilgi yok', website: 'Bilgi yok', business_status: 'UNKNOWN' }
  } catch (error) {
    console.error('Detay alma hatası:', error)
    return { ...basicInfo, phone: 'Bilgi yok', website: 'Bilgi yok', business_status: 'UNKNOWN' }
  }
}
