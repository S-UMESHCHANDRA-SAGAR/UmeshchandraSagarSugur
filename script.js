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

// Sound Effects with Lower Volume
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTypingSound() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // Lower volume to 20%
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
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // Lower volume to 20%
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
  { text: '[▇] Result: 4+ years | 3.5K+ threats analyzed', class: 'achievement' },
  { text: '[✔] Highlight: Reduced exploit risks by 40%', class: 'identified' },
  { text: '[?] View another section? [1] Experience [2] Certifications [3] Skills [4] Download Resume', class: 'prompt' }
];

const certificationsLines = [
  { text: '[▇] Scanning Certifications...', class: '' },
  { text: '[▇] Result: CEH v13 | CompTIA Security+', class: 'achievement' },
  { text: '[✔] Highlight: Splunk Core Certified Power User', class: 'identified' },
  { text: '[?] View another section? [1] Experience [2] Certifications [3] Skills [4] Download Resume', class: 'prompt' }
];

const skillsLines = [
  { text: '[▇] Scanning Skills...', class: '' },
  { text: '[▇] Result: SOC Analysis | PenTesting', class: 'achievement' },
  { text: '[✔] Highlight: Cloud Security (AWS, Azure)', class: 'identified' },
  { text: '[?] View another section? [1] Experience [2] Certifications [3] Skills [4] Download Resume', class: 'prompt' }
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

  function updateStatusIndicator() {
    // Repurpose the threat indicator as a "Scan Status" indicator
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
      choices.style.display = 'flex';
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

  // Handle user choice
  choices.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      choices.style.display = 'none'; // Hide buttons after choice

      if (choice === 'resume') {
        // Show the resume button and prompt to view the Scorecard
        const finalLines = [
          { text: '[✔] Profile scan complete', class: 'identified' },
          { text: '[✔] Check Cybersecurity Scorecard for summary', class: 'status', cursor: true }
        ];
        totalLines += finalLines.length;
        typeTerminalLines(finalLines, containerId, charDelay, lineDelay);
        playSuccessSound();
        cta.classList.add('visible');
      } else {
        // Show the selected section's lines
        const nextLines = choice === 'experience' ? experienceLines :
                         choice === 'certifications' ? certificationsLines :
                         skillsLines;
        totalLines += nextLines.length;
        typeTerminalLines(nextLines, containerId, charDelay, lineDelay);
      }
    }, { once: true }); // Ensure the event listener is only triggered once
  });

  typeLine();
}

// Scorecard Animation
const scoreObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const scoreFill = document.getElementById('score-fill');
      const totalScore = document.getElementById('total-score');
      let score = 0;
      const targetScore = 100; // Total score (40 + 30 + 30)
      const increment = targetScore / 100;

      const animateScore = () => {
        if (score < targetScore) {
          score += increment;
          totalScore.textContent = Math.round(score);
          scoreFill.style.width = `${score}%`;
          setTimeout(animateScore, 20);
        } else {
          totalScore.textContent = targetScore;
          scoreFill.style.width = `${targetScore}%`;
        }
      };
      animateScore();
      scoreObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

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
    threatText.textContent = 'Scan Status: Initializing';

    // Restart simulation
    typeTerminalLines(terminalLines, 'cyber-terminal', 15, 150);
  });

  // Observe the Scorecard section
  const scorecardSection = document.getElementById('scorecard');
  scoreObserver.observe(scorecardSection);
});
