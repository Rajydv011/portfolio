// Kinetic Letter Wave Motion
document.addEventListener('DOMContentLoaded', () => {
  const chars = document.querySelectorAll('.v-char');

  if (chars.length > 0) {
    window.addEventListener('mousemove', (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
        const maxDist = 280;

        if (dist < maxDist) {
          const intensity = Math.pow(1 - dist / maxDist, 2);
          const weight = Math.round(400 + intensity * 400);
          const scaleX = (1 + intensity * 0.22).toFixed(3);
          const scaleY = (1 + intensity * 0.12).toFixed(3);
          const translateY = -(intensity * 8).toFixed(1);

          char.style.fontWeight = weight;
          char.style.transform = `scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`;
        } else {
          char.style.fontWeight = '400';
          char.style.transform = 'scale(1, 1) translateY(0px)';
        }
      });
    });
  }
});

// Video Sound Unmute Toggle
function toggleIntroSound() {
  const vid = document.getElementById('introAiVideo');
  const icon = document.getElementById('soundIcon');
  const text = document.getElementById('soundText');
  if (vid) {
    if (vid.muted) {
      vid.muted = false;
      vid.volume = 1.0;
      vid.play();
      if (icon) icon.className = 'fa-solid fa-volume-high';
      if (text) text.innerText = 'Mute';
    } else {
      vid.muted = true;
      if (icon) icon.className = 'fa-solid fa-volume-xmark';
      if (text) text.innerText = 'Unmute';
    }
  }
}

// ID Card Modal Open & Close
function openIDCardModal() {
  const modal = document.getElementById('idCardModal');
  if (modal) modal.classList.add('active');
}

function closeIDCardModal(event) {
  const modal = document.getElementById('idCardModal');
  if (modal) modal.classList.remove('active');
}
// Open Modal with Rope Drop
function openIDCardModal() {
  const modal = document.getElementById('idCardModal');
  if (modal) {
    modal.classList.add('active');
    
    // Slight 3D swing effect on mousemove
    const card = document.getElementById('hangingCard');
    window.addEventListener('mousemove', handleCardSwing);
  }
}

function handleCardSwing(e) {
  const card = document.getElementById('hangingCard');
  if (!card) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 35;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}

// Close Modal
function closeIDCardModal(event) {
  const modal = document.getElementById('idCardModal');
  if (modal) {
    modal.classList.remove('active');
    window.removeEventListener('mousemove', handleCardSwing);
    const card = document.getElementById('hangingCard');
    if (card) card.style.transform = 'none';
  }
}
// ================= 3D RESUME MODAL & TILT PHYSICS =================
function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('active');
    window.addEventListener('mousemove', handleResume3DTilt);
  }
}

function closeResumeModal(event) {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('active');
    window.removeEventListener('mousemove', handleResume3DTilt);
    const card = document.getElementById('resumeCard');
    if (card) card.style.transform = 'none';
  }
}

function handleResume3DTilt(e) {
  const card = document.getElementById('resumeCard');
  if (!card) return;
  
  // Real-time 3D Perspective Tilt with cursor coordinates
  const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
  const yAxis = (window.innerHeight / 2 - e.pageY) / -35;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}
// ================= 3D RESUME MODAL CONTROLS =================
window.openResumeModal = function() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.addEventListener('mousemove', handleResume3DTilt);
  }
};

window.closeResumeModal = function(event) {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    window.removeEventListener('mousemove', handleResume3DTilt);
    const card = document.getElementById('resumeCard');
    if (card) card.style.transform = 'none';
  }
};

function handleResume3DTilt(e) {
  const card = document.getElementById('resumeCard');
  if (!card) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
  const yAxis = (window.innerHeight / 2 - e.pageY) / -40;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}