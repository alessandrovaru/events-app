import { Inter } from 'next/font/google'
import './globals.css'
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from '@/config'
import { AuthProvider } from './auth/AuthProvider'
import { toUser } from './shared/user'
import localFont from "next/font/local";

import { Analytics } from "@vercel/analytics/react"
import listStorageData from "@/firebase/firestore/listData";
import getMetadata from '@/firebase/firestore/listSingleObject';


export async function generateMetadata() {
  const metadata = await getMetadata("home"); // Replace with your actual doc ID

  const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_BASE_URL;

  if (!metadata) {
    // Handle the case where metadata is not found
    return {
      title: "Default Title",
      description: "Default Description",
      // ... other default metadata
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: baseUrl, // Replace with your actual URL
      siteName: metadata.siteName,
      images: [
        {
          url: "/images/metadata/metadata-image.webp", // Replace with your actual image URL
          width: 1366,
          height: 768,
        },
      ],
      locale: 'es_ES',
    },
  };
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
