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

// Footer watermark glow on hover removed because new layout uses static image-masked watermark


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

// Intersection Observer for drawing SVG circles and numbers in Approach and Values Sections
const animatedSections = document.querySelectorAll('.approach-section, .values-section');
if (animatedSections.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // trigger animation only once
      }
    });
  }, { threshold: 0.15 });
  animatedSections.forEach(sec => observer.observe(sec));
}

// Adjust header theme dynamically when crossing dark section boundaries
const darkSections = document.querySelectorAll('.values-section, .download-cta');
if (header && darkSections.length > 0) {
  function adjustHeaderTheme() {
    const headerRect = header.getBoundingClientRect();
    const headerBottom = headerRect.bottom;
    
    let isOverDark = false;
    darkSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= headerBottom && rect.bottom >= headerBottom) {
        isOverDark = true;
      }
    });

    if (isOverDark) {
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

/* ═════════════════════════════════════════════════════════════════════════════
   ── Nearby Neighbors Sample Posts Filter Logic ──
   ═════════════════════════════════════════════════════════════════════════════ */

const postFilterTabs = document.getElementById('postFilterTabs');
const postsFeedGrid = document.getElementById('postsFeedGrid');

if (postFilterTabs && postsFeedGrid) {
  const tabs = postFilterTabs.querySelectorAll('.filter-tab');
  const postCards = postsFeedGrid.querySelectorAll('.post-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const selectedCategory = tab.getAttribute('data-category');

      // Filter post cards with subtle opacity transition
      postCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ═════════════════════════════════════════════════════════════════════════════
   ── Hinge-Inspired Swipable Card Deck Engine ──
   ═════════════════════════════════════════════════════════════════════════════ */

const hingeDeck = document.getElementById('hingeCardDeck');
if (hingeDeck) {
  const cards = Array.from(hingeDeck.querySelectorAll('.hinge-feed-card'));
  const totalCards = cards.length;
  let currentIndex = 0;
  let isAnimating = false;

  const deckCounterText = document.getElementById('deckCounterText');
  const channelPills = document.querySelectorAll('.channel-pill');
  const btnPass = document.getElementById('btnPassCard');
  const btnLike = document.getElementById('btnLikeCard');

  function updateDeckState() {
    cards.forEach((card, i) => {
      card.classList.remove('active-card', 'next-card', 'next-card-2', 'hidden-card', 'card-exit-left', 'card-exit-right', 'swiping-left', 'swiping-right');
      card.style.removeProperty('--swipe-x');
      card.style.removeProperty('--swipe-y');

      const relativePos = (i - currentIndex + totalCards) % totalCards;

      if (relativePos === 0) {
        card.classList.add('active-card');
      } else if (relativePos === 1) {
        card.classList.add('next-card');
      } else if (relativePos === 2) {
        card.classList.add('next-card-2');
      } else {
        card.classList.add('hidden-card');
      }
    });

    if (deckCounterText) {
      const cardNum = String(currentIndex + 1).padStart(2, '0');
      const totalNum = String(totalCards).padStart(2, '0');
      deckCounterText.textContent = `Story ${cardNum} of ${totalNum}`;
    }

    if (channelPills.length > 0) {
      channelPills.forEach(pill => {
        const pillIdx = parseInt(pill.getAttribute('data-index'), 10);
        pill.classList.toggle('active', pillIdx === currentIndex);
      });
    }

    isAnimating = false;
  }

  function advanceCard(direction = 'left') {
    if (isAnimating) return;
    isAnimating = true;

    const activeCard = cards[currentIndex];
    if (activeCard) {
      activeCard.classList.add(direction === 'left' ? 'card-exit-left' : 'card-exit-right');
    }

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateDeckState();
    }, 380);
  }

  function jumpToCard(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    const activeCard = cards[currentIndex];
    if (activeCard) {
      activeCard.classList.add('card-exit-left');
    }
    setTimeout(() => {
      currentIndex = index;
      updateDeckState();
    }, 320);
  }

  // Button Listeners
  if (btnPass) {
    btnPass.addEventListener('click', () => advanceCard('left'));
  }

  if (btnLike) {
    btnLike.addEventListener('click', () => advanceCard('right'));
  }

  if (channelPills.length > 0) {
    channelPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const idx = parseInt(pill.getAttribute('data-index'), 10);
        jumpToCard(idx);
      });
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      advanceCard('right');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      advanceCard('left');
    }
  });

  // Touch & Mouse Drag Swiping Physics
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  function onDragStart(e) {
    if (isAnimating) return;
    const activeCard = cards[currentIndex];
    if (!activeCard || !e.target.closest('.active-card')) return;
    if (e.target.closest('button, a, input, .hinge-poll-row')) return;

    isDragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    currentX = startX;
    currentY = startY;
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const point = e.touches ? e.touches[0] : e;
    currentX = point.clientX;
    currentY = point.clientY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    const activeCard = cards[currentIndex];
    if (activeCard) {
      activeCard.style.setProperty('--swipe-x', deltaX);
      activeCard.style.setProperty('--swipe-y', deltaY);

      if (deltaX < 0) {
        activeCard.classList.add('swiping-left');
        activeCard.classList.remove('swiping-right');
      } else {
        activeCard.classList.add('swiping-right');
        activeCard.classList.remove('swiping-left');
      }
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const deltaX = currentX - startX;
    const activeCard = cards[currentIndex];

    if (Math.abs(deltaX) > 85) {
      advanceCard(deltaX < 0 ? 'left' : 'right');
    } else if (activeCard) {
      activeCard.classList.remove('swiping-left', 'swiping-right');
      activeCard.style.removeProperty('--swipe-x');
      activeCard.style.removeProperty('--swipe-y');
    }
  }

  hingeDeck.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  hingeDeck.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('touchend', onDragEnd);

  // Initialize deck states
  updateDeckState();
}

// Hinge Interactive Poll Choice Logic
const hingePollWidget = document.getElementById('hingePollWidget');
if (hingePollWidget) {
  const pollRows = hingePollWidget.querySelectorAll('.hinge-poll-row');
  let pollVoted = false;

  pollRows.forEach(row => {
    row.addEventListener('click', () => {
      if (pollVoted) return;
      pollVoted = true;

      pollRows.forEach(r => r.classList.remove('voted'));
      row.classList.add('voted');

      const metaFooter = hingePollWidget.querySelector('.poll-meta-footer');
      if (metaFooter) {
        metaFooter.innerHTML = `✓ Vote Saved Locally • <a href="${getStoreUrl()}" style="color: #185a9d; font-weight: 700; text-decoration: underline;" target="_blank" rel="noopener noreferrer">Get ZoneUp App to Cast Official Vote</a>`;
      }
    });
  });
}