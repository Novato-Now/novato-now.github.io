const header = document.getElementById('header');
const spacer = document.getElementById('headerSpacer');
const hamburger = document.getElementById('hamburger');
const mobileExpand = document.getElementById('mobileExpand');

// Spacer holds the header's space on content pages, but hero starts at top: 0
const heroSection = document.getElementById('hero') || document.querySelector('.hero') || document.querySelector('.pg-hero');
if (spacer) {
  if (heroSection) {
    spacer.style.height = '0px';
  } else if (header) {
    spacer.style.height = header.offsetHeight + 'px';
  }
}

// Fixed header scroll effect (frosted glass on scroll)
function updateHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(updateHeaderScroll);
}, { passive: true });
window.addEventListener('resize', updateHeaderScroll, { passive: true });
updateHeaderScroll();

// Toggle mobile menu expand
if (hamburger && mobileExpand) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileExpand.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileExpand.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileExpand.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ accordion from JSON (Motion-Primitives AccordionVariant)
const faqList = document.getElementById('faqList');

if (faqList) {
  fetch('./faq.json')
    .then(res => res.json())
    .then(faqs => {
      faqs.forEach(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML =
          '<button class="faq-question" aria-expanded="false">' +
          '<div class="faq-question-wrap">' +
          '<svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m9 18 6-6-6-6"/>' +
          '</svg>' +
          '<span class="faq-question-text">' + faq.question + '</span>' +
          '</div>' +
          '</button>' +
          '<div class="faq-answer">' +
          '<div class="faq-answer-inner origin-left">' +
          '<p class="faq-answer-text">' + faq.answer + '</p>' +
          '</div>' +
          '</div>';

        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', function () {
          const wasOpen = item.classList.contains('open');
          // Close all others
          faqList.querySelectorAll('.faq-item.open').forEach(el => {
            el.classList.remove('open');
            const b = el.querySelector('.faq-question');
            if (b) b.setAttribute('aria-expanded', 'false');
          });
          // Toggle current
          if (!wasOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
          } else {
            btn.setAttribute('aria-expanded', 'false');
          }
        });

        faqList.appendChild(item);
      });
    });
}


// Parallax scroll effect for Footer Banner Image
const footerBannerImg = document.querySelector('.footer-banner-img');
const footerBannerSec = document.querySelector('.footer-banner-section');

if (footerBannerImg && footerBannerSec) {
  function handleFooterBannerParallax() {
    const rect = footerBannerSec.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh && rect.bottom > 0) {
      const scrolled = vh - rect.top;
      const totalRange = vh + rect.height;
      const progress = Math.max(0, Math.min(1, scrolled / totalRange));
      const shift = (progress - 0.5) * -120; // translates from 60px to -60px
      footerBannerImg.style.transform = `translateY(${shift}px)`;
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleFooterBannerParallax);
  }, { passive: true });
  window.addEventListener('resize', handleFooterBannerParallax);
  handleFooterBannerParallax();
}


// Footer watermark glow on hover (desktop only)
const footerWatermark = document.getElementById('footerWatermark');
const watermarkText = footerWatermark ? footerWatermark.querySelector('.watermark-text') : null;

if (footerWatermark && watermarkText) {
  footerWatermark.addEventListener('mouseenter', function () {
    if (window.innerWidth > 768) {
      // glow will be set on mousemove
    }
  });

  footerWatermark.addEventListener('mousemove', function (e) {
    if (window.innerWidth > 768) {
      var rect = footerWatermark.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      watermarkText.style.background = 'radial-gradient(circle 400px at ' + x + 'px ' + y + 'px, rgba(67, 206, 162, 0.55) 0%, rgba(24, 90, 157, 0.3) 25%, rgba(67, 206, 162, 0.1) 50%, rgba(255, 255, 255, 0.06) 70%)';
      watermarkText.style.webkitBackgroundClip = 'text';
      watermarkText.style.backgroundClip = 'text';
    }
  });

  footerWatermark.addEventListener('mouseleave', function () {
    if (window.innerWidth > 768) {
      watermarkText.style.background = 'rgba(255, 255, 255, 0.06)';
      watermarkText.style.webkitBackgroundClip = 'text';
      watermarkText.style.backgroundClip = 'text';
    }
  });
}


