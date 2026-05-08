/* ============================================================
   three-scene.js — Morphing Glass Sphere
   ============================================================ */

(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const parent = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(parent.clientWidth, parent.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, parent.clientWidth / parent.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0x7c5cfc, 2);
  spotLight.position.set(5, 5, 5);
  scene.add(spotLight);

  const spotLight2 = new THREE.SpotLight(0x00e5ff, 2);
  spotLight2.position.set(-5, -5, 5);
  scene.add(spotLight2);

  // Geometry
  const geometry = new THREE.IcosahedronGeometry(1.5, 64);
  const originalPositions = geometry.attributes.position.array.slice();

  // Material (Glass/Iridescent look)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.5,
    ior: 1.5,
    iridescence: 1,
    iridescenceIOR: 2.5,
    iridescenceThicknessRange: [100, 400],
    specularIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Interaction
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Morphing Effect (Vertex Displacement)
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      const noise = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * Math.sin(z * 2 + time) * 0.15;
      
      positions[i] = x * (1 + noise);
      positions[i + 1] = y * (1 + noise);
      positions[i + 2] = z * (1 + noise);
    }
    geometry.attributes.position.needsUpdate = true;

    // Rotation
    targetRotationY = mouseX * 2;
    targetRotationX = mouseY * 2;

    sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.05;
    sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05;
    
    // Constant subtle spin
    sphere.rotation.z += 0.002;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

})();
