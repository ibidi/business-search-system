'use client'

import { exportToExcel, exportToPDF, shareViaWhatsApp } from '@/utils/exportHelpers'
import { FileSpreadsheet, FileText, MessageCircle } from 'lucide-react'
import { Button } from './ui/Button'

export default function ExportButtons({ data }) {
  const handleExcelExport = async () => {
    try {
      await exportToExcel(data)
    } catch (error) {
      console.error('Excel export error:', error)
      alert('Excel dışa aktarma hatası')
    }
  }

  const handlePDFExport = () => {
    try {
      exportToPDF(data)
    } catch (error) {
      console.error('PDF export error:', error)
      alert('PDF dışa aktarma hatası')
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleExcelExport}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </Button>
      
      <Button
        onClick={handlePDFExport}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <FileText className="h-4 w-4" />
        PDF
      </Button>
      
      <Button
        onClick={() => shareViaWhatsApp(data)}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  )
}
