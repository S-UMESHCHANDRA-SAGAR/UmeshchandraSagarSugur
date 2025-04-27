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
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
}

function playSuccessSound() {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.3);
}

// Terminal typing animation with gamification
const terminalLines = [
  { text: '~ mission --brief Umeshchandra_Sagar --threat Critical', class: 'command' },
  { text: '[▇] Launching cyber defense simulation...', class: '' },
  { text: '[▇] Alert: Critical threat detected in system', class: 'alert' },
  { text: '[▇] Analyzing... 3.5K+ threats neutralized in past missions', class: 'achievement' },
  { text: '[?] Choose action: [1] Defensive Shield [2] Offensive Strike', class: 'prompt' },
];

// Additional lines based on user choice
const defensiveLines = [
  { text: '[▇] Deploying Defensive Shield...', class: '' },
  { text: '[▇] Action: Blocked threat – Reduced risks by 40%', class: 'achievement' },
  { text: '[✔] Mission Success: System secured', class: 'identified' },
  { text: '[✔] Debrief: Access candidate profile to deploy', class: 'status', cursor: true }
];

const offensiveLines = [
  { text: '[▇] Launching Offensive Strike...', class: '' },
  { text: '[▇] Action: Neutralized source – Threat eliminated', class: 'achievement' },
  { text: '[✔] Mission Success: System secured', class: 'identified' },
  { text: '[✔] Debrief: Access candidate profile to deploy', class: 'status', cursor: true }
];

function typeTerminalLines(lines, containerId, charDelay = 15, lineDelay = 150) {
  const container = document.getElementById(containerId);
  const cta = document.querySelector('.hero-cta');
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

  function updateThreatLevel() {
    if (lineIdx <= 2) {
      threatIndicator.classList.remove('yellow', 'green');
      threatIndicator.classList.add('red');
      threatText.textContent = 'Threat Level: Critical';
    } else if (lineIdx <= 4) {
      threatIndicator.classList.remove('red', 'green');
      threatIndicator.classList.add('yellow');
      threatText.textContent = 'Threat Level: Moderate';
    } else {
      threatIndicator.classList.remove('red', 'yellow');
      threatIndicator.classList.add('green');
      threatText.textContent = 'Threat Level: Low';
    }
  }

  function typeLine() {
    if (lineIdx >= lines.length) {
      if (lines === terminalLines) {
        // Show choice buttons after the initial prompt
        choices.style.display = 'flex';
      } else {
        // Play success sound and show the resume button
        playSuccessSound();
        cta.classList.add('visible');
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
        updateThreatLevel();
        setTimeout(typeLine, lineDelay);
      }
    }
    typeChar();
  }

  // Handle user choice
  choices.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      choices.style.display = 'none'; // Hide buttons after choice
      totalLines += (choice === 'defensive' ? defensiveLines : offensiveLines).length;
      typeTerminalLines(choice === 'defensive' ? defensiveLines : offensiveLines, containerId, charDelay, lineDelay);
    }, { once: true }); // Ensure the event listener is only triggered once
  });

  typeLine();
}

document.addEventListener('DOMContentLoaded', function() {
  typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);

  // Replay button functionality
  document.getElementById('replay-btn').addEventListener('click', function() {
    const container = document.getElementById('cyber-terminal');
    const choices = document.getElementById('terminal-choices');
    const cta = document.querySelector('.hero-cta');
    const progressFill = document.getElementById('progress-fill');
    const threatIndicator = document.querySelector('.threat-indicator');
    const threatText = document.querySelector('.threat-text');

    // Reset terminal
    container.innerHTML = '';
    choices.style.display = 'none';
    cta.classList.remove('visible');
    progressFill.style.width = '0%';
    threatIndicator.classList.remove('yellow', 'green');
    threatIndicator.classList.add('red');
    threatText.textContent = 'Threat Level: Critical';

    // Restart simulation
    typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);
  });
});
