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

// timeline sorting
const toggleBtn = document.getElementById('toggleTimeline');
const toggleText = document.getElementById('toggleText');
const timelineContainer = document.getElementById('timelineContainer');

if (toggleBtn && toggleText && timelineContainer) {
  let isReversed = false; // Start with Present → Past

  // Function to reverse timeline
  function reverseTimeline() {
    console.log('Reversing timeline to Present → Past');
    const items = Array.from(timelineContainer.children);
    items.reverse().forEach(item => {
      timelineContainer.appendChild(item);
    });
    
    // Update button to show current state
    toggleText.textContent = 'Latest → Earliest';
    toggleBtn.classList.remove('reversed');
  }

  // Reverse timeline immediately when elements are found
  // (this runs after cv-body.html is loaded)
  reverseTimeline();

  // Toggle button click handler
  toggleBtn.addEventListener('click', function() {
    console.log('Timeline toggle clicked');
    isReversed = !isReversed;
    
    // Get all timeline items and reverse them
    const items = Array.from(timelineContainer.children);
    items.reverse().forEach(item => {
      timelineContainer.appendChild(item);
    });
    
    // Update button text and icon
    if (isReversed) {
      toggleText.textContent = 'Earliest → Latest';
      toggleBtn.classList.add('reversed');
    } else {
      toggleText.textContent = 'Latest → Earliest';
      toggleBtn.classList.remove('reversed');
    }
    
    // Smooth scroll to top of timeline
    timelineContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
// TIMELINE SCROLL REVEAL ANIMATION
// =========================================
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 100);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));
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
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
}

console.log('main.js fully executed');


// timeline reveal
const deployBtn = document.getElementById('deployExperience');
const timelineWrapper = document.getElementById('timelineWrapper');
const triggerWrapper = document.getElementById('experience-trigger-wrapper');
const sortBtn = document.getElementById('toggleTimeline');

if (deployBtn && timelineWrapper) {
    deployBtn.addEventListener('click', function() {
        // 1. Show the timeline
        timelineWrapper.classList.remove('collapsed');
        timelineWrapper.classList.add('expanded');
        
        // 2. Hide the "Review my career" button wrapper
        triggerWrapper.style.display = 'none';
        
        // 3. Make sure the sorting button is visible
        if(sortBtn) sortBtn.style.display = 'flex';

        // 4. Manually trigger the intersection observer logic for the items
        // since they are now suddenly in view
        const items = timelineWrapper.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, index * 150); // Staggered entrance
        });

        // 5. Scroll smoothly to the start of the timeline
        timelineWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

