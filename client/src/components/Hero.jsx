import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { SITE_CONFIG } from '../utils/config';
import { trackWhatsAppLead } from '../utils/api';

export default function Hero() {
  const mountRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('[Three.js] WebGL not supported, using fallback orb');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Core Faceted Crystal Sphere
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x110e2e,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // 2. Wireframe Hologram Shell
    const wireGeo = new THREE.IcosahedronGeometry(4.5, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // 3. Fractured Floating Geometry Shards
    const shardGroup = new THREE.Group();
    const shardCount = 28;
    const shards = [];

    for (let i = 0; i < shardCount; i++) {
      const shardGeo = new THREE.TetrahedronGeometry(Math.random() * 0.45 + 0.25, 0);
      const shardMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x8b5cf6 : 0x22d3ee,
        emissive: i % 3 === 0 ? 0xec4899 : 0x1e1b4b,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.9,
        flatShading: true
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);

      const phi = Math.acos(-1 + (2 * i) / shardCount);
      const theta = Math.sqrt(shardCount * Math.PI) * phi;
      const radius = 6.2 + (Math.random() - 0.5) * 1.5;

      shard.userData = {
        baseRadius: radius,
        phi,
        theta,
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
    const createRing = (radius, tube, color) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      return new THREE.Mesh(geo, mat);
    };

    const ring1 = createRing(7.8, 0.03, 0x8b5cf6);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    masterGroup.add(ring1);

    const ring2 = createRing(9.2, 0.025, 0x22d3ee);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    masterGroup.add(ring2);

    // 5. Starfield Particles (450 sparks)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x22d3ee);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cMag = new THREE.Color(0xec4899);

    for (let p = 0; p < particleCount; p++) {
      const p3 = p * 3;
      const pRadius = 14 + Math.random() * 22;
      const pTheta = Math.random() * Math.PI * 2;
      const pPhi = Math.acos(Math.random() * 2 - 1);

      particlePos[p3] = pRadius * Math.sin(pPhi) * Math.cos(pTheta);
      particlePos[p3 + 1] = pRadius * Math.sin(pPhi) * Math.sin(pTheta);
      particlePos[p3 + 2] = pRadius * Math.cos(pPhi);

      const col = p % 3 === 0 ? cCyan : p % 3 === 1 ? cViolet : cMag;
      particleColors[p3] = col.r;
      particleColors[p3 + 1] = col.g;
      particleColors[p3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circular spark texture
    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 32;
    sparkCanvas.height = 32;
    const sparkCtx = sparkCanvas.getContext('2d');
    const grad = sparkCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(139, 92, 246, 0.8)');
    grad.addColorStop(0.8, 'rgba(34, 211, 238, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sparkCtx.fillStyle = grad;
    sparkCtx.fillRect(0, 0, 32, 32);

    const sparkTexture = new THREE.CanvasTexture(sparkCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: sparkTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Dynamic Cyber Lights
    const ambientLight = new THREE.AmbientLight(0x0f0b24, 2.5);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x22d3ee, 3.5, 50);
    lightCyan.position.set(12, 8, 10);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0x8b5cf6, 4.0, 50);
    lightViolet.position.set(-12, -8, 8);
    scene.add(lightViolet);

    // Mouse Parallax Physics
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let halfX = window.innerWidth / 2;
    let halfY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX - halfX) * 0.0008;
      mouse.targetY = (e.clientY - halfY) * 0.0008;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let scrollProgress = 0;
    const onScroll = () => {
      const heroHeight = container.clientHeight || window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset;
      scrollProgress = Math.min(Math.max(currentScroll / heroHeight, 0), 2.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      halfX = window.innerWidth / 2;
      halfY = window.innerHeight / 2;
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animId;
    let isVisible = true;

    const onVisChange = () => {
      isVisible = !document.hidden;
      if (isVisible) clock.start();
    };
    document.addEventListener('visibilitychange', onVisChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Idle Rotation
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;
      wireMesh.rotation.y -= 0.003;
      wireMesh.rotation.z += 0.002;
      ring1.rotation.z += 0.005;
      ring2.rotation.y += 0.004;

      particleSystem.rotation.y = elapsedTime * 0.015;
      particleSystem.rotation.x = elapsedTime * 0.008;

      // Shard breathing & scroll fracture
      for (let s = 0; s < shards.length; s++) {
        const sh = shards[s];
        const data = sh.userData;
        data.theta += data.speed;
        const wobble = Math.sin(elapsedTime * data.wobbleSpeed + data.wobbleOffset) * 0.6;
        const r = data.baseRadius + wobble + scrollProgress * 4.5;

        sh.position.x = r * Math.sin(data.phi) * Math.cos(data.theta);
        sh.position.y = r * Math.sin(data.phi) * Math.sin(data.theta);
        sh.position.z = r * Math.cos(data.phi);

        sh.rotation.x += data.rotSpeedX;
        sh.rotation.y += data.rotSpeedY;
      }

      lightCyan.position.x = Math.sin(elapsedTime * 0.8) * 14;
      lightCyan.position.z = Math.cos(elapsedTime * 0.8) * 14;
      lightViolet.position.y = Math.cos(elapsedTime * 0.6) * 12;
      lightViolet.position.x = Math.sin(elapsedTime * 0.6) * -12;

      masterGroup.rotation.y = mouse.x * 2.2 + scrollProgress * 1.8;
      masterGroup.rotation.x = mouse.y * 1.8 + scrollProgress * 0.6;
      masterGroup.position.y = -scrollProgress * 3.5;
      masterGroup.scale.setScalar(1 + scrollProgress * 0.35);

      renderer.render(scene, camera);
    };

    animate();

    // Kinetic Typography Split Reveal
    if (headlineRef.current) {
      const words = headlineRef.current.innerText.trim().split(/\s+/);
      headlineRef.current.innerHTML = words
        .map(
          (w) =>
            `<span class="inline-block overflow-hidden"><span class="hero-word inline-block transform translate-y-full opacity-0">${w}&nbsp;</span></span>`
        )
        .join('');

      gsap.to('.hero-word', {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.2
      });
    }

    gsap.from(['#hero-subline', '#hero-cta-group', '#hero-scroll-cue'], {
      y: 30,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.6
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisChange);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleHeroWhatsApp = () => {
    trackWhatsAppLead({
      service: 'Custom Software Architecture',
      triggerLocation: 'hero_cta',
      customMessage: 'Hero Direct WhatsApp Click'
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      
      {/* Three.js 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center">
        {/* WebGL Canvas is injected here */}
      </div>

      {/* Fallback Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-violet-600/30 via-cyan-500/20 to-pink-500/20 blur-3xl pointer-events-none -z-10" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pointer-events-none">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(139,92,246,0.15)] pointer-events-auto" data-cursor-hover>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            Next-Gen Digital Transformation
          </span>
        </div>

        {/* Kinetic Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white mb-6 max-w-4xl"
        >
          We Build Digital Experiences That Scale.
        </h1>

        {/* Sub-headline */}
        <p id="hero-subline" className="text-base sm:text-lg md:text-xl text-gray-300/90 font-normal max-w-2xl leading-relaxed mb-10">
          Architecting enterprise CRM, ERP, HRMS, SaaS platforms, and automated ecosystems engineered for industry leaders.
        </p>

        {/* Action CTAs */}
        <div id="hero-cta-group" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto">
          
          <a
            href="#services-showcase"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
            data-cursor-hover
            data-cursor-magnetic
          >
            <span>Explore 19 Solutions</span>
            <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a
            href={SITE_CONFIG.getWhatsAppUrl("Hi BDigital Tech, I want to discuss building an enterprise platform.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleHeroWhatsApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/50 text-white hover:text-emerald-300 font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group"
            data-cursor-hover
            data-cursor-magnetic
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct WhatsApp Inquiry</span>
            <svg className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

        </div>

      </div>

      {/* Scroll-Cue */}
      <div id="hero-scroll-cue" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-80">
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">Scroll To Explore</span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>

    </section>
  );
}
