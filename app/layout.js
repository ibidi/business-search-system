import './globals.css'

export const metadata = {
  title: 'İşletme Arama Sistemi',
  description: 'Türkiye\'deki işletmeleri kolayca bulun ve iletişim bilgilerine ulaşın',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