const appleStoreUrl =
  "https://apps.apple.com/in/app/zoneup/id6744461293";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.zoneup12345.zoneup";

function getStoreUrl() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  const platform = navigator.platform || '';
  const uaDataPlatform = (navigator.userAgentData && navigator.userAgentData.platform) || '';

  const isIOS = /iPad|iPhone|iPod/i.test(userAgent) || /iPad|iPhone|iPod/i.test(platform) || /iOS/i.test(uaDataPlatform);
  const isMac = /Macintosh|Mac OS X/i.test(userAgent) || /Mac/i.test(platform) || /Mac OS X/i.test(uaDataPlatform);
  const isAndroid = /Android/i.test(userAgent) || /Android/i.test(uaDataPlatform);
  const isWindows = /Windows NT/i.test(userAgent) || /^Win/i.test(platform) || /Windows/i.test(uaDataPlatform);

  if (isIOS || isMac) return appleStoreUrl;
  return playStoreUrl;
}

document.querySelectorAll('[data-store-cta]').forEach(link => {
  const storeUrl = getStoreUrl();
  link.href = storeUrl;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

// ==========================================================================
// Robust Autoplay & Looping Controller for HTML5 Videos
// Ensures seamless muted autoplay, hides play buttons, and loops infinitely
// ==========================================================================
function setupAutoplayVideos() {
  const videos = document.querySelectorAll('video');
  if (!videos.length) return;

  videos.forEach(video => {
    // 1. Force muted properties in DOM and HTML attributes
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    video.setAttribute('loop', '');
    video.setAttribute('autoplay', '');
    video.removeAttribute('controls');

    // 2. Loop fallback guarantee
    video.addEventListener('ended', function () {
      video.currentTime = 0;
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    });

    // 3. Prevent video pauses on click/tap
    video.addEventListener('click', (e) => {
      e.preventDefault();
      if (video.paused) {
        video.play().catch(() => {});
      }
    });

    // 4. Initial play attempt (only for above-the-fold hero video)
    if (video.classList.contains('hero-video')) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  });

  // 5. IntersectionObserver for viewport-based playback (smooth 60/120fps scrolling)
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.muted = true;
          if (vid.preload === 'none') {
            vid.preload = 'metadata';
          }
          const p = vid.play();
          if (p !== undefined) p.catch(() => {});
        } else {
          // Pause offscreen videos to free GPU hardware decoder, memory and CPU
          if (!vid.classList.contains('hero-video') || window.scrollY > (window.innerHeight || 800)) {
            vid.pause();
          }
        }
      });
    }, { rootMargin: '250px 0px', threshold: 0.1 });

    videos.forEach(vid => videoObserver.observe(vid));
  }

  // 6. User interaction unlocker (for iOS Low Power Mode and strict browsers)
  // Only resumes videos that are currently in or near viewport
  const unlockVideos = () => {
    videos.forEach(v => {
      v.muted = true;
      const rect = v.getBoundingClientRect();
      const inView = rect.top < window.innerHeight + 250 && rect.bottom > -250;
      if (inView && v.paused) {
        v.play().catch(() => {});
      }
    });
  };

  ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockVideos, { once: true, passive: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAutoplayVideos);
} else {
  setupAutoplayVideos();
}

