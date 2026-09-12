import { Analytics } from '@vercel/analytics/next'
import { Geist, Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'Vyrtuz — Tudo que move o seu negócio',
  description: 'Da primeira venda ao próximo grande passo. Conheça a maquininha Vyrtuz, Tap on Phone, Link de Pagamento, API, Split e serviços bancários em uma infraestrutura conectada.',
  openGraph: {
    title: 'Vyrtuz — Tudo que move o seu negócio',
    description: 'Uma infraestrutura. Diferentes possibilidades. Pagamentos e soluções financeiras para acompanhar o seu negócio.',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/images/filme-poster.jpg', width: 1600, height: 900, alt: 'Maquininha Vyrtuz' }],
  },
  icons: { icon: '/images/vyrtuz-logo.png' },
}

export const viewport: Viewport = {
  themeColor: '#080d14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`bg-background ${geist.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
