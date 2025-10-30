'use client'

import { Badge } from './ui/Badge'
import { ExternalLink } from 'lucide-react'

export default function ResultsTable({ data }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                İşletme Adı
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Adres
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Telefon
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Website
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Puan
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Durum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((business, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm font-medium">
                  {business.name}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                  {business.address}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                  {business.phone}
                </td>
                <td className="px-4 py-3 text-sm">
                  {business.website !== 'Bilgi yok' ? (
                    <a
                      href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Link
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-muted-foreground">⭐</span>
                    <span className="text-xs text-muted-foreground">
                      ({business.user_ratings_total})
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge 
                    variant={business.business_status === 'OPERATIONAL' ? 'success' : 'secondary'}
                  >
                    {business.business_status === 'OPERATIONAL' ? 'Aktif' : 'Bilinmiyor'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
