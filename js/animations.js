/* ============================================================
   animations.js — Scroll reveal · Skill bars · Card tilt
                   Project filter · Smooth scroll
   ============================================================ */

// ── Reveal on scroll ────────────────────────────────────────
const reveals    = document.querySelectorAll('.reveal');
const revealObs  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObs.observe(el));

// ── Skill bar fill on scroll ─────────────────────────────────
const skillItems = document.querySelectorAll('.skill-item');
const skillObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
skillItems.forEach(el => skillObs.observe(el));

// ── Project filter tabs ──────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    cards.forEach(c => {
      if (f === 'all' || c.dataset.cat === f) {
        c.classList.remove('hidden');
        // Restart entry animation
        c.style.animation = 'none';
        requestAnimationFrame(() => { c.style.animation = ''; });
      } else {
        c.classList.add('hidden');
      }
    });
  });
});

// ── 3-D card tilt on hover ───────────────────────────────────
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform =
      `translateY(-8px) scale(1.01) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
