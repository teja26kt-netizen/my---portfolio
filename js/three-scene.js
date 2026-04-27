/* ============================================================
   three-scene.js — Three.js hero scene
   Objects: Orbiting icosahedra · floating octahedra
            glowing ring halos
   ============================================================ */

(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  // ── RENDERER ────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 200
  );
  camera.position.set(0, 0, 7);

  // ── LIGHTS ──────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x0a1a2a, 1));

  const lCyan  = new THREE.PointLight(0x00e5ff, 3, 20);
  lCyan.position.set(4, 2, 3);
  scene.add(lCyan);

  const lTeal  = new THREE.PointLight(0x00ffd5, 2, 15);
  lTeal.position.set(-4, -1, 2);
  scene.add(lTeal);

  const lWhite = new THREE.PointLight(0xffffff, 1, 12);
  lWhite.position.set(0, 4, -1);
  scene.add(lWhite);

  // ── SHARED MATERIALS ────────────────────────────────────
  const matWire  = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.18 });
  const matWire2 = new THREE.MeshBasicMaterial({ color: 0x00ffd5, wireframe: true, transparent: true, opacity: 0.14 });
  const matWire3 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.10 });


  // ── ORBITING WIREFRAME ICOSAHEDRA ────────────────────────
  const icoGeo = new THREE.IcosahedronGeometry(0.38, 1);
  const icos   = [];

  const orbits = [
    { r: 2.8, speed: 0.004, tilt:  0.4, phase: 0,              mat: matWire,  scale: 1.00 },
    { r: 3.4, speed: 0.003, tilt: -0.6, phase: Math.PI,         mat: matWire2, scale: 0.75 },
    { r: 3.9, speed: 0.0025,tilt:  1.1, phase: Math.PI * 0.7,   mat: matWire3, scale: 0.55 },
    { r: 2.3, speed: 0.006, tilt:  0.8, phase: Math.PI * 0.3,   mat: matWire,  scale: 0.50 },
    { r: 4.4, speed: 0.002, tilt: -0.3, phase: Math.PI * 1.5,   mat: matWire2, scale: 0.65 },
  ];

  orbits.forEach(o => {
    const mesh = new THREE.Mesh(icoGeo, o.mat);
    mesh.scale.setScalar(o.scale);
    mesh.userData = o;
    scene.add(mesh);
    icos.push(mesh);
  });

  // ── FLOATING WIREFRAME OCTAHEDRA ─────────────────────────
  const octGeo   = new THREE.OctahedronGeometry(0.22, 0);
  const floaters = [];

  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color:       i % 2 === 0 ? 0x00e5ff : 0x00ffd5,
      wireframe:   true,
      transparent: true,
      opacity:     0.22,
    });
    const mesh = new THREE.Mesh(octGeo, mat);
    mesh.userData = {
      phi:    Math.random() * Math.PI * 2,
      theta:  Math.random() * Math.PI,
      r:      3.2 + Math.random() * 2.5,
      rSpeed: (Math.random() - 0.5) * 0.003,
      tSpeed: (Math.random() - 0.5) * 0.002,
      spin:   new THREE.Vector3(
        (Math.random() - 0.5) * 0.010,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008
      ),
    };
    scene.add(mesh);
    floaters.push(mesh);
  }

  // ── GLOWING RING HALOS ───────────────────────────────────
  const rings = [];
  [2.0, 3.0, 4.1].forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.12 - i * 0.03 })
    );
    ring.userData = {
      tiltX: Math.random() * 1.2,
      tiltZ: Math.random() * 1.2,
      spinY: (0.001 + Math.random() * 0.001) * (i % 2 === 0 ? 1 : -1),
    };
    ring.rotation.x = ring.userData.tiltX;
    ring.rotation.z = ring.userData.tiltZ;
    scene.add(ring);
    rings.push(ring);
  });

  // ── MOUSE PARALLAX ───────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── ANIMATION LOOP ───────────────────────────────────────
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    frame++;
    const T = frame * 0.01;

    // Orbiting icosahedra
    icos.forEach((ico, i) => {
      const o     = ico.userData;
      const angle = T * o.speed * 100 + o.phase;
      ico.position.x = Math.cos(angle) * o.r;
      ico.position.y = Math.sin(angle * 0.7) * o.r * Math.sin(o.tilt);
      ico.position.z = Math.sin(angle) * o.r * 0.6;
      ico.rotation.x += 0.008 + i * 0.002;
      ico.rotation.y += 0.012 + i * 0.003;
      ico.rotation.z += 0.005 + i * 0.001;
    });

    // Floating octahedra
    floaters.forEach(f => {
      f.userData.phi   += f.userData.rSpeed;
      f.userData.theta += f.userData.tSpeed;
      const { phi, theta, r, spin } = f.userData;
      f.position.x = r * Math.sin(theta) * Math.cos(phi);
      f.position.y = r * Math.sin(theta) * Math.sin(phi);
      f.position.z = r * Math.cos(theta);
      f.rotation.x += spin.x;
      f.rotation.y += spin.y;
      f.rotation.z += spin.z;
    });

    // Rings
    rings.forEach(ring => {
      ring.rotation.y += ring.userData.spinY;
      ring.rotation.x = ring.userData.tiltX + Math.sin(T * 0.5) * 0.08;
    });

    // Lights orbit
    lCyan.position.x = Math.sin(T * 0.7) * 5;
    lCyan.position.z = Math.cos(T * 0.5) * 4;
    lTeal.position.x = Math.cos(T * 0.4) * -4;
    lTeal.position.y = Math.sin(T * 0.6) * 2;

    renderer.render(scene, camera);
  }
  animate();

  // ── RESIZE ──────────────────────────────────────────────
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();
