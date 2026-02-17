// =========================================
// YEAR IN FOOTER
// =========================================
document.getElementById('year').textContent = new Date().getFullYear();


// =========================================
// TIMELINE TOGGLE FUNCTIONALITY
// =========================================
const toggleBtn = document.getElementById('toggleTimeline');
const toggleText = document.getElementById('toggleText');
const timelineContainer = document.getElementById('timelineContainer');
let isReversed = false; // Start with Present → Past (not reversed yet)

// Reverse timeline on page load to show Present → Past by default
window.addEventListener('DOMContentLoaded', function() {
  const items = Array.from(timelineContainer.children);
  items.reverse().forEach(item => {
    timelineContainer.appendChild(item);
  });
  
  // Update button to show correct state
  toggleText.textContent = 'Latest → Earliest';
  toggleBtn.classList.remove('reversed');
});

toggleBtn.addEventListener('click', function() {
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

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.setAttribute('aria-hidden', 'false');

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
  
  const handler = () => openModal(modalId);
  
  item.addEventListener('click', handler);
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
    closeBtn.addEventListener('click', () => closeModal(modal));
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
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for smoother appearance
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 100);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));


// =========================================
// GENERAL SCROLL REVEAL ANIMATION
// =========================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));
