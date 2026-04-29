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

  // A 3x3 flat array of boxes matching the user's "9 total boxes, 6 visible, 3 hidden"
  const gridPositions = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      gridPositions.push({x, y, z: 0});
    }
  }

  // Hide 3 specific boxes to make it an asymmetrical puzzle piece (indices 0 to 8)
  const hiddenBoxes = [1, 5, 6]; 

  gridPositions.forEach((pos, index) => {
    if (hiddenBoxes.includes(index)) return; // Skip 3 boxes

    const {x, y, z} = pos;
    // Apply coloring: Front orange, back blue, sides dark. 
    // Since it's a flat z=0 slice, front/back are prominent.
    const mats = [
      materials.top,     // Right
      materials.top,     // Left
      materials.top,     // Top
      materials.top,     // Bottom
      materials.front,   // Front (Orange)
      materials.right    // Back (Blue)
    ];

    const mesh = new THREE.Mesh(geometry, mats);
    mesh.position.set(x * OFFSET, y * OFFSET, z * OFFSET);
    
    // Exact black borders
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
    mesh.add(line);

    cubeGroup.add(mesh);
  });

  // Interactive Rotation State
  let targetRotationX = Math.PI / 6;
  let targetRotationY = Math.PI / 4;
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

  function animate() {
    requestAnimationFrame(animate);
    
    // Auto idle rotation if not dragging
    if(!isDragging) {
       targetRotationY += 0.001; 
       targetRotationX += 0.0005;
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
