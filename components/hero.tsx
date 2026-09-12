import Image from 'next/image'
import { ArrowDown, ArrowUpRight, ShieldCheck, Wifi, CreditCard, Check } from 'lucide-react'

export function Hero() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="hero-wordmark" aria-hidden="true">VYRTUZ</div>
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <div className="eyebrow hero-enter"><span className="status-dot" /> INFRAESTRUTURA FINANCEIRA, SEM LIMITES.</div>
            <h1 id="hero-title"><span className="text-line"><span>Tudo que move</span></span><span className="text-line"><span>o seu <em>negócio.</em></span></span></h1>
            <p className="hero-description hero-enter">Da primeira venda ao próximo grande passo.<br className="desktop-break" /> Pagamentos e soluções financeiras conectados<br className="desktop-break" /> em uma só estrutura.</p>
            <div className="hero-actions hero-enter">
              <a className="action action-primary" href="#contato">Quero ser Vyrtuz <ArrowUpRight size={18} /></a>
              <a className="text-link" href="#solucoes">Explore as soluções <ArrowDown size={17} /></a>
            </div>
            <div className="hero-assurance hero-enter"><ShieldCheck size={17} /><span>Tecnologia para operar. Estrutura para confiar.</span></div>
          </div>
          <div className="hero-visual">
            <Image src="/images/maquininha.webp" className="hero-product" alt="Maquininha Vyrtuz recebendo um pagamento por aproximação com cartão" width={750} height={990} priority sizes="(max-width: 767px) 90vw, 48vw" />
            <div className="floating-feature feature-contactless"><span className="feature-icon"><Wifi size={20} /></span><span><small>MAIS PRATICIDADE</small><strong>Aproximou. Pagou.</strong></span></div>
            <div className="floating-feature feature-connected"><span className="feature-icon"><Check size={20} /></span><span><small>MENOS COMPLEXIDADE</small><strong>Seu negócio conectado.</strong></span></div>
            <div className="product-caption"><CreditCard size={15} /><span>VYRTUZ POS</span><span className="caption-line" /><span>FEITA PARA IR ALÉM.</span></div>
          </div>
        </div>
        <div className="hero-bottom page-width"><a href="#numeros"><span className="scroll-capsule"><ArrowDown size={15} /></span> O próximo movimento começa aqui</a><span>UMA ESTRUTURA. TODAS AS POSSIBILIDADES.</span></div>
      </section>
      <section id="numeros" className="stats" aria-label="Vyrtuz em números, conforme apresentação institucional">
        <div className="page-width stats-inner">
          <div className="stats-intro"><span className="eyebrow">CONEXÕES REAIS.</span><p>Um movimento<br />que só cresce.</p></div>
          <div className="stat"><strong>R$ 130<span> milhões</span></strong><p>em volume transacionado</p></div>
          <div className="stat"><strong>500<span>+</span></strong><p>empresas atendidas</p></div>
          <div className="stat"><strong>2.800<span>+</span></strong><p>estabelecimentos conectados</p></div>
          <div className="stat"><strong>99,97<span>%</span></strong><p>disponibilidade operacional</p></div>
        </div>
      </section>
    </>
  )
}
