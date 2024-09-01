import { Inter } from 'next/font/google'
import './globals.css'


import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"

const inter = Inter({ subsets: ['latin'] })

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from '@/config'
import { AuthProvider } from './auth/AuthProvider'
import { toUser } from './shared/user'


export const metadata = {
  title: 'Total Elite Training - Academia de Artes Marciales',
  description: 'Academia de artes marciales en tu área',
}

export default async function RootLayout({ children }) {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <AuthProvider user={user}>
            
            {children}
            
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}