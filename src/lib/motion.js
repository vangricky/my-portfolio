// Smooth scrolling and the shared parallax loop (components live in components/Motion.jsx).
import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------- smooth scrolling ---------------- */
let lenis = null

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    })
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null }
  }, [])
}

// Scroll to a section id (or the top), gliding with Lenis when it's running.
export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) lenis.scrollTo(target, { offset: id === 'top' ? 0 : -24, duration: 1.4 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else target.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------- parallax ---------------- */
// Each layer moves by (distance of its box from the viewport centre) × speed.
// speed > 0 drifts up faster than the page (feels closer); speed < 0 lags behind (feels farther).
const layers = new Set()
let frame = 0
function update() {
  frame = 0
  const mid = window.innerHeight / 2
  for (const l of layers) {
    const r = l.outer.getBoundingClientRect()
    if (r.bottom < -400 || r.top > window.innerHeight + 400) continue
    const d = r.top + r.height / 2 - mid
    l.inner.style.transform = `translate3d(${(-d * l.x).toFixed(1)}px, ${(-d * l.speed).toFixed(1)}px, 0)`
  }
}
const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

// Register a parallax layer; returns the function that removes it.
export function addLayer(layer) {
  layers.add(layer)
  schedule()
  return () => layers.delete(layer)
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
}

// Mouse position as CSS variables (--mx, --my from -1 to 1) on the element, for depth on hover.
export function useMouseDepth(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [ref])
}

// Which section is on screen (for the nav highlight) and how far down the page we are.
export function useScrollState(ids) {
  const [active, setActive] = useState(ids[0])
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
        setScrolled(window.scrollY > 40)
        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
        }
        setActive(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [ids])
  return { active, progress, scrolled }
}
