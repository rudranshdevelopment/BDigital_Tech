/**
 * BDigital Tech - Magnetic Custom Cursor
 * Dual-ring cursor with smooth spring physics, magnetic pull, and interactive states.
 */

(function () {
  'use strict';

  // Disable on touch devices or reduced motion
  var isTouch = window.matchMedia('(pointer: coarse)').matches;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReducedMotion) return;

  var cursorDot = document.getElementById('cursor-dot');
  var cursorRing = document.getElementById('cursor-ring');

  if (!cursorDot || !cursorRing) return;

  var mouse = { x: -100, y: -100 };
  var dotPos = { x: -100, y: -100 };
  var ringPos = { x: -100, y: -100 };

  var isHovered = false;
  var isMagnetic = false;
  var magneticTarget = null;
  var magneticStrength = 0.35;

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (cursorDot.style.opacity === '0' || cursorDot.style.opacity === '') {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  // Attach hover listeners to interactive targets
  function initHoverListeners() {
    var hoverables = document.querySelectorAll('a, button, .interactive-card, [data-cursor-hover]');

    hoverables.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        isHovered = true;
        cursorRing.classList.add('cursor-expanded');
        cursorDot.classList.add('cursor-dot-glow');

        // Check if element has magnetic behavior
        if (el.hasAttribute('data-cursor-magnetic') || el.tagName === 'BUTTON' || el.classList.contains('magnetic-btn')) {
          isMagnetic = true;
          magneticTarget = el;
        }
      });

      el.addEventListener('mouseleave', function () {
        isHovered = false;
        isMagnetic = false;
        magneticTarget = null;
        cursorRing.classList.remove('cursor-expanded');
        cursorDot.classList.remove('cursor-dot-glow');
        if (el.style) {
          el.style.transform = '';
        }
      });

      // Magnetic tilt/pull effect on target element
      el.addEventListener('mousemove', function (e) {
        if (!isMagnetic || !magneticTarget) return;
        var rect = el.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var deltaX = (e.clientX - centerX) * magneticStrength;
        var deltaY = (e.clientY - centerY) * magneticStrength;
        el.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
      });
    });
  }

  // Active / click states
  window.addEventListener('mousedown', function () {
    cursorRing.classList.add('cursor-clicked');
    cursorDot.classList.add('cursor-clicked');
  });

  window.addEventListener('mouseup', function () {
    cursorRing.classList.remove('cursor-clicked');
    cursorDot.classList.remove('cursor-clicked');
  });

  // Animation Loop (High-speed fluid lerp)
  function renderCursor() {
    // Dot follows tightly
    dotPos.x += (mouse.x - dotPos.x) * 0.45;
    dotPos.y += (mouse.y - dotPos.y) * 0.45;

    // Ring lags smoothly for spring feel
    var targetRingX = mouse.x;
    var targetRingY = mouse.y;

    if (isMagnetic && magneticTarget) {
      var rect = magneticTarget.getBoundingClientRect();
      targetRingX = rect.left + rect.width / 2;
      targetRingY = rect.top + rect.height / 2;
    }

    ringPos.x += (targetRingX - ringPos.x) * 0.18;
    ringPos.y += (targetRingY - ringPos.y) * 0.18;

    cursorDot.style.transform = 'translate3d(' + dotPos.x + 'px, ' + dotPos.y + 'px, 0)';
    cursorRing.style.transform = 'translate3d(' + ringPos.x + 'px, ' + ringPos.y + 'px, 0)';

    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoverListeners);
  } else {
    initHoverListeners();
  }

  // Expose re-init for dynamically rendered elements
  window.refreshCursorListeners = initHoverListeners;
})();
