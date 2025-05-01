// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in animation on scroll
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

// Lock/Unlock Animation for Sidebar
function toggleLock() {
  const lock = document.querySelector('.lock-icon');
  lock.textContent = lock.textContent === '🔓' ? '🔒' : '🔓';
  lock.style.filter = 'drop-shadow(0 0 8px #ff0000)';
  setTimeout(() => {
    lock.style.filter = 'drop-shadow(0 0 5px #16c784)';
  }, 500);
}
