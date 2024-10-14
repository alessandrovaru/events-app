import { Inter } from 'next/font/google'
import './globals.css'
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from '@/config'
import { AuthProvider } from './auth/AuthProvider'
import { toUser } from './shared/user'
import localFont from "next/font/local";

import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: 'Total Elite Training - Academia de Artes Marciales',
  description: 'Academia de artes marciales en tu área',
}

const questrial = localFont({ 
  src: "../../public/fonts/questrial.ttf",
  variable: '--questrial-font'
})

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })


// config your font
const microgramma = localFont({
  src: "../../public/fonts/micro.otf",
  variable: "--microgramma-font",
});

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
      <body className={`${questrial.variable} ${microgramma.className}`}>
        <div className="flex flex-col min-h-screen bg-black">
          <AuthProvider user={user}>
            
            {children}
            <Analytics />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}