// Set the wedding date
const weddingDate = new Date("November 8, 2025").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;
  
  // Calculate days remaining
  const daysRemaining = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  
  // Update the countdown text
  const daysElement = document.getElementById("daysRemaining");
  if (daysElement) {
    daysElement.textContent = daysRemaining;
  }
}

// Initialize and update once a day (86400000 ms)
updateCountdown();
setInterval(updateCountdown, 86400000);


// JavaScript for toggling the Q&A answers with improved accessibility
const questions = document.querySelectorAll('.qa-question');
questions.forEach(question => {
  // Set initial ARIA state
  question.setAttribute('aria-expanded', 'false');

  // Ensure the answer element has an ID for aria-controls
  const answer = question.nextElementSibling;
  if (!answer.id) {
    answer.id = 'answer-' + Math.random().toString(36).substr(2, 9);
  }
  question.setAttribute('aria-controls', answer.id);

  question.addEventListener('click', () => {
    const isOpen = answer.classList.contains('open');
    answer.classList.toggle('open');
    // Update ARIA attribute based on visibility
    question.setAttribute('aria-expanded', (!isOpen).toString());
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;
  
    function showStep(step) {
      formSteps.forEach((fieldset, index) => {
        const isActive = index === step;
        fieldset.classList.toggle('active', isActive);
        // Hide inactive steps from screen readers
        fieldset.setAttribute('aria-hidden', (!isActive).toString());
  
        if (isActive) {
          // Move focus to the first focusable element in the active step
          const firstInput = fieldset.querySelector('input, textarea, select, button');
          if (firstInput) {
            firstInput.focus();
          }
        }
      });
    }
  
    // Initial ARIA setup for each fieldset (optional enhancement)
    formSteps.forEach(fieldset => {
      // Using role="group" and linking to the legend for context
      fieldset.setAttribute('role', 'group');
      const legend = fieldset.querySelector('legend');
      if (legend && !fieldset.hasAttribute('aria-labelledby')) {
        // Ensure the legend has an ID
        if (!legend.id) {
          legend.id = 'legend-' + Math.random().toString(36).substr(2, 9);
        }
        fieldset.setAttribute('aria-labelledby', legend.id);
      }
    });
  
    // Next buttons
    document.getElementById('nextBtn1').addEventListener('click', () => {
      currentStep = 1;
      showStep(currentStep);
    });
    document.getElementById('nextBtn2').addEventListener('click', () => {
      currentStep = 2;
      showStep(currentStep);
    });
    document.getElementById('nextBtn3').addEventListener('click', () => {
      currentStep = 3;
      showStep(currentStep);
    });
    document.getElementById('nextBtn4').addEventListener('click', () => {
      currentStep = 4;
      showStep(currentStep);
    });
    document.getElementById('nextBtn5').addEventListener('click', () => {
      currentStep = 5;
      showStep(currentStep);
    });
  
    // Previous buttons
    document.getElementById('prevBtn2').addEventListener('click', () => {
      currentStep = 0;
      showStep(currentStep);
    });
    document.getElementById('prevBtn3').addEventListener('click', () => {
      currentStep = 1;
      showStep(currentStep);
    });
    document.getElementById('prevBtn4').addEventListener('click', () => {
      currentStep = 2;
      showStep(currentStep);
    });
    document.getElementById('prevBtn5').addEventListener('click', () => {
      currentStep = 3;
      showStep(currentStep);
    });
    document.getElementById('prevBtn6').addEventListener('click', () => {
      currentStep = 4;
      showStep(currentStep);
    });
  
    // Initially show the first step with proper focus and ARIA updates
    showStep(currentStep);
  });
  

//javascript for the footer
fetch('/footer.html')
.then(response => response.text())
.then(html => {
    document.getElementById('footer-container').innerHTML = html;
})
.catch(error => console.error('Error loading footer:', error));
