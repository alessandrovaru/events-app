import { Inter } from 'next/font/google'
import './globals.css'


import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Total Elite Training - Academia de Artes Marciales',
  description: 'Academia de artes marciales en tu área',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}