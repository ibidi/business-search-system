'use client'

import { Search, Building2, TrendingUp } from 'lucide-react'

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Toplam Arama',
      value: stats.totalSearches,
      icon: Search,
      color: 'bg-blue-500',
    },
    {
      title: 'Toplam İşletme',
      value: stats.totalBusinesses,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      title: 'Bugünkü Aramalar',
      value: stats.todaySearches,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="text-white" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
