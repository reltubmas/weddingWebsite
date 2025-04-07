document.addEventListener('DOMContentLoaded', function() {
  /* Countdown Timer */
  const weddingDate = new Date("November 8, 2025").getTime();
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    const daysRemaining = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const daysElement = document.getElementById("daysRemaining");
    if (daysElement) {
      daysElement.textContent = daysRemaining;
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 86400000); // updates once a day

  /* Q&A Toggle Setup with Accessibility Enhancements */
  const questions = document.querySelectorAll('.qa-question');
  questions.forEach(question => {
    question.setAttribute('aria-expanded', 'false');
    const answer = question.nextElementSibling;
    if (!answer.id) {
      answer.id = 'answer-' + Math.random().toString(36).substr(2, 9);
    }
    question.setAttribute('aria-controls', answer.id);
    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');
      answer.classList.toggle('open');
      question.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

/* Hamburger Menu Setup with ARIA Enhancements */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  // Ensure the nav overlay is closed on load
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  // Add listener for the close button inside the nav overlay, if present
  const closeBtn = navLinks.querySelector('.close-nav button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }
}


  /* RSVP Form Multi-Step Setup with Validation */
  const formSteps = document.querySelectorAll('.form-step');
  let currentStep = 0;

  // ARIA setup for each fieldset
  formSteps.forEach(fieldset => {
    fieldset.setAttribute('role', 'group');
    const legend = fieldset.querySelector('legend');
    if (legend) {
      if (!legend.id) {
        legend.id = 'legend-' + Math.random().toString(36).substr(2, 9);
      }
      fieldset.setAttribute('aria-labelledby', legend.id);
    }
  });

  function showStep(step) {
    formSteps.forEach((fieldset, index) => {
      const isActive = index === step;
      fieldset.classList.toggle('active', isActive);
      fieldset.setAttribute('aria-hidden', (!isActive).toString());
      if (isActive) {
        const firstInput = fieldset.querySelector('input, textarea, select, button');
        if (firstInput) firstInput.focus();
      }
    });
  }

  // Bind Next & Previous buttons with validation on "Next"
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');

  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Validate the current step before moving forward
      const currentFieldset = formSteps[currentStep];
      if (!currentFieldset.checkValidity()) {
        currentFieldset.reportValidity();
        return;
      }
      const targetStep = parseInt(btn.dataset.nextStep, 10);
      if (!isNaN(targetStep)) {
        currentStep = targetStep - 1; // convert 1-indexed step to 0-indexed array
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.dataset.prevStep, 10);
      if (!isNaN(targetStep)) {
        currentStep = targetStep - 1;
        showStep(currentStep);
      }
    });
  });

  // Initially display the first step
  showStep(currentStep);

  /* Resize Listener to Reset Hamburger Menu on Larger Screens */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* Footer Loading with Fallback */
  fetch('/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = html;
      }
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = '<footer class="site-footer"><p class="footer-main">A&amp;S</p><hr class="footer-divider"><p class="footer-location">Footer content not available</p></footer>';
      }
    });
});
