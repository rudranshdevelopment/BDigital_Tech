/**
 * BDigital Tech - Scroll Choreography, Telemetry Counters & Interactions
 */

(function () {
  'use strict';

  // 1. Lenis Smooth Scroll Setup
  var lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.8
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Metrics Count-Up Animation (Hero & Trust Section)
  function initCounters() {
    var counterEls = document.querySelectorAll('[data-target]');
    if (!counterEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var targetVal = parseFloat(el.getAttribute('data-target'));
          var suffix = el.getAttribute('data-suffix') || '';
          var isDecimal = targetVal % 1 !== 0;
          var duration = 1600;
          var startTime = performance.now();

          function updateNumber(now) {
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            var ease = 1 - Math.pow(1 - progress, 3);
            var currentVal = progress * targetVal;

            el.textContent = (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              el.textContent = (isDecimal ? targetVal.toFixed(1) : targetVal) + suffix;
            }
          }

          requestAnimationFrame(updateNumber);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterEls.forEach(function (el) { observer.observe(el); });
  }

  // 3. Process Timeline Horizontal Line Progress
  function initProcessProgress() {
    var processSection = document.getElementById('process');
    var progressBar = document.querySelector('.horizontal-conduit-progress');
    var stepItems = document.querySelectorAll('.h-step-item');

    if (!processSection || !progressBar) return;

    window.addEventListener('scroll', function () {
      var rect = processSection.getBoundingClientRect();
      var windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
        var totalDist = rect.height + windowHeight * 0.5;
        var scrolled = windowHeight * 0.75 - rect.top;
        var progress = Math.max(0, Math.min(1, scrolled / totalDist));

        progressBar.style.width = Math.max(15, progress * 100) + '%';

        // Highlight active step based on progress
        var activeIndex = Math.min(stepItems.length - 1, Math.floor(progress * stepItems.length));
        stepItems.forEach(function (item, idx) {
          if (idx <= activeIndex) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // 4. Client Logo Carousel Nav Buttons
  function initLogoCarousel() {
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    var track = document.getElementById('logo-track');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }
  }

  // 5. Active Header Navigation Link on Scroll
  function initNavTracking() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 120;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  // 6. Hero Service Ecosystem Conduit Lighting on Hover
  function initHeroEcosystem() {
    var nodes = document.querySelectorAll('.service-node');
    nodes.forEach(function (node) {
      var conduitId = node.getAttribute('data-conduit');
      var conduit = conduitId ? document.getElementById(conduitId) : null;
      if (!conduit) return;

      node.addEventListener('mouseenter', function () {
        conduit.classList.add('active-conduit');
      });
      node.addEventListener('mouseleave', function () {
        conduit.classList.remove('active-conduit');
      });
    });
  }

  // Initialize all after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCounters();
      initProcessProgress();
      initLogoCarousel();
      initNavTracking();
      initHeroEcosystem();
    });
  } else {
    initCounters();
    initProcessProgress();
    initLogoCarousel();
    initNavTracking();
    initHeroEcosystem();
  }

})();

