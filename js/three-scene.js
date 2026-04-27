/* ============================================================
   three-scene.js — Three.js hero scene
   Objects: DNA double helix · orbiting icosahedra
            floating octahedra · glowing ring halos
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
  const matNodeA = new THREE.MeshPhongMaterial({ color: 0x00e5ff, emissive: 0x003a4a, shininess: 120, transparent: true, opacity: 0.95 });
  const matNodeB = new THREE.MeshPhongMaterial({ color: 0x00ffd5, emissive: 0x002a2a, shininess: 120, transparent: true, opacity: 0.90 });
  const matRung  = new THREE.MeshBasicMaterial({ color: 0x00ffd5, transparent: true, opacity: 0.35 });
  const matWire  = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.18 });
  const matWire2 = new THREE.MeshBasicMaterial({ color: 0x00ffd5, wireframe: true, transparent: true, opacity: 0.14 });
  const matWire3 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.10 });

  // ── DNA DOUBLE HELIX ────────────────────────────────────
  const dnaGroup = new THREE.Group();
  scene.add(dnaGroup);

  const STEPS  = 60;
  const HEIGHT = 5.5;
  const RADIUS = 0.72;

  const nodeGeo  = new THREE.SphereGeometry(0.08, 12, 12);
  const strandA  = [];
  const strandB  = [];

  for (let i = 0; i <= STEPS; i++) {
    const frac  = i / STEPS;
    const angle = frac * Math.PI * 6;          // 3 full turns
    const y     = (frac - 0.5) * HEIGHT;

    // Strand A
    const ax = Math.cos(angle) * RADIUS;
    const az = Math.sin(angle) * RADIUS;
    const nA = new THREE.Mesh(nodeGeo, i % 3 === 0 ? matNodeA : matNodeB);
    nA.position.set(ax, y, az);
    dnaGroup.add(nA);
    strandA.push(new THREE.Vector3(ax, y, az));

    // Strand B (opposite side)
    const bx = Math.cos(angle + Math.PI) * RADIUS;
    const bz = Math.sin(angle + Math.PI) * RADIUS;
    const nB = new THREE.Mesh(nodeGeo, i % 3 === 0 ? matNodeB : matNodeA);
    nB.position.set(bx, y, bz);
    dnaGroup.add(nB);
    strandB.push(new THREE.Vector3(bx, y, bz));

    // Rungs every 3 steps
    if (i % 3 === 0 && i < STEPS) {
      const dir = new THREE.Vector3(bx - ax, 0, bz - az);
      const len = dir.length();
      const mid = new THREE.Vector3((ax + bx) / 2, y, (az + bz) / 2);
      const rung = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, len, 6),
        matRung
      );
      rung.position.copy(mid);
      rung.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      dnaGroup.add(rung);
    }
  }

  // Smooth tube strands
  function makeTube(pts, mat) {
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo   = new THREE.TubeGeometry(curve, 120, 0.028, 6, false);
    dnaGroup.add(new THREE.Mesh(geo, mat));
  }
  makeTube(strandA, new THREE.MeshPhongMaterial({ color: 0x00e5ff, emissive: 0x002233, transparent: true, opacity: 0.7, shininess: 80 }));
  makeTube(strandB, new THREE.MeshPhongMaterial({ color: 0x00ffd5, emissive: 0x002233, transparent: true, opacity: 0.7, shininess: 80 }));

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

    // DNA
    dnaGroup.rotation.y = T * 0.4 + mouseX * 0.25;
    dnaGroup.rotation.x = mouseY * 0.15;
    dnaGroup.children.forEach((ch, i) => {
      if (ch.geometry && ch.geometry.type === 'SphereGeometry') {
        ch.scale.setScalar(1 + 0.12 * Math.sin(T * 3 + i * 0.4));
      }
    });

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
