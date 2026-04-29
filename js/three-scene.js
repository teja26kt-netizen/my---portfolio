/* ============================================================
   three-scene.js — Interactive Rubik's Cube
   ============================================================ */

(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const parent = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(parent.clientWidth, parent.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, parent.clientWidth / parent.clientHeight, 0.1, 200
  );
  camera.position.set(0, 0, 10);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  // Exact colors matching the image
  const colors = {
    right: 0x3b82f6,  // Blue
    left:  0x3b82f6,   
    top: 0x181a25,    // Very dark gray/black
    bottom: 0x181a25, 
    front: 0xff7b00,  // Orange
    back: 0xff7b00,   
    black: 0x111111   
  };

  const createMaterial = (color) => new THREE.MeshStandardMaterial({ 
    color, 
    roughness: 0.1, 
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

  // Perfectly scaled to fit the 500x500 container
  cubeGroup.scale.set(0.9, 0.9, 0.9);

  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  // Standard 3x3x3 Rubik's cube geometry
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Apply colors exactly as seen from the standard isometric view
        const mats = [
          x === 1 ? materials.right : materials.black,   // Right (+x) is Blue
          x === -1 ? materials.black : materials.black,  // Left (-x) is Hidden
          y === 1 ? materials.top : materials.black,     // Top (+y) is Dark
          y === -1 ? materials.black : materials.black,  // Bottom (-y) is Hidden
          z === 1 ? materials.front : materials.black,   // Front (+z) is Orange
          z === -1 ? materials.black : materials.black   // Back (-z) is Hidden
        ];

        const mesh = new THREE.Mesh(geometry, mats);
        mesh.position.set(x * OFFSET, y * OFFSET, z * OFFSET);
        
        // Exact black borders
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
        mesh.add(line);

        cubeGroup.add(mesh);
      }
    }
  }

  // Interactive Rotation State
  let targetRotationX = Math.PI / 6;    // Slightly tilted to show the dark top face
  let targetRotationY = Math.PI / 3.2;  // Angled heavily towards the blue face (matches right-heavy view in image)
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  // Set initial literal rotation immediately
  cubeGroup.rotation.x = targetRotationX;
  cubeGroup.rotation.y = targetRotationY;

  // Drag interaction
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      targetRotationY += (deltaMove.x * 0.01);
      targetRotationX += (deltaMove.y * 0.01);
    }
    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }, {passive: true});

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };
      targetRotationY += (deltaMove.x * 0.01);
      targetRotationX += (deltaMove.y * 0.01);
      
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, {passive: true});

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    
    // Smooth, restricted breathing animation instead of continuous spin
    // This keeps exactly 3 faces visible and 3 hidden, preventing the cube from spinning completely around
    if(!isDragging) {
       time += 0.01;
       // Sway slightly around the ideal isometric angles
       targetRotationX = (Math.PI / 6) + Math.sin(time * 1.5) * 0.05;
       targetRotationY = (Math.PI / 4) + Math.cos(time * 0.8) * 0.05;
    }

    // Smooth lerp
    cubeGroup.rotation.x += (targetRotationX - cubeGroup.rotation.x) * 0.1;
    cubeGroup.rotation.y += (targetRotationY - cubeGroup.rotation.y) * 0.1;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    camera.aspect = parent.clientWidth / parent.clientHeight;
    camera.updateProjectionMatrix();
  });

})();
