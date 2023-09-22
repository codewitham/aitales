import Navbar from '@/components/Navbar'
import { NextAuthProvider } from './NextSessionProvider'
import './globals.css'
import { Cairo } from 'next/font/google'

const font = Cairo({ weight: ['200', '300', '400', '500', '600', '800', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'aitales',
  description: 'write your own ai story',
}

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={font.className}>
          <section>
            <Navbar />
            <main>
              {children}
            </main>
          </section>
        </body>
      </html>
    </NextAuthProvider>
  )
}
