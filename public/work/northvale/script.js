// Northvale Partners — shared by index.html and careers.html. Each block checks its elements exist.
(() => {
  const $ = (s, el = document) => el.querySelector(s)
  const $$ = (s, el = document) => [...el.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* header shadow + mobile menu */
  const header = $('#header'), burger = $('#burger')
  addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 8), { passive: true })
  const setMenu = (open) => { header.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu') }
  burger?.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')))
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)))
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false))

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 0.08}s`; io.observe(el) })

  /* animated counters */
  const countIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return
    countIO.unobserve(e.target)
    const el = e.target, to = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0)
    const fmt = (v) => `${el.dataset.prefix || ''}${v.toFixed(dec)}${el.dataset.suffix || ''}`
    if (reduced) { el.textContent = fmt(to); return }
    const t0 = performance.now(), dur = 1600
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }), { threshold: 0.5 })
  $$('[data-count]').forEach((el) => countIO.observe(el))

  /* approach tabs (arrow keys move between tabs) */
  const tabs = $$('[role="tab"]')
  const selectTab = (tab) => {
    tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1 })
    $$('[role="tabpanel"]').forEach((p) => {
      const on = p.id === tab.getAttribute('aria-controls')
      p.hidden = !on
      if (on) {
        p.classList.remove('is-entering'); void p.offsetWidth; p.classList.add('is-entering')
        const img = $('#approachImg')
        img.style.opacity = 0
        setTimeout(() => { img.src = `img/${p.dataset.img}-1600.jpg`; img.onload = () => (img.style.opacity = 1) }, 200)
      }
    })
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t))
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
      if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); selectTab(n) }
    })
  })

  /* testimonial carousel (auto-advances, pauses on hover/focus) */
  const quotes = $$('.quote')
  if (quotes.length) {
    let at = 0, timer
    const dots = $('#qDots')
    dots.innerHTML = quotes.map((_, i) => `<button aria-label="Show testimonial ${i + 1}"></button>`).join('')
    const go = (i) => {
      at = (i + quotes.length) % quotes.length
      quotes.forEach((q, j) => q.classList.toggle('is-active', j === at))
      $$('button', dots).forEach((d, j) => d.setAttribute('aria-current', j === at))
    }
    const auto = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => go(at + 1), 6500) }
    $('#qPrev').addEventListener('click', () => { go(at - 1); auto() })
    $('#qNext').addEventListener('click', () => { go(at + 1); auto() })
    $$('button', dots).forEach((d, j) => d.addEventListener('click', () => { go(j); auto() }))
    const box = $('#quotes')
    box.addEventListener('mouseenter', () => clearInterval(timer)); box.addEventListener('mouseleave', auto)
    box.addEventListener('focusin', () => clearInterval(timer)); box.addEventListener('focusout', auto)
    go(0); auto()
  }

  /* shared form validation */
  function validate(form, rules) {
    $$('.field__err', form).forEach((n) => n.remove())
    $$('.has-error', form).forEach((n) => n.classList.remove('has-error'))
    let first = null
    for (const [id, ok, msg] of rules) {
      if (ok) continue
      const input = $(`#${id}`), field = input.closest('.field') || input.parentElement
      field.classList.add('has-error')
      field.insertAdjacentHTML('beforeend', `<p class="field__err">${msg}</p>`)
      first ??= input
    }
    first?.focus()
    return !first
  }
  const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v.trim())

  const contact = $('#contactForm')
  contact?.addEventListener('submit', (e) => {
    e.preventDefault()
    const v = (id) => $(`#${id}`).value
    const ok = validate(contact, [
      ['c-name', v('c-name').trim(), 'Please enter your name.'],
      ['c-email', isEmail(v('c-email')), 'Please enter a valid work email.'],
      ['c-topic', v('c-topic'), 'Please choose a service.'],
      ['c-consent', $('#c-consent').checked, 'Please confirm we may contact you.'],
    ])
    if (!ok) return
    $('#successText').textContent = `Thanks, ${v('c-name').trim().split(' ')[0]}. A senior advisor from our ${v('c-topic')} team will email ${v('c-email').trim()} within one business day. (Concept site: nothing was sent.)`
    contact.classList.add('is-sent')
  })

  const news = $('#newsletter')
  news?.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = $('input', news)
    $('#newsMsg').textContent = isEmail(input.value) ? "You're subscribed. First briefing arrives next month." : 'Please enter a valid email.'
    if (isEmail(input.value)) input.value = ''
  })

  /* careers: job board */
  const list = $('#jobsList')
  if (list) {
    const JOBS = [
      { id: 1, title: 'Senior Associate, Corporate Strategy', team: 'Strategy', loc: 'Chicago', type: 'Full-time', level: 'Mid-level',
        about: 'Lead workstreams on growth strategy engagements for mid-market clients, from research to board presentation.', you: ['3–5 years in consulting, strategy or corporate development', 'Strong financial modeling and storytelling', 'Comfortable presenting to executives'] },
      { id: 2, title: 'Analyst, M&A Advisory', team: 'M&A', loc: 'Charlotte', type: 'Full-time', level: 'Entry-level',
        about: 'Support buy-side and sell-side transactions: valuation models, data rooms and buyer outreach.', you: ['Degree in finance, economics or a related field', 'Excel and PowerPoint you are proud of', 'Detail-oriented under deadlines'] },
      { id: 3, title: 'Manager, Financial Planning & Analysis', team: 'Finance', loc: 'Denver', type: 'Full-time', level: 'Senior',
        about: 'Build forecasting and cash-flow models for clients and coach their finance teams to own them.', you: ['6+ years in FP&A or advisory', 'Experience implementing planning tools', 'Clear, patient communicator'] },
      { id: 4, title: 'Operations Consultant, Supply Chain', team: 'Operations', loc: 'Chicago', type: 'Full-time', level: 'Mid-level',
        about: 'Find and fix cost and service problems in warehouses, routing and procurement.', you: ['3+ years in operations or supply chain', 'Lean or Six Sigma experience a plus', 'Happy to spend time on client sites'] },
      { id: 5, title: 'Risk & Compliance Advisor', team: 'Risk', loc: 'Remote (US)', type: 'Full-time', level: 'Senior',
        about: 'Design right-sized control frameworks and prepare clients for audits and regulatory reviews.', you: ['5+ years in audit, risk or compliance', 'SOX or SOC 2 experience', 'Practical, not just by-the-book'] },
      { id: 6, title: 'Data Analyst, Digital Transformation', team: 'Digital', loc: 'Denver', type: 'Full-time', level: 'Entry-level',
        about: 'Turn client data into dashboards and insights that guide system and automation decisions.', you: ['SQL and a BI tool (Power BI or Tableau)', 'Curiosity about how businesses run', 'Clear written communication'] },
      { id: 7, title: 'Summer Intern, Advisory', team: 'Strategy', loc: 'Charlotte', type: 'Internship', level: 'Internship',
        about: 'A paid 10-week internship working on real client projects alongside our associates.', you: ['Rising senior in any major', 'Strong analytical and writing skills', 'Available June–August 2027'] },
    ]
    const q = $('#q'), team = $('#team'), loc = $('#loc')
    const opts = (key, sel) => [...new Set(JOBS.map((j) => j[key]))].sort().forEach((v) => sel.insertAdjacentHTML('beforeend', `<option>${v}</option>`))
    opts('team', team); opts('loc', loc)

    const render = () => {
      const term = q.value.trim().toLowerCase()
      const shown = JOBS.filter((j) => (!team.value || j.team === team.value) && (!loc.value || j.loc === loc.value) &&
        (!term || `${j.title} ${j.team} ${j.about}`.toLowerCase().includes(term)))
      $('#jobsCount').textContent = `${shown.length} open role${shown.length === 1 ? '' : 's'}`
      list.innerHTML = shown.length ? shown.map((j) => `
        <details class="job">
          <summary><div><h3>${j.title}</h3><small>${j.team} · ${j.level}</small></div><span class="pill">${j.loc}</span><span class="pill">${j.type}</span>
            <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></summary>
          <div class="job__body">
            <div><h4>About the role</h4><p>${j.about}</p><button class="btn btn--primary" data-apply="${j.id}">Apply for this role</button></div>
            <div><h4>You might be a fit if you have</h4><ul>${j.you.map((y) => `<li>${y}</li>`).join('')}</ul></div>
          </div>
        </details>`).join('') : `<div class="empty"><p><strong>No roles match.</strong> Try another search, or <button class="link" id="clearFilters">clear the filters</button>.</p></div>`
    }
    ;[q, team, loc].forEach((el) => el.addEventListener('input', render))
    list.addEventListener('click', (e) => {
      if (e.target.id === 'clearFilters') { q.value = ''; team.value = ''; loc.value = ''; render() }
      const b = e.target.closest('[data-apply]'); if (b) openApply(JOBS.find((j) => j.id === +b.dataset.apply))
    })
    render()

    /* application modal */
    const modal = $('#applyModal'), form = $('#applyForm')
    let job = null, lastFocus = null
    function openApply(j) {
      job = j; lastFocus = document.activeElement
      form.reset(); form.classList.remove('is-sent'); $('#fileName').innerHTML = '<strong>Upload a file</strong> · PDF or Word, up to 5 MB'
      $$('.field__err', form).forEach((n) => n.remove()); $$('.has-error', form).forEach((n) => n.classList.remove('has-error'))
      $('#applyTitle').textContent = `Apply: ${j.title}`
      $('#applyMeta').textContent = `${j.team} · ${j.loc} · ${j.type}`
      modal.hidden = false; document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => modal.classList.add('is-open'))
      setTimeout(() => $('#a-name').focus(), 50)
    }
    function closeApply() {
      modal.classList.remove('is-open'); document.body.style.overflow = ''
      setTimeout(() => { modal.hidden = true; lastFocus?.focus() }, reduced ? 0 : 300)
    }
    $('#applyClose').addEventListener('click', closeApply)
    $('#applyDone').addEventListener('click', closeApply)
    modal.addEventListener('click', (e) => e.target === modal && closeApply())
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeApply() })
    $('#a-file').addEventListener('change', (e) => {
      const f = e.target.files[0]
      $('#fileName').innerHTML = f ? `<strong>${f.name}</strong> · ${(f.size / 1024 / 1024).toFixed(1)} MB` : '<strong>Upload a file</strong> · PDF or Word, up to 5 MB'
    })
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const f = $('#a-file').files[0]
      const ok = validate(form, [
        ['a-name', $('#a-name').value.trim(), 'Please enter your name.'],
        ['a-email', isEmail($('#a-email').value), 'Please enter a valid email.'],
        ['a-file', f && f.size <= 5 * 1024 * 1024 && /\.(pdf|docx?)$/i.test(f.name), f ? 'Please upload a PDF or Word file under 5 MB.' : 'Please attach your resume.'],
        ['a-why', $('#a-why').value.trim().length >= 20, 'A couple of sentences, please.'],
      ])
      if (!ok) return
      $('#applySuccess').textContent = `Thanks, ${$('#a-name').value.trim().split(' ')[0]}. Our recruiting team reviews every application for the ${job.title} role within five business days. (Concept site: nothing was sent.)`
      form.classList.add('is-sent')
      $('#applyDone').focus()
    })
  }

  $$('.year').forEach((el) => (el.textContent = new Date().getFullYear()))
})()
