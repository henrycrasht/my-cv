console.log('main.js loaded'); // Debug log

// =========================================
// YEAR IN FOOTER
// =========================================
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================================
// TIMELINE FUNCTIONALITIES
// =========================================

// 1. SELECTORS
const deployBtn = document.getElementById('deployExperience');
const timelineWrapper = document.getElementById('timelineWrapper');
const triggerWrapper = document.getElementById('experience-trigger-wrapper');
const toggleBtn = document.getElementById('toggleTimeline');
const backToSkillsBtn = document.querySelector('a[href="#skills"]'); // Target the "Back to skills" link

// 2. DEPLOY & REVERSE LOGIC
if (deployBtn && timelineWrapper) {
    deployBtn.addEventListener('click', function() {
        // Unhide
        timelineWrapper.classList.remove('collapsed');
        timelineWrapper.style.display = 'block';
        triggerWrapper.style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'flex';

        // REVERSE TO PRESENT -> PAST (Invert the course of time)
        const container = document.getElementById('timelineContainer');
        const items = Array.from(container.children);
        // Sort items so the latest date (Present) is first
        items.reverse().forEach(item => container.appendChild(item));
        
        // Update Toggle Text to reflect current state
        const txt = document.getElementById('toggleText');
        if(txt) txt.textContent = 'Latest → Earliest';

        // Staggered reveal
        const timelineItems = timelineWrapper.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, index * 100);
        });

        timelineWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// 3. RE-WRAP LOGIC (Back to Skills)
if (backToSkillsBtn) {
    backToSkillsBtn.addEventListener('click', function() {
        // Reset everything to hidden state
        if (timelineWrapper) {
            timelineWrapper.classList.add('collapsed');
            timelineWrapper.style.display = 'none';
            
            // Remove visibility from items so they "pop" again next time
            const items = timelineWrapper.querySelectorAll('.timeline-item');
            items.forEach(item => item.classList.remove('is-visible'));
        }
        
        if (triggerWrapper) triggerWrapper.style.display = 'block';
        if (toggleBtn) toggleBtn.style.display = 'none';
        
        // Browser will handle the actual scroll to #skills automatically
    });
}



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
      "Hi Josselin,\n\n" +
      "I'd like to receive your Executive CV Pack.\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      (role ? ("Context / role:\n" + role + "\n\n") : "\n") +
      "Best,\n" + name
    );

    window.location.href = "mailto:joss.r.de.st.albin@me.com?subject=" + subject + "&body=" + body;
  });
}


// =========================================
// MODAL SYSTEM (OPEN/CLOSE)
// =========================================
const clickableItems = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

console.log('Found ' + clickableItems.length + ' modal triggers');
console.log('Found ' + modals.length + ' modals');

function openModal(modalId) {
  console.log('Opening modal:', modalId);
  const modal = document.getElementById(modalId);
  
  if (!modal) {
    console.error('Modal not found:', modalId);
    return;
  }
  
  console.log('Modal found, setting aria-hidden=false');
  modal.setAttribute('aria-hidden', 'false');
  
  // Double-check it's visible
  setTimeout(() => {
    const computedDisplay = window.getComputedStyle(modal).display;
    console.log('Modal display after opening:', computedDisplay);
  }, 50);

  // Save focus and focus close button
  modal.__prevFocus = document.activeElement;
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 100);
  }

  // Prevent background scroll
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  
  console.log('Closing modal');
  modal.setAttribute('aria-hidden', 'true');

  // Restore scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Restore focus
  if (modal.__prevFocus && typeof modal.__prevFocus.focus === 'function') {
    modal.__prevFocus.focus();
  }
}

// Attach click handlers to all [data-modal] triggers
clickableItems.forEach(item => {
  const modalId = item.getAttribute('data-modal');
  console.log('Attaching handler for modal:', modalId);
  
  const handler = () => openModal(modalId);
  
  item.addEventListener('click', (e) => {
    e.preventDefault();
    handler();
  });
  
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  });
});

// Close button + click outside handlers
modals.forEach(modal => {
  // Close button
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal(modal);
    });
  }

  // Click outside modal-box to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// ESC key closes any open modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal[aria-hidden="false"]');
    if (openModal) {
      closeModal(openModal);
    }
  }
});





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
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
}

console.log('main.js fully executed');
