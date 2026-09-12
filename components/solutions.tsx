'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight, CreditCard, Code2, Link2, Smartphone, GitFork, Landmark } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const solutions = [
  { name: 'Maquininha POS', tag: 'PRESENCIAL', icon: CreditCard, description: 'A experiência de pagamento que acompanha o ritmo da sua venda.', image: 'maquininha.webp', imageClass: 'solution-pos' },
  { name: 'Tap on Phone', tag: 'MOBILIDADE', icon: Smartphone, description: 'Seu smartphone compatível também pode ser um ponto de venda.', image: 'tap-on-phone.webp', imageClass: 'solution-phone' },
  { name: 'Link de pagamento', tag: 'DIGITAL', icon: Link2, description: 'Crie, compartilhe e receba. Venda sem precisar de uma loja virtual.', image: 'empreendedor.webp', imageClass: 'solution-link' },
  { name: 'API de pagamentos', tag: 'INTEGRAÇÃO', icon: Code2, description: 'Sua tecnologia na frente. Nossa infraestrutura por trás.', image: '', imageClass: '' },
  { name: 'Split de pagamentos', tag: 'DISTRIBUIÇÃO', icon: GitFork, description: 'Uma venda, múltiplos destinos. Distribua valores de forma estruturada.', image: '', imageClass: '' },
  { name: 'Serviços bancários', tag: 'MOVIMENTAÇÃO', icon: Landmark, description: 'Receber é só o começo. Conecte toda a movimentação do seu negócio.', image: 'cartoes.webp', imageClass: 'solution-bank' },
]

export function Solutions() {
  const viewport = useRef<HTMLDivElement>(null)
  function move(direction: number) {
    const trigger = ScrollTrigger.getById('solutions')
    if (trigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const next = Math.min(trigger.end, Math.max(trigger.start, window.scrollY + direction * 450))
      window.scrollTo({ top: next, behavior: 'smooth' })
    } else viewport.current?.scrollBy({ left: direction * 360, behavior: 'smooth' })
  }
  return (
    <section id="solucoes" className="solutions-section" aria-labelledby="solutions-title">
      <div className="solutions-pin">
        <div className="page-width section-heading" data-reveal>
          <div><p className="eyebrow">UM ECOSSISTEMA COMPLETO</p><h2 id="solutions-title">Uma infraestrutura.<br /><span>Diferentes possibilidades.</span></h2></div>
          <div className="section-heading-aside"><p>Da venda presencial à operação digital.<br />Tudo se conecta com a Vyrtuz.</p><div className="slider-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Ver soluções anteriores"><ArrowLeft size={19} /></button><button className="icon-button" onClick={() => move(1)} aria-label="Ver próximas soluções"><ArrowRight size={19} /></button><span>EXPLORE AS SOLUÇÕES</span></div></div>
        </div>
        <div ref={viewport} className="solutions-window" tabIndex={0} role="region" aria-label="Soluções Vyrtuz; use os botões ou deslize para explorar">
          <div className="solutions-track">
            {solutions.map(({ name, tag, icon: Icon, description, image, imageClass }, index) => (
              <article className="solution-card" key={name}>
                <div className="solution-visual">
                  {image ? <Image src={`/images/${image}`} alt="" width={750} height={400} className={imageClass} sizes="(max-width: 767px) 85vw, 430px" /> : index === 3 ? <div className="api-visual"><span className="code-icon"><Code2 size={44} /></span><code><span>vyrtuz</span>.payments.create({'{'}<br />&nbsp; amount: <span>1000</span>,<br />&nbsp; currency: <span>&quot;BRL&quot;</span><br />{'}'})</code><small>Exemplo ilustrativo de integração</small></div> : <div className="split-visual"><div className="split-origin"><GitFork size={22} /><span>Uma venda.<strong>R$ 1.000</strong></span></div><div className="split-branches"><span><strong>R$ 700</strong>Empresa</span><span><strong>R$ 200</strong>Parceiro</span><span><strong>R$ 100</strong>Comissão</span></div><small>Exemplo de distribuição</small></div>}
                  <span className="solution-category"><Icon size={15} />{tag}</span>
                </div>
                <div className="solution-copy"><h3>{name}</h3><p>{description}</p><a href="#contato" className="solution-action" aria-label={`Conhecer ${name}`}>Conhecer solução <ArrowUpRight size={18} /></a></div>
              </article>
            ))}
          </div>
        </div>
        <div className="page-width solutions-foot"><span>Receber. Integrar. Distribuir. Movimentar.</span><span>Uma estrutura que acompanha você. <ArrowRight size={16} /></span></div>
      </div>
    </section>
  )
}
