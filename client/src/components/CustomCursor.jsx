import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouse = { x: -100, y: -100 };
    let dotPos = { x: -100, y: -100 };
    let ringPos = { x: -100, y: -100 };
    let isHovered = false;
    let isMagnetic = false;
    let magneticTarget = null;
    const magneticStrength = 0.35;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dot.style.opacity === '0' || !dot.style.opacity) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const attachHoverables = () => {
      const hoverables = document.querySelectorAll('a, button, .interactive-card, [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.onmouseenter = () => {
          isHovered = true;
          ring.classList.add('cursor-expanded');
          dot.classList.add('cursor-dot-glow');
          if (el.hasAttribute('data-cursor-magnetic') || el.tagName === 'BUTTON') {
            isMagnetic = true;
            magneticTarget = el;
          }
        };

        el.onmouseleave = () => {
          isHovered = false;
          isMagnetic = false;
          magneticTarget = null;
          ring.classList.remove('cursor-expanded');
          dot.classList.remove('cursor-dot-glow');
          if (el.style) el.style.transform = '';
        };

        el.onmousemove = (e) => {
          if (!isMagnetic || !magneticTarget) return;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * magneticStrength;
          const deltaY = (e.clientY - centerY) * magneticStrength;
          el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        };
      });
    };

    attachHoverables();
    const interval = setInterval(attachHoverables, 1500);

    let animId;
    const render = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.45;
      dotPos.y += (mouse.y - dotPos.y) * 0.45;

      let targetX = mouse.x;
      let targetY = mouse.y;

      if (isMagnetic && magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      }

      ringPos.x += (targetX - ringPos.x) * 0.18;
      ringPos.y += (targetY - ringPos.y) * 0.18;

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
