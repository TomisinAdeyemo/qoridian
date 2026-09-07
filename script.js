// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Expanded Interactive Node Canvas Setup
const canvas = document.getElementById('nodeGrid');
const ctx = canvas.getContext('2d');

const cols = 22;             // Increased grid columns
const rows = 15;             // Increased grid rows
const spacing = 30;          // Increased node spacing
const baseDotSize = 3.5;
const activeSize = 8;       // Expanded active square size
const influenceRadius = 110; // Expanded interaction radius

canvas.width = cols * spacing;
canvas.height = rows * spacing;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let currentX = canvas.width / 2;
let currentY = canvas.height / 2;
let isHovered = false;

// Handle Mouse & Touch Inputs dynamically
function updatePointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  mouseX = (clientX - rect.left) * scaleX;
  mouseY = (clientY - rect.top) * scaleY;
  isHovered = true;
}

canvas.addEventListener('mousemove', updatePointerPos);
canvas.addEventListener('touchmove', updatePointerPos, { passive: true });

canvas.addEventListener('mouseleave', () => { isHovered = false; });
canvas.addEventListener('touchend', () => { isHovered = false; });

// Continuous 60fps Smooth Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const targetX = isHovered ? mouseX : canvas.width / 2;
  const targetY = isHovered ? mouseY : canvas.height / 2;

  // Smooth Lerp Easing (0.1)
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * spacing + spacing / 2;
      const y = r * spacing + spacing / 2;

      const dist = Math.hypot(x - currentX, y - currentY);

      if (dist < 15) {
        // Active Highlight Node with Glow
        ctx.fillStyle = '#5DB847';
        ctx.shadowColor = 'rgba(34, 197, 94, 0.8)';
        ctx.shadowBlur = 5;
        ctx.fillRect(x - activeSize / 2, y - activeSize / 2, activeSize, activeSize);
        ctx.shadowBlur = 0;
      } else if (dist < influenceRadius) {
        // Dynamic Proximity Glow Effect
        const factor = 1 - dist / influenceRadius;
        const dynamicSize = baseDotSize + factor * 3;

        ctx.fillStyle = `rgba(34, 197, 94, ${0.25 + factor * 0.55})`;
        ctx.fillRect(x - dynamicSize / 2, y - dynamicSize / 2, dynamicSize, dynamicSize);
      } else {
        // Standard Muted Node
        ctx.fillStyle = '#BABABA';
        ctx.fillRect(x - baseDotSize / 2, y - baseDotSize / 2, baseDotSize, baseDotSize);
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Scroll Reveal Observer for all sections
const sections = document.querySelectorAll('section');

const revealOptions = {
  root: null,
  threshold: 0.1, // Triggers earlier as soon as 10% enters the viewport
  rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, revealOptions);

sections.forEach(section => {
  revealObserver.observe(section);
});

// Ambient Moving Nodes Background Setup
const bgCanvas = document.getElementById('bgNodesCanvas');
const bgCtx = bgCanvas.getContext('2d');

let bgWidth = (bgCanvas.width = window.innerWidth);
let bgHeight = (bgCanvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  bgWidth = bgCanvas.width = window.innerWidth;
  bgHeight = bgCanvas.height = window.innerHeight;
});

// Increased count and enhanced visibility configuration
const particleCount = 50;
const particles = [];

class AmbientNode {
  constructor() {
    this.x = Math.random() * bgWidth;
    this.y = Math.random() * bgHeight;
    this.size = Math.random() * 2.5 + 2.5;
    
    // Reduced speed for a smoother, slower drift
    this.speedY = Math.random() * 0.01 + 0.01;      // Slower vertical movement
    this.amplitude = Math.random() * 0.1 + 0.1;    // Gentler zig-zag sway
    this.frequency = Math.random() * 0.012 + 0.004; // Slower oscillation wave
    this.step = Math.random() * 100;
    
    this.opacity = Math.random() * 0.35 + 0.25;
  }

  update() {
    this.step += this.frequency;
    this.x += Math.sin(this.step) * this.amplitude;
    this.y -= this.speedY;

    if (this.y < -15) {
      this.y = bgHeight + 15;
      this.x = Math.random() * bgWidth;
    }
  }

  draw() {
    bgCtx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
    bgCtx.shadowColor = 'rgba(9, 73, 33, 0.4)';
    bgCtx.shadowBlur = 10;
    bgCtx.fillRect(this.x, this.y, this.size, this.size);
    bgCtx.shadowBlur = 0;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new AmbientNode());
}

function animateBgNodes() {
  bgCtx.clearRect(0, 0, bgWidth, bgHeight);

  particles.forEach(node => {
    node.update();
    node.draw();
  });

  requestAnimationFrame(animateBgNodes);
}

animateBgNodes();


// --- 1. Text Scramble Decoding Effect ---
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';

function decodeText(element) {
  const originalText = element.getAttribute('data-decode');
  let iteration = 0;
  clearInterval(element.decodeInterval);

  element.decodeInterval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((char, index) => {
        if (index < iteration) return originalText[index];
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(element.decodeInterval);
    }
    iteration += 1 / 2; // Decoding speed
  }, 30);
}

// Trigger decode when section is scrolled into view
const decodeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tag = entry.target.querySelector('.section-tag');
      if (tag) decodeText(tag);
    }
  });
}, { threshold: 0.3 });

const propSection = document.querySelector('.proposition-section');
if (propSection) decodeObserver.observe(propSection);


// --- 2. Floating Connected Network Node Diagram ---
const netCanvas = document.getElementById('networkCanvas');
const netCtx = netCanvas.getContext('2d');

netCanvas.width = 560;
netCanvas.height = 400;

// Central Hub Node
const centralHub = { x: 380, y: 220, baseSize: 12 };

// Satellite Floating Label Nodes
const labels = ['SUPPLY', 'DEMAND', 'COMPETING USES', 'INFRASTRUCTURE', 'POPULATION', 'CLIMATE'];
const satellites = [
  { label: 'SUPPLY', x: 200, y: 70, ox: 200, oy: 70, phase: 0 },
  { label: 'DEMAND', x: 360, y: 100, ox: 360, oy: 100, phase: 1.2 },
  { label: 'COMPETING USES', x: 140, y: 190, ox: 140, oy: 190, phase: 2.4 },
  { label: 'INFRASTRUCTURE', x: 420, y: 190, ox: 420, oy: 190, phase: 3.6 },
  { label: 'POPULATION', x: 220, y: 300, ox: 220, oy: 300, phase: 4.8 },
  { label: 'CLIMATE', x: 380, y: 350, ox: 380, oy: 350, phase: 6.0 }
];

let netMouseX = centralHub.x;
let netMouseY = centralHub.y;
let netHovered = false;

netCanvas.addEventListener('mousemove', (e) => {
  const rect = netCanvas.getBoundingClientRect();
  netMouseX = (e.clientX - rect.left) * (netCanvas.width / rect.width);
  netMouseY = (e.clientY - rect.top) * (netCanvas.height / rect.height);
  netHovered = true;
});

netCanvas.addEventListener('mouseleave', () => { netHovered = false; });

let time = 0;

function animateNetwork() {
  netCtx.clearRect(0, 0, netCanvas.width, netCanvas.height);
  time += 0.02;

  // Interactively pull Central Hub toward cursor on hover
  const targetX = netHovered ? netMouseX : 380;
  const targetY = netHovered ? netMouseY : 220;
  centralHub.x += (targetX - centralHub.x) * 0.08;
  centralHub.y += (targetY - centralHub.y) * 0.08;

  // Draw Central Green Node
  netCtx.fillStyle = '#22c55e';
  netCtx.shadowColor = 'rgba(34, 197, 94, 0.8)';
  netCtx.shadowBlur = 10;
  netCtx.fillRect(centralHub.x - 5, centralHub.y - 5, 10, 10);
  netCtx.shadowBlur = 0;

  // Update & Draw Floating Satellite Nodes
  satellites.forEach(sat => {
    // Gentle floating oscillation
    sat.x = sat.ox + Math.sin(time + sat.phase) * 12;
    sat.y = sat.oy + Math.cos(time * 0.8 + sat.phase) * 10;

    // Connect Lines between Satellites and Central Hub
    netCtx.beginPath();
    netCtx.moveTo(sat.x, sat.y);
    netCtx.lineTo(centralHub.x, centralHub.y);
    netCtx.strokeStyle = 'rgba(34, 197, 94, 0.35)';
    netCtx.lineWidth = 1;
    netCtx.stroke();

    // Connection Dot at box edge
    netCtx.fillStyle = '#22c55e';
    netCtx.fillRect(sat.x - 2, sat.y - 2, 4, 4);

    // Draw Box Enclosure
    netCtx.font = '11px "Fira Code", monospace';
    const textWidth = netCtx.measureText(sat.label).width;
    const paddingX = 12;
    const paddingY = 6;
    const boxWidth = textWidth + paddingX * 2;
    const boxHeight = 24;
    const boxX = sat.x - boxWidth / 2;
    const boxY = sat.y - boxHeight / 2;

    netCtx.fillStyle = 'rgba(3, 7, 18, 0.85)';
    netCtx.strokeStyle = '#1e293b';
    netCtx.lineWidth = 1;
    netCtx.fillRect(boxX, boxY, boxWidth, boxHeight);
    netCtx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Corner bracket markers
    netCtx.fillStyle = '#475569';
    netCtx.fillRect(boxX - 1, boxY - 1, 3, 3);
    netCtx.fillRect(boxX + boxWidth - 2, boxY + boxHeight - 2, 3, 3);

    // Label Text
    netCtx.fillStyle = '#22c55e';
    netCtx.textAlign = 'center';
    netCtx.textBaseline = 'middle';
    netCtx.fillText(sat.label, sat.x, sat.y);
  });

  requestAnimationFrame(animateNetwork);
}

