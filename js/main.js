console.log('main.js loaded');

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
const timelineWrapper = document.getElementById('timelineWrapper');
const triggerWrapper = document.getElementById('experience-trigger-wrapper');
const toggleBtn = document.getElementById('toggleTimeline');
const timelineContainer = document.getElementById('timelineContainer');
const allSkillLinks = document.querySelectorAll('a[href="#skills"]');

// 2. DEPLOY LOGIC
if (deployBtn && timelineWrapper) {
    deployBtn.addEventListener('click', function() {
        triggerWrapper.style.display = 'none';
        timelineWrapper.style.display = 'block';
        timelineWrapper.classList.remove('collapsed');
        if (toggleBtn) toggleBtn.style.display = 'flex';

        // Auto-reverse to Present -> Past on first open
        const items = Array.from(timelineContainer.children);
        items.reverse().forEach(item => timelineContainer.appendChild(item));

        // Trigger Reveal Animations for items
        const timelineItems = timelineWrapper.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, index * 100);
        });

        window.scrollTo({
            top: timelineWrapper.offsetTop - 100,
            behavior: 'smooth'
        });
    });
}

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
