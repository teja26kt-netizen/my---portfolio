/* ============================================================
   particles.js — Floating particle network canvas overlay
   ============================================================ */

(function () {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d');

  let W = c.width  = window.innerWidth;
  let H = c.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
  });

  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  const COUNT = 55;
  const particles = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    vx:    (Math.random() - 0.5) * 0.3,
    vy:    (Math.random() - 0.5) * 0.3,
    r:     Math.random() * 1.8 + 0.4,
    color: Math.random() > 0.5 ? 'rgba(124,92,252,' : 'rgba(0,229,255,',
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw dots
    particles.forEach(p => {
      // Repulsion
      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 120) {
        p.x += (mdx / md) * 1.5;
        p.y += (mdy / md) * 1.5;
      }

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();
    });

    // Draw proximity lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,92,252,${0.1 * (1 - d / 110)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
