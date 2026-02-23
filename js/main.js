console.log('main.js loaded');

// =========================================
// 1. DYNAMIC COMPANY NAME LOGIC
// =========================================
const path = window.location.pathname;
const rawName = path.split('/').filter(p => p && !p.includes('.html')).pop() || "you";
const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

const companyNameElement = document.getElementById('dynamic-company-name');
if (companyNameElement) companyNameElement.textContent = formattedName;

document.querySelectorAll('.dynamic-company-inline').forEach(el => {
    el.textContent = formattedName;
});

// =========================================
// 2. YEAR IN FOOTER
// =========================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =========================================
// 3. GENERAL SCROLL REVEAL ANIMATION
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
// 4. TIMELINE FUNCTIONALITIES
// =========================================

// SELECTORS
const deployBtn = document.getElementById('deployExperience');
const heroExpBtn = document.getElementById('hero-btn-experience');
const timelineWrapper = document.getElementById('timelineWrapper');
const triggerWrapper = document.getElementById('experience-trigger-wrapper');
const timelineContainer = document.getElementById('timelineContainer');
const toggleBtn = document.getElementById('toggleTimeline');
const stickyBackBtn = document.getElementById('stickyBackToSkills');
const allSkillLinks = document.querySelectorAll('a[href="#skills"]');

// SHARED DEPLOY FUNCTION
function deployTimeline(e) {
    if (e) e.preventDefault();
    if (!timelineWrapper || !timelineContainer) return;

    // 1. UI Visibility Changes
    if (triggerWrapper) triggerWrapper.style.display = 'none';
    timelineWrapper.style.display = 'block';
    timelineWrapper.classList.remove('collapsed');
    if (toggleBtn) toggleBtn.style.display = 'flex';
    if (stickyBackBtn) stickyBackBtn.style.display = 'flex';

    // 2. Invert Chronology (Latest -> Earliest)
    const items = Array.from(timelineContainer.children);
    items.reverse().forEach(item => timelineContainer.appendChild(item));

    // 3. Trigger Animations
    const timelineItems = timelineWrapper.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('is-visible'), index * 100);
    });

    // 4. Smooth Scroll to Timeline
    setTimeout(() => {
        timelineWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ATTACH DEPLOY LISTENERS
if (deployBtn) deployBtn.addEventListener('click', deployTimeline);
if (heroExpBtn) heroExpBtn.addEventListener('click', deployTimeline);

// MANUAL TOGGLE LOGIC
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

// BACK TO SKILLS RESET (WRAP UP)
allSkillLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (timelineWrapper && !timelineWrapper.classList.contains('collapsed')) {
            timelineWrapper.classList.add('collapsed');
            timelineWrapper.style.display = 'none';
            if (triggerWrapper) triggerWrapper.style.display = 'block';
            if (toggleBtn) toggleBtn.style.display = 'none';
            if (stickyBackBtn) stickyBackBtn.style.display = 'none';

            // Reset visibility so items "pop" next time
            const items = timelineWrapper.querySelectorAll('.timeline-item');
            items.forEach(item => item.classList.remove('is-visible'));
        }
    });
});

// =========================================
// 5. CONTACT FORM (MAILTO)
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
            "Hi Josselin,\n\nI'd like to receive your Executive CV Pack.\n\n" +
            "Name: " + name + "\nEmail: " + email + "\n" +
            (role ? ("Context / role:\n" + role + "\n\n") : "\n") + "Best,\n" + name
        );
        window.location.href = "mailto:joss.r.de.st.albin@me.com?subject=" + subject + "&body=" + body;
    });
}

// =========================================
// 6. MODAL SYSTEM (OPEN/CLOSE)
// =========================================

// SAFETY INIT: force-hide all modals on load regardless of HTML attribute state
document.querySelectorAll('.modal').forEach(modal => {
    modal.setAttribute('aria-hidden', 'true');
});

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

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
        e.preventDefault();
        openModal(trigger.getAttribute('data-modal'));
    }

    const closeBtn = e.target.closest('.modal-close');
    if (closeBtn) {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    }

    const modalOverlay = e.target.matches('.modal');
    if (modalOverlay) closeModal(e.target);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
        if (openModalEl) closeModal(openModalEl);
    }
});

console.log('main.js fully executed');
