import { useEffect, useState } from 'react'
import { scrollToId, useScrollState } from '../lib/motion'

const LINKS = [
  ['about', 'About'],
  ['work', 'Work'],
  ['resume', 'Experience'],
  ['contact', 'Contact'],
]
const IDS = ['top', ...LINKS.map(([id]) => id)]

export default function Nav() {
  const { active, progress, scrolled } = useScrollState(IDS)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => { setOpen(false); scrollToId(id) }

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
        <button className="nav__logo" onClick={() => go('top')} aria-label="Back to top">
          R<span>V</span>
        </button>
        <nav className="nav__links" aria-label="Main">
          {LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
              {label}
            </button>
          ))}
        </nav>
        <button className="btn btn--light nav__cta" onClick={() => go('contact')}>Let's talk</button>
        <button className="nav__burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          <span /><span />
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} inert={!open}>
        {LINKS.map(([id, label], i) => (
          <button key={id} onClick={() => go(id)} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
            <span className="mono">0{i + 1}</span>{label}
          </button>
        ))}
      </div>
    </>
  )
}