animateNetwork();


// --- Single-Run Counter Animation on Viewport Entry ---
const counterElement = document.getElementById('counter');

function animateCounterOnce(element, target, duration = 2200) {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!element._isVisible) return; // Pause frame if scrolled out

    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Smooth ease-out cubic curve
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const currentCount = Math.floor(easeOutProgress * target);
    
    element.innerText = currentCount;

    if (progress < 1) {
      element._animId = window.requestAnimationFrame(step);
    } else {
      element.innerText = target; // Lock to exact target value
    }
  };

  window.cancelAnimationFrame(element._animId);
  element._animId = window.requestAnimationFrame(step);
}

// Observer to fire counting animation once on enter, reset on leave
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!counterElement) return;

    if (entry.isIntersecting) {
      if (!counterElement._isVisible) {
        counterElement._isVisible = true;
        const target = parseInt(counterElement.getAttribute('data-target'), 10) || 2000;
        animateCounterOnce(counterElement, target);
      }
    } else {
      // Reset state when scrolled completely off-screen
      counterElement._isVisible = false;
      window.cancelAnimationFrame(counterElement._animId);
      counterElement.innerText = "0";
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection && counterElement) {
  statsObserver.observe(statsSection);
}

// --- Method Accordion Toggle Logic ---
const cards = document.querySelectorAll('.accordion-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// --- Accordion Canvas Dot Matrix Renderers ---
const cardCanvases = document.querySelectorAll('.card-canvas');

cardCanvases.forEach(canvas => {
  const ctx = canvas.getContext('2d');
  const shapeType = canvas.getAttribute('data-shape');
  
  const cols = 24;
  const rows = 14;
  const spacing = 18;
  const dotSize = 2.5;

  canvas.width = cols * spacing;
  canvas.height = rows * spacing;

  // Render Background Matrix with Shape Highlighting
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * spacing + spacing / 2;
      const y = r * spacing + spacing / 2;

      let isShape = false;

      // Shape Matrix Definitions
      if (shapeType === '1') {
        // Question Mark (?) Matrix Shape
        const topCurve = (r === 2 || r === 3) && (c >= 8 && c <= 15);
        const leftArch = (r >= 4 && r <= 5) && (c >= 8 && c <= 10);
        const rightArch = (r >= 4 && r <= 7) && (c >= 13 && c <= 15);
        const middleHook = (r >= 6 && r <= 8) && (c >= 10 && c <= 13);
        const stem = (r >= 8 && r <= 10) && (c >= 11 && c <= 12);
        const dot = (r >= 12 && r <= 13) && (c >= 11 && c <= 12);

        if (topCurve || leftArch || rightArch || middleHook || stem || dot) {
          isShape = true;
        }

      } else if (shapeType === '2') {
        // Arch / Hook
        if ((r >= 2 && r <= 4 && c >= 8 && c <= 15) || (c >= 13 && c <= 15 && r >= 4 && r <= 11) || (c >= 8 && c <= 10 && r >= 4 && r <= 7)) isShape = true;
      } else if (shapeType === '3') {
        // Hexagon / Ring Loop
        if ((r >= 2 && r <= 11 && (c === 7 || c === 8 || c === 15 || c === 16)) || ((r === 2 || r === 3 || r === 10 || r === 11) && c >= 8 && c <= 15)) isShape = true;
      } else if (shapeType === '4') {
        // "Q" Glyph Matrix
        if ((r >= 2 && r <= 10 && (c === 8 || c === 9 || c === 15 || c === 16)) || ((r === 2 || r === 3 || r === 9 || r === 10) && c >= 8 && c <= 16) || (r >= 8 && r <= 12 && c >= 14 && c <= 17)) isShape = true;
      }

      if (isShape) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#115e2b';
        ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
      }
    }
  }
});

