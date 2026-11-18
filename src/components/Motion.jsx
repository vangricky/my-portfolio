// Parallax layers and scroll reveals.
import { useEffect, useRef, useState } from 'react'
import { addLayer, prefersReducedMotion } from '../lib/motion'

export function Parallax({ speed = 0.1, x = 0, className = '', innerClassName = '', style, children, ...rest }) {
  const outer = useRef(null)
  const inner = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    return addLayer({ outer: outer.current, inner: inner.current, speed, x })
  }, [speed, x])
  return (
    <div ref={outer} className={className} style={style} {...rest}>
      <div ref={inner} className={`will-move ${innerClassName}`}>{children}</div>
    </div>
  )
}

export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const Tag = as
  const ref = useRef(null)
  // Without motion (or without IntersectionObserver), content simply starts visible.
  const [shown, setShown] = useState(() => prefersReducedMotion() || !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [shown])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

