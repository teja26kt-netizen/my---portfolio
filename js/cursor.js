/* ============================================================
   cursor.js — Custom animated dual-layer cursor
   ============================================================ */

const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mx = 0, my = 0; // Mouse Pos
let cx = 0, cy = 0; // Cursor Dot Pos
let rx = 0, ry = 0; // Ring Pos
let activeEl = null;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  // Check for hover state
  const target = e.target.closest('a, button, [data-editable], .pill');
  if (target) {
    document.body.classList.add('cursor-hover');
    activeEl = target;
  } else {
    document.body.classList.remove('cursor-hover');
    activeEl = null;
  }
});

function lerp(a, b, n) { return (1 - n) * a + n * b; }

function updateCursor() {
  // Smooth movement
  cx = lerp(cx, mx, 0.25);
  cy = lerp(cy, my, 0.25);
  rx = lerp(rx, mx, 0.12);
  ry = lerp(ry, my, 0.12);

  // Magnetic effect if hovering over something
  if (activeEl) {
    const rect = activeEl.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    
    // Pull the ring towards the center of the element
    rx = lerp(rx, targetX, 0.1);
    ry = lerp(ry, targetY, 0.1);
  }

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
  ring.style.transform   = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

  updateDots();
  requestAnimationFrame(updateCursor);
}

// ── Trailing Dots ───────────────────────────────────────────
const dotCount = 6;
const dots = [];
for (let i = 0; i < dotCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot-trail');
  document.body.appendChild(dot);
  dots.push({ el: dot, x: 0, y: 0 });
}

function updateDots() {
  let dx = cx;
  let dy = cy;

  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1] || { x: cx, y: cy };
    dot.x = lerp(dot.x, dx, 0.35);
    dot.y = lerp(dot.y, dy, 0.35);
    dx = dot.x;
    dy = dot.y;
    dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${1 - index / dotCount})`;
  });
}

updateCursor();
