'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function CinematicSection() {
  const section = useRef<HTMLElement>(null)
  const lightTween = useRef<gsap.core.Tween | null>(null)
  const progress = useRef(0)
  const [paused, setPaused] = useState(false)
  const isPaused = useRef(false)
  useEffect(() => {
    const parent = section.current
    if (!parent) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const light = gsap.fromTo(parent.querySelector('.cinema-light'), { xPercent: -30, opacity: 0 }, { xPercent: 30, opacity: 0.55, duration: 1, ease: 'sine.inOut', paused: true })
      lightTween.current = light
      ScrollTrigger.create({ trigger: parent, start: 'top top', end: 'bottom bottom', onUpdate: self => {
        progress.current = self.progress
        if (!isPaused.current) light.progress(self.progress)
      } })
      gsap.to('.cinema-title', { y: -45, ease: 'none', scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom bottom', scrub: true } })
      gsap.fromTo('.cinema-frame', { opacity: 0.65 }, { opacity: 1, scrollTrigger: { trigger: parent, start: 'top bottom', end: 'top top', scrub: true } })
      gsap.to('.cinema-progress-fill', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: parent, start: 'top top', end: 'bottom bottom', scrub: true } })
    })
    return () => { media.revert(); lightTween.current = null }
  }, [])
  return (
    <section ref={section} className="cinematic-section" aria-labelledby="cinematic-title">
      <div className="cinema-sticky"><div className="cinema-frame">
        <Image className="cinema-image" src="/images/filme-poster.jpg" alt="" fill sizes="100vw" />
        <div className="cinema-light" aria-hidden="true" />
        <div className="cinema-shade" />
        <div className="page-width cinema-content">
          <p className="eyebrow">FEITA PARA O SEU PRÓXIMO MOVIMENTO</p>
          <h2 className="cinema-title" id="cinematic-title">Não é só<br />sobre <span>pagar.</span><br />É sobre <em>ir além.</em></h2>
          <p>Uma maquininha na sua mão.<br />Uma estrutura inteira com você.</p>
          <div className="cinema-bottom"><span><ArrowDown size={16} /> ROLE PARA CONTINUAR</span><button className="icon-button" onClick={() => { isPaused.current = !isPaused.current; setPaused(isPaused.current); if (!isPaused.current) lightTween.current?.progress(progress.current) }} aria-label={paused ? 'Retomar efeito de luz' : 'Pausar efeito de luz'} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
          <div className="cinema-progress"><div className="cinema-progress-fill" /></div>
        </div>
      </div></div>
    </section>
  )
}
