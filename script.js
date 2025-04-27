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

// Cyber Range Simulation (keep if you have the cyber-range section)
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

// Terminal typing animation
const terminalLines = [
  { text: '~ scan --target photo.jpg --mode deep', class: 'command' },
  { text: '[▇] Initiating biometric scan...', class: '' },
  { text: '[▇] Analyzing digital footprint...', class: '' },
  { text: '[▇] Threat intelligence: No vulnerabilities detected', class: '' },
  { text: '[✔] Cybersecurity professional identified: Umeshchandra Sagar Sugur, class: 'identified' },
  { text: '[✔] Status: All systems protected ', class: 'status', cursor: true }
];

function typeTerminalLines(lines, containerId, charDelay = 90, lineDelay =900) {
  const container = document.getElementById(containerId);
  let lineIdx = 0;

  function typeLine() {
    if (lineIdx >= lines.length) return;
    const { text, class: cls, cursor } = lines[lineIdx];
    const lineElem = document.createElement('div');
    lineElem.className = `terminal-line${cls ? ' ' + cls : ''}`;
    container.appendChild(lineElem);

    let charIdx = 0;
    function typeChar() {
      lineElem.textContent = text.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx < text.length) {
        setTimeout(typeChar, charDelay);
      } else {
        if (cursor) {
          const cur = document.createElement('span');
          cur.className = 'cursor';
          cur.textContent = '_';
          lineElem.appendChild(cur);
        }
        lineIdx++;
        setTimeout(typeLine, lineDelay);
      }
    }
    typeChar();
  }
  typeLine();
}

document.addEventListener('DOMContentLoaded', function() {
  typeTerminalLines(terminalLines, 'cyber-terminal', 90, 900);
});
