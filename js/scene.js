/**
 * BDigital Tech - Cinematic 3D Photorealistic Earth & Galaxy Universe
 * Features:
 * - High-resolution Earth with realistic Day/Night terminator blending & ocean specular
 * - Independent rotating atmospheric clouds layer
 * - GLSL Fresnel atmospheric rim scattering shader
 * - Secondary moon, floating 3D asteroid debris, elliptical orbital splines with pulse particles
 * - Multi-layer deep space parallax starfield
 * - Damped mouse inertia physics
 * - Scroll-linked cinematic camera flight & Earth rotation
 */

(function () {
  'use strict';

  var container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene & Camera
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02040A, 0.015);

  var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 15);

  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // Cinematic Lighting
  var sunPosition = new THREE.Vector3(11, 10, 5).normalize();
  var sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
  sunLight.position.copy(sunPosition).multiplyScalar(20);
  scene.add(sunLight);

  var ambientLight = new THREE.AmbientLight(0x060912, 0.5);
  scene.add(ambientLight);

  // Texture Loader
  var textureLoader = new THREE.TextureLoader();
  var earthDayTex = textureLoader.load('assets/textures/earth_day.jpg');
  var earthNightTex = textureLoader.load('assets/textures/earth_night.png');
  var earthCloudsTex = textureLoader.load('assets/textures/earth_clouds.png');
  var moonTex = textureLoader.load('assets/textures/moon.jpg');

  // Primary Earth System Group
  var earthSystem = new THREE.Group();
  earthSystem.position.set(3.6, 0.55, 0); // Positioned high-right to frame HUD deck
  scene.add(earthSystem);

  // 1. Earth Body (Custom Day / Night / Specular GLSL Shader)
  var earthRadius = 4.8;
  var earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);

  var earthVertexShader = [
    'varying vec2 vUv;',
    'varying vec3 vNormal;',
    'varying vec3 vPosition;',
    'void main() {',
    '  vUv = uv;',
    '  vNormal = normalize(normalMatrix * normal);',
    '  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var earthFragmentShader = [
    'uniform sampler2D dayMap;',
    'uniform sampler2D nightMap;',
    'uniform vec3 sunDirection;',
    'varying vec2 vUv;',
    'varying vec3 vNormal;',
    'varying vec3 vPosition;',
    'void main() {',
    '  vec3 normal = normalize(vNormal);',
    '  vec3 lightDir = normalize(sunDirection);',
    '  float nDotL = dot(normal, lightDir);',
    '  vec4 dayColor = texture2D(dayMap, vUv);',
    '  vec4 nightColor = texture2D(nightMap, vUv);',
    '  float dayWeight = smoothstep(-0.16, 0.24, nDotL);',
    '  float nightWeight = 1.0 - dayWeight;',
    '  vec3 viewDir = normalize(-vPosition);',
    '  vec3 halfVec = normalize(lightDir + viewDir);',
    '  float spec = pow(max(dot(normal, halfVec), 0.0), 32.0) * (1.0 - dayColor.g) * 0.8 * dayWeight;',
    '  vec3 finalColor = dayColor.rgb * (max(nDotL, 0.0) * 1.45 + 0.03) + nightColor.rgb * nightWeight * 2.3 + vec3(spec);',
    '  gl_FragColor = vec4(finalColor, 1.0);',
    '}'
  ].join('\n');

  var earthMat = new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: earthDayTex },
      nightMap: { value: earthNightTex },
      sunDirection: { value: sunPosition }
    },
    vertexShader: earthVertexShader,
    fragmentShader: earthFragmentShader
  });

  var earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.rotation.y = 2.45;
  earthMesh.rotation.x = 0.24;
  earthSystem.add(earthMesh);

  // 2. Atmospheric Clouds Layer
  var cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.012, 64, 64);
  var cloudsMat = new THREE.MeshStandardMaterial({
    map: earthCloudsTex,
    transparent: true,
    opacity: 0.46,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  var cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  cloudsMesh.rotation.y = 2.45;
  cloudsMesh.rotation.x = 0.24;
  earthSystem.add(cloudsMesh);

  // 3. Cinematic Atmospheric Fresnel Rim Halo
  var atmosGeo = new THREE.SphereGeometry(earthRadius * 1.055, 64, 64);
  var atmosVertexShader = [
    'varying vec3 vNormal;',
    'varying vec3 vPosition;',
    'void main() {',
    '  vNormal = normalize(normalMatrix * normal);',
    '  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var atmosFragmentShader = [
    'uniform vec3 sunDirection;',
    'varying vec3 vNormal;',
    'varying vec3 vPosition;',
    'void main() {',
    '  vec3 viewDir = normalize(-vPosition);',
    '  vec3 normal = normalize(vNormal);',
    '  vec3 lightDir = normalize(sunDirection);',
    '  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);',
    '  float sunFacing = max(dot(normal, lightDir) + 0.38, 0.0);',
    '  vec3 atmosColor = mix(vec3(0.18, 0.58, 1.0), vec3(0.45, 0.95, 0.95), fresnel * 0.85);',
    '  gl_FragColor = vec4(atmosColor, fresnel * sunFacing * 1.4);',
    '}'
  ].join('\n');

  var atmosMat = new THREE.ShaderMaterial({
    uniforms: {
      sunDirection: { value: sunPosition }
    },
    vertexShader: atmosVertexShader,
    fragmentShader: atmosFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  });
  var atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  earthSystem.add(atmosMesh);

  // 4. Secondary Celestial Moon (At bottom edge of Earth like reference)
  var moonGeo = new THREE.SphereGeometry(0.72, 32, 32);
  var moonMat = new THREE.MeshStandardMaterial({
    map: moonTex,
    roughness: 0.85,
    metalness: 0.1
  });
  var moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonMesh.position.set(1.2, -3.4, 2.6);
  earthSystem.add(moonMesh);

  // 4b. Upper-Left Smaller Celestial Body (Matching reference ~10 o'clock position)
  var smallMoonGeo = new THREE.SphereGeometry(0.42, 32, 32);
  var smallMoonMesh = new THREE.Mesh(smallMoonGeo, moonMat);
  smallMoonMesh.position.set(-2.4, 2.6, -1.8);
  earthSystem.add(smallMoonMesh);

  // 5. Scientific Elliptical Orbital Paths
  var orbitGroup = new THREE.Group();
  earthSystem.add(orbitGroup);

  function createOrbit(a, b, tiltX, tiltY, color, opacity) {
    var points = [];
    for (var i = 0; i <= 128; i++) {
      var theta = (i / 128) * Math.PI * 2;
      var x = a * Math.cos(theta);
      var y = b * Math.sin(theta);
      points.push(new THREE.Vector3(x, y, 0));
    }
    var geo = new THREE.BufferGeometry().setFromPoints(points);
    var mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      depthWrite: false
    });
    var line = new THREE.Line(geo, mat);
    line.rotation.x = tiltX;
    line.rotation.y = tiltY;
    orbitGroup.add(line);
    return line;
  }

  createOrbit(7.2, 6.2, Math.PI / 3.4, Math.PI / 5.2, 0x35D6E8, 0.28);
  createOrbit(8.6, 7.8, Math.PI / 2.6, -Math.PI / 6.0, 0x5B7CFF, 0.22);
  createOrbit(9.8, 9.0, Math.PI / 4.0, Math.PI / 3.8, 0x9AA3B5, 0.15);

  // Orbital Traveling Pulse Particles
  var pulseCount = 3;
  var pulseParticles = [];
  var pulseMat = new THREE.MeshBasicMaterial({ color: 0x35D6E8 });
  for (var p = 0; p < pulseCount; p++) {
    var pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), pulseMat);
    orbitGroup.add(pMesh);
    pulseParticles.push({
      mesh: pMesh,
      radiusA: 7.2 + p * 1.3,
      radiusB: 6.2 + p * 1.3,
      speed: 0.18 + p * 0.06,
      angle: p * (Math.PI * 2 / pulseCount),
      tiltX: Math.PI / 3.4 + p * 0.12,
      tiltY: Math.PI / 5.2 - p * 0.15
    });
  }

  // 6. Floating 3D Asteroids / Space Debris
  var asteroidGroup = new THREE.Group();
  earthSystem.add(asteroidGroup);

  var asteroidMat = new THREE.MeshStandardMaterial({
    color: 0x2A3142,
    roughness: 0.95,
    metalness: 0.15,
    flatShading: true
  });

  var asteroidList = [];
  for (var k = 0; k < 18; k++) {
    var aRadius = 0.12 + Math.random() * 0.35;
    var aGeo = new THREE.DodecahedronGeometry(aRadius, 1);

    // Deform vertices for natural jagged rock shape
    var posAttr = aGeo.attributes.position;
    for (var v = 0; v < posAttr.count; v++) {
      var vx = posAttr.getX(v) * (0.8 + Math.random() * 0.4);
      var vy = posAttr.getY(v) * (0.8 + Math.random() * 0.4);
      var vz = posAttr.getZ(v) * (0.8 + Math.random() * 0.4);
      posAttr.setXYZ(v, vx, vy, vz);
    }
    aGeo.computeVertexNormals();

    var aMesh = new THREE.Mesh(aGeo, asteroidMat);
    var dist = 6.8 + Math.random() * 6.5;
    var phi = Math.random() * Math.PI * 2;
    var theta = (Math.random() - 0.5) * Math.PI * 0.8;

    aMesh.position.set(
      dist * Math.cos(phi) * Math.cos(theta),
      dist * Math.sin(theta),
      dist * Math.sin(phi) * Math.cos(theta)
    );

    asteroidGroup.add(aMesh);
    asteroidList.push({
      mesh: aMesh,
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.02
    });
  }

  // 7. Multi-Layer Deep Space Parallax Starfield
  function createStarLayer(count, size, minR, maxR, baseColor, opacity) {
    var geo = new THREE.BufferGeometry();
    var positions = [];
    var colors = [];
    var col = new THREE.Color(baseColor);

    for (var s = 0; s < count; s++) {
      var r = minR + Math.random() * (maxR - minR);
      var u = Math.random();
      var v = Math.random();
      var theta = u * 2.0 * Math.PI;
      var phi = Math.acos(2.0 * v - 1.0);
      var sinPhi = Math.sin(phi);

      positions.push(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta),
        r * Math.cos(phi)
      );

      var tint = 0.85 + Math.random() * 0.3;
      colors.push(col.r * tint, col.g * tint, col.b * tint);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Circle texture
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(8, 8, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    var mat = new THREE.PointsMaterial({
      size: size,
      map: new THREE.CanvasTexture(canvas),
      vertexColors: true,
      transparent: true,
      opacity: opacity,
      depthWrite: false
    });

    var points = new THREE.Points(geo, mat);
    scene.add(points);
    return points;
  }

  var starsLayerFar = createStarLayer(1800, 0.22, 60, 160, 0x88AAFF, 0.45);
  var starsLayerMid = createStarLayer(700, 0.38, 40, 100, 0xDDEEFF, 0.65);
  var starsLayerNear = createStarLayer(140, 0.55, 20, 60, 0x35D6E8, 0.85);

  // Mouse Physics & Parallax Damping
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', function (e) {
    mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.00035;
    mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.00035;
  }, { passive: true });

  // Scroll Progress Tracking
  var scrollProgress = 0;
  function onScroll() {
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollProgress = window.scrollY / maxScroll;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Handle Resize & Device Adaptability
  function onResize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    if (w < 768) {
      earthSystem.position.set(0, 1.2, -4);
      earthSystem.scale.setScalar(0.68);
    } else if (w < 1100) {
      earthSystem.position.set(2.4, 0.2, 0);
      earthSystem.scale.setScalar(0.85);
    } else {
      earthSystem.position.set(3.4, 0.2, 0);
      earthSystem.scale.setScalar(1.0);
    }
  }
  window.addEventListener('resize', onResize);
  onResize();

  // Animation Loop (Smooth 60fps)
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

    // Damped mouse movement
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // 1. Natural Earth & Clouds Rotation
    earthMesh.rotation.y += delta * 0.035;
    cloudsMesh.rotation.y += delta * 0.045; // Clouds drift slightly faster

    // 2. Moon Orbit
    var moonAngle = elapsedTime * 0.08;
    moonMesh.position.x = -6.2 * Math.cos(moonAngle);
    moonMesh.position.z = -4.5 + 2.5 * Math.sin(moonAngle);
    moonMesh.rotation.y += delta * 0.02;

    // 3. Asteroids Rotation & Drift
    for (var a = 0; a < asteroidList.length; a++) {
      asteroidList[a].mesh.rotation.x += asteroidList[a].rotX;
      asteroidList[a].mesh.rotation.y += asteroidList[a].rotY;
    }

    // 4. Pulse Particles along Orbits
    for (var p = 0; p < pulseParticles.length; p++) {
      var item = pulseParticles[p];
      item.angle += delta * item.speed;
      var px = item.radiusA * Math.cos(item.angle);
      var py = item.radiusB * Math.sin(item.angle);

      // Rotate point into orbit plane
      var v = new THREE.Vector3(px, py, 0);
      v.applyAxisAngle(new THREE.Vector3(1, 0, 0), item.tiltX);
      v.applyAxisAngle(new THREE.Vector3(0, 1, 0), item.tiltY);
      item.mesh.position.copy(v);
    }

    // 5. Interactive Mouse Physics on Earth Orientation
    earthSystem.rotation.y = mouse.x * 1.8 + (scrollProgress * 2.2);
    earthSystem.rotation.x = -mouse.y * 1.8 - (scrollProgress * 0.4);

    // 6. Scroll-Linked Cinematic Camera Flight
    // As user scrolls: camera smoothly pulls back and shifts composition
    var baseZ = window.innerWidth < 768 ? 19 : 15;
    camera.position.z = baseZ + (scrollProgress * 12.0);
    camera.position.y = -(scrollProgress * 5.0) + (mouse.y * 1.2);
    camera.position.x = -(scrollProgress * 3.5) + (mouse.x * 1.5);
    camera.lookAt(earthSystem.position.x * 0.3, earthSystem.position.y * 0.3, 0);

    // Starfield Parallax
    starsLayerFar.rotation.y = elapsedTime * 0.003 + mouse.x * 0.2;
    starsLayerMid.rotation.y = elapsedTime * 0.006 + mouse.x * 0.5;
    starsLayerNear.rotation.y = elapsedTime * 0.01 + mouse.x * 0.8;

    renderer.render(scene, camera);
  }

  animate();
})();
