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

    // 4. Initial play attempt
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Will be resumed by IntersectionObserver or interaction
      });
    }
  });

  // 5. IntersectionObserver for viewport-based playback (smooth on mobile)
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.muted = true;
          const p = vid.play();
          if (p !== undefined) p.catch(() => {});
        } else {
          // Pause offscreen videos to save memory and battery
          vid.pause();
        }
      });
    }, { threshold: 0.15 });

    videos.forEach(vid => videoObserver.observe(vid));
  }

  // 6. User interaction unlocker (for iOS Low Power Mode and strict browsers)
  const unlockVideos = () => {
    videos.forEach(v => {
      v.muted = true;
      if (v.paused) {
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

// ── Hero Kinetic Word Conveyor (Fixed Slot, Zero Overlap, Seamless Loop) ──
function initHeroWordTicker() {
  const slot = document.getElementById('heroDynamicSlot');
  const track = document.getElementById('heroWordsTrack');
  if (!slot || !track) return;
  if (track.dataset.tickerInit) return;
  track.dataset.tickerInit = 'true';

  const words = track.querySelectorAll('.hero-word');
  if (!words.length) return;

  const totalItems = words.length; // 5 (ZoneUp, neighbors, community, friends, ZoneUp clone)
  const originalWordCount = totalItems - 1; // 4 unique words

  let currentIndex = 0;
  let timerId = null;

  // Measure and set slot width to the longest word so "Get connect with" never shifts
  function updateSlotWidth() {
    let maxWidth = 0;
    words.forEach(w => {
      const wWidth = w.getBoundingClientRect().width;
      if (wWidth > maxWidth) maxWidth = wWidth;
    });
    if (maxWidth > 0) {
      slot.style.width = Math.ceil(maxWidth) + 'px';
    }
  }

  updateSlotWidth();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateSlotWidth);
  }
  window.addEventListener('resize', updateSlotWidth, { passive: true });

  function step() {
    const prevIndex = currentIndex;
    currentIndex++;
    const percent = (currentIndex * 100) / totalItems;
    track.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    track.style.transform = `translate3d(0, -${percent}%, 0)`;

    // Clean up initial page-load entrance animation class after first tick
    if (words[0] && words[0].classList.contains('mp-word')) {
      words[0].classList.remove('mp-word');
      words[0].style.animation = 'none';
    }

    // Update is-current for fade-in-blur transition
    if (words[prevIndex]) words[prevIndex].classList.remove('is-current');
    if (words[currentIndex]) words[currentIndex].classList.add('is-current');

    if (currentIndex === originalWordCount) {
      // Slid up to cloned ZoneUp at index 4; silently jump back to index 0 after transition
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = 'translate3d(0, 0%, 0)';
        if (words[originalWordCount]) words[originalWordCount].classList.remove('is-current');
        if (words[0]) words[0].classList.add('is-current');
        void track.offsetHeight; // Force reflow
      }, 670);
    }

    // ZoneUp gets longer showcase time (3.4s), others get 2.5s
    const isBrand = (currentIndex === 0 || currentIndex === originalWordCount);
    const dwell = isBrand ? 3400 : 2500;
    timerId = setTimeout(step, dwell);
  }

  timerId = setTimeout(step, 3200);

  // Pause when tab is inactive to prevent timer drift, resume cleanly
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timerId);
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(step, 1800);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initHeroWordTicker();
    initInfiniteSliders();
  });
} else {
  initHeroWordTicker();
  initInfiniteSliders();
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