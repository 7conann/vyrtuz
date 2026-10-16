'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, Plus, X } from 'lucide-react'
import { commercialLink, commercialPhone } from '@/lib/commercial'
import { HomeMotion } from '@/components/home-motion'

const nav = [['Soluções', '#solucoes'], ['Seu negócio', '#seu-negocio'], ['Como começar', '#como-comecar'], ['Dúvidas', '#duvidas']]

const solutions = [
  { name: 'Maquininha POS', line: 'Seu negócio onde a venda acontece.', text: 'Pagamento presencial com praticidade no balcão, na mesa ou em movimento.', image: 'maquininha.webp', position: '50% 10%' },
  { name: 'Tap on Phone', line: 'Seu smartphone também vende.', text: 'Receba por aproximação em um celular compatível, onde o cliente estiver.', image: 'tap-on-phone.webp', position: '50% 50%' },
  { name: 'Link de Pagamento', line: 'Venda sem precisar de loja virtual.', text: 'Crie, compartilhe pelo WhatsApp ou Instagram e receba a distância.', image: 'empreendedor.webp', position: '62% 50%' },
  { name: 'API de pagamentos', line: 'Sua tecnologia na frente.', text: 'Conecte pagamentos à experiência que sua empresa já construiu.', visual: 'api' },
  { name: 'Split de pagamentos', line: 'Uma venda, vários destinos.', text: 'Distribua os valores de cada venda entre os participantes da operação.', visual: 'split' },
  { name: 'Serviços bancários', line: 'Receber é só o começo.', text: 'Conecte o recebimento à movimentação financeira do seu negócio.', image: 'cartoes.webp', position: '30% 50%' },
] as const

const journey = [
  ['Receber', 'Maquininha, Tap on Phone, Link de Pagamento e API. Cada venda entra pelo canal que fizer sentido.'],
  ['Distribuir', 'Split de pagamentos para dividir uma venda entre empresa, parceiros e comissões.'],
  ['Movimentar', 'Serviços bancários que levam o dinheiro recebido para o dia a dia da operação.'],
  ['Crescer', 'Uma estrutura preparada para acompanhar o próximo passo do negócio.'],
]

const segments = [
  { name: 'Varejo', combo: 'Maquininha POS + Link de Pagamento', text: 'Receba no balcão e continue vendendo pelo WhatsApp quando o cliente não puder ir até a loja.', place: 'Loja de roupas', items: [['Camiseta básica', '79,90'], ['Calça jeans', '159,90']], method: 'Crédito em 2x', via: 'Maquininha POS' },
  { name: 'Alimentação', combo: 'Maquininha POS + Tap on Phone', text: 'Do caixa à mesa, leve o pagamento até o cliente e libere o atendimento mais rápido.', place: 'Café da esquina', items: [['2 cafés coados', '14,00'], ['Pão de queijo', '9,50']], method: 'Débito por aproximação', via: 'Tap on Phone' },
  { name: 'Serviços e autônomos', combo: 'Tap on Phone + Link de Pagamento', text: 'Atenda presencialmente ou a distância com o celular que já está no seu bolso.', place: 'Salão de beleza', items: [['Corte e escova', '120,00']], method: 'Pix pelo link', via: 'Link de Pagamento' },
  { name: 'Delivery e eventos', combo: 'Tap on Phone', text: 'Receba por aproximação na porta do cliente, na feira ou no evento, sem equipamento extra.', place: 'Entrega nº 2381', items: [['Pizza grande', '62,00'], ['Refrigerante 2 L', '12,00']], method: 'Crédito por aproximação', via: 'Tap on Phone' },
  { name: 'E-commerce', combo: 'API + Link de Pagamento', text: 'Integre o pagamento ao seu site e use links para vendas fora do carrinho.', place: 'Pedido online nº 10482', items: [['Tênis de corrida', '249,00'], ['Frete', '18,90']], method: 'Crédito em 3x', via: 'API de pagamentos' },
  { name: 'Marketplace', combo: 'API + Split de pagamentos', text: 'Conecte pagamentos à plataforma e distribua cada venda entre os vendedores.', place: 'Venda no marketplace', items: [['Para o vendedor', '850,00'], ['Para a plataforma', '150,00']], method: 'Pix', via: 'Split de pagamentos' },
]

function sum(items: string[][]) {
  const cents = items.reduce((total, [, value]) => total + Number(value.replace('.', '').replace(',', '')), 0)
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

const steps = [
  { title: 'Conte como você vende', text: 'Onde você atende, quanto vende e o que precisa resolver. A conversa começa pela sua realidade, não por um pacote pronto.', detail: 'Pelo WhatsApp, no seu tempo.' },
  { title: 'Escolha a combinação', text: 'A equipe Vyrtuz apresenta as soluções e as condições comerciais que fazem sentido para a sua operação.', detail: 'Maquininha, celular, link ou integração.' },
  { title: 'Comece a receber', text: 'Do equipamento à integração, você recebe orientação para colocar a primeira venda para rodar.', detail: 'Com acompanhamento da equipe.' },
]

const faqs = [
  ['A Vyrtuz é só uma maquininha?', 'Não. A maquininha POS é uma das soluções. A Vyrtuz também conecta Tap on Phone, Link de Pagamento, API, Split de pagamentos e serviços bancários em uma só infraestrutura financeira.'],
  ['Quais são as taxas e os prazos?', 'As condições dependem da solução e do perfil da sua operação. Fale com a equipe pelo botão “Quero ser Vyrtuz” para conhecer as condições para o seu negócio.'],
  ['Posso receber usando meu celular?', 'Sim, com o Tap on Phone, em smartphones compatíveis. A equipe Vyrtuz confirma os requisitos e a disponibilidade para o seu aparelho.'],
  ['Como funciona o Link de Pagamento?', 'Você cria um link e envia ao cliente pelo WhatsApp, Instagram, e-mail ou proposta. Ele paga a distância, sem você precisar de loja virtual.'],
  ['A Vyrtuz atende lojas online e marketplaces?', 'Sim. A API conecta pagamentos ao seu site ou plataforma, e o Split distribui os valores de cada venda entre os participantes.'],
  ['Como encontro a solução certa?', 'Conte à equipe como você vende. A Vyrtuz orienta a escolha das soluções e apresenta as condições aplicáveis.'],
]

const statement = 'A Vyrtuz conecta recebimento, integração, distribuição e movimentação em uma só estrutura. Para você focar no que vem a seguir.'

function external(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

function Logo({ className = '' }: { className?: string }) {
  return <span className={`v-logo ${className}`} role="img" aria-label="Vyrtuz" />
}

function Action({ subject, children = 'Quero ser Vyrtuz', tone = 'blue' }: { subject?: string; children?: React.ReactNode; tone?: 'blue' | 'light' }) {
  const href = commercialLink(subject)
  return <a className={`v-action v-action-${tone}`} href={href} {...external(href)}><span>{children}</span><span className="v-action-icon" aria-hidden="true"><ArrowUpRight size={18} /></span></a>
}

function ApiVisual() {
  return <div className="v-visual v-visual-api" data-ui aria-label="Exemplo ilustrativo de integração">
    <pre><code><span className="t-key">const</span> venda = <span className="t-key">await</span> vyrtuz.payments.create({'{'}{'\n'}  amount: <span className="t-num">15990</span>,{'\n'}  method: <span className="t-str">&quot;pix&quot;</span>,{'\n'}  customer: <span className="t-str">&quot;cliente_8231&quot;</span>{'\n'}{'}'}){'\n\n'}<span className="t-dim">// status: approved</span></code></pre>
  </div>
}

function SplitVisual() {
  return <div className="v-visual v-visual-split" data-ui aria-label="Exemplo ilustrativo de divisão de uma venda de R$ 1.000">
    <div className="v-split-total"><small>Uma venda</small><strong>R$ 1.000</strong></div>
    <ul>
      <li style={{ '--share': '70%' } as React.CSSProperties}><span>Empresa</span><strong>R$ 700</strong></li>
      <li style={{ '--share': '20%' } as React.CSSProperties}><span>Parceiro</span><strong>R$ 200</strong></li>
      <li style={{ '--share': '10%' } as React.CSSProperties}><span>Comissão</span><strong>R$ 100</strong></li>
    </ul>
  </div>
}

export function VyrtuzHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [segment, setSegment] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const active = segments[segment]

  const slide = (direction: number) => {
    const node = track.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.v-solution')
    node.scrollBy({ left: direction * ((card?.offsetWidth ?? 400) + 20), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return <div className="v-home">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="v-header" data-menu={menuOpen || undefined}>
      <div className="v-wrap v-header-inner">
        <a href="#inicio" className="v-header-logo" aria-label="Vyrtuz, voltar ao início" onClick={() => setMenuOpen(false)}><Logo /></a>
        <nav className="v-nav" aria-label="Menu principal">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="v-header-cta"><Action /></div>
        <button className="v-menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="v-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <nav id="v-mobile-nav" className="v-mobile-nav" aria-label="Menu" hidden={!menuOpen}>
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20} /></a>)}
        <Action />
      </nav>
    </header>
    <HomeMotion />

    <main id="conteudo">
      <section id="inicio" className="v-hero" aria-labelledby="hero-title">
        <div className="v-hero-light" aria-hidden="true" />
        <div className="v-hero-media">
          <Image src="/images/maquininha-hd-v2.webp" alt="Cartão Vyrtuz aproximando da maquininha Vyrtuz para pagar" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
        </div>
        <div className="v-wrap v-hero-body">
          <h1 id="hero-title" className="v-hero-title"><span>Tudo que move</span> <span>o seu negócio.</span></h1>
          <div className="v-hero-foot">
            <p className="v-hero-lede">Maquininha, Tap on Phone, Link de Pagamento, API, Split e serviços bancários. Uma infraestrutura financeira para a sua empresa vender, receber e crescer.</p>
            <div className="v-hero-actions"><Action /><a className="v-link-light" href="#solucoes">Ver soluções<ArrowRight size={18} /></a></div>
          </div>
        </div>
        <div className="v-marquee" aria-hidden="true">
          <div className="v-marquee-track">{[0, 1].map(copy => <div key={copy} className="v-marquee-group">{['Maquininha POS', 'Tap on Phone', 'Link de Pagamento', 'API de pagamentos', 'Split de pagamentos', 'Serviços bancários', 'Pix', 'Aproximação'].map(item => <span key={item}>{item}</span>)}</div>)}</div>
        </div>
      </section>

      <section id="sobre" className="v-about" aria-label="Sobre a Vyrtuz">
        <div className="v-wrap">
          <div className="v-about-top">
            <p className="v-statement" data-statement aria-label={statement}>{statement.split(' ').map((word, i) => <span key={i} aria-hidden="true">{word} </span>)}</p>
            <dl className="v-figures" data-reveal-group>
              <div><dt>em volume transacionado</dt><dd>R$ 130 mi</dd></div>
              <div><dt>empresas atendidas</dt><dd>500+</dd></div>
              <div><dt>estabelecimentos conectados</dt><dd>2.800+</dd></div>
              <div><dt>de disponibilidade operacional</dt><dd>99,97%</dd></div>
            </dl>
            <p className="v-footnote">Números da apresentação institucional Vyrtuz.</p>
          </div>
          <div className="v-pillars" data-reveal-group>
            <article className="v-pillar"><h3>Praticidade para vender</h3><p>Presencial, por aproximação ou a distância. Uma forma de receber para cada momento da venda.</p><ul aria-label="Formas de receber"><li>Maquininha</li><li>Tap on Phone</li><li>Link de Pagamento</li></ul></article>
            <article className="v-pillar v-pillar-photo">
              <Image src="/images/comercio-cafe-v2.webp" alt="Comerciante sorrindo atrás do balcão de um café" fill sizes="(max-width: 760px) 100vw, 33vw" />
              <div><h3>Estrutura para confiar</h3><p>Tecnologia, processos e acompanhamento para uma operação segura e consistente.</p></div>
            </article>
            <article className="v-pillar"><h3>Tudo se conecta</h3><p>Pagamentos, integrações e serviços financeiros na mesma estrutura, sem sistemas espalhados.</p><ul aria-label="Soluções conectadas"><li>API</li><li>Split</li><li>Serviços bancários</li></ul></article>
          </div>
        </div>
      </section>

      <section id="solucoes" className="v-solutions" aria-labelledby="solutions-title">
        <div className="v-wrap v-solutions-head">
          <h2 id="solutions-title" data-reveal>Uma infraestrutura.<br />Seis formas de mover.</h2>
          <div className="v-solutions-aside" data-reveal>
            <p>Comece pela solução que resolve hoje e conecte as outras quando o negócio pedir.</p>
            <div className="v-arrows"><button type="button" onClick={() => slide(-1)} aria-label="Soluções anteriores"><ArrowLeft size={20} /></button><button type="button" onClick={() => slide(1)} aria-label="Próximas soluções"><ArrowRight size={20} /></button></div>
          </div>
        </div>
        <div className="v-solutions-track" ref={track} tabIndex={0} role="region" aria-label="Soluções Vyrtuz, role para o lado para ver todas">
          {solutions.map(item => <article key={item.name} className={`v-solution${'visual' in item ? ' v-solution-drawn' : ''}`}>
            {'image' in item
              ? <Image src={`/images/${item.image}`} alt="" fill sizes="(max-width: 760px) 82vw, 420px" style={{ objectPosition: item.position }} />
              : item.visual === 'api' ? <ApiVisual /> : <SplitVisual />}
            <div className="v-solution-copy">
              <h3>{item.name}</h3>
              <p><strong>{item.line}</strong> {item.text}</p>
              <a href={commercialLink(item.name)} {...external(commercialLink(item.name))}>Consultar condições<ArrowUpRight size={17} /></a>
            </div>
          </article>)}
        </div>
      </section>

      <section id="jornada" className="v-journey" aria-labelledby="journey-title">
        <div className="v-wrap">
          <div className="v-journey-head" data-reveal>
            <h2 id="journey-title">Uma jornada financeira conectada.</h2>
            <p>O próximo estágio dos pagamentos não é oferecer mais uma opção. É conectar as opções, da venda à movimentação.</p>
          </div>
          <div className="v-journey-grid" data-reveal-group>
            {journey.slice(0, 2).map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
            <div className="v-journey-photo"><Image src="/images/negocio-em-movimento.webp" alt="Empreendedor dirigindo à noite com o celular na mão" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            {journey.slice(2).map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="seu-negocio" className="v-segments" aria-labelledby="segments-title">
        <div className="v-wrap v-segments-grid">
          <div className="v-segments-media">
            <figure key={active.name} className="v-receipt" data-ui aria-label={`Exemplo ilustrativo de comprovante: ${active.place}`}>
              <Logo className="v-receipt-logo" />
              <p className="v-receipt-place">{active.place}</p>
              <dl className="v-receipt-items">{active.items.map(([item, value]) => <div key={item}><dt>{item}</dt><dd>R$ {value}</dd></div>)}</dl>
              <div className="v-receipt-total"><span>Total</span><strong>R$ {sum(active.items)}</strong></div>
              <dl className="v-receipt-meta"><div><dt>Pagamento</dt><dd>{active.method}</dd></div><div><dt>Recebido com</dt><dd>{active.via}</dd></div></dl>
              <p className="v-receipt-status"><Check size={18} />Aprovado</p>
              <figcaption>Exemplo ilustrativo</figcaption>
            </figure>
          </div>
          <div className="v-segments-body">
            <h2 id="segments-title" data-reveal>Como o seu negócio vende?</h2>
            <div className="v-segment-list" role="group" aria-label="Escolha o tipo do seu negócio">
              {segments.map((item, i) => <button key={item.name} type="button" aria-pressed={i === segment} onClick={() => setSegment(i)}>{item.name}</button>)}
            </div>
            <div className="v-segment-result" aria-live="polite">
              <div key={active.name} className="v-swap">
                <p className="v-segment-combo">{active.combo}</p>
                <p>{active.text}</p>
              </div>
              <Action subject={`${active.combo} (${active.name})`}>Consultar condições</Action>
            </div>
          </div>
        </div>
      </section>

      <section id="como-comecar" className="v-steps" aria-labelledby="steps-title">
        <div className="v-wrap v-steps-grid">
          <div className="v-steps-aside">
            <h2 id="steps-title">Da conversa à primeira venda.</h2>
            <p>Três conversas separam o seu negócio da primeira venda com a Vyrtuz.</p>
            <ol className="v-steps-index">{steps.map((step, i) => <li key={step.title} data-step-link={i}><a href={`#passo-${i + 1}`}>{step.title}</a></li>)}</ol>
          </div>
          <ol className="v-steps-list">
            {steps.map((step, i) => <li key={step.title} id={`passo-${i + 1}`} className="v-step" data-step={i}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <p className="v-step-detail">{step.detail}</p>
            </li>)}
          </ol>
        </div>
      </section>

      <section id="duvidas" className="v-faq" aria-labelledby="faq-title">
        <div className="v-wrap v-faq-grid">
          <div className="v-faq-aside" data-reveal>
            <h2 id="faq-title">Próximo passo, sem dúvidas.</h2>
            <p>Não achou sua pergunta? A equipe comercial responde pelo WhatsApp.</p>
            <div className="v-faq-actions"><Action>Falar com a equipe</Action><a className="v-link" href="/vyrtuz-apresentacao.pdf" target="_blank" rel="noopener noreferrer">Ver apresentação<ArrowUpRight size={18} /></a></div>
          </div>
          <div className="v-faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="v-faq-icon" aria-hidden="true"><Plus size={18} /></span></summary><div className="v-faq-answer"><p>{answer}</p></div></details>)}
          </div>
        </div>
      </section>

      <section id="contato" className="v-cta" aria-labelledby="cta-title">
        <div className="v-wrap">
          <div className="v-cta-card">
            <video className="v-cta-video" muted loop playsInline preload="none" poster="/images/filme-poster.jpg" aria-hidden="true" data-lazy-video><source src="/vyrtuz-motion.mp4" type="video/mp4" /></video>
            <div className="v-cta-body">
              <h2 id="cta-title">Vamos mover o seu negócio?</h2>
              <p>Converse com a Vyrtuz e conheça as condições para a sua operação.</p>
              {commercialPhone ? <Action tone="light" /> : <a className="v-action v-action-light" href="https://www.vyrtuz.com" target="_blank" rel="noopener noreferrer"><span>Fale com a Vyrtuz</span><span className="v-action-icon" aria-hidden="true"><ArrowUpRight size={18} /></span></a>}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="v-footer">
      <div className="v-wrap">
        <div className="v-footer-grid">
          <p className="v-footer-tag">Tudo que move o seu negócio.<br />Infraestrutura financeira para empresas.</p>
          <div><h3>Soluções</h3>{solutions.map(item => <a key={item.name} href="#solucoes">{item.name}</a>)}</div>
          <div><h3>Vyrtuz</h3><a href="#sobre">Sobre</a><a href="#seu-negocio">Para o seu negócio</a><a href="#como-comecar">Como começar</a><a href="#duvidas">Dúvidas</a></div>
          <div><h3>Contato</h3><a href={commercialLink()} {...external(commercialLink())}>Quero ser Vyrtuz</a><a href="https://www.vyrtuz.com" target="_blank" rel="noopener noreferrer">vyrtuz.com</a><a href="/vyrtuz-apresentacao.pdf" target="_blank" rel="noopener noreferrer">Apresentação institucional</a></div>
        </div>
        <Logo className="v-footer-logo" />
        <div className="v-footer-bottom"><span>© {new Date().getFullYear()} Vyrtuz. Todos os direitos reservados.</span><a href="#inicio">Voltar ao topo<ArrowUpRight size={15} /></a></div>
      </div>
    </footer>
  </div>
}
