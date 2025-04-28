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
const sections = document.querySelectorAll('.fade-in');
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

// Cyber Range Simulation (keep for the cyber-range section)
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

// Sound Effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTypingSound() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Volume at 2%
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
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Volume at 2%
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

// Lines for each section
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

// Track displayed sections to prevent repetition
let displayedSections = new Set();
// Track if the resume message has been shown
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
        choices.style.display = 'flex'; // Show choices if no callback is provided
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

// Set up terminal choices event listeners only once
function setupTerminalChoices() {
  const choices = document.getElementById('terminal-choices');
  const container = document.getElementById('cyber-terminal');
  const cta = document.querySelector('.hero-cta');

  choices.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      choices.style.display = 'none'; // Hide buttons after choice

      if (choice === 'resume') {
        // Only show the resume message if it hasn't been shown yet
        if (!isResumeMessageShown) {
          // Clear the terminal content to avoid stacking
          container.innerHTML = '';
          const finalLines = [
            { text: '[✔] Profile scan complete', class: 'identified' },
            { text: '[✔] Resume available for download', class: 'status', cursor: true }
          ];
          typeTerminalLines(finalLines, 'cyber-terminal', 15, 150);
          playSuccessSound();
          cta.classList.add('visible');
          isResumeMessageShown = true; // Mark the message as shown
        } else {
          // If the message was already shown, just show the CTA again
          cta.classList.add('visible');
        }
      } else {
        // Check if the section has already been displayed
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

// Initialize terminal animation and replay functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize displayedSections and resume message state
  displayedSections = new Set();
  isResumeMessageShown = false;

  // Start the initial terminal animation
  typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);

  // Set up terminal choices event listeners
  setupTerminalChoices();

  // Replay button functionality
  document.getElementById('replay-btn').addEventListener('click', function() {
    const container = document.getElementById('cyber-terminal');
    const choices = document.getElementById('terminal-choices');
    const cta = document.querySelector('.hero-cta');
    const progressFill = document.getElementById('progress-fill');
    const threatIndicator = document.querySelector('.threat-indicator');
    const threatText = document.querySelector('.threat-text');

    // Reset terminal and displayed sections
    container.innerHTML = '';
    choices.style.display = 'none';
    cta.classList.remove('visible');
    progressFill.style.width = '0%';
    threatIndicator.classList.remove('yellow', 'green');
    threatIndicator.classList.add('red');
    threatText.textContent = 'Scan Status: Initializing';
    displayedSections = new Set(); // Reset displayed sections

    // Restart simulation
    typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);
  });
});
