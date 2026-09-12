'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  ['Soluções', '#solucoes'],
  ['Para seu negócio', '#seu-negocio'],
  ['Por que Vyrtuz', '#por-que-vyrtuz'],
]

export function Brand({ className = '' }: { className?: string }) {
  return <Image className={`brand-logo ${className}`} src="/images/vyrtuz-logo.png" alt="Vyrtuz" width={610} height={147} priority />
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <a href="#inicio" aria-label="Vyrtuz — início" onClick={() => setOpen(false)}><Brand /></a>
        <nav className="desktop-nav" aria-label="Menu principal">
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#contato">Fale com um especialista <ArrowUpRight size={16} /></a>
        <button className="mobile-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Menu mobile">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}
        <a href="#contato" onClick={() => setOpen(false)}>Fale com um especialista <ArrowUpRight size={18} /></a>
      </nav>}
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
