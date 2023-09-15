import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import Providers from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'University Management System',
  description: 'Generated by Miguel MV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Navbar />
          <main className="flex min-h-screen flex-col dark:divide-gray-700 items-center justify-between p-5">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
