import { useState } from 'react'
import {
  ArrowUpRight, BarChart, Building2, CalendarDays, Check, Code, Copy, Database, House, Layout, Mail, Network,
  PawPrint, Send, Server, Sparkles, Wrench,
} from 'lucide-react'

// Only the icons data.js names, so the bundle stays small.
const Icons = { BarChart, Building2, CalendarDays, Code, Database, House, Layout, Network, PawPrint, Server, Sparkles, Wrench }
import { ABOUT, PROFILE, PROJECTS, RESUME, SKILL_TICKER, STATS, TOOLKIT } from '../data'
import { scrollToId } from '../lib/motion'
import { Parallax, Reveal } from './Motion'
import { GithubIcon, LinkedinIcon } from './Icons'

function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head">
      <Reveal as="p" className="eyebrow"><span className="mono">{index}</span> {label}</Reveal>
      <Reveal as="h2" delay={0.08} className="h2">{title}</Reveal>
      {children && <Reveal as="p" delay={0.16} className="lead">{children}</Reveal>}
    </div>
  )
}

/* ---------------- ticker ---------------- */
export function Ticker() {
  const row = SKILL_TICKER.map((s) => <span key={s}>{s}<i aria-hidden="true">✦</i></span>)
  return (
    <div className="ticker" aria-label={`Skills: ${SKILL_TICKER.join(', ')}`}>
      <div className="ticker__track" aria-hidden="true">{row}{row}</div>
    </div>
  )
}

/* ---------------- about ---------------- */
export function About() {
  return (
    <section id="about" className="section light">
      <Parallax speed={-0.18} x={0.12} className="bgword" aria-hidden="true"><span>About</span></Parallax>
      <div className="container about">
        <div className="about__side">
          <SectionHead index="01" label="About me" title={<>Building where <em>code</em> meets <em>curiosity</em>.</>} />
          <Reveal delay={0.2} className="about__card">
            <img src="/ricky-photo.png" alt="" loading="lazy" />
            <div>
              <p className="about__card-name">{PROFILE.fullName}</p>
              <p className="muted">Technical Coordinator Sr. · Utah State University</p>
            </div>
          </Reveal>
        </div>
        <div className="about__body">
          {ABOUT.map((p, i) => (
            <Reveal as="p" key={i} delay={0.05 * i} className={i === 0 ? 'about__first' : ''}>{p}</Reveal>
          ))}
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i} className="stat">
                <p className="stat__value">{s.value}</p>
                <p className="stat__label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- toolkit ---------------- */
export function Toolkit() {
  return (
    <section id="toolkit" className="section light section--tight">
      <div className="container">
        <SectionHead index="02" label="Toolkit" title={<>The tools I <em>reach for</em>.</>}>
          From front-end polish to back-end logic, AI pipelines and the hardware that keeps it all running.
        </SectionHead>
        <div className="toolkit">
          {TOOLKIT.map((t, i) => {
            const Icon = Icons[t.icon] ?? Icons.Code
            return (
              <Reveal key={t.title} delay={0.06 * i} className="tool">
                <div className="tool__top">
                  <span className="tool__icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <span className="mono tool__num">0{i + 1}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.items}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- work ---------------- */
function Cover({ project }) {
  const Icon = Icons[project.icon] ?? Icons.Code
  if (project.image) {
    return (
      <div className="browser">
        <div className="browser__bar"><i /><i /><i /><span className="mono">{project.domain}</span></div>
        <Parallax speed={0.08} className="browser__view" innerClassName="browser__img">
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        </Parallax>
      </div>
    )
  }
  return (
    <div className="cover">
      <Parallax speed={0.1} className="cover__art" innerClassName="cover__art-inner">
        <div className="cover__rings" />
        <Icon size={92} strokeWidth={1} />
      </Parallax>
      <p className="cover__title">{project.title}</p>
      <p className="mono cover__tags">{project.tags.slice(0, 3).join('  ·  ')}</p>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="section dark">
      <Parallax speed={-0.2} x={-0.1} className="bgword bgword--dark" aria-hidden="true"><span>Work</span></Parallax>
      <div className="container">
        <SectionHead index="03" label="Selected work" title={<>Things I've <em>built</em>.</>}>
          A live AI product, plus four complete websites I designed and built from scratch, each in a different style: minimal, corporate, playful and Corporate Memphis.
        </SectionHead>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className={`project ${i % 2 ? 'project--flip' : ''}`}>
              <Reveal className="project__media"><Cover project={p} /></Reveal>
              <Reveal delay={0.1} className="project__text">
                <p className="mono project__kind"><span>0{i + 1}</span> {p.kind}</p>
                <h3 className="project__title">{p.title}</h3>
                <p className="project__desc">{p.desc}</p>
                <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="project__links">
                  {p.live && <a className="btn btn--accent btn--sm" href={p.live} target="_blank" rel="noopener noreferrer">{p.live.startsWith('http') ? 'Visit live site' : 'View the website'} <ArrowUpRight size={16} /></a>}
                  {p.github && <a className="btn btn--ghost btn--sm" href={p.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={16} /> Code</a>}
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- resume ---------------- */
export function Resume() {
  return (
    <section id="resume" className="section light">
      <div className="container">
        <SectionHead index="04" label="Experience" title={<>Where I've <em>been</em>.</>} />
        <Reveal className="resume__card">
          <div>
            <p className="resume__name">{PROFILE.fullName}</p>
            <p className="muted">{PROFILE.title}</p>
          </div>
          <div className="resume__contact">
            <a href={`mailto:${PROFILE.email}`}><Mail size={15} /> {PROFILE.email}</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={15} /> linkedin.com/in/rickyvang</a>
          </div>
        </Reveal>
        <div className="timeline">
          {RESUME.map((group) => (
            <div key={group.section} className="timeline__group">
              <Reveal as="h3" className="timeline__label mono">{group.section}</Reveal>
              <div className="timeline__entries">
                {group.entries.map((e) => (
                  <Reveal key={e.title} className="entry">
                    <span className="entry__dot" aria-hidden="true" />
                    <div className="entry__head">
                      <h4>{e.title}</h4>
                      <span className="mono entry__date">{e.date}</span>
                    </div>
                    <p className="entry__org">{e.org}</p>
                    {e.points.length > 0 && <ul className="entry__points">{e.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul>}
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- contact ---------------- */
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return setStatus('Please add your name and a message.')
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setStatus('Your email app should open with the message ready. Just press send.')
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }

  return (
    <section id="contact" className="section dark contact">
      <div className="hero__glow hero__glow--low" aria-hidden="true" />
      <div className="container">
        <Parallax speed={0.08}>
          <Reveal as="p" className="eyebrow"><span className="mono">05</span> Contact</Reveal>
          <Reveal as="h2" delay={0.08} className="contact__title">Let's build something <em>great</em>.</Reveal>
          <Reveal as="p" delay={0.16} className="lead">Have a project in mind or just want to say hello? I'd love to hear from you.</Reveal>
        </Parallax>
        <div className="contact__grid">
          <Reveal as="form" className="form" onSubmit={send} noValidate>
            <div className="form__row">
              <label><span>Name</span><input value={form.name} onChange={set('name')} autoComplete="name" required /></label>
              <label><span>Email</span><input type="email" value={form.email} onChange={set('email')} autoComplete="email" /></label>
            </div>
            <label><span>Message</span><textarea rows={5} value={form.message} onChange={set('message')} required /></label>
            <button className="btn btn--accent" type="submit">Send message <Send size={16} /></button>
            <p className="form__status" role="status">{status}</p>
          </Reveal>
          <Reveal delay={0.1} className="contact__links">
            <button className="contact__link" onClick={copy}>
              <span className="contact__icon"><Mail size={20} /></span>
              <span><span className="mono">Email</span>{PROFILE.email}</span>
              <span className="contact__end">{copied ? <><Check size={16} /> Copied</> : <Copy size={16} />}</span>
            </button>
            <a className="contact__link" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact__icon"><LinkedinIcon /></span>
              <span><span className="mono">LinkedIn</span>linkedin.com/in/rickyvang</span>
              <ArrowUpRight className="contact__end" size={18} />
            </a>
            <a className="contact__link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              <span className="contact__icon"><GithubIcon /></span>
              <span><span className="mono">GitHub</span>github.com/vangricky</span>
              <ArrowUpRight className="contact__end" size={18} />
            </a>
          </Reveal>
        </div>
      </div>
      <footer className="footer container">
        <p className="footer__big" aria-hidden="true">Ricky Vang</p>
        <div className="footer__row">
          <p>© {new Date().getFullYear()} Ricky Vang. Built with React.</p>
          <button className="footer__top" onClick={() => scrollToId('top')}>Back to top ↑</button>
        </div>
      </footer>
    </section>
  )
}
