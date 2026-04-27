/* ============================================================
   cursor.js — Custom animated dual-layer cursor
   ============================================================ */

const cursor = document.getElementById('cursor');
const shadow = document.getElementById('cursor-shadow');

let mx = 0, my = 0; // Mouse Pos
let cx = 0, cy = 0; // Cursor Pos
let sx = 0, sy = 0; // Shadow Pos

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function lerp(a, b, n) { return (1 - n) * a + n * b; }

function updateCursor() {
  cx = lerp(cx, mx, 0.2);
  cy = lerp(cy, my, 0.2);
  
  // Shadow follows with more lag
  sx = lerp(sx, mx, 0.08);
  sy = lerp(sy, my, 0.08);

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
  if (shadow) {
    shadow.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;
  }

  requestAnimationFrame(updateCursor);
}
updateCursor();
