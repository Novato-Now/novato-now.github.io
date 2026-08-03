const header = document.getElementById('header');
const spacer = document.getElementById('headerSpacer');
const hamburger = document.getElementById('hamburger');
const mobileExpand = document.getElementById('mobileExpand');

// Spacer holds the header's space since it's always fixed
spacer.style.height = header.offsetHeight + 'px';

// Shrink header on scroll
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const heroHeight = hero ? hero.offsetHeight : 0;
  // Shrink only after scrolling past the hero section (minus header height for transition buffer)
  const threshold = heroHeight ? (heroHeight - header.offsetHeight) : (spacer.offsetHeight || 50);

  if (window.scrollY > threshold) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Toggle mobile menu expand
hamburger.addEventListener('click', () => {
  const isOpen = mobileExpand.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  header.classList.toggle('menu-open', isOpen);
});

// Close on link click
mobileExpand.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileExpand.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    header.classList.remove('menu-open');
  });
});



// FAQ accordion logic
const faqList = document.getElementById('faqList');
if (faqList) {
  faqList.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all others
      faqList.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });
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
      watermarkText.style.background = 'radial-gradient(circle 400px at ' + x + 'px ' + y + 'px, rgba(67, 206, 162, 0.55) 0%, rgba(24, 90, 157, 0.3) 25%, rgba(67, 206, 162, 0.1) 50%, rgba(255, 255, 255, 0.06) 70%)'; watermarkText.style.webkitBackgroundClip = 'text';
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

// Parallax scroll effect for Principles Image
const principlesImg = document.querySelector('.principles-img');
const principlesSec = document.querySelector('.principles-section');

if (principlesImg && principlesSec) {
  function handleParallax() {
    if (window.innerWidth <= 768) {
      principlesImg.style.transform = 'none';
      return;
    }
    const rect = principlesSec.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh && rect.bottom > 0) {
      const scrolled = vh - rect.top;
      const totalRange = vh + rect.height;
      const progress = Math.max(0, Math.min(1, scrolled / totalRange));
      const shift = (progress - 0.5) * -120; // translates from 60px to -60px
      principlesImg.style.transform = `translateY(${shift}px)`;
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleParallax);
  }, { passive: true });
  window.addEventListener('resize', handleParallax);
  handleParallax();
}

// Intersection Observer for drawing SVG numbers in Values Section
const valuesSec = document.querySelector('.values-section');
if (valuesSec) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        valuesSec.classList.add('in-view');
        observer.unobserve(entry.target); // trigger animation only once
      }
    });
  }, { threshold: 0.15 });
  observer.observe(valuesSec);
}

// Adjust header theme dynamically when crossing the dark values section boundary
if (header && valuesSec) {
  function adjustHeaderTheme() {
    const headerRect = header.getBoundingClientRect();
    const headerBottom = headerRect.bottom;
    const valuesRect = valuesSec.getBoundingClientRect();

    // If the bottom of the header is within the boundaries of the dark values section
    if (valuesRect.top <= headerBottom && valuesRect.bottom >= headerBottom) {
      header.classList.add('dark-bg');
    } else {
      header.classList.remove('dark-bg');
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(adjustHeaderTheme);
  }, { passive: true });
  window.addEventListener('resize', adjustHeaderTheme);
  adjustHeaderTheme();
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