    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

// Timeline Toggle Functionality
const toggleBtn = document.getElementById('toggleTimeline');
const toggleText = document.getElementById('toggleText');
const timelineContainer = document.getElementById('timelineContainer');
let isReversed = true;  // Changed to true - start reversed (Present → Past)

// Reverse timeline on page load to show Present → Past by default
window.addEventListener('DOMContentLoaded', function() {
  const items = Array.from(timelineContainer.children);
  items.reverse().forEach(item => {
    timelineContainer.appendChild(item);
  });
});

toggleBtn.addEventListener('click', function() {
  isReversed = !isReversed;
  
  // Get all timeline items
  const items = Array.from(timelineContainer.children);
  
  // Reverse the order
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



    // Lead magnet form -> mailto
    document.getElementById('leadForm').addEventListener('submit', function(e){
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

    // Modal open/close
    const clickableItems = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');

    function openModal(modalId){
      const modal = document.getElementById(modalId);
      if(!modal) return;
      modal.setAttribute('aria-hidden','false');

      // Save focus and focus close button
      modal.__prevFocus = document.activeElement;
      const closeBtn = modal.querySelector('.modal-close');
      if(closeBtn) closeBtn.focus();

      // Prevent background scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeModal(modal){
      if(!modal) return;
      modal.setAttribute('aria-hidden','true');

      // Restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      // Restore focus
      if(modal.__prevFocus && typeof modal.__prevFocus.focus === 'function'){
        modal.__prevFocus.focus();
      }
    }

    clickableItems.forEach(item => {
      const id = item.getAttribute('data-modal');
      
      const handler = () => openModal(id);
      
      item.addEventListener('click', handler);
      item.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });

    modals.forEach(modal => {
      // close button
      const closeBtn = modal.querySelector('.modal-close');
      if(closeBtn){
        closeBtn.addEventListener('click', () => closeModal(modal));
      }

      // click outside
      modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal(modal);
      });
    });

    // ESC closes any open modal
    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      const open = document.querySelector('.modal[aria-hidden="false"]');
      if(open) closeModal(open);
    });

    // Timeline scroll reveal animation
    const timelineItemsObserve = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if(entry.isIntersecting){
          // Add staggered delay for smoother appearance
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    timelineItemsObserve.forEach(item => timelineObserver.observe(item));

    // Simple scroll reveal for other elements
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
