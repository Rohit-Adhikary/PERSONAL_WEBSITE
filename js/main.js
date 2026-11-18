/**
 * ROHIT ADHIKARI — DIRECTIONAL SLIDING TAB ENGINE
 * Computes tab index order to slide smoothly left or right on click.
 */

document.addEventListener('DOMContentLoaded', () => {
  const TAB_ORDER = ['tab-home', 'tab-about', 'tab-skills', 'tab-cp', 'tab-projects', 'tab-contact'];
  const tabPanels = document.querySelectorAll('.tab-panel');
  const navLinks = document.querySelectorAll('.nav-link.tab-trigger');
  const allTabTriggers = document.querySelectorAll('.tab-trigger');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  let currentTabId = 'tab-home';

  /**
   * Switch to target tab with directional slide animation (left or right)
   */
  function switchToTab(targetTabId, updateHash = true) {
    const targetPanel = document.getElementById(targetTabId) || document.getElementById('tab-home');
    if (!targetPanel) return;

    const currentIndex = TAB_ORDER.indexOf(currentTabId);
    const targetIndex = TAB_ORDER.indexOf(targetPanel.id);

    // If clicking forward (targetIndex > currentIndex): Slide in from RIGHT (screen moves left)
    // If clicking backward (targetIndex < currentIndex): Slide in from LEFT (screen moves right)
    const isSlideFromRight = targetIndex >= currentIndex;
    const slideClass = isSlideFromRight ? 'slide-in-right' : 'slide-in-left';

    // 1. Reset all panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active', 'slide-in-right', 'slide-in-left');
      panel.style.display = 'none';
    });

    // 2. Animate and activate target panel
    targetPanel.style.display = 'block';
    targetPanel.classList.add(slideClass, 'active');

    currentTabId = targetPanel.id;

    // 3. Highlight current nav button
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === targetPanel.id) {
        link.classList.add('active');
      }
    });

    // 4. Scroll page smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Update browser URL hash without page jump
    if (updateHash) {
      const cleanHash = targetPanel.id.replace('tab-', '');
      if (history.pushState) {
        history.pushState(null, null, '#' + cleanHash);
      } else {
        location.hash = '#' + cleanHash;
      }
    }

    // 6. Close mobile menu if open
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (navToggle) {
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    }
  }

  // Click listeners for all tab triggers
  allTabTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = trigger.getAttribute('data-tab');
      if (targetTab) {
        switchToTab(targetTab);
      }
    });
  });

  // Handle URL hash on initial load or back/forward browser navigation
  function handleHash() {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (hash) {
      const targetId = 'tab-' + hash;
      if (document.getElementById(targetId)) {
        switchToTab(targetId, false);
        return;
      }
    }
    switchToTab('tab-home', false);
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();

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
