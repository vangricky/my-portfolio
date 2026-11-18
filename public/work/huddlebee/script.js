// Huddlebee — shift board demo, feature tabs, pricing, FAQ, signup, how-it-works modal.
(() => {
  const $ = (s) => document.querySelector(s)
  const $$ = (s) => [...document.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* header + menu */
  const header = $('#header'), burger = $('#burger')
  addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true })
  const setMenu = (open) => { header.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu') }
  burger.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')))
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)))

  /* shift board */
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const TEAM = [
    { name: 'Maya', role: 'Manager', color: '#6c4cf5', max: 5 },
    { name: 'Leo', role: 'Barista', color: '#ff6b5b', max: 5 },
    { name: 'Ava', role: 'Barista', color: '#17c3a5', max: 4 },
    { name: 'Noah', role: 'Cashier', color: '#ffb33c', max: 4 },
    { name: 'Zoe', role: 'Baker', color: '#e85d9b', max: 3 },
  ]
  const LABEL = { off: 'Off', am: '7–3', pm: '3–11' }
  const NEXT = { off: 'am', am: 'pm', pm: 'off' }
  let grid = TEAM.map((_, r) => DAYS.map((_, d) => (['am', 'off', 'pm', 'off', 'am', 'pm', 'off'][(r + d) % 7])))
  const table = $('#shifts')

  function render(changed) {
    table.innerHTML = `<caption class="skip">Weekly shift schedule</caption>
      <thead><tr><th scope="col">Team</th>${DAYS.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
      <tbody>${TEAM.map((p, r) => `<tr><th scope="row"><span class="person"><span class="av" style="background:${p.color}">${p.name[0]}</span><span>${p.name}<small>${p.role}</small></span></span></th>
        ${DAYS.map((d, c) => { const s = grid[r][c]; return `<td><button class="cell ${s} ${changed === `${r}-${c}` ? 'pop' : ''}" data-r="${r}" data-c="${c}" aria-label="${p.name}, ${d}: ${LABEL[s]}. Click to change.">${s === 'off' ? '—' : LABEL[s]}</button></td>` }).join('')}</tr>`).join('')}
      </tbody>
      <tfoot><tr class="coverage"><td></td>${DAYS.map((_, c) => {
        const am = grid.filter((row) => row[c] === 'am').length, pm = grid.filter((row) => row[c] === 'pm').length
        const low = am < 1 || pm < 1
        return `<td><span class="cov ${low ? 'low' : ''}" title="${am} morning, ${pm} evening">${low ? '⚠' : '✓'} ${am}·${pm}</span></td>`
      }).join('')}</tr></tfoot>`
    const shifts = grid.flat().filter((s) => s !== 'off').length
    const gaps = DAYS.filter((_, c) => !grid.some((row) => row[c] === 'am') || !grid.some((row) => row[c] === 'pm')).length
    $('#hours').innerHTML = `<strong>${shifts}</strong> shifts · <strong>${shifts * 8}</strong> scheduled hours`
    $('#status').textContent = gaps ? `⚠ ${gaps} day${gaps > 1 ? 's' : ''} missing a morning or evening shift` : '✓ Every shift is covered. Ready to publish!'
  }
  table.addEventListener('click', (e) => {
    const b = e.target.closest('.cell'); if (!b) return
    const r = +b.dataset.r, c = +b.dataset.c
    grid[r][c] = NEXT[grid[r][c]]
    render(`${r}-${c}`)
    table.querySelector(`[data-r="${r}"][data-c="${c}"]`).focus()
  })
  // Auto-fill: every day gets one morning and one evening person, spread fairly within each person's max days.
  $('#autofill').addEventListener('click', () => {
    grid = TEAM.map(() => DAYS.map(() => 'off'))
    const load = TEAM.map(() => 0)
    DAYS.forEach((_, c) => {
      ;['am', 'pm', c >= 4 ? 'am' : null].filter(Boolean).forEach((slot) => {
        const pick = TEAM.map((p, r) => r).filter((r) => grid[r][c] === 'off' && load[r] < TEAM[r].max).sort((a, b) => load[a] - load[b] || a - b)[0]
        if (pick !== undefined) { grid[pick][c] = slot; load[pick]++ }
      })
    })
    render()
    $$('.cell').forEach((c, i) => { if (!c.classList.contains('off')) { c.style.animationDelay = `${(i % 7) * 0.04}s`; c.classList.add('pop') } })
  })
  $('#clear').addEventListener('click', () => { grid = TEAM.map(() => DAYS.map(() => 'off')); render() })
  render()

  /* feature tabs */
  const tabs = $$('.feature-tabs [role="tab"]')
  const select = (t) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1 })
    $$('.feature').forEach((p) => { const on = p.id === t.getAttribute('aria-controls'); p.hidden = !on; if (on) { p.classList.remove('is-in'); void p.offsetWidth; p.classList.add('is-in') } })
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t))
    t.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n) } })
  })

  /* pricing */
  const PRICE = { team: 4, business: 7 }
  const yearly = $('#yearly'), seats = $('#seats')
  const fmt = (n) => (n % 1 ? n.toFixed(2) : n.toString())
  function price() {
    const y = yearly.getAttribute('aria-checked') === 'true', n = +seats.value
    $('#seatsOut').textContent = `${n} ${n === 1 ? 'person' : 'people'}`
    for (const [plan, base] of Object.entries(PRICE)) {
      const per = y ? base * 0.8 : base
      $(`#p-${plan}`).textContent = `$${fmt(per)}`
      $(`#t-${plan}`).textContent = y ? `$${fmt(per * n * 12)} billed yearly for ${n}` : `$${fmt(per * n)}/month for your team of ${n}`
    }
    $('#t-starter').textContent = n <= 10 ? `Free for your team of ${n}` : `Up to 10 people. Your team of ${n} needs Team.`
    $('[data-plan="starter"]').style.opacity = n <= 10 ? 1 : 0.55
  }
  yearly.addEventListener('click', () => { yearly.setAttribute('aria-checked', yearly.getAttribute('aria-checked') !== 'true'); price() })
  seats.addEventListener('input', price)
  price()

  /* FAQ */
  $$('.faq__q').forEach((q) => q.addEventListener('click', () => {
    const item = q.parentElement, open = !item.classList.contains('is-open')
    $$('.faq__item').forEach((i) => { i.classList.remove('is-open'); i.firstElementChild.setAttribute('aria-expanded', 'false') })
    item.classList.toggle('is-open', open); q.setAttribute('aria-expanded', open)
  }))

  /* signup */
  $('#signupForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const v = $('#su-email').value.trim(), msg = $('#suMsg')
    const ok = /^\S+@\S+\.\S+$/.test(v)
    msg.classList.toggle('err', !ok)
    msg.textContent = ok ? `🎉 You're in! Check ${v} for your login link. (Concept site: nothing was sent.)` : 'Please enter a valid work email.'
    if (ok) e.target.reset(); else $('#su-email').focus()
  })

  /* how-it-works modal: steps light up one by one */
  const modal = $('#howModal')
  let timer, lastFocus
  function openHow() {
    lastFocus = document.activeElement
    modal.hidden = false; document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => modal.classList.add('is-open'))
    $('#howClose').focus()
    const steps = $$('#howSteps li'), bar = $('#howBar')
    let i = 0
    steps.forEach((s) => s.classList.remove('on')); bar.style.width = '0'
    const next = () => {
      if (i < steps.length) { steps[i].classList.add('on'); bar.style.width = `${((i + 1) / steps.length) * 100}%`; i++; timer = setTimeout(next, reduced ? 0 : 1100) }
    }
    timer = setTimeout(next, 300)
  }
  function closeHow() {
    clearTimeout(timer); modal.classList.remove('is-open'); document.body.style.overflow = ''
    setTimeout(() => { modal.hidden = true; lastFocus?.focus() }, reduced ? 0 : 300)
  }
  $('#watch').addEventListener('click', openHow)
  $('#howClose').addEventListener('click', closeHow)
  modal.addEventListener('click', (e) => e.target === modal && closeHow())
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!modal.hidden) closeHow(); setMenu(false) } })

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 0.08}s`; io.observe(el) })

  $('#year').textContent = new Date().getFullYear()
})()