// ── Motion-Primitives TextLoop (Custom 3D Spring Variants Transition) ──
function initHeroWordTicker() {
  const slot = document.getElementById('heroDynamicSlot');
  if (!slot) return;
  if (slot.dataset.tickerInit) return;
  slot.dataset.tickerInit = 'true';

  const words = Array.from(slot.querySelectorAll('.hero-word'));
  if (!words.length) return;

  let currentIndex = 0;
  let timerId = null;
  let isAnimating = false;

  // Clean up initial page-load entrance animation class after entrance finishes
  if (words[0] && words[0].classList.contains('mp-word')) {
    words[0].addEventListener('animationend', () => {
      words[0].classList.remove('mp-word');
      words[0].style.animation = 'none';
    }, { once: true });
    setTimeout(() => {
      if (words[0] && words[0].classList.contains('mp-word')) {
        words[0].classList.remove('mp-word');
        words[0].style.animation = 'none';
      }
    }, 1500);
  }

  // Ensure initial states are applied: word 0 active, others waiting at initial
  words.forEach((w, i) => {
    if (i === 0) {
      w.classList.add('is-animate');
      w.classList.remove('is-initial', 'is-exit');
    } else {
      w.classList.add('is-initial');
      w.classList.remove('is-animate', 'is-exit');
    }
  });

  // Measure and set slot width to the longest word so "Get connect with" never shifts
  function updateSlotWidth() {
    let maxWidth = 0;
    words.forEach(w => {
      // offsetWidth or scrollWidth measures the layout box independent of 3D rotation
      const wWidth = w.offsetWidth || w.scrollWidth || w.getBoundingClientRect().width;
      if (wWidth > maxWidth) maxWidth = wWidth;
    });
    if (maxWidth > 0) {
      slot.style.width = Math.ceil(maxWidth + 4) + 'px';
    }
  }

  updateSlotWidth();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateSlotWidth);
  }
  window.addEventListener('resize', updateSlotWidth, { passive: true });

  function step() {
    if (isAnimating) return;
    isAnimating = true;

    const prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % words.length;

    const prevWord = words[prevIndex];
    const nextWord = words[currentIndex];

    // Clean up entrance class if still present
    if (prevWord && prevWord.classList.contains('mp-word')) {
      prevWord.classList.remove('mp-word');
      prevWord.style.animation = 'none';
    }

    // 1. Reset nextWord to initial (y: 20, rotateX: 90, opacity: 0, blur: 4px) with no transition
    nextWord.classList.remove('is-animate', 'is-exit');
    nextWord.classList.add('is-initial');

    // Force layout reflow so the browser commits the initial state
    void nextWord.offsetHeight;

    // 2. Trigger concurrent 3D flip:
    // Prev word: animate -> exit (y: -20, rotateX: -90, opacity: 0, blur: 4px)
    prevWord.classList.remove('is-initial', 'is-animate');
    prevWord.classList.add('is-exit');

    // Next word: initial -> animate (y: 0, rotateX: 0, opacity: 1, blur: 0px)
    nextWord.classList.remove('is-initial');
    nextWord.classList.add('is-animate');

    // 3. Reset the exited word back to initial state after transition finishes (660ms)
    setTimeout(() => {
      if (prevWord && prevWord.classList.contains('is-exit')) {
        prevWord.classList.remove('is-exit');
        prevWord.classList.add('is-initial');
      }
      isAnimating = false;
    }, 660);

    // ZoneUp gets longer showcase time (3.2s), others get 2.4s
    const dwell = (currentIndex === 0) ? 3200 : 2400;
    clearTimeout(timerId);
    timerId = setTimeout(step, dwell);
  }

  timerId = setTimeout(step, 3000);

  // Pause when tab is inactive to prevent timer drift, resume cleanly
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timerId);
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(step, 1600);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initHeroWordTicker();
    initInfiniteSliders();
    initTextScramble();
  });
} else {
  initHeroWordTicker();
  initInfiniteSliders();
  initTextScramble();
}

