'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function CinematicSection() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const isPaused = useRef(false)
  useEffect(() => {
    const el = video.current
    const parent = section.current
    if (!el || !parent) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    let target = 0
    const seek = () => {
      if (!isPaused.current && Number.isFinite(el.duration) && !el.seeking && Math.abs(el.currentTime - target) > 0.045) el.currentTime = target
    }
    el.addEventListener('seeked', seek)
    el.addEventListener('loadedmetadata', seek)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.src = '/vyrtuz-motion.mp4'
        el.load()
        observer.disconnect()
      }
    }, { rootMargin: '600px' })
    observer.observe(parent)
    media.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({ trigger: parent, start: 'top top', end: 'bottom bottom', onUpdate: self => { target = self.progress * Math.max(0, (el.duration || 6) - 0.06); seek() } })
      gsap.to('.cinema-title', { y: -45, ease: 'none', scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom bottom', scrub: true } })
      gsap.fromTo('.cinema-scale', { scale: 0.9, borderRadius: '32px' }, { scale: 1, borderRadius: 0, scrollTrigger: { trigger: parent, start: 'top bottom', end: 'top top', scrub: true } })
      gsap.to('.cinema-progress-fill', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: parent, start: 'top top', end: 'bottom bottom', scrub: true } })
    })
    return () => { media.revert(); observer.disconnect(); el.removeEventListener('seeked', seek); el.removeEventListener('loadedmetadata', seek); el.removeAttribute('src'); el.load() }
  }, [])
  return (
    <section ref={section} className="cinematic-section" aria-labelledby="cinematic-title">
      <div className="cinema-sticky"><div className="cinema-scale">
        <video ref={video} className="cinema-video" muted playsInline preload="none" poster="/images/filme-poster.jpg" aria-hidden="true" />
        <div className="cinema-shade" />
        <div className="page-width cinema-content">
          <p className="eyebrow">FEITA PARA O SEU PRÓXIMO MOVIMENTO</p>
          <h2 className="cinema-title" id="cinematic-title">Não é só<br />sobre <span>pagar.</span><br />É sobre <em>ir além.</em></h2>
          <p>Uma maquininha na sua mão.<br />Uma estrutura inteira com você.</p>
          <div className="cinema-bottom"><span><ArrowDown size={16} /> ROLE PARA CONTINUAR</span><button className="icon-button" onClick={() => { isPaused.current = !paused; setPaused(!paused) }} aria-label={paused ? 'Retomar animação do vídeo' : 'Pausar animação do vídeo'} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
          <div className="cinema-progress"><div className="cinema-progress-fill" /></div>
        </div>
      </div></div>
    </section>
  )
}
