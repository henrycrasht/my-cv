console.log('main.js loaded');

// DYNAMIC COMPANY NAME FROM URL
const path = window.location.pathname; // e.g., "/tessan" or "/tessan/index.html"
const companyNameElement = document.getElementById('dynamic-company-name');

if (companyNameElement) {
    // Extract the folder name, remove extension, capitalize first letter
    const rawName = path.split('/').filter(p => p && !p.includes('.html')).pop() || "you";
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    
    companyNameElement.textContent = formattedName;
}


// =========================================
// YEAR IN FOOTER
// =========================================
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =========================================
// GENERAL SCROLL REVEAL ANIMATION
// =========================================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// =========================================
// TIMELINE FUNCTIONALITIES
// =========================================

// 1. SELECTORS
const deployBtn = document.getElementById('deployExperience');
const heroExpBtn = document.getElementById('hero-btn-experience'); // New Hero button
const timelineWrapper = document.getElementById('timelineWrapper');
const triggerWrapper = document.getElementById('experience-trigger-wrapper');

// 2. SHARED DEPLOY FUNCTION
function deployTimeline() {
    if (!timelineWrapper) return;
    
    // Hide all trigger wrappers (Hero and Section)
    if (triggerWrapper) triggerWrapper.style.display = 'none';
    
    timelineWrapper.style.display = 'block';
    timelineWrapper.classList.remove('collapsed');
    if (toggleBtn) toggleBtn.style.display = 'flex';

    // Reverse and Animate
    const container = document.getElementById('timelineContainer');
    const items = Array.from(container.children);
    items.reverse().forEach(item => container.appendChild(item));

    const timelineItems = timelineWrapper.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('is-visible'), index * 100);
    });

    // Scroll to the start of the timeline
    timelineWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 3. ATCH LISTENERS
if (deployBtn) deployBtn.addEventListener('click', deployTimeline);
if (heroExpBtn) heroExpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deployTimeline();
});


// 3. MANUAL TOGGLE LOGIC (Latest <-> Earliest)
if (toggleBtn && timelineContainer) {
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const items = Array.from(timelineContainer.children);
        items.reverse().forEach(item => timelineContainer.appendChild(item));
        
        const txt = document.getElementById('toggleText');
        if (txt) {
            txt.textContent = txt.textContent.includes('Latest') ? 'Earliest → Latest' : 'Latest → Earliest';
        }
    });
}

// 4. BACK TO SKILLS RESET (WRAP UP)
allSkillLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (timelineWrapper && !timelineWrapper.classList.contains('collapsed')) {
            timelineWrapper.classList.add('collapsed');
            timelineWrapper.style.display = 'none';
            if (triggerWrapper) triggerWrapper.style.display = 'block';
            if (toggleBtn) toggleBtn.style.display = 'none';

            // Reset visibility so animations replay next time
            const items = timelineWrapper.querySelectorAll('.timeline-item');
            items.forEach(item => item.classList.remove('is-visible'));
        }
    });
});

// =========================================
// CONTACT FORM (MAILTO)
// =========================================
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value.trim();

    const subject = encodeURIComponent("Executive CV Pack request — " + name);
    const body = encodeURIComponent(
      "Hi Josselin,\n\nI'd like to receive your Executive CV Pack.\n\nName: " + name + "\nEmail: " + email + "\n" +
      (role ? ("Context / role:\n" + role + "\n\n") : "\n") + "Best,\n" + name
    );
    window.location.href = "mailto:joss.r.de.st.albin@me.com?subject=" + subject + "&body=" + body;
  });
}

// =========================================
// MODAL SYSTEM (OPEN/CLOSE)
// =========================================
const clickableItems = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.setAttribute('aria-hidden', 'false');
  modal.__prevFocus = document.activeElement;
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (modal.__prevFocus) modal.__prevFocus.focus();
}

clickableItems.forEach(item => {
  const modalId = item.getAttribute('data-modal');
  item.addEventListener('click', (e) => { e.preventDefault(); openModal(modalId); });
});

modals.forEach(modal => {
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
    if (openModalEl) closeModal(openModalEl);
  }
});

console.log('main.js fully executed');
