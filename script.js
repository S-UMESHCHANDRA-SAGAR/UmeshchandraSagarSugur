// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in animation on scroll with staggered effect for skills
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Staggered animation for skills
      if (entry.target.id === 'skills') {
        const skillCategories = entry.target.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
          setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    }
  });
}, { threshold: 0.1 });

// Fallback to make sections visible if observer fails
sections.forEach(section => {
  observer.observe(section);
  // Ensure section is visible after a timeout if not already
  setTimeout(() => {
    if (!section.classList.contains('visible')) {
      section.classList.add('visible');
    }
  }, 1000);
});

// Cyber Range Simulation
function startHackSimulation() {
  const logWindow = document.querySelector('.log-window');
  const statusLed = document.querySelector('.led');
  const firewallStatus = document.querySelector('.firewall-status span:last-child');
  
  logWindow.innerHTML = '';
  firewallStatus.textContent = 'Firewall Under Attack';
  statusLed.classList.remove('green');
  statusLed.classList.add('red');

  const logs = [
    '> Detecting intrusion attempt...',
    '> Source IP: 192.168.1.100',
    '> Port scan detected on port 80',
    '> Blocking malicious traffic...',
    '> Running packet analysis...',
    '> Threat neutralized.',
    '> System Secure'
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < logs.length) {
      logWindow.innerHTML += `<p>${logs[i]}</p>`;
      logWindow.scrollTop = logWindow.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
      firewallStatus.textContent = 'Firewall Active';
      statusLed.classList.remove('red');
      statusLed.classList.add('green');
    }
  }, 1000);
}

// Sound Effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTypingSound() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
}

function playSuccessSound() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.3);
}

// Terminal typing animation with gamification
const terminalLines = [
  { text: '~ scan --candidate Umeshchandra_Sagar --profile Full', class: 'command' },
  { text: '[▇] Initializing candidate profile scanner...', class: '' },
  { text: '[▇] Scanning... Profile data detected', class: '' },
  { text: '[?] Select section: [1] Experience [2] Certifications [3] Skills', class: 'prompt' },
];

const experienceLines = [
  { text: '[▇] Scanning Experience...', class: '' },
  { text: '[▇] Result: 3+ years | 3.5K+ threats analyzed', class: 'achievement' },
  { text: '[✔] Highlight: Reduced exploit risks by 40%', class: 'identified' }
];

const certificationsLines = [
  { text: '[▇] Scanning Certifications...', class: '' },
  { text: '[▇] Result: CEH v13 | CompTIA Security+', class: 'achievement' },
  { text: '[✔] Highlight: Splunk Core Certified Power User', class: 'identified' }
];

const skillsLines = [
  { text: '[▇] Scanning Skills...', class: '' },
  { text: '[▇] Result: SOC Analysis | PenTesting', class: 'achievement' },
  { text: '[✔] Highlight: Cloud Security (AWS, Azure)', class: 'identified' }
];

let displayedSections = new Set();
let isResumeMessageShown = false;

function typeTerminalLines(lines, containerId, charDelay = 15, lineDelay = 150, callback = null) {
  const container = document.getElementById(containerId);
  const choices = document.getElementById('terminal-choices');
  const progressFill = document.getElementById('progress-fill');
  const threatIndicator = document.querySelector('.threat-indicator');
  const threatText = document.querySelector('.threat-text');
  let lineIdx = 0;
  let totalLines = lines.length;

  function updateProgress() {
    const progress = (lineIdx / totalLines) * 100;
    progressFill.style.width = `${progress}%`;
  }

  function updateStatusIndicator() {
    if (lineIdx <= 2) {
      threatIndicator.classList.remove('yellow', 'green');
      threatIndicator.classList.add('red');
      threatText.textContent = 'Scan Status: Initializing';
    } else if (lineIdx <= 4) {
      threatIndicator.classList.remove('red', 'green');
      threatIndicator.classList.add('yellow');
      threatText.textContent = 'Scan Status: In Progress';
    } else {
      threatIndicator.classList.remove('red', 'yellow');
      threatIndicator.classList.add('green');
      threatText.textContent = 'Scan Status: Complete';
    }
  }

  function typeLine() {
    if (lineIdx >= lines.length) {
      if (callback) {
        callback();
      } else {
        choices.style.display = 'flex';
      }
      return;
    }

    const { text, class: cls, cursor } = lines[lineIdx];
    const lineElem = document.createElement('div');
    lineElem.className = `terminal-line${cls ? ' ' + cls : ''}`;
    container.appendChild(lineElem);

    let charIdx = 0;
    function typeChar() {
      lineElem.textContent = text.slice(0, charIdx + 1);
      playTypingSound();
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
        updateProgress();
        updateStatusIndicator();
        setTimeout(typeLine, lineDelay);
      }
    }
    typeChar();
  }

  typeLine();
}

function setupTerminalChoices() {
  const choices = document.getElementById('terminal-choices');
  const container = document.getElementById('cyber-terminal');
  const cta = document.querySelector('.hero-cta');

  choices.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      choices.style.display = 'none';

      if (choice === 'resume') {
        if (!isResumeMessageShown) {
          container.innerHTML = '';
          const finalLines = [
            { text: '[✔] Profile scan complete', class: 'identified' },
            { text: '[✔] Resume available for download', class: 'status', cursor: true }
          ];
          typeTerminalLines(finalLines, 'cyber-terminal', 15, 150);
          playSuccessSound();
          cta.classList.add('visible');
          isResumeMessageShown = true;
        } else {
          cta.classList.add('visible');
        }
      } else {
        if (displayedSections.has(choice)) {
          choices.style.display = 'flex';
        } else {
          displayedSections.add(choice);
          const nextLines = choice === 'experience' ? experienceLines :
                           choice === 'certifications' ? certificationsLines :
                           skillsLines;
          typeTerminalLines(nextLines, 'cyber-terminal', 15, 150, () => {
            choices.style.display = 'flex';
          });
        }
      }
    });
  });
}

// Project Modal Functions
function openProjectModal(projectId) {
  const modal = document.getElementById(projectId);
  modal.style.display = 'flex';
}

function closeProjectModal(projectId) {
  const modal = document.getElementById(projectId);
  modal.style.display = 'none';
}

// Experience Modal Functions
function openExperienceModal(experienceId) {
  const modal = document.getElementById(experienceId);
  modal.style.display = 'flex';
}

function closeExperienceModal(experienceId) {
  const modal = document.getElementById(experienceId);
  modal.style.display = 'none';
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const projectModals = document.querySelectorAll('.project-modal');
  const experienceModals = document.querySelectorAll('.experience-modal');
  projectModals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  experienceModals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Replay Terminal Animation
function setupReplayButton() {
  const replayBtn = document.getElementById('replay-btn');
  replayBtn.addEventListener('click', () => {
    const container = document.getElementById('cyber-terminal');
    const choices = document.getElementById('terminal-choices');
    const cta = document.querySelector('.hero-cta');
    container.innerHTML = '';
    choices.style.display = 'none';
    cta.classList.remove('visible');
    displayedSections = new Set();
    isResumeMessageShown = false;
    typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  displayedSections = new Set();
  isResumeMessageShown = false;

  // Initialize terminal animation
  typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);
  setupTerminalChoices();
  setupReplayButton();
});
