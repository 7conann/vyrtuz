'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function ScrollExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    let lenis: Lenis | undefined
    let tick: ((time: number) => void) | undefined

    media.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: true })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(tick)

      gsap.from('.text-line > span', { yPercent: 108, duration: 1.05, stagger: 0.12, ease: 'power3.out', delay: 0.12 })
      gsap.from('.hero-enter', { opacity: 0, y: 20, duration: 0.8, stagger: 0.09, delay: 0.35, ease: 'power2.out' })
      gsap.from('.hero-visual', { opacity: 0, y: 35, duration: 1.1, delay: 0.18, ease: 'power2.out' })
      gsap.to('.hero-product', { yPercent: 13, scale: 1.07, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-wordmark', { xPercent: -7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.feature-contactless', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 } })
      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 35, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 91%', toggleActions: 'play none none reverse' } })
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -7, scale: 1.13 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
      gsap.fromTo('.business-image', { clipPath: 'inset(12% 12% 12% 12% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: '.business-image', start: 'top 90%', end: 'center center', scrub: true } })
      const words = gsap.utils.toArray<HTMLElement>('.manifesto-word')
      // Preserve each word's 18vh fade and 2vh offset with one scroll observer.
      if (words.length) {
        gsap.fromTo(words, { opacity: 0.2 }, {
          opacity: 1, duration: 0.18, stagger: 0.02,
          scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: `top ${62 - (words.length - 1) * 2}%`, scrub: true },
        })
      }
      return () => {
        if (tick) gsap.ticker.remove(tick)
        lenis?.destroy()
        lenis = undefined
      }
    })

    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = document.querySelector<HTMLElement>('.solutions-track')
      const windowEl = document.querySelector<HTMLElement>('.solutions-window')
      if (!track || !windowEl) return
      const distance = () => Math.max(0, track.scrollWidth - windowEl.clientWidth)
      gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { id: 'solutions', refreshPriority: 1, trigger: '.solutions-section', pin: '.solutions-pin', start: 'top 85px', end: () => `+=${distance()}`, scrub: 0.65, invalidateOnRefresh: true } })
    })

    let disposed = false
    let refreshTimer: ReturnType<typeof setTimeout> | undefined
    const refresh = () => {
      if (disposed) return
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      }, 100)
    }
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    const sizes = new WeakMap<Element, { width: number; height: number }>()
    const observer = new ResizeObserver(entries => {
      let changed = false
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        const previous = sizes.get(entry.target)
        if (!previous || Math.abs(previous.width - width) > 0.5 || Math.abs(previous.height - height) > 0.5) {
          sizes.set(entry.target, { width, height })
          changed = true
        }
      }
      if (changed) refresh()
    })
    document.querySelectorAll('main, .hero-product, .business-image').forEach(el => observer.observe(el))
    return () => {
      disposed = true
      clearTimeout(refreshTimer)
      observer.disconnect()
      window.removeEventListener('load', refresh)
      media.revert()
    }
  }, [])
  return null
}
