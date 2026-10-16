import { Analytics } from '@vercel/analytics/next'
import { Onest } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const onest = Onest({ subsets: ['latin', 'latin-ext'], variable: '--font-onest' })

export const metadata: Metadata = {
  metadataBase: new URL('https://vyrtuz.com.br'),
  title: 'Vyrtuz — Tudo que move o seu negócio',
  description: 'Da primeira venda ao próximo grande passo. Conheça a maquininha Vyrtuz, Tap on Phone, Link de Pagamento, API, Split e serviços bancários em uma infraestrutura conectada.',
  openGraph: {
    title: 'Vyrtuz — Tudo que move o seu negócio',
    description: 'Uma infraestrutura. Diferentes possibilidades. Pagamentos e soluções financeiras para acompanhar o seu negócio.',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/images/filme-poster.jpg', width: 1600, height: 900, alt: 'Maquininha Vyrtuz' }],
  },
  icons: { icon: '/images/vyrtuz-favicon-v2.png', apple: '/images/vyrtuz-favicon-v2.png' },
}

export const viewport: Viewport = {
  themeColor: '#050a17',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={onest.variable}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
