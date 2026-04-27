/* ============================================================
   cursor.js — Custom animated dual-layer cursor
   ============================================================ */

const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mx = 0, my = 0; // Mouse Position
let cx = 0, cy = 0; // Cursor Dot Position
let rx = 0, ry = 0; // Ring Position

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  const target = e.target.closest('a, button, [data-editable], .pill');
  if (target) {
    cursor.classList.add('active');
    ring.classList.add('active');
  } else {
    cursor.classList.remove('active');
    ring.classList.remove('active');
  }
});

function lerp(a, b, n) { return (1 - n) * a + n * b; }

function updateCursor() {
  // Dot follows tightly
  cx = lerp(cx, mx, 0.2);
  cy = lerp(cy, my, 0.2);
  
  // Ring follows with more delay (elastic feel)
  rx = lerp(rx, mx, 0.1);
  ry = lerp(ry, my, 0.1);

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
  ring.style.transform   = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

  requestAnimationFrame(updateCursor);
}
updateCursor();
