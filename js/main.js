/**
 * ROHIT ADHIKARI — PORTFOLIO CONTROLLER
 * Handles:
 * 1. Directional sliding transitions (Left/Right) across all 8 dedicated tabs
 * 2. Real-time URL hash routing (#codeforces, #leetcode, #kaggle, etc.)
 * 3. Submission activity calendar heatmap generation (52 weeks x 7 days)
 * 4. Responsive mobile menu & footer utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ordered sequence of all tabs for computing slide direction
  const TAB_ORDER = [
    'tab-home',
    'tab-about',
    'tab-skills',
    'tab-codeforces',
    'tab-leetcode',
    'tab-kaggle',
    'tab-projects',
    'tab-contact'
  ];

  const tabPanels = document.querySelectorAll('.tab-panel');
  const navLinks = document.querySelectorAll('.nav-link.tab-trigger');
  const allTabTriggers = document.querySelectorAll('.tab-trigger');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  let currentTabId = 'tab-home';

  /**
   * Switch to target tab with smooth directional slide animation (left or right)
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

    // 3. Highlight current nav button & segmented buttons
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === targetPanel.id) {
        link.classList.add('active');
      }
    });

    // Also highlight active state on any segmented platform buttons
    const segmentedButtons = document.querySelectorAll('.seg-btn');
    segmentedButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetPanel.id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 4. Scroll page smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Update browser URL hash without causing abrupt jump
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

  // Click listeners for all tab triggers (navbar, hero buttons, segmented bar, explore cards)
  allTabTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = trigger.getAttribute('data-tab');
      if (targetTab) {
        switchToTab(targetTab);
      }
    });
  });

  // Handle URL hash on initial load or browser back/forward buttons
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

  /**
   * Codeforces Submission Activity Heatmap Generator
   * Generates 52 columns (weeks) x 7 rows (days) representing 364 days of coding activity
   */
  function buildSubmissionHeatmap() {
    const heatmapContainer = document.getElementById('cf-heatmap');
    if (!heatmapContainer) return;

    heatmapContainer.innerHTML = '';

    const today = new Date();
    const totalWeeks = 52;
    const daysPerWeek = 7;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Seeded pseudo-random activity pattern to simulate real CP training
    // Clusters of heavy contest periods, daily streaks, and rest days
    for (let w = 0; w < totalWeeks; w++) {
      const col = document.createElement('div');
      col.className = 'heat-col';

      for (let d = 0; d < daysPerWeek; d++) {
        const cell = document.createElement('div');
        
        // Calculate date for this cell (going back from today)
        const daysAgo = (totalWeeks - 1 - w) * 7 + (6 - d);
        const cellDate = new Date();
        cellDate.setDate(today.getDate() - daysAgo);

        const dateString = `${dayNames[cellDate.getDay()]}, ${monthNames[cellDate.getMonth()]} ${cellDate.getDate()}, ${cellDate.getFullYear()}`;

        // Deterministic pseudo-randomness for realistic streak patterns
        const seed = (w * 13 + d * 7 + 19) % 100;
        let lvl = 0;
        let submissions = 0;

        // Contest days typically on weekends or active weekdays
        const isWeekend = (d === 0 || d === 6);

        if (seed > 88) {
          lvl = 4; // High intensity contest day (9-14 submissions)
          submissions = 9 + (seed % 6);
        } else if (seed > 65) {
          lvl = 3; // 6-8 submissions
          submissions = 6 + (seed % 3);
        } else if (seed > 40) {
          lvl = 2; // 3-5 submissions
          submissions = 3 + (seed % 3);
        } else if (seed > 20) {
          lvl = 1; // 1-2 submissions
          submissions = 1 + (seed % 2);
        } else {
          lvl = 0; // rest day
          submissions = 0;
        }

        cell.className = `heat-cell lvl-${lvl}`;
        cell.setAttribute('data-date', dateString);
        cell.setAttribute('data-count', submissions);
        cell.setAttribute(
          'title',
          submissions > 0
            ? `${submissions} submission${submissions > 1 ? 's' : ''} on ${dateString}`
            : `No submissions on ${dateString}`
        );

        col.appendChild(cell);
      }

      heatmapContainer.appendChild(col);
    }
  }

  // Initialize heatmap
  buildSubmissionHeatmap();

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
