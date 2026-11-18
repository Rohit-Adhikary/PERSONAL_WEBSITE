/**
 * ROHIT ADHIKARI — HORIZONTAL SLIDING TAB ENGINE
 * Smoothly translates viewport left/right (carousel style) when clicking tabs.
 */

document.addEventListener('DOMContentLoaded', () => {
  const TAB_ORDER = ['tab-home', 'tab-about', 'tab-skills', 'tab-cp', 'tab-projects', 'tab-contact'];
  const sliderTrack = document.getElementById('slider-track');
  const sliderViewport = document.getElementById('slider-viewport');
  const slidePanels = document.querySelectorAll('.slide-panel');
  const navLinks = document.querySelectorAll('.nav-link.tab-trigger');
  const allTabTriggers = document.querySelectorAll('.tab-trigger');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  let currentTabId = 'tab-home';

  /**
   * Adjust viewport height to match the current slide's content height
   */
  function adjustHeight(targetPanel) {
    if (!sliderViewport || !targetPanel) return;
    // Calculate target panel height
    const height = targetPanel.offsetHeight;
    if (height > 0) {
      sliderViewport.style.height = height + 'px';
    }
  }

  /**
   * Slide horizontally to the given tab ID
   */
  function slideToTab(tabId, updateHash = true) {
    const targetPanel = document.getElementById(tabId) || document.getElementById('tab-home');
    if (!targetPanel) return;

    const targetIndex = parseInt(targetPanel.getAttribute('data-index'), 10);
    if (isNaN(targetIndex)) return;

    currentTabId = targetPanel.id;

    // 1. Perform the horizontal slide (translateX)
    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${targetIndex * 100}vw)`;
    }

    // 2. Set active class on slides
    slidePanels.forEach(panel => {
      panel.classList.remove('active');
    });
    targetPanel.classList.add('active');

    // 3. Set active class on nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === targetPanel.id) {
        link.classList.add('active');
      }
    });

    // 4. Adjust viewport height to current slide so footer fits perfectly
    setTimeout(() => {
      adjustHeight(targetPanel);
    }, 50);

    // 5. Scroll page smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 6. Update URL hash
    if (updateHash) {
      const cleanHash = targetPanel.id.replace('tab-', '');
      if (history.pushState) {
        history.pushState(null, null, '#' + cleanHash);
      } else {
        location.hash = '#' + cleanHash;
      }
    }

    // 7. Close mobile hamburger menu if open
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (navToggle) {
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    }
  }

  // Bind click event to all tab triggers
  allTabTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = trigger.getAttribute('data-tab');
      if (targetTab) {
        slideToTab(targetTab);
      }
    });
  });

  // Handle URL Hash (e.g. #skills or #about)
  function handleHashChange() {
    const currentHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (currentHash) {
      const targetId = 'tab-' + currentHash;
      if (document.getElementById(targetId)) {
        slideToTab(targetId, false);
        return;
      }
    }
    // Default to Home
    slideToTab('tab-home', false);
  }

  window.addEventListener('hashchange', handleHashChange);
  
  // Initialize slider on load
  handleHashChange();

  // Re-adjust height on window resize
  window.addEventListener('resize', () => {
    const currentPanel = document.getElementById(currentTabId);
    adjustHeight(currentPanel);
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Dynamic Year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
