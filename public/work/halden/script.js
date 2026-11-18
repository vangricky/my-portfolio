// Halden Studio — project grid + filters, project viewer, gentle parallax, reveals, inquiry form.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const PROJECTS = [
    { id: 'kestrel', title: 'Kestrel House', type: 'residential', year: 2025, img: 'facade', alt: 'Board-formed concrete facade against a blue sky',
      desc: 'A family home cut into a wooded slope. Board-formed concrete walls hold the hillside, while a single long window frames the tree canopy from the kitchen to the bedrooms.',
      facts: { Location: 'Bainbridge Island, WA', Area: '3,100 sq ft', Status: 'Completed', Team: 'Architecture + interiors' } },
    { id: 'linden', title: 'Linden Sunroom', type: 'interiors', year: 2024, img: 'sunroom', alt: 'A white room filled with sunlight and the shadow of a small tree',
      desc: 'A forgotten back room turned into the brightest place in the house. We removed a wall, lime-washed every surface and let one potted tree become the room’s only ornament.',
      facts: { Location: 'Portland, OR', Area: '420 sq ft', Status: 'Completed', Team: 'Interiors' } },
    { id: 'oak', title: 'Oak & Ash Dining', type: 'interiors', year: 2024, img: 'dining', alt: 'A white dining room with a round table and herringbone oak floor',
      desc: 'A dining room built around one round table. Herringbone oak floors, plain white walls and open shelving keep attention on the people and the food.',
      facts: { Location: 'Seattle, WA', Area: '360 sq ft', Status: 'Completed', Team: 'Interiors' } },
    { id: 'gallery', title: 'Gallery Twelve', type: 'public', year: 2023, img: 'concrete', alt: 'A raw concrete interior with a single column and soft daylight',
      desc: 'A converted warehouse for a small contemporary art gallery. We kept the raw concrete, added nothing to the walls, and tuned the skylights for even, shadowless light.',
      facts: { Location: 'Tacoma, WA', Area: '6,800 sq ft', Status: 'Completed', Team: 'Architecture' } },
    { id: 'harbor', title: 'Harbor Kitchen', type: 'residential', year: 2023, img: 'kitchen', alt: 'A bright white kitchen with an island and pendant lights',
      desc: 'A kitchen reorganized around how the family really cooks: one long island, deep drawers instead of upper cabinets, and a window seat for homework.',
      facts: { Location: 'Kirkland, WA', Area: '540 sq ft', Status: 'Completed', Team: 'Interiors' } },
    { id: 'canopy', title: 'Canopy Pavilion', type: 'public', year: 2022, img: 'canopy', alt: 'Rows of white arched structures against a pale sky',
      desc: 'A shaded public pavilion for a waterfront park. Repeating white arches give cover from sun and rain while keeping views open to the water on every side.',
      facts: { Location: 'Everett, WA', Area: '9,200 sq ft', Status: 'Completed', Team: 'Architecture' } },
  ]
  const TYPE = { residential: 'Residential', interiors: 'Interiors', public: 'Public' }
  const src = (name) => ({ src: `img/${name}-1600.jpg`, srcset: `img/${name}-800.jpg 800w, img/${name}-1600.jpg 1600w` })

  /* ---------- grid ---------- */
  const grid = document.getElementById('grid')
  grid.innerHTML = PROJECTS.map((p, i) => {
    const s = src(p.img)
    return `<li class="card reveal" data-type="${p.type}">
      <button data-index="${i}" aria-label="Open ${p.title}">
        <div class="card__img"><img src="${s.src}" srcset="${s.srcset}" sizes="(max-width: 900px) 100vw, 50vw" alt="${p.alt}" loading="lazy"></div>
        <div class="card__cap"><div><strong>${p.title}</strong><br><span class="card__more">View project →</span></div><span>${TYPE[p.type]}, ${p.year}</span></div>
      </button></li>`
  }).join('')

  // Filters: fade out, swap, fade in.
  const filterBtns = document.querySelectorAll('.filters button')
  filterBtns.forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter
    filterBtns.forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', b === btn) })
    const cards = [...grid.children]
    cards.forEach((c) => c.classList.add('is-out'))
    setTimeout(() => {
      cards.forEach((c) => { c.hidden = f !== 'all' && c.dataset.type !== f })
      requestAnimationFrame(() => cards.forEach((c) => !c.hidden && c.classList.remove('is-out')))
    }, reduced ? 0 : 350)
  }))

  /* ---------- viewer ---------- */
  const viewer = document.getElementById('viewer')
  const $ = (id) => document.getElementById(id)
  let current = 0, lastFocus = null
  const visible = () => PROJECTS.map((_, i) => i).filter((i) => !grid.children[i].hidden)

  function show(i) {
    current = i
    const p = PROJECTS[i], s = src(p.img)
    const img = $('v-img'); img.src = s.src; img.srcset = s.srcset; img.sizes = '(max-width: 900px) 100vw, 60vw'; img.alt = p.alt
    $('v-type').textContent = `${TYPE[p.type]} — ${p.year}`
    $('v-title').textContent = p.title
    $('v-desc').textContent = p.desc
    $('v-facts').innerHTML = Object.entries({ Year: p.year, ...p.facts }).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')
    viewer.scrollTop = 0
  }
  function open(i) {
    lastFocus = document.activeElement
    show(i)
    viewer.hidden = false
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => viewer.classList.add('is-open'))
    $('vClose').focus()
  }
  function close() {
    viewer.classList.remove('is-open')
    document.body.style.overflow = ''
    setTimeout(() => { viewer.hidden = true; lastFocus?.focus() }, reduced ? 0 : 450)
  }
  function step(dir) {
    const list = visible(), at = list.indexOf(current)
    show(list[(at + dir + list.length) % list.length])
  }
  grid.addEventListener('click', (e) => { const b = e.target.closest('button[data-index]'); if (b) open(+b.dataset.index) })
  $('vClose').addEventListener('click', close)
  $('vPrev').addEventListener('click', () => step(-1))
  $('vNext').addEventListener('click', () => step(1))
  document.addEventListener('keydown', (e) => {
    if (viewer.hidden) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
    if (e.key === 'Tab') { // keep focus inside the viewer
      const f = [...viewer.querySelectorAll('button')], first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  })

  /* ---------- header: solid after scrolling, hides going down, returns going up ---------- */
  const header = document.getElementById('header')
  let lastY = 0
  const links = [...document.querySelectorAll('.nav a')]
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')))
  addEventListener('scroll', () => {
    const y = scrollY
    header.classList.toggle('is-solid', y > 40)
    header.classList.toggle('is-hidden', y > lastY && y > 400 && !nav.classList.contains('is-open'))
    lastY = y
    let cur = -1
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i })
    links.forEach((a, i) => a.classList.toggle('is-current', i === cur))
  }, { passive: true })

  /* ---------- mobile menu ---------- */
  const nav = document.getElementById('nav'), menuBtn = document.getElementById('menuBtn')
  const setMenu = (open) => { nav.classList.toggle('is-open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? 'Close' : 'Menu' }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')))
  links.forEach((a) => a.addEventListener('click', () => setMenu(false)))

  /* ---------- parallax ---------- */
  const layers = [...document.querySelectorAll('[data-parallax]')]
  let ticking = false
  const parallax = () => {
    ticking = false
    for (const el of layers) {
      const r = el.parentElement.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight) continue
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) * -+el.dataset.parallax).toFixed(1)}px, 0)`
    }
  }
  if (!reduced) {
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax) } }, { passive: true })
    parallax()
  }

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
  }), { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

  /* ---------- form ---------- */
  const form = document.getElementById('form'), status = document.getElementById('status')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.querySelectorAll('.field__err').forEach((n) => n.remove())
    form.querySelectorAll('.has-error').forEach((n) => n.classList.remove('has-error'))
    const errors = []
    const check = (id, ok, msg) => { if (!ok) { const f = document.getElementById(id).parentElement; f.classList.add('has-error'); f.insertAdjacentHTML('beforeend', `<p class="field__err">${msg}</p>`); errors.push(id) } }
    const d = new FormData(form)
    check('f-name', d.get('name').trim(), 'Please add your name.')
    check('f-email', /^\S+@\S+\.\S+$/.test(d.get('email')), 'Please add a valid email.')
    check('f-msg', d.get('message').trim().length >= 10, 'A sentence or two helps us prepare.')
    if (errors.length) { document.getElementById(errors[0]).focus(); status.textContent = ''; return }
    status.textContent = `Thank you, ${d.get('name').trim().split(' ')[0]}. We'll reply within two working days about your ${d.get('type').toLowerCase()} project. (Concept site: nothing was sent.)`
    form.reset()
  })

  document.getElementById('year').textContent = new Date().getFullYear()
})()
