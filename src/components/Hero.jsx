import { memo, useEffect, useRef } from 'react'
import { ArrowDown, Mail } from 'lucide-react'
import { PROFILE } from '../data'
import { scrollToId, useMouseDepth } from '../lib/motion'
import { Parallax } from './Motion'
import { GithubIcon, LinkedinIcon } from './Icons'

/* Types each role, pauses, erases, moves on. Writes to the DOM directly so React never re-renders. */
const Typewriter = memo(function Typewriter({ words }) {
  const text = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { text.current.textContent = words[0]; return }
    let i = 0, pos = 0, deleting = false, timer
    const tick = () => {
      const word = words[i]
      pos += deleting ? -1 : 1
      if (text.current) text.current.textContent = word.slice(0, pos)
      if (!deleting && pos === word.length) { deleting = true; timer = setTimeout(tick, 2400); return }
      if (deleting && pos === 0) { deleting = false; i = (i + 1) % words.length; timer = setTimeout(tick, 350); return }
      timer = setTimeout(tick, deleting ? 35 : 75 + Math.random() * 50)
    }
    tick()
    return () => clearTimeout(timer)
  }, [words])
  return (
    <p className="hero__role mono" aria-label={words.join(', ')}>
      <span aria-hidden="true" className="hero__prompt">&gt;</span><span ref={text} aria-hidden="true" /><span className="caret" aria-hidden="true" />
    </p>
  )
})

const CHIPS = [
  { label: 'Claude & AI agents', cls: 'chip--a', depth: 26, speed: 0.28 },
  { label: 'React', cls: 'chip--b', depth: 38, speed: 0.4 },
  { label: 'Crestron AV', cls: 'chip--c', depth: 18, speed: 0.18 },
  { label: 'IT Systems', cls: 'chip--d', depth: 32, speed: 0.33 },
]

export default function Hero() {
  const ref = useRef(null)
  useMouseDepth(ref)

  return (
    <section id="top" className="hero dark" ref={ref}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      {/* Back layer: the name, huge and outlined, lagging behind the scroll. */}
      <Parallax speed={-0.25} className="hero__bigname" innerClassName="depth depth--6" aria-hidden="true">
        <span>RICKY</span><span>VANG</span>
      </Parallax>

      <div className="container hero__inner">
        {/* Text: drifts up a little faster than the page as you leave the hero. */}
        <Parallax speed={0.12} className="hero__copy">
          <p className="eyebrow hero__in" style={{ '--d': '0.1s' }}><span className="dot" /> Portfolio · 2026</p>
          <h1 className="hero__name hero__in" style={{ '--d': '0.2s' }}>
            Ricky <em>Vang</em>
          </h1>
          <div className="hero__in" style={{ '--d': '0.35s' }}><Typewriter words={PROFILE.roles} /></div>
          <p className="hero__intro hero__in" style={{ '--d': '0.45s' }}>{PROFILE.intro}</p>
          <div className="hero__actions hero__in" style={{ '--d': '0.55s' }}>
            <button className="btn btn--accent" onClick={() => scrollToId('contact')}>Get in touch</button>
            <button className="btn btn--ghost" onClick={() => scrollToId('resume')}>View resume</button>
          </div>
          <div className="socials hero__in" style={{ '--d': '0.65s' }}>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail size={20} /></a>
          </div>
        </Parallax>

        {/* Middle layer: the photo. */}
        <div className="hero__visual">
          <Parallax speed={-0.06} className="hero__ring-wrap" innerClassName="depth depth--10">
            <div className="hero__ring" />
          </Parallax>
          <Parallax speed={0.05} className="hero__photo-wrap" innerClassName="depth depth--14">
            <img className="hero__photo hero__in" style={{ '--d': '0.3s' }} src="/ricky-photo.png" alt="Ricky Vang" width="900" height="1192" fetchPriority="high" />
          </Parallax>
          {/* Front layer: chips that move the most. */}
          {CHIPS.map((c) => (
            <Parallax key={c.label} speed={c.speed} className={`chip ${c.cls}`} innerClassName={`depth`} style={{ '--depth': `${c.depth}px` }}>
              <span className="chip__inner hero__in" style={{ '--d': '0.8s' }}>{c.label}</span>
            </Parallax>
          ))}
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollToId('about')} aria-label="Scroll to about">
        <span className="mono">Scroll</span><ArrowDown size={16} />
      </button>
    </section>
  )
}
