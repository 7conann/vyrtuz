import { SiteHeader, Brand } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Solutions } from '@/components/solutions'
import { CinematicSection } from '@/components/cinematic-section'
import { BusinessSection, WhyVyrtuz, ContactSection } from '@/components/business-sections'
import { ScrollExperience } from '@/components/scroll-experience'
import { ArrowUpRight } from 'lucide-react'

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Solutions />
        <CinematicSection />
        <BusinessSection />
        <WhyVyrtuz />
        <ContactSection />
      </main>
      <footer className="site-footer page-width">
        <div className="footer-top"><div><a href="#inicio" aria-label="Voltar ao início"><Brand /></a><p>Tudo que move o seu negócio.</p></div><nav aria-label="Links do rodapé"><a href="#solucoes">Soluções</a><a href="#seu-negocio">Para seu negócio</a><a href="#por-que-vyrtuz">Por que Vyrtuz</a><a href="/vyrtuz-apresentacao.pdf" target="_blank" rel="noopener noreferrer">Apresentação <ArrowUpRight size={15} /></a></nav></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Vyrtuz. Todos os direitos reservados.</span><span>Infraestrutura financeira para empresas.</span><a href="#inicio">Voltar ao topo <ArrowUpRight size={15} /></a></div>
      </footer>
      <ScrollExperience />
    </>
  )
}
