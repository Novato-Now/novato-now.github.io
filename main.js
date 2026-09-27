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

// FAQ accordion from JSON
const faqList = document.getElementById('faqList');

if (faqList) {
  fetch('./faq.json')
    .then(res => res.json())
    .then(faqs => {
      faqs.forEach(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML =
          '<button class="faq-question">' +
          '<span>' + faq.question + '</span>' +
          '<span class="faq-icon">+</span>' +
          '</button>' +
          '<div class="faq-answer">' +
          '<div class="faq-answer-inner">' +
          '<p>' + faq.answer + '</p>' +
          '</div>' +
          '</div>';

        item.querySelector('.faq-question').addEventListener('click', function () {
          const wasOpen = item.classList.contains('open');
          // Close all others
          faqList.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
          // Toggle current
          if (!wasOpen) item.classList.add('open');
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