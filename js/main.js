/**
 * ROHIT ADHIKARI — PORTFOLIO CONTROLLER
 * Connected directly to Codeforces Profile & API: Rohit_Adhikari
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

    // 5. Update browser URL hash without jump
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

  // Handle URL hash on initial load or browser navigation
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
   * Preloaded exact submission activity dates for Rohit_Adhikari (241 active days)
   * Ensures instant loading even before the Codeforces API network call finishes
   */
  const CF_PRELOADED_DATES = {"2026-11-15": 3, "2026-11-13": 2, "2026-11-12": 5, "2026-11-02": 6, "2026-11-01": 1, "2026-10-31": 8, "2026-10-27": 1, "2026-10-26": 1, "2026-10-17": 1, "2026-10-11": 1, "2026-10-09": 2, "2026-09-25": 3, "2026-09-22": 2, "2026-09-20": 15, "2026-09-19": 10, "2026-09-18": 1, "2026-09-17": 3, "2026-09-16": 1, "2026-09-15": 6, "2026-09-14": 1, "2026-09-13": 2, "2026-09-12": 2, "2026-09-11": 12, "2026-09-10": 1, "2026-09-09": 3, "2026-09-08": 13, "2026-09-07": 4, "2026-09-06": 4, "2026-09-05": 8, "2026-09-04": 10, "2026-09-03": 5, "2026-09-02": 8, "2026-09-01": 4, "2026-08-31": 2, "2026-08-30": 2, "2026-08-29": 3, "2026-08-28": 7, "2026-08-27": 1, "2026-08-26": 1, "2026-08-25": 2, "2026-08-24": 4, "2026-08-23": 1, "2026-08-22": 7, "2026-08-21": 3, "2026-08-20": 9, "2026-08-19": 1, "2026-08-18": 2, "2026-08-17": 1, "2026-08-16": 4, "2026-08-15": 6, "2026-08-14": 5, "2026-08-13": 9, "2026-08-12": 10, "2026-08-11": 1, "2026-08-10": 7, "2026-08-09": 8, "2026-08-08": 9, "2026-08-07": 5, "2026-08-06": 8, "2026-08-05": 6, "2026-08-04": 2, "2026-08-03": 10, "2026-08-02": 23, "2026-08-01": 8, "2026-07-31": 9, "2026-07-30": 3, "2026-07-29": 9, "2026-07-28": 6, "2026-07-27": 3, "2026-07-26": 2, "2026-07-25": 1, "2026-07-24": 1, "2026-07-23": 1, "2026-07-22": 5, "2026-07-21": 1, "2026-07-20": 2, "2026-07-19": 1, "2026-07-18": 5, "2026-07-17": 7, "2026-07-16": 1, "2026-07-15": 1, "2026-07-14": 5, "2026-07-13": 14, "2026-07-12": 4, "2026-07-11": 1, "2026-07-10": 2, "2026-07-09": 6, "2026-07-08": 2, "2026-07-07": 1, "2026-07-06": 4, "2026-07-05": 1, "2026-07-02": 1, "2026-06-30": 2, "2026-06-29": 1, "2026-06-28": 1, "2026-06-27": 1, "2026-06-26": 1, "2026-06-25": 1, "2026-06-24": 1, "2026-06-22": 1, "2026-06-21": 4, "2026-06-20": 2, "2026-06-19": 1, "2026-06-18": 1, "2026-06-17": 1, "2026-06-16": 2, "2026-06-15": 1, "2026-06-14": 2, "2026-06-13": 1, "2026-06-12": 1, "2026-06-11": 1, "2026-06-10": 1, "2026-06-09": 4, "2026-06-08": 1, "2026-06-07": 4, "2026-06-06": 1, "2026-06-05": 1, "2026-06-04": 1, "2026-06-03": 1, "2026-06-02": 1, "2026-06-01": 1, "2026-05-30": 2, "2026-05-29": 1, "2026-05-28": 2, "2026-05-27": 1, "2026-05-26": 1, "2026-05-25": 1, "2026-05-24": 1, "2026-05-23": 1, "2026-05-22": 2, "2026-05-21": 2, "2026-05-20": 3, "2026-05-19": 3, "2026-05-17": 2, "2026-05-16": 3, "2026-05-15": 2, "2026-05-14": 1, "2026-05-13": 5, "2026-05-12": 1, "2026-05-11": 1, "2026-05-10": 1, "2026-05-09": 5, "2026-05-08": 4, "2026-05-07": 1, "2026-05-06": 1, "2026-05-05": 5, "2026-05-04": 1, "2026-05-03": 1, "2026-05-02": 2, "2026-05-01": 1, "2026-04-30": 1, "2026-04-29": 2, "2026-04-28": 3, "2026-04-27": 2, "2026-04-26": 1, "2026-04-25": 1, "2026-04-23": 1, "2026-04-22": 2, "2026-04-21": 2, "2026-04-20": 1, "2026-04-19": 2, "2026-04-18": 1, "2026-04-17": 5, "2026-04-16": 1, "2026-04-15": 1, "2026-04-14": 1, "2026-04-13": 1, "2026-04-12": 2, "2026-04-11": 3, "2026-04-10": 2, "2026-04-09": 1, "2026-04-08": 2, "2026-04-07": 2, "2026-04-06": 1, "2026-04-05": 3, "2026-04-04": 13, "2026-04-03": 4, "2026-04-02": 2, "2026-04-01": 3, "2026-03-31": 3, "2026-03-30": 2, "2026-03-29": 9, "2026-03-28": 2, "2026-03-27": 1, "2026-03-26": 5, "2026-03-25": 1, "2026-03-24": 1, "2026-03-23": 2, "2026-03-22": 4, "2026-03-21": 3, "2026-03-20": 1, "2026-03-19": 10, "2026-03-18": 5, "2026-03-17": 1, "2026-03-16": 8, "2026-03-15": 2, "2026-03-14": 3, "2026-03-13": 4, "2026-03-12": 8, "2026-03-11": 1, "2026-03-10": 4, "2026-03-09": 4, "2026-03-08": 12, "2026-03-07": 5, "2026-03-06": 12, "2026-03-05": 1, "2026-03-04": 6, "2026-03-03": 8, "2026-03-02": 9, "2026-03-01": 23, "2026-02-28": 17, "2026-02-27": 14, "2026-02-26": 11, "2026-02-25": 8, "2026-02-24": 4, "2026-02-23": 9, "2026-02-22": 2, "2026-02-21": 15, "2026-02-20": 1, "2026-02-19": 9, "2026-02-18": 5, "2026-02-17": 1, "2026-02-16": 3, "2026-02-15": 14, "2026-02-14": 9, "2026-02-13": 1, "2026-02-12": 1, "2026-02-11": 8, "2026-02-10": 2, "2026-02-09": 4, "2026-02-08": 1, "2026-02-07": 3, "2026-02-06": 16, "2026-02-05": 8, "2026-02-04": 7, "2026-02-03": 2, "2025-11-20": 13, "2025-10-26": 1, "2025-10-21": 2, "2025-10-16": 4, "2025-10-12": 3};

  /**
   * Codeforces Submission Activity Heatmap Generator
   * Generates 52 columns (weeks) x 7 rows (days) representing 364 days of coding activity
   */
  function buildSubmissionHeatmap(dateMap) {
    const heatmapContainer = document.getElementById('cf-heatmap');
    if (!heatmapContainer) return;

    heatmapContainer.innerHTML = '';

    const today = new Date();
    const totalWeeks = 52;
    const daysPerWeek = 7;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let w = 0; w < totalWeeks; w++) {
      const col = document.createElement('div');
      col.className = 'heat-col';

      for (let d = 0; d < daysPerWeek; d++) {
        const cell = document.createElement('div');
        
        // Compute date for this cell (going back from today)
        const daysAgo = (totalWeeks - 1 - w) * 7 + (6 - d);
        const cellDate = new Date();
        cellDate.setDate(today.getDate() - daysAgo);

        const y = cellDate.getFullYear();
        const m = String(cellDate.getMonth() + 1).padStart(2, '0');
        const dayNum = String(cellDate.getDate()).padStart(2, '0');
        const isoDateKey = `${y}-${m}-${dayNum}`;

        const readableDate = `${dayNames[cellDate.getDay()]}, ${monthNames[cellDate.getMonth()]} ${cellDate.getDate()}, ${cellDate.getFullYear()}`;

        // Look up actual count from Rohit_Adhikari's submission history
        const count = dateMap[isoDateKey] || 0;
        let lvl = 0;

        if (count >= 9) {
          lvl = 4; // High contest/practice intensity (9+ submissions)
        } else if (count >= 6) {
          lvl = 3; // 6-8 submissions
        } else if (count >= 3) {
          lvl = 2; // 3-5 submissions
        } else if (count >= 1) {
          lvl = 1; // 1-2 submissions
        } else {
          lvl = 0; // rest day
        }

        cell.className = `heat-cell lvl-${lvl}`;
        cell.setAttribute('data-date', isoDateKey);
        cell.setAttribute('data-count', count);
        cell.setAttribute(
          'title',
          count > 0
            ? `${count} submission${count > 1 ? 's' : ''} on ${readableDate}`
            : `No submissions on ${readableDate}`
        );

        col.appendChild(cell);
      }

      heatmapContainer.appendChild(col);
    }
  }

  // Render initial heatmap immediately using preloaded verified dates
  buildSubmissionHeatmap(CF_PRELOADED_DATES);

  /**
   * Live Codeforces API Sync
   * Fetches real-time stats and submissions for handle Rohit_Adhikari
   */
  async function syncCodeforcesLive() {
    const handle = 'Rohit_Adhikari';
    const pill = document.getElementById('cf-api-pill');

    try {
      // 1. Fetch User Info
      const infoResp = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (infoResp.ok) {
        const infoData = await infoResp.json();
        if (infoData.status === 'OK' && infoData.result && infoData.result.length > 0) {
          const u = infoData.result[0];

          // Avatar
          const avatarImg = document.getElementById('cf-avatar-img');
          if (avatarImg && u.avatar) {
            avatarImg.src = u.avatar;
          }

          // Rating
          const maxRatingEl = document.getElementById('cf-max-rating');
          if (maxRatingEl && u.maxRating) maxRatingEl.textContent = u.maxRating;

          const currRatingEl = document.getElementById('cf-current-rating');
          if (currRatingEl && u.rating) currRatingEl.textContent = u.rating;

          // Rank
          const rankTitleEl = document.getElementById('cf-rank-title');
          const rankBadgeEl = document.getElementById('cf-rank-badge');
          if (rankTitleEl && u.rank) {
            const capitalizedRank = u.rank.charAt(0).toUpperCase() + u.rank.slice(1);
            rankTitleEl.textContent = capitalizedRank;
            if (rankBadgeEl) {
              rankBadgeEl.className = `cf-rank-badge rank-${u.rank.toLowerCase()}`;
            }
          }

          // Org
          const orgEl = document.getElementById('cf-org-badge');
          if (orgEl && u.organization) {
            orgEl.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${u.organization} / GSTU`;
          }
        }
      }

      // 2. Fetch User Submissions (Status)
      const statusResp = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      if (statusResp.ok) {
        const statusData = await statusResp.json();
        if (statusData.status === 'OK' && statusData.result) {
          const submissions = statusData.result;
          const liveDateMap = {};
          const solvedSet = new Set();
          const langMap = {};

          submissions.forEach(sub => {
            const ts = sub.creationTimeSeconds;
            const d = new Date(ts * 1000);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const dayNum = String(d.getDate()).padStart(2, '0');
            const dKey = `${y}-${m}-${dayNum}`;

            liveDateMap[dKey] = (liveDateMap[dKey] || 0) + 1;

            const lang = sub.programmingLanguage || 'Other';
            langMap[lang] = (langMap[lang] || 0) + 1;

            if (sub.verdict === 'OK' && sub.problem) {
              solvedSet.add(`${sub.problem.contestId}_${sub.problem.index}`);
            }
          });

          // Update Solved Count
          const solvedEl = document.getElementById('cf-stat-solved');
          if (solvedEl && solvedSet.size > 0) {
            solvedEl.textContent = `${solvedSet.size}+`;
          }

          // Update Total Submissions
          const subsEl = document.getElementById('cf-stat-submissions');
          if (subsEl) {
            subsEl.textContent = submissions.length;
          }

          // Update Active Days
          const activeDaysCount = Object.keys(liveDateMap).length;
          const streakEl = document.getElementById('cf-stat-streak');
          if (streakEl) {
            streakEl.textContent = `${activeDaysCount} Days`;
          }

          const footerSubsEl = document.getElementById('cf-footer-submissions');
          if (footerSubsEl) {
            footerSubsEl.innerHTML = `<strong>${submissions.length} total submissions</strong> across all problem sets`;
          }

          const footerDaysEl = document.getElementById('cf-footer-active-days');
          if (footerDaysEl) {
            footerDaysEl.innerHTML = `Active on <strong>${activeDaysCount} days</strong> this year`;
          }

          // Re-render Heatmap with freshly fetched live dates
          buildSubmissionHeatmap(liveDateMap);

          if (pill) {
            pill.innerHTML = `<span class="pulse-dot"></span> Live API Connected`;
          }
        }
      }
    } catch (e) {
      console.log('CF live sync notice:', e);
      if (pill) {
        pill.innerHTML = `<span class="pulse-dot"></span> Profile Connected`;
      }
    }
  }

  // Trigger live sync in background
  syncCodeforcesLive();

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
