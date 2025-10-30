import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function exportToExcel(data) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('İşletmeler')

  // Başlıkları ekle
  worksheet.columns = [
    { header: 'Sıra', key: 'index', width: 8 },
    { header: 'İşletme Adı', key: 'name', width: 30 },
    { header: 'Adres', key: 'address', width: 50 },
    { header: 'Telefon', key: 'phone', width: 20 },
    { header: 'Website', key: 'website', width: 30 },
    { header: 'Puan', key: 'rating', width: 10 },
    { header: 'Değerlendirme', key: 'reviews', width: 15 },
    { header: 'Durum', key: 'status', width: 15 },
  ]

  // Verileri ekle
  data.forEach((item, index) => {
    worksheet.addRow({
      index: index + 1,
      name: item.name,
      address: item.address,
      phone: item.phone,
      website: item.website,
      rating: item.rating,
      reviews: item.user_ratings_total,
      status: item.business_status === 'OPERATIONAL' ? 'Aktif' : 'Bilinmiyor',
    })
  })

  // Başlık satırını stillendir
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2563EB' },
  }
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
  worksheet.getRow(1).height = 25

  // Tüm hücrelere border ekle
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })
  })

  // Dosyayı indir
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `isletmeler_${new Date().toISOString().split('T')[0]}.xlsx`
  link.click()
  window.URL.revokeObjectURL(url)
}

export function exportToPDF(data) {
  const doc = new jsPDF('l', 'mm', 'a4') // Landscape mode

  // Başlık
  doc.setFontSize(18)
  doc.setTextColor(37, 99, 235)
  doc.text('İşletme Listesi', 14, 15)

  // Bilgiler
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 14, 22)
  doc.text(`Toplam: ${data.length} işletme`, 14, 28)

  // Tablo verilerini hazırla
  const tableData = data.map((item, index) => [
    index + 1,
    item.name,
    item.address.length > 50 ? item.address.substring(0, 50) + '...' : item.address,
    item.phone,
    item.website !== 'Bilgi yok' ? item.website.substring(0, 30) : '-',
    item.rating,
    item.user_ratings_total,
    item.business_status === 'OPERATIONAL' ? 'Aktif' : 'Bilinmiyor',
  ])

  // Tablo oluştur
  autoTable(doc, {
    startY: 35,
    head: [['#', 'İşletme Adı', 'Adres', 'Telefon', 'Website', 'Puan', 'Değ.', 'Durum']],
    body: tableData,
    styles: { 
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: { 
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 40 },
      2: { cellWidth: 70 },
      3: { cellWidth: 30 },
      4: { cellWidth: 35 },
      5: { cellWidth: 15 },
      6: { cellWidth: 15 },
      7: { cellWidth: 20 },
    },
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Sayfa ${i} / ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  const fileName = `isletmeler_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

export function shareViaWhatsApp(data) {
  let message = `*İşletme Listesi*\n\n`
  message += `Toplam: ${data.length} işletme\n`
  message += `Tarih: ${new Date().toLocaleDateString('tr-TR')}\n\n`

  data.slice(0, 10).forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`
    message += `📍 ${item.address}\n`
    message += `📞 ${item.phone}\n`
    if (item.website !== 'Bilgi yok') {
      message += `🌐 ${item.website}\n`
    }
    message += `⭐ ${item.rating} (${item.user_ratings_total} değerlendirme)\n\n`
  })

  if (data.length > 10) {
    message += `... ve ${data.length - 10} işletme daha`
  }

  const encodedMessage = encodeURIComponent(message)
  window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank')
}
