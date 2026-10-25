/* ==========================================================
   Kids Education School - front-end logic
   Mobile menu, scroll-spy, programs carousel, story modals,
   admission + contact forms, FAQ, testimonials, counters,
   newsletter, toasts. Vanilla JS, no build step.
   ========================================================== */
(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const phoneOk = (v) => /^\+?[\d\s-]{7,16}$/.test(v);
  const isMobile = () => window.matchMedia('(max-width: 576px)').matches;

  const store = {
    get(k, d) { try { const r = localStorage.getItem(k); return r === null ? d : JSON.parse(r); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
  };

  /* ---------- data ---------- */
  const PROGRAMS = [
    { id: 'kinder', title: 'Kinder (3-6) Years', img: 'assets/kinder.png', box: 'box-1', btn: 'btn-1',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu sdis parturient',
      long: 'A warm, play-based start to school. Children explore letters, numbers, colours and stories through songs, art and games while building social skills.',
      facts: [['fa-users', 'Class size: 15 children'], ['fa-clock', 'Timing: 8:30 AM - 12:30 PM'], ['fa-book', 'Focus: language, motor skills, creativity'], ['fa-tag', 'Monthly fee: $80']] },
    { id: 'elementary', title: 'Elementary School', img: 'assets/elementary.png', box: 'box-2', btn: 'btn-2',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu sdis parturient',
      long: 'Strong foundations in reading, writing, maths and science with hands-on projects, field trips and daily reading time.',
      facts: [['fa-users', 'Class size: 20 children'], ['fa-clock', 'Timing: 8:30 AM - 2:30 PM'], ['fa-book', 'Focus: literacy, numeracy, science basics'], ['fa-tag', 'Monthly fee: $100']] },
    { id: 'middle', title: 'Middle (10-16) Years', img: 'assets/middle.png', box: 'box-3', btn: 'btn-3',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu sdis parturient',
      long: 'Critical thinking, teamwork and leadership. Students take on projects in science, technology, languages and community service.',
      facts: [['fa-users', 'Class size: 25 students'], ['fa-clock', 'Timing: 8:00 AM - 3:30 PM'], ['fa-book', 'Focus: STEM, languages, leadership'], ['fa-tag', 'Monthly fee: $130']] },
    { id: 'art', title: 'Art & Craft Club', icon: 'fa-palette', bg: 'rgb(222, 245, 255)', fg: '#2aa8e0', box: 'box-1', btn: 'btn-1',
      text: 'Painting, clay modelling and paper craft. Kids express ideas and build fine motor skills.',
      long: 'A weekly after-school club where children paint, sculpt and craft. Works are showcased at our yearly art fair.',
      facts: [['fa-users', 'Group size: 12 children'], ['fa-clock', 'Timing: Tue & Thu, 3:00 PM'], ['fa-tag', 'Monthly fee: $25']] },
    { id: 'music', title: 'Music & Dance', icon: 'fa-music', bg: 'rgb(255, 244, 220)', fg: '#F0AA00', box: 'box-2', btn: 'btn-2',
      text: 'Singing, rhythm, instruments and fun dance routines that build confidence on stage.',
      long: 'Children learn basic instruments, sing in the school choir and prepare dance performances for annual day.',
      facts: [['fa-users', 'Group size: 15 children'], ['fa-clock', 'Timing: Mon & Wed, 3:00 PM'], ['fa-tag', 'Monthly fee: $30']] },
    { id: 'sports', title: 'Sports & Games', icon: 'fa-futbol', bg: 'rgb(238, 225, 255)', fg: '#8700FF', box: 'box-3', btn: 'btn-3',
      text: 'Football, athletics, swimming and team games that keep kids active and healthy.',
      long: 'Trained coaches teach teamwork, discipline and fitness through age-appropriate sports and friendly matches.',
      facts: [['fa-users', 'Group size: 20 children'], ['fa-clock', 'Timing: Fri, 2:30 PM'], ['fa-tag', 'Monthly fee: $20']] },
  ];

  const STORIES = [
    { id: 1, title: 'A fun toddler coloring training on classroom', date: 'November 19, 2019', img: 'assets/story-1.png',
      text: 'Beautiful branding for changes by Never Now in Australia. Changes is a platform for open discussion in an inclusive and collaborative environment. In our classroom, toddlers explored colours, shapes and textures with crayons, finger paint and chalk, learning to hold a pencil while having fun.' },
    { id: 2, title: 'Find out if a school fits the family’s needs', date: 'November 19, 2019', img: 'assets/story-2.png',
      text: 'Choosing a school is a big decision. Visit the campus, meet the teachers, ask about class sizes and daily routines, and see whether the values of the school match those of your family.' },
    { id: 3, title: 'Summer math & literacy centres for kids', date: 'November 19, 2019', img: 'assets/story-3.png',
      text: 'Our summer centres keep little minds active with number games, story circles and reading challenges so children return to class confident and curious.' },
    { id: 4, title: 'Classroom management techniques for new tutors', date: 'September 10, 2019', img: 'assets/story-4.png',
      text: 'Clear routines, positive reinforcement and consistent expectations help new tutors build a calm classroom where every child can learn.' },
    { id: 5, title: 'Conversation rhymes improve kids listening', date: 'July 19, 2019', img: 'assets/story-5.png',
      text: 'Short rhymes and call-and-response songs train children to listen, remember and take turns, skills they use in every subject.' },
    { id: 6, title: 'Healthy lunchbox ideas for school days', date: 'June 02, 2019', icon: 'fa-apple-whole',
      text: 'Fruit, whole-grain sandwiches, yoghurt and homemade snacks keep kids energised. Involve your child in packing the lunchbox so they enjoy eating it.' },
    { id: 7, title: 'How storytelling builds early reading skills', date: 'May 14, 2019', icon: 'fa-book-open',
      text: 'Reading aloud for just 15 minutes a day builds vocabulary, imagination and a love for books that lasts a lifetime.' },
    { id: 8, title: 'Outdoor play and why it matters for learning', date: 'April 01, 2019', icon: 'fa-tree',
      text: 'Running, climbing and exploring outdoors improves concentration, creativity and physical health, and it is a lot of fun.' },
  ];

  const TESTIMONIALS = [
    { q: 'My daughter now runs to school every morning. The teachers genuinely care about each child.', n: 'Nusrat Jahan', r: 'Parent of a Kinder student' },
    { q: 'The projects and clubs have boosted my son’s confidence. We could not be happier.', n: 'Rahim Uddin', r: 'Parent of an Elementary student' },
    { q: 'Clear communication, safe campus and excellent teaching. Highly recommended!', n: 'Farzana Akter', r: 'Parent of a Middle school student' },
  ];

  const FAQS = [
    ['What ages do you accept?', 'We welcome children from 3 to 16 years across our Kinder, Elementary and Middle programs.'],
    ['When does the new session start?', 'The academic year begins in January. Applications are open throughout the year, subject to availability.'],
    ['Can I visit the campus before applying?', 'Yes! Submit the admission form or use the Contact button and we will schedule a friendly campus tour.'],
    ['Do you provide transport and meals?', 'We offer GPS-tracked school buses on major routes and healthy meals prepared daily at an additional fee.'],
    ['What is the student-teacher ratio?', 'We keep classes small, around 15 to 25 students per class, so every child gets personal attention.'],
  ];

  /* ---------- toast ---------- */
  function toast(msg, type = 'success') {
    const box = $('#toast-box');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.setAttribute('role', 'status');
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 2800);
  }

  /* ---------- modal ---------- */
  function openModal(dlg) { if (!dlg.open) dlg.showModal(); }
  function initModals() {
    $$('dialog.modal-dialog').forEach((d) => {
      d.addEventListener('click', (e) => {
        if (e.target === d || e.target.closest('[data-close]')) d.close();
      });
    });
  }

  /* ==========================================================
     NAVBAR: mobile menu, sticky shadow, scroll-spy, smooth scroll
     ========================================================== */
  function setMenu(open) {
    const menu = $('#mobile-menu');
    const icon = $('#menu-icon');
    menu.hidden = !open;
    icon.setAttribute('aria-expanded', String(open));
    $('i', icon).className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }

  function initNav() {
    const icon = $('#menu-icon');
    const toggle = () => setMenu($('#mobile-menu').hidden);
    icon.addEventListener('click', toggle);
    icon.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });

    // smooth scrolling for in-page links + data-scroll buttons
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"], [data-scroll]');
      if (!a) return;
      const target = a.getAttribute('href') || a.dataset.scroll;
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', target);
      setMenu(false);
    });

    // contact buttons
    $$('#contact-open, [data-contact-open]').forEach((b) =>
      b.addEventListener('click', () => { setMenu(false); openModal($('#contact-modal')); setTimeout(() => $('#ct-name').focus(), 50); })
    );

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (!isMobile()) setMenu(false); renderPrograms(); });

    // scroll-spy
    const ids = ['home', 'about', 'facilities', 'admission'];
    const sections = ids.map((id) => document.getElementById(id));
    const links = $$('[data-nav]');
    const setActive = (id) => links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    const header = $('#site-header');
    const topBtn = $('#back-to-top');

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
      topBtn.hidden = window.scrollY < 500;
      const y = window.scrollY + 140;
      let current = ids[0];
      sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = ids[i]; });
      // "Admission" stays active down to the FAQ; Home only when near top
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ==========================================================
     PROGRAMS carousel
     ========================================================== */
  const prog = { start: 0 };
  const perPage = () => (isMobile() ? PROGRAMS.length : 3);

  function programCard(p) {
    const visual = p.img
      ? `<img src="${esc(p.img)}" alt="${esc(p.title)}">`
      : `<div class="prog-icon" style="background:${p.bg};color:${p.fg}"><i class="fa-solid ${p.icon}"></i></div>`;
    return `
      <div class="${p.box}" data-program="${p.id}">
        ${visual}
        <h3 class="image-title">${esc(p.title)}</h3>
        <p class="box-1description">${esc(p.text)}</p>
        <h4 class="${p.btn}" role="button" tabindex="0" data-read="${p.id}">Read More</h4>
      </div>`;
  }

  function renderPrograms() {
    const wrap = $('#program-list');
    const n = perPage();
    if (prog.start > PROGRAMS.length - n) prog.start = Math.max(0, PROGRAMS.length - n);
    const slice = PROGRAMS.slice(prog.start, prog.start + n);
    wrap.innerHTML = slice.map(programCard).join('');
    const prev = $('#prog-prev');
    const next = $('#prog-next');
    prev.setAttribute('aria-disabled', String(prog.start === 0));
    next.setAttribute('aria-disabled', String(prog.start + n >= PROGRAMS.length));
    $('#prog-indicator').textContent = `Showing ${prog.start + 1}-${prog.start + slice.length} of ${PROGRAMS.length} programs`;
  }

  function openProgram(id) {
    const p = PROGRAMS.find((x) => x.id === id);
    if (!p) return;
    $('#info-body').innerHTML = `
      <h3 id="info-title">${esc(p.title)}</h3>
      ${p.img ? `<img class="modal-img" src="${esc(p.img)}" alt="" style="max-width:140px;display:block;margin:0 auto 14px">` : ''}
      <p>${esc(p.long)}</p>
      <ul class="detail-list">${p.facts.map(([ic, t]) => `<li><i class="fa-solid ${ic}"></i> ${esc(t)}</li>`).join('')}</ul>
      <button type="button" class="btn-primary" data-enroll="${p.id}">Enroll in this program</button>`;
    openModal($('#info-modal'));
  }

  function initPrograms() {
    renderPrograms();
    const go = (dir) => {
      const n = perPage();
      prog.start = Math.min(Math.max(0, prog.start + dir * n), Math.max(0, PROGRAMS.length - n));
      renderPrograms();
    };
    const bindArrow = (el, dir) => {
      el.addEventListener('click', () => go(dir));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(dir); } });
    };
    bindArrow($('#prog-prev'), -1);
    bindArrow($('#prog-next'), 1);

    const wrap = $('#program-list');
    wrap.addEventListener('click', (e) => { const b = e.target.closest('[data-read]'); if (b) openProgram(b.dataset.read); });
    wrap.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-read]')) { e.preventDefault(); openProgram(e.target.dataset.read); }
    });

    // enroll from the modal
    $('#info-modal').addEventListener('click', (e) => {
      const b = e.target.closest('[data-enroll]');
      if (!b) return;
      $('#adm-program').value = b.dataset.enroll;
      $('#info-modal').close();
      $('#admission').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => $('#adm-parent').focus({ preventScroll: true }), 600);
    });
  }

  /* ==========================================================
     STORIES
     ========================================================== */
  function openStory(id) {
    const s = STORIES.find((x) => x.id === +id);
    if (!s) return;
    $('#info-body').innerHTML = `
      ${s.img ? `<img class="modal-img" src="${esc(s.img)}" alt="">` : ''}
      <span class="tag">${esc(s.date)}</span>
      <h3 id="info-title">${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>`;
    openModal($('#info-modal'));
  }

  function openAllStories() {
    $('#info-body').innerHTML = `
      <h3 id="info-title">All stories</h3>
      <ul class="story-list">
        ${STORIES.map((s) => `
          <li><button type="button" data-story-id="${s.id}">
            ${s.img ? `<img src="${esc(s.img)}" alt="">` : `<span class="story-thumb"><i class="fa-solid ${s.icon}"></i></span>`}
            <span><strong>${esc(s.title)}</strong><small>${esc(s.date)}</small></span>
          </button></li>`).join('')}
      </ul>`;
    openModal($('#info-modal'));
  }

  function initStories() {
    $$('.story-card').forEach((c) => {
      c.addEventListener('click', () => openStory(c.dataset.story));
      c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openStory(c.dataset.story); } });
    });
    $('#view-all-stories').addEventListener('click', openAllStories);
    $('#info-modal').addEventListener('click', (e) => {
      const b = e.target.closest('[data-story-id]');
      if (b) openStory(b.dataset.storyId);
    });
  }

  /* ==========================================================
     FORMS
     ========================================================== */
  function setErr(form, field, msg) {
    const wrap = $(`[data-field="${field}"]`, form);
    if (!wrap) return;
    const p = $('.err', wrap);
    if (p) p.textContent = msg || '';
    wrap.classList.toggle('invalid', !!msg);
    const input = $('input, select, textarea', wrap);
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function clearOnInput(form) {
    form.addEventListener('input', (e) => {
      const wrap = e.target.closest('[data-field]');
      if (wrap) setErr(form, wrap.dataset.field, '');
    });
  }

  function initAdmission() {
    const form = $('#admission-form');
    const select = $('#adm-program');
    select.innerHTML = '<option value="">Select a program</option>' +
      PROGRAMS.map((p) => `<option value="${p.id}">${esc(p.title)}</option>`).join('');
    clearOnInput(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = {
        parent: $('#adm-parent').value.trim(),
        email: $('#adm-email').value.trim(),
        phone: $('#adm-phone').value.trim(),
        child: $('#adm-child').value.trim(),
        age: Number($('#adm-age').value),
        program: select.value,
        message: $('#adm-message').value.trim(),
      };
      const errors = {
        parent: v.parent.length < 2 ? 'Please enter the parent or guardian name.' : '',
        email: emailOk(v.email) ? '' : 'Enter a valid email address.',
        phone: phoneOk(v.phone) ? '' : 'Enter a valid phone number.',
        child: v.child.length < 2 ? 'Please enter the child’s name.' : '',
        age: v.age >= 2 && v.age <= 16 ? '' : 'Age must be between 2 and 16.',
        program: v.program ? '' : 'Please choose a program.',
      };
      Object.entries(errors).forEach(([k, m]) => setErr(form, k, m));
      const firstBad = Object.keys(errors).find((k) => errors[k]);
      if (firstBad) {
        $(`[data-field="${firstBad}"] input, [data-field="${firstBad}"] select`, form).focus();
        toast('Please fix the highlighted fields.', 'error');
        return;
      }

      const ref = 'ADM-' + Date.now().toString().slice(-6);
      const list = store.get('ks_applications', []);
      list.push({ ref, ...v, date: new Date().toISOString() });
      store.set('ks_applications', list);

      const prog = PROGRAMS.find((p) => p.id === v.program);
      $('#adm-ref').textContent = ref;
      $('#adm-summary').textContent = `${v.child} (age ${v.age}) applied for ${prog.title}. We will contact ${v.parent} at ${v.email} soon.`;
      form.hidden = true;
      $('#admission-success').hidden = false;
      toast('Application submitted!');
      form.reset();
    });

    $('#adm-again').addEventListener('click', () => {
      $('#admission-success').hidden = true;
      form.hidden = false;
      $('#adm-parent').focus();
    });
  }

  function initContact() {
    const form = $('#contact-form');
    clearOnInput(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#ct-name').value.trim();
      const email = $('#ct-email').value.trim();
      const msg = $('#ct-message').value.trim();
      const errors = {
        name: name.length < 2 ? 'Please enter your name.' : '',
        email: emailOk(email) ? '' : 'Enter a valid email address.',
        message: msg.length < 10 ? 'Message must be at least 10 characters.' : '',
      };
      Object.entries(errors).forEach(([k, m]) => setErr(form, k, m));
      if (Object.values(errors).some(Boolean)) return;
      const list = store.get('ks_messages', []);
      list.push({ name, email, msg, date: new Date().toISOString() });
      store.set('ks_messages', list);
      form.reset();
      $('#contact-modal').close();
      toast('Thanks! We will get back to you soon.');
    });
  }

  function initNewsletter() {
    const form = $('#newsletter-form');
    const input = $('#nl-email');
    const msg = $('#nl-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim().toLowerCase();
      if (!emailOk(email)) { msg.textContent = 'Please enter a valid email.'; msg.style.color = '#ffe0e0'; return; }
      const list = store.get('ks_newsletter', []);
      if (list.includes(email)) { msg.textContent = 'You are already subscribed.'; msg.style.color = '#fff'; return; }
      list.push(email);
      store.set('ks_newsletter', list);
      msg.textContent = 'Thanks for joining!';
      msg.style.color = '#fff';
      form.reset();
      toast('Subscribed to school news!');
    });
    input.addEventListener('input', () => { msg.textContent = ''; });
  }

  /* ==========================================================
     FAQ accordion
     ========================================================== */
  function initFaq() {
    const box = $('#accordion');
    box.innerHTML = FAQS.map(([q, a], i) => `
      <div class="acc-item">
        <button type="button" class="acc-q" aria-expanded="false" aria-controls="acc-a-${i}" id="acc-q-${i}">
          <span>${esc(q)}</span><i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="acc-a" id="acc-a-${i}" role="region" aria-labelledby="acc-q-${i}"><p>${esc(a)}</p></div>
      </div>`).join('');

    box.addEventListener('click', (e) => {
      const btn = e.target.closest('.acc-q');
      if (!btn) return;
      const item = btn.parentElement;
      const willOpen = !item.classList.contains('open');
      $$('.acc-item', box).forEach((it) => {
        it.classList.remove('open');
        $('.acc-q', it).setAttribute('aria-expanded', 'false');
        $('.acc-a', it).style.maxHeight = '0px';
      });
      if (willOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        const panel = $('.acc-a', item);
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  /* ==========================================================
     Testimonials slider
     ========================================================== */
  function initSlider() {
    let i = 0;
    let timer;
    const quote = $('#slide-quote');
    const dots = $('#slide-dots');
    dots.innerHTML = TESTIMONIALS.map((_, k) => `<button type="button" class="dot" data-i="${k}" aria-label="Review ${k + 1}"></button>`).join('');

    const show = (n) => {
      i = (n + TESTIMONIALS.length) % TESTIMONIALS.length;
      const t = TESTIMONIALS[i];
      quote.innerHTML = `<p>“${esc(t.q)}”</p><div class="who"><strong style="color:#00aaff">${esc(t.n)}</strong><small>${esc(t.r)}</small></div>`;
      $$('.dot', dots).forEach((d, k) => d.classList.toggle('active', k === i));
    };
    const restart = () => {
      clearInterval(timer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(() => show(i + 1), 6000);
    };
    $('#slide-prev').addEventListener('click', () => { show(i - 1); restart(); });
    $('#slide-next').addEventListener('click', () => { show(i + 1); restart(); });
    dots.addEventListener('click', (e) => { const d = e.target.closest('.dot'); if (d) { show(+d.dataset.i); restart(); } });
    const slider = $('#slider');
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', restart);
    show(0);
    restart();
  }

  /* ==========================================================
     Scroll reveal + animated counters
     ========================================================== */
  function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffix : '');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function initReveal() {
    const items = $$('.reveal');
    const counters = $$('[data-count]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('is-visible'));
      counters.forEach(animateCount);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        $$('[data-count]', en.target).forEach(animateCount);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }

  /* ---------- init ---------- */
  function init() {
    initModals();
    initNav();
    initPrograms();
    initStories();
    initAdmission();
    initContact();
    initNewsletter();
    initFaq();
    initSlider();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
