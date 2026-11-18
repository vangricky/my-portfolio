// Waggle & Co. — menu, ticker, price calculator + booking, flip cards, FAQ, reveals, paw confetti.
(() => {
  const $ = (s) => document.querySelector(s)
  const $$ = (s) => [...document.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* menu */
  const header = $('#header'), burger = $('#burger')
  const setMenu = (open) => { header.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu') }
  burger.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')))
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)))
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false))

  /* ticker */
  const words = ['Daycare', 'Grooming', 'Training', 'Pup-cakes', 'Zoomies', 'Belly rubs', 'Nap suites']
  const paw = '<svg width="24" height="24" fill="currentColor" aria-hidden="true"><use href="#paw"/></svg>'
  const row = words.map((w) => `<span>${w}${paw}</span>`).join('')
  $('#ticker').innerHTML = row + row

  /* price calculator */
  const PRICES = {
    daycare: { small: 34, medium: 38, large: 42 },   // per day
    groom: { small: 45, medium: 55, large: 68 },     // per visit (one per week)
  }
  let days = 3
  const money = (n) => `$${n.toFixed(0)}`
  const state = () => ({
    size: $('input[name="size"]:checked').value,
    svc: $('input[name="svc"]:checked').value,
    extras: $$('.addon input:checked').map((i) => ({ name: i.dataset.name, price: +i.value })),
  })
  let shownTotal = 0
  function animateTotal(to) {
    const from = shownTotal, t0 = performance.now(), el = $('#total')
    if (reduced) { el.textContent = money(to); shownTotal = to; return }
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 450), v = from + (to - from) * (1 - Math.pow(1 - p, 3))
      el.textContent = money(v)
      if (p < 1) requestAnimationFrame(tick); else shownTotal = to
    }
    requestAnimationFrame(tick)
  }
  function calc() {
    const s = state(), lines = []
    let total = 0
    if (s.svc !== 'groom') { const d = PRICES.daycare[s.size] * days; total += d; lines.push([`Daycare · ${days} day${days > 1 ? 's' : ''} × ${money(PRICES.daycare[s.size])}`, d]) }
    if (s.svc !== 'daycare') { const g = PRICES.groom[s.size]; total += g; lines.push([`Grooming · ${s.size} dog`, g]) }
    s.extras.forEach((x) => { total += x.price; lines.push([x.name, x.price]) })
    let discount = 0
    if (s.svc !== 'groom' && days === 5) { discount = Math.round(total * 0.1); total -= discount }
    $('#lines').innerHTML = lines.map(([k, v]) => `<div><span>${k}</span><span>${money(v)}</span></div>`).join('') +
      (discount ? `<div class="discount"><span>🎉 Full-week discount (10%)</span><span>−${money(discount)}</span></div>` : '')
    animateTotal(total)
    // stepper + week dots only matter for daycare
    $('#minus').disabled = days <= 1 || s.svc === 'groom'
    $('#plus').disabled = days >= 5 || s.svc === 'groom'
    $$('#week i').forEach((d, i) => d.classList.toggle('on', s.svc !== 'groom' && i < days))
    $('#days').style.opacity = s.svc === 'groom' ? 0.3 : 1
    return { total, s }
  }
  $('#minus').addEventListener('click', () => { days = Math.max(1, days - 1); calc() })
  $('#plus').addEventListener('click', () => { days = Math.min(5, days + 1); calc() })
  $$('input[name="size"], input[name="svc"], .addon input').forEach((i) => i.addEventListener('change', calc))
  calc()

  /* booking */
  const summary = $('#summary')
  $('#bookForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const dog = $('#b-dog').value.trim(), email = $('#b-email').value.trim()
    const err = !dog ? "What's your dog's name? 🐶" : !/^\S+@\S+\.\S+$/.test(email) ? 'Please add a valid email so we can confirm.' : ''
    $('#bookErr').textContent = err
    if (err) { (!dog ? $('#b-dog') : $('#b-email')).focus(); return }
    const { total, s } = calc()
    const nice = dog.charAt(0).toUpperCase() + dog.slice(1)
    $('#bookedTitle').textContent = `See you soon, ${nice}!`
    $('#bookedText').textContent = `Your free trial day is reserved. Plan after that: ${money(total)}/week (${s.svc === 'both' ? 'daycare + grooming' : s.svc}). We'll email ${email} to pick a date. (Concept site: nothing was sent.)`
    summary.classList.add('is-booked')
    confetti()
  })
  $('#again').addEventListener('click', () => { summary.classList.remove('is-booked'); $('#bookForm').reset(); $('#bookErr').textContent = '' })

  function confetti() {
    if (reduced) return
    const box = document.createElement('div'); box.className = 'confetti'
    const colors = ['#ffc93c', '#ff7a59', '#74c7ff', '#5cc489', '#b9a6ff']
    for (let i = 0; i < 46; i++) {
      const p = document.createElement('i')
      const size = 18 + Math.random() * 22
      p.innerHTML = `<svg width="${size}" height="${size}" fill="${colors[i % colors.length]}"><use href="#paw"/></svg>`
      p.style.left = `${Math.random() * 100}%`
      p.style.setProperty('--r', `${Math.random() * 720 - 360}deg`)
      p.style.animationDuration = `${1.8 + Math.random() * 1.6}s`
      p.style.animationDelay = `${Math.random() * 0.4}s`
      box.appendChild(p)
    }
    document.body.appendChild(box)
    setTimeout(() => box.remove(), 4000)
  }

  /* meet the pack: flip cards */
  const PACK = [
    { name: 'Biscuit', img: 'grass', alt: 'A brown and white dog lying in tall grass', breed: 'Mixed breed, 3 yrs', toy: 'Squeaky hedgehog', quirk: 'Howls along to the radio' },
    { name: 'Pepper', img: 'sit', alt: 'A tan dog sitting proudly outdoors', breed: 'Boxer mix, 5 yrs', toy: 'Anything that bounces', quirk: 'Sits perfectly for treats, ignores everything else' },
    { name: 'Koda', img: 'window', alt: 'A black and white dog gazing out of a window', breed: 'Border collie, 2 yrs', toy: 'Frisbee, obviously', quirk: 'Herds the other dogs at nap time' },
    { name: 'Mochi', img: 'cafe', alt: 'A small terrier sitting on a chair at a café table', breed: 'Jack Russell, 4 yrs', toy: 'Tennis balls (all of them)', quirk: 'Thinks she is the manager' },
  ]
  $('#packGrid').innerHTML = PACK.map((d) => `
    <div class="flip reveal">
      <button aria-label="${d.name}: tap to flip" aria-pressed="false">
        <div class="face face--front"><img src="img/${d.img}-800.jpg" alt="${d.alt}" loading="lazy"><span class="name">${d.name}</span><span class="hint" aria-hidden="true">↻</span></div>
        <div class="face face--back"><h3>${d.name}</h3><dl><div><dt>Breed</dt><dd>${d.breed}</dd></div><div><dt>Favorite toy</dt><dd>${d.toy}</dd></div><div><dt>Known for</dt><dd>${d.quirk}</dd></div></dl></div>
      </button>
    </div>`).join('')
  $$('.flip button').forEach((b) => b.addEventListener('click', () => {
    const on = b.parentElement.classList.toggle('is-flipped')
    b.setAttribute('aria-pressed', on)
  }))

  /* FAQ: one open at a time */
  $$('.faq details').forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) $$('.faq details').forEach((o) => o !== d && (o.open = false))
  }))

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 0.07}s`; io.observe(el) })

  $('#year').textContent = new Date().getFullYear()
})()
