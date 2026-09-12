'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight, Store, Utensils, BriefcaseBusiness, Globe, Layers, ShieldCheck, Activity, ScanEye, BadgeCheck, Check, Plus } from 'lucide-react'

const businesses = [
  { name: 'Loja física', icon: Store, solution: 'Maquininha POS', description: 'O pagamento acompanha a experiência da sua loja. Receba com praticidade e conecte a venda à sua operação financeira.' },
  { name: 'Restaurante', icon: Utensils, solution: 'Maquininha POS', description: 'Do balcão à mesa, leve o pagamento até o cliente. Mais praticidade para receber e seguir com o atendimento.' },
  { name: 'Prestador de serviços', icon: BriefcaseBusiness, solution: 'Link de pagamento + POS', description: 'Presencialmente ou à distância, transforme o atendimento em oportunidade. Escolha a melhor forma de receber.' },
  { name: 'E-commerce', icon: Globe, solution: 'API + Link de pagamento', description: 'Integre pagamentos à experiência que você já construiu. Sua loja online conectada à infraestrutura Vyrtuz.' },
  { name: 'Marketplace', icon: Layers, solution: 'API + Split de pagamentos', description: 'Conecte pagamentos e distribua os valores entre participantes. Uma operação integrada para múltiplos vendedores.' },
]

export function BusinessSection() {
  const [selected, setSelected] = useState(0)
  const active = businesses[selected]
  return (
    <section id="seu-negocio" className="business-section page-width">
      <div className="business-image"><Image src="/images/negocio-em-movimento.webp" alt="Empreendedor em movimento pela cidade" width={910} height={1080} sizes="(max-width: 767px) 100vw, 45vw" data-parallax /><div className="business-image-caption"><span className="eyebrow">ONDE A VIDA ACONTECE.</span><p>A Vyrtuz vai<br />com o seu negócio.</p></div></div>
      <div className="business-copy" data-reveal><p className="eyebrow">PARA CADA JEITO DE EMPREENDER</p><h2>Seu negócio é único.<br /><span>Sua estrutura<br />{' '}também pode ser.</span></h2><p className="section-description">Não importa onde a venda acontece.<br />Existe uma solução Vyrtuz para você.</p>
        <div className="business-options" role="group" aria-label="Escolha seu modelo de negócio">{businesses.map(({ name, icon: Icon }, index) => <button key={name} aria-pressed={selected === index} onClick={() => setSelected(index)}><Icon size={17} />{name}{selected === index && <Check size={15} />}</button>)}</div>
        <div className="business-recommendation" aria-live="polite"><p className="eyebrow">UMA COMBINAÇÃO PARA VOCÊ</p><h3>{active.solution}</h3><p>{active.description}</p><a href="#contato" className="text-link">Encontrar minha solução <ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  )
}

export function WhyVyrtuz() {
  return (
    <section id="por-que-vyrtuz" className="why-section page-width">
      <div className="manifesto"><p className="eyebrow" data-reveal>MENOS FRAGMENTAÇÃO. MAIS POSSIBILIDADES.</p><h2 aria-label="O seu negócio não precisa de mais sistemas. Precisa de tudo conectado.">{'O seu negócio não precisa de mais sistemas. Precisa de tudo conectado.'.split(' ').map((word, index) => <span aria-hidden="true" className="manifesto-word" key={index}>{word}{' '}</span>)}</h2><p data-reveal>Uma infraestrutura financeira que conecta recebimento, integração,<br className="desktop-break" /> distribuição e movimentação. Para você focar no que vem a seguir.</p></div>
      <div className="values-grid">{[
        ['Unificada', 'Diferentes soluções em uma mesma estrutura.'],
        ['Flexível', 'Para diferentes modelos e momentos do negócio.'],
        ['Integrável', 'Parte da experiência que sua empresa já construiu.'],
        ['Escalável', 'Preparada para acompanhar novas possibilidades.'],
      ].map(([title, description]) => <div key={title} className="value-item" data-reveal><ArrowUpRight size={23} /><h3>{title}</h3><p>{description}</p></div>)}</div>
      <div className="security-panel" data-reveal><div><ShieldCheck className="security-main-icon" size={31} /><h3>Estrutura para confiar.</h3><p>Tecnologia, processos e acompanhamento<br className="desktop-break" /> para uma operação segura e consistente.</p></div><div className="security-features">{[[ShieldCheck, 'Segurança'], [Activity, 'Monitoramento'], [ScanEye, 'Prevenção'], [BadgeCheck, 'Compliance']].map(([Icon, label]) => { const FeatureIcon = Icon as typeof ShieldCheck; return <span key={String(label)}><FeatureIcon size={20} />{String(label)}</span> })}</div></div>
    </section>
  )
}

export function ContactSection() {
  return (
    <>
      <section className="faq-section page-width" aria-labelledby="faq-title"><div data-reveal><p className="eyebrow">PODE PERGUNTAR</p><h2 id="faq-title">Próximo passo,<br /><span>sem dúvidas.</span></h2><a className="text-link" href="/vyrtuz-apresentacao.pdf" target="_blank" rel="noopener noreferrer">Conheça a apresentação <ArrowUpRight size={17} /></a></div><div className="faq-list">{[
        ['A Vyrtuz é só uma maquininha?', 'A maquininha POS é uma das soluções. A Vyrtuz também conecta API, Link de Pagamento, Tap on Phone, Split de Pagamentos e Serviços Bancários em uma infraestrutura financeira para empresas.'],
        ['Qual solução faz sentido para meu negócio?', 'Depende de onde você vende e de como sua operação funciona. Lojas e restaurantes podem usar POS; vendas digitais podem utilizar API e Link; marketplaces podem combinar API e Split. A equipe Vyrtuz pode orientar a escolha.'],
        ['Como funciona o Tap on Phone?', 'A solução transforma smartphones compatíveis em pontos de recebimento por aproximação. A compatibilidade e as condições de uso devem ser confirmadas com a equipe Vyrtuz.'],
        ['Quais são as taxas e condições?', 'As taxas, os prazos de recebimento e as condições comerciais não são informados na apresentação institucional. Consulte a equipe Vyrtuz para conhecer as condições aplicáveis à sua operação.'],
      ].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
      <section id="contato" className="contact-section"><div className="page-width contact-inner" data-reveal><span className="eyebrow">O FUTURO DO SEU NEGÓCIO JÁ COMEÇOU.</span><h2>Vamos mover<br />o seu <em>próximo passo?</em></h2><p>Conecte seu negócio a uma nova forma de receber,<br className="desktop-break" /> operar e crescer. Conheça a Vyrtuz.</p><div className="contact-actions"><a href="https://www.vyrtuz.com" target="_blank" rel="noopener noreferrer" className="action action-light">Ir para o site oficial <ArrowUpRight size={19} /></a><a href="/vyrtuz-apresentacao.pdf" target="_blank" rel="noopener noreferrer" className="contact-download">Ver apresentação <ArrowRight size={18} /></a></div></div><span className="contact-wordmark" aria-hidden="true">VYRTUZ</span></section>
    </>
  )
}
