/**
 * BDigital Tech - Three.js WebGL Interactive Hero Scene
 * Awwwards-grade 3D fractured holographic sphere with orbital particle rings,
 * dynamic cyber lighting, mouse parallax physics, and scroll-scrub choreography.
 */

(function () {
  'use strict';

  // Check if WebGL is supported
  function isWebGLAvailable() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  // Respect prefers-reduced-motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var container = document.getElementById('hero-3d-container');
  var fallbackEl = document.getElementById('hero-fallback-orb');

  if (!container || !isWebGLAvailable() || typeof THREE === 'undefined') {
    if (fallbackEl) fallbackEl.style.display = 'block';
    return;
  }

  // Scene setup
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 24;

  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Group to hold all 3D components for mouse parallax and scroll rotation
  var masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Core Faceted Crystal Sphere (Inner Energy Node)
  var coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
  var coreMat = new THREE.MeshPhysicalMaterial({
    color: 0x110e2e,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.6,
    roughness: 0.15,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
    wireframe: false
  });
  var coreMesh = new THREE.Mesh(coreGeo, coreMat);
  masterGroup.add(coreMesh);

  // 2. Wireframe Hologram Shell (Fractured Structure)
  var wireGeo = new THREE.IcosahedronGeometry(4.5, 2);
  var wireMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });
  var wireMesh = new THREE.Mesh(wireGeo, wireMat);
  masterGroup.add(wireMesh);

  // 3. Fractured Floating Geometry Shards (Surrounding Outer Nodes)
  var shardGroup = new THREE.Group();
  var shardCount = 28;
  var shards = [];

  for (var i = 0; i < shardCount; i++) {
    var shardGeo = new THREE.TetrahedronGeometry(Math.random() * 0.45 + 0.25, 0);
    var shardMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x8b5cf6 : 0x22d3ee,
      emissive: i % 3 === 0 ? 0xec4899 : 0x1e1b4b,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
      flatShading: true
    });
    var shard = new THREE.Mesh(shardGeo, shardMat);

    // Initial random spherical distribution
    var phi = Math.acos(-1 + (2 * i) / shardCount);
    var theta = Math.sqrt(shardCount * Math.PI) * phi;
    var radius = 6.2 + (Math.random() - 0.5) * 1.5;

    shard.userData = {
      baseRadius: radius,
      phi: phi,
      theta: theta,
      speed: (Math.random() * 0.008 + 0.003) * (i % 2 === 0 ? 1 : -1),
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleOffset: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.03,
      rotSpeedY: (Math.random() - 0.5) * 0.03
    };

    shard.position.x = radius * Math.sin(phi) * Math.cos(theta);
    shard.position.y = radius * Math.sin(phi) * Math.sin(theta);
    shard.position.z = radius * Math.cos(phi);

    shardGroup.add(shard);
    shards.push(shard);
  }
  masterGroup.add(shardGroup);

  // 4. Dual Counter-Rotating Orbital Data Rings
  function createOrbitalRing(radius, tubeRadius, color, radialSegs, tubularSegs) {
    var ringGeo = new THREE.TorusGeometry(radius, tubeRadius, radialSegs, tubularSegs);
    var ringMat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    return new THREE.Mesh(ringGeo, ringMat);
  }

  var ring1 = createOrbitalRing(7.8, 0.03, 0x8b5cf6, 8, 120);
  ring1.rotation.x = Math.PI / 3;
  ring1.rotation.y = Math.PI / 6;
  masterGroup.add(ring1);

  var ring2 = createOrbitalRing(9.2, 0.025, 0x22d3ee, 8, 140);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.z = Math.PI / 4;
  masterGroup.add(ring2);

  // 5. Starfield / Floating Data Sparks (450 Particles)
  var particleCount = 450;
  var particleGeo = new THREE.BufferGeometry();
  var particlePos = new Float32Array(particleCount * 3);
  var particleColors = new Float32Array(particleCount * 3);

  var colorCyan = new THREE.Color(0x22d3ee);
  var colorViolet = new THREE.Color(0x8b5cf6);
  var colorMagenta = new THREE.Color(0xec4899);

  for (var p = 0; p < particleCount; p++) {
    var p3 = p * 3;
    var pRadius = 14 + Math.random() * 22;
    var pTheta = Math.random() * Math.PI * 2;
    var pPhi = Math.acos(Math.random() * 2 - 1);

    particlePos[p3] = pRadius * Math.sin(pPhi) * Math.cos(pTheta);
    particlePos[p3 + 1] = pRadius * Math.sin(pPhi) * Math.sin(pTheta);
    particlePos[p3 + 2] = pRadius * Math.cos(pPhi);

    var chosenColor = p % 3 === 0 ? colorCyan : (p % 3 === 1 ? colorViolet : colorMagenta);
    particleColors[p3] = chosenColor.r;
    particleColors[p3 + 1] = chosenColor.g;
    particleColors[p3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  // Circular spark texture
  var sparkCanvas = document.createElement('canvas');
  sparkCanvas.width = 32;
  sparkCanvas.height = 32;
  var sparkCtx = sparkCanvas.getContext('2d');
  var gradient = sparkCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.8)');
  gradient.addColorStop(0.8, 'rgba(34, 211, 238, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sparkCtx.fillStyle = gradient;
  sparkCtx.fillRect(0, 0, 32, 32);

  var sparkTexture = new THREE.CanvasTexture(sparkCanvas);

  var particleMat = new THREE.PointsMaterial({
    size: 0.45,
    map: sparkTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  var particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 6. Dynamic Cyber Lights
  var ambientLight = new THREE.AmbientLight(0x0f0b24, 2.5);
  scene.add(ambientLight);

  var lightCyan = new THREE.PointLight(0x22d3ee, 3.5, 50);
  lightCyan.position.set(12, 8, 10);
  scene.add(lightCyan);

  var lightViolet = new THREE.PointLight(0x8b5cf6, 4.0, 50);
  lightViolet.position.set(-12, -8, 8);
  scene.add(lightViolet);

  var lightMagenta = new THREE.PointLight(0xec4899, 2.5, 40);
  lightMagenta.position.set(0, 14, -6);
  scene.add(lightMagenta);

  // Mouse Parallax Physics
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  function onMouseMove(event) {
    mouse.targetX = (event.clientX - windowHalfX) * 0.0008;
    mouse.targetY = (event.clientY - windowHalfY) * 0.0008;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Scroll Scrubbing Variables
  var scrollProgress = 0;
  window.addEventListener('scroll', function () {
    var heroHeight = container.clientHeight || window.innerHeight;
    var currentScroll = window.scrollY || window.pageYOffset;
    scrollProgress = Math.min(Math.max(currentScroll / heroHeight, 0), 2.5);
  }, { passive: true });

  // Handle Resize
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    var width = container.clientWidth;
    var height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // Animation Loop with Visibility Optimization
  var clock = new THREE.Clock();
  var isVisible = true;

  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
    if (isVisible) clock.start();
  });

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    var delta = clock.getDelta();
    var elapsedTime = clock.getElapsedTime();

    // Smooth lerp mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    if (!prefersReducedMotion) {
      // Idle Core Rotation + mouse tilt
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;

      wireMesh.rotation.y -= 0.003;
      wireMesh.rotation.z += 0.002;

      // Orbit rings
      ring1.rotation.z += 0.005;
      ring2.rotation.y += 0.004;

      // Particle background slow drift
      particleSystem.rotation.y = elapsedTime * 0.015;
      particleSystem.rotation.x = elapsedTime * 0.008;

      // Shards orbit and breathing oscillation
      for (var s = 0; s < shards.length; s++) {
        var shard = shards[s];
        var data = shard.userData;

        data.theta += data.speed;
        var wobble = Math.sin(elapsedTime * data.wobbleSpeed + data.wobbleOffset) * 0.6;
        var r = data.baseRadius + wobble + (scrollProgress * 4.5); // expands on scroll

        shard.position.x = r * Math.sin(data.phi) * Math.cos(data.theta);
        shard.position.y = r * Math.sin(data.phi) * Math.sin(data.theta);
        shard.position.z = r * Math.cos(data.phi);

        shard.rotation.x += data.rotSpeedX;
        shard.rotation.y += data.rotSpeedY;
      }

      // Lights orbital movement
      lightCyan.position.x = Math.sin(elapsedTime * 0.8) * 14;
      lightCyan.position.z = Math.cos(elapsedTime * 0.8) * 14;

      lightViolet.position.y = Math.cos(elapsedTime * 0.6) * 12;
      lightViolet.position.x = Math.sin(elapsedTime * 0.6) * -12;

      // Apply master group orientation with mouse parallax and scroll scrubbing
      masterGroup.rotation.y = mouse.x * 2.2 + (scrollProgress * 1.8);
      masterGroup.rotation.x = mouse.y * 1.8 + (scrollProgress * 0.6);
      masterGroup.position.y = -scrollProgress * 3.5;
      masterGroup.scale.setScalar(1 + scrollProgress * 0.35);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Expose hero scene API for GSAP integration if needed
  window.HERO_3D = {
    masterGroup: masterGroup,
    camera: camera,
    coreMesh: coreMesh
  };
})();
