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