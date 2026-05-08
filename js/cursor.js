/* ============================================================
   cursor.js — Precision Ring Cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const shadow = document.getElementById('cursor-shadow');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Precise dot follows instantly
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

        // Lagging ring for smoothness
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX - 25}px, ${ringY - 25}px)`; // Adjusted for ring size

        // Shadow follows mouse directly
        if (shadow) {
            shadow.style.transform = `translate(${mouseX - 75}px, ${mouseY - 75}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Interaction states
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .pill');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('active');
            dot.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('active');
            dot.classList.remove('active');
        });
    });
});
