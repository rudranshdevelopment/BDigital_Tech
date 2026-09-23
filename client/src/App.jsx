import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { fetchServices, fetchMetrics } from './utils/api';
import { SITE_CONFIG } from './utils/config';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesTicker from './components/ServicesTicker';
import ServicesShowcase from './components/ServicesShowcase';
import WhyUs from './components/WhyUs';
import ProcessTimeline from './components/ProcessTimeline';
import Industries from './components/Industries';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [services, setServices] = useState(SITE_CONFIG.services);
  const [metrics, setMetrics] = useState(SITE_CONFIG.metrics);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Fetch live data from Express/MongoDB backend
    Promise.all([fetchServices(), fetchMetrics()]).then(([srvs, mtrs]) => {
      if (srvs && srvs.length > 0) setServices(srvs);
      if (mtrs && mtrs.length > 0) setMetrics(mtrs);
    });

    // 2. Initialize Lenis Smooth Scrolling
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false
      });

      lenis.on('scroll', ScrollTrigger.update);

      const updateTicker = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05050A] text-[#F4F4F8] selection:bg-violet-600/40 selection:text-white">
      {/* Preloader with SVG Line-Draw and 0-100% Counter */}
      <Preloader onComplete={() => setIsReady(true)} />

      {/* Magnetic Fluid Custom Cursor */}
      <CustomCursor />

      {/* Ambient Deep-Space Light Cones & Subtle Grid */}
      <div className="ambient-glow-mesh" />
      <div className="grid-matrix-overlay" />

      {/* Sticky Glassmorphism Header with Live DB Status */}
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section with Three.js 3D WebGL Sphere */}
        <Hero />

        {/* Infinite Skewed Services Ticker */}
        <ServicesTicker services={services} />

        {/* Centerpiece: Pinned Horizontal Scroll Gallery (All 19 Services) */}
        <ServicesShowcase services={services} />

        {/* Why BDigital Tech: Metric Counters + Self-Drawing Icons */}
        <WhyUs metrics={metrics} />

        {/* Process Timeline: 5 Phases with Central SVG Drawing Spine */}
        <ProcessTimeline />

        {/* Industries We Serve: 3D Perspective Tilt Grid */}
        <Industries />

        {/* Final CTA: Aurora Mesh + Massive WhatsApp CTA */}
        <FinalCTA />
      </main>

      {/* Minimalist Footer */}
      <Footer />

      {/* Fixed Floating WhatsApp Button (Primary Conversion Driver) */}
      <WhatsAppButton />
    </div>
  );
}
