// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-inanimation on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Cyber Range Simulation
function startHackSimulation() {
  const logWindow = document.querySelector('.log-window');
  const statusLed = document.querySelector('.led');
  
  logWindow.innerHTML = `
    <p>> Initializing penetration test...</p>
    <p>> Scanning for vulnerabilities...</p>
    <p>> Detected 3 critical vulnerabilities!</p>
    <p>> Applying security patches...</p>
    <p>> System hardened successfully!</p>
  `;
  
  statusLed.classList.remove('green');
  statusLed.classList.add('red');
  setTimeout(() => {
    statusLed.classList.remove('red');
    statusLed.classList.add('green');
  }, 3000);
}

// Initialize terminal threat level animation
document.addEventListener('DOMContentLoaded', () => {
  const threatLevel = document.querySelector('.threat-level');
  let level = 0;
  const interval = setInterval(() => {
    level = (level + 1) % 101;
    threatLevel.textContent = `${level}%`;
    if (level === 100) clearInterval(interval);
  }, 50);
});
