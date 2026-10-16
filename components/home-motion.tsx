'use client'

import { useEffect } from 'react'

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

// Native scroll. Content is visible by default; only elements below the fold are
// hidden right before their entrance, so nothing stays invisible if this fails.
export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.v-home')
    if (!root) return
    const header = root.querySelector<HTMLElement>('.v-header')
    const hero = root.querySelector<HTMLElement>('.v-hero')
    const heroMedia = root.querySelector<HTMLElement>('.v-hero-media')
    const statement = root.querySelector<HTMLElement>('[data-statement]')
    const words = statement ? Array.from(statement.children) as HTMLElement[] : []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cleanups: Array<() => void> = []
    let frame = 0

    // Header: transparent over the hero, solid light bar after it.
    const update = () => {
      frame = 0
      const y = window.scrollY
      if (header && hero) {
        const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight
        header.dataset.state = pastHero ? 'solid' : y > 8 ? 'over' : 'top'
      }
      if (reduce.matches) {
        words.forEach(word => word.style.removeProperty('opacity'))
        heroMedia?.style.removeProperty('transform')
        return
      }
      if (heroMedia && hero && y < hero.offsetHeight) {
        heroMedia.style.transform = `translate3d(0, ${Math.round(y * 0.18)}px, 0)`
      }
      const box = statement?.getBoundingClientRect()
      if (statement && box && words.length && box.top < window.innerHeight && box.bottom > 0) {
        const start = window.innerHeight * 0.85
        const end = window.innerHeight * 0.35
        const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end + box.height * 0.6)))
        const lit = progress * words.length
        words.forEach((word, i) => { word.style.opacity = String(0.22 + 0.78 * Math.min(1, Math.max(0, lit - i))) })
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    cleanups.push(() => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      words.forEach(word => word.style.removeProperty('opacity'))
      heroMedia?.style.removeProperty('transform')
    })

    // Entrances: heading, then text, then picture; siblings stagger by 70ms.
    if (!reduce.matches) {
      const mobile = window.matchMedia('(max-width: 760px)').matches
      const targets = new Set<HTMLElement>()
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => targets.add(el))
      root.querySelectorAll<HTMLElement>('[data-reveal-group] > *').forEach(el => targets.add(el))
      root.querySelectorAll<HTMLElement>('.v-solution, .v-step, .v-faq-list details, .v-segment-list, .v-cta-card, .v-steps-aside').forEach(el => targets.add(el))
      const pending = new Set<HTMLElement>()
      const running = new Set<Animation>()

      const reveal = (el: HTMLElement) => {
        if (!pending.delete(el)) return
        observer.unobserve(el)
        const siblings = Array.from(el.parentElement?.children ?? [])
        const index = el.parentElement?.matches('[data-reveal-group], .v-solutions-track, .v-steps-list, .v-faq-list') ? siblings.indexOf(el) : 0
        const photo = el.matches('.v-segments-media, .v-cta-card, .v-pillar-photo, .v-journey-photo')
        const from: Keyframe = photo && !mobile
          ? { opacity: 0, clipPath: 'inset(10% 6% 10% 6% round 24px)', transform: 'scale(1.04)' }
          : { opacity: 0, transform: `translate3d(0, ${mobile ? 18 : 28}px, 0)` }
        const to: Keyframe = photo && !mobile
          ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)', transform: 'none' }
          : { opacity: 1, transform: 'none' }
        const animation = el.animate([from, to], { duration: photo ? 1100 : 800, delay: Math.min(index, 5) * 70, easing: EASE_OUT, fill: 'both' })
        running.add(animation)
        el.style.removeProperty('opacity')
        animation.finished.then(() => { animation.cancel(); running.delete(animation) }).catch(() => {})
      }

      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement)
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

      targets.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
        pending.add(el)
        el.style.opacity = '0'
        observer.observe(el)
      })
      const onFocus = (event: FocusEvent) => {
        for (const el of pending) if (el.contains(event.target as Node)) { pending.delete(el); observer.unobserve(el); el.style.removeProperty('opacity') }
      }
      root.addEventListener('focusin', onFocus)
      cleanups.push(() => {
        observer.disconnect()
        root.removeEventListener('focusin', onFocus)
        pending.forEach(el => el.style.removeProperty('opacity'))
        running.forEach(animation => animation.cancel())
      })
    }

    // Steps: the index in the sticky column follows the step in view.
    const links = Array.from(root.querySelectorAll<HTMLElement>('[data-step-link]'))
    const stepObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const index = (entry.target as HTMLElement).dataset.step
        links.forEach(link => { link.dataset.active = String(link.dataset.stepLink === index) })
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    root.querySelectorAll('[data-step]').forEach(step => stepObserver.observe(step))
    links[0]?.setAttribute('data-active', 'true')
    cleanups.push(() => stepObserver.disconnect())

    // Brand film: desktop only (2.7 MB), loads and plays only while visible, never with
    // reduced motion or data saver. Phones keep the poster frame.
    const video = root.querySelector<HTMLVideoElement>('[data-lazy-video]')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (video && !saveData && window.matchMedia('(min-width: 761px)').matches) {
      const videoObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !reduce.matches) video.play().catch(() => {})
        else video.pause()
      }, { threshold: 0.25 })
      videoObserver.observe(video)
      cleanups.push(() => videoObserver.disconnect())
    }

    const onPreference = () => update()
    reduce.addEventListener('change', onPreference)
    cleanups.push(() => reduce.removeEventListener('change', onPreference))
    return () => cleanups.forEach(fn => fn())
  }, [])
  return null
}
