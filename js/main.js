/**
 * ROHIT ADHIKARI — TABBED NAVIGATION ENGINE
 * Allows individual tabs (Home, About, Skills, Problem Solving, Projects, Contact)
 * to open exclusively with smooth transitions and deep hash-linking.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabPanels = document.querySelectorAll('.tab-panel');
  const navLinks = document.querySelectorAll('.nav-link.tab-trigger');
  const allTabTriggers = document.querySelectorAll('.tab-trigger');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  /**
   * Switch to a specific tab by ID (e.g. 'tab-skills', 'tab-about')
   */
  function activateTab(tabId, updateHash = true) {
    const targetPanel = document.getElementById(tabId) || document.getElementById('tab-home');
    if (!targetPanel) return;

    // 1. Hide all panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // 2. Remove active class from navbar buttons
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === targetPanel.id) {
        link.classList.add('active');
      }
    });

    // 3. Show selected panel with smooth fade
    targetPanel.classList.add('active');

    // 4. Scroll smoothly to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Update browser URL hash if requested
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

  // Attach click listener to ALL elements with .tab-trigger
  allTabTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetTab = trigger.getAttribute('data-tab');
      if (targetTab) {
        e.preventDefault();
        activateTab(targetTab);
      }
    });
  });

  // Handle URL hash on page load or back/forward button (e.g. #skills or #projects)
  function handleHashChange() {
    const currentHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (currentHash) {
      const targetId = 'tab-' + currentHash;
      if (document.getElementById(targetId)) {
        activateTab(targetId, false);
        return;
      }
    }
    // Default to Home
    activateTab('tab-home', false);
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Run on initial load

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

  // Footer dynamic year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
