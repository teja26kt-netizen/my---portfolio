/* ============================================================
   three-scene.js — Animated Rubik's Cube
   ============================================================ */

(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 200
  );
  camera.position.set(0, 0, 10);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);
  
  const lTeal = new THREE.PointLight(0x00ffd5, 1, 15);
  lTeal.position.set(-4, -1, 2);
  scene.add(lTeal);

  // Authentic glowing neon colors
  const colors = {
    right: 0xff2050,  // Red
    left: 0xff6a00,   // Orange
    top: 0xffffff,    // White
    bottom: 0xffd500, // Yellow
    front: 0x00e676,  // Green
    back: 0x0088ff,   // Blue
    black: 0x111111   
  };

  const createMaterial = (color) => new THREE.MeshStandardMaterial({ 
    color, 
    roughness: 0.2, 
    metalness: 0.1,
    polygonOffset: true,
    polygonOffsetFactor: 1, 
    polygonOffsetUnits: 1
  });

  const materials = {
    right: createMaterial(colors.right),
    left: createMaterial(colors.left),
    top: createMaterial(colors.top),
    bottom: createMaterial(colors.bottom),
    front: createMaterial(colors.front),
    back: createMaterial(colors.back),
    black: createMaterial(colors.black)
  };

  const CUBE_SIZE = 1;
  const GAP = 0.05;
  const OFFSET = CUBE_SIZE + GAP;

  const cubeGroup = new THREE.Group();
  scene.add(cubeGroup);

  // Make it massive and partially off-screen to match the desired look
  cubeGroup.scale.set(2.2, 2.2, 2.2);

  // Initial rotation to show an interesting angle of the corner
  cubeGroup.rotation.set(Math.PI / 6, -Math.PI / 5, 0);

  // Position it off the right and bottom edges
  if (window.innerWidth >= 768) {
    cubeGroup.position.set(5, -2, 2); 
  } else {
    cubeGroup.position.set(2, -3, 0); 
  }

  const pivot = new THREE.Group();
  cubeGroup.add(pivot);

  const subCubes = [];
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Use a consistent, completely unified colour scheme if they wanted "same colour" everywhere
        // but since they said "solved", keeping the Rubik's setup is technically correct.
        // If they meant truly "monochromatic blue", wait. They said "same colour solved not different colours".
        // Let's stick to the 6 distinct neon colors but "solved" means no scrambling.
        const mats = [
          x === 1 ? materials.right : materials.black,
          x === -1 ? materials.left : materials.black,
          y === 1 ? materials.top : materials.black,
          y === -1 ? materials.bottom : materials.black,
          z === 1 ? materials.front : materials.black,
          z === -1 ? materials.back : materials.black
        ];

        const mesh = new THREE.Mesh(geometry, mats);
        mesh.position.set(x * OFFSET, y * OFFSET, z * OFFSET);
        
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
        mesh.add(line);

        cubeGroup.add(mesh);
        subCubes.push(mesh);
      }
    }
  }

  let isAnimating = false;

  function rotateLayer() {
    // Disabled scrambling to keep the cube "solved"
    return;
  }

  // setTimeout(rotateLayer, 1000); // Disabling scramble

  // Parallax + extremely slow tumbling
  let mouseX = 0, mouseY = 0;
  let targetRotationX = Math.PI / 6;
  let targetRotationY = -Math.PI / 5;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    
    // Very subtle slow tumbling
    targetRotationX += 0.0005;
    targetRotationY += 0.001;
    
    // Apply mouse parallax blending
    cubeGroup.rotation.x = targetRotationX + (mouseY * 0.1);
    cubeGroup.rotation.y = targetRotationY + (mouseX * 0.1);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (window.innerWidth >= 768) {
      cubeGroup.position.set(5, -2, 2); 
    } else {
      cubeGroup.position.set(2, -3, 0); 
    }
  });

})();