// ==========================================================================
// Motion-Primitives TextScramble Component (Coming soon....)
// duration={1.2}, characterSet='. '
// ==========================================================================
function initTextScramble() {
  const el = document.getElementById('comingSoonScramble');
  if (!el) return;
  if (el.dataset.scrambleInit) return;
  el.dataset.scrambleInit = 'true';

  const text = el.dataset.text || 'New features coming soon....';
  const duration = 1.2;
  const speed = 0.04;
  const characterSet = '. ';
  const steps = Math.round(duration / speed);
  const dwell = 1800;

  let timer = null;
  let loopTimeout = null;
  let isAnimating = false;

  function scramble() {
    if (isAnimating) return;
    isAnimating = true;

    let step = 0;
    clearInterval(timer);

    timer = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      el.textContent = scrambled;
      step++;

      if (step > steps) {
        clearInterval(timer);
        el.textContent = text;
        isAnimating = false;
        loopTimeout = setTimeout(scramble, dwell);
      }
    }, speed * 1000);
  }

  // Initial animation start
  scramble();

  // Pause on hidden tab, resume on return
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
      clearTimeout(loopTimeout);
      isAnimating = false;
      el.textContent = text;
    } else {
      clearTimeout(loopTimeout);
      loopTimeout = setTimeout(scramble, 600);
    }
  });
}


// ==========================================================================
// Motion-Primitives InfiniteSlider Component (speedOnHover={20} gap={24})
// ==========================================================================
function initInfiniteSliders() {
  const containers = document.querySelectorAll('.infinite-slider-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const track = container.querySelector('.infinite-slider-track');
    const group = container.querySelector('.infinite-slider-group');
    if (!track || !group) return;

    const normalSpeed = parseFloat(container.dataset.speed) || 85;
    const speedOnHover = parseFloat(container.dataset.speedOnHover) || 20;
    const gap = parseFloat(container.dataset.gap) || 24;

    let currentSpeed = normalSpeed;
    let targetSpeed = normalSpeed;
    let position = 0;
    let lastTimestamp = null;
    let isDragging = false;
    let startX = 0;
    let groupWidth = 0;

    function measure() {
      groupWidth = group.offsetWidth + gap;
    }

    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('load', measure, { passive: true });

    const images = container.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', measure, { once: true });
      }
    });

    // Motion-Primitives speedOnHover: smoothly glides from cruising speed to 20px/s on hover
    container.addEventListener('mouseenter', () => {
      targetSpeed = speedOnHover;
    });

    container.addEventListener('mouseleave', () => {
      targetSpeed = normalSpeed;
    });

    // Touch & pointer drag scrub
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      try {
        container.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      startX = e.clientX;
      position += deltaX;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    // Smooth tab visibility resume
    document.addEventListener('visibilitychange', () => {
      lastTimestamp = null;
    });

    function tick(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      if (!isDragging) {
        // Smooth exponential lerp deceleration/acceleration
        const lerpFactor = 0.08;
        currentSpeed += (targetSpeed - currentSpeed) * lerpFactor;
        position -= currentSpeed * delta;
      }

      if (groupWidth > 0) {
        while (position <= -groupWidth) {
          position += groupWidth;
        }
        while (position > 0) {
          position -= groupWidth;
        }
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

// ============================================================================
// Motion-Primitives Tilt Animation for "ZoneUp is where people stay real"
// Settings: rotationFactor = 8, isReverse = true, perspective = 1000px
// ============================================================================
(function initFeaturesTilt() {
  const cards = document.querySelectorAll('.features-grid .feature-item');
  if (!cards.length) return;

  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isCoarsePointer || prefersReduced) return;

  const ROTATION_FACTOR = 8;
  const IS_REVERSE = true;
  const PERSPECTIVE = 1000;
  const SPRING_DAMPING = 0.12;

  cards.forEach(card => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;
    let isHovered = false;

    function tick() {
      currentX += (targetX - currentX) * SPRING_DAMPING;
      currentY += (targetY - currentY) * SPRING_DAMPING;

      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;

      if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
        card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    function onPointerMove(e) {
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPos = mouseX / rect.width - 0.5;
      const yPos = mouseY / rect.height - 0.5;

      targetX = IS_REVERSE ? -yPos * 2 * ROTATION_FACTOR : yPos * 2 * ROTATION_FACTOR;
      targetY = IS_REVERSE ? xPos * 2 * ROTATION_FACTOR : -xPos * 2 * ROTATION_FACTOR;

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onPointerEnter() {
      isHovered = true;
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onPointerLeave() {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }

    card.addEventListener('pointerenter', onPointerEnter);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerleave', onPointerLeave);
  });
})();