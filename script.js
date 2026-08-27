// ================= 1. VARIABLE TYPOGRAPHY PROXIMITY EFFECT =================
window.addEventListener('DOMContentLoaded', () => {
  const chars = document.querySelectorAll('.kinetic-char');

  if (chars.length > 0) {
    window.addEventListener('mousemove', (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
        const maxDist = 200;

        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          char.style.fontWeight = Math.round(200 + intensity * 700);
          char.style.transform = `scale(${(1 + intensity * 0.15).toFixed(2)}) translateY(-${intensity * 8}px)`;
          char.style.color = '#00f0ff';
          char.style.textShadow = '0 0 25px rgba(0, 240, 255, 0.7)';
        } else {
          char.style.fontWeight = '200';
          char.style.transform = 'scale(1) translateY(0px)';
          char.style.color = '#ffffff';
          char.style.textShadow = 'none';
        }
      });
    });
  }
});

// ================= 2. MODAL CONTROLS =================
function openJourneyModal() {
  const m = document.getElementById('education-journey-modal');
  if (m) m.style.display = 'flex';
}
function closeJourneyModal() {
  const m = document.getElementById('education-journey-modal');
  if (m) m.style.display = 'none';
}

function openIDCardModal() {
  const m = document.getElementById('student-id-modal');
  if (m) m.style.display = 'flex';
}
function closeIDCardModal() {
  const m = document.getElementById('student-id-modal');
  if (m) m.style.display = 'none';
}

// Background click close
window.addEventListener('click', (e) => {
  const jModal = document.getElementById('education-journey-modal');
  const idModal = document.getElementById('student-id-modal');
  if (e.target === jModal) closeJourneyModal();
  if (e.target === idModal) closeIDCardModal();
});

// ================= 3. AI VIDEO SOUND TOGGLE =================
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
// ================= VIDEO-ACCURATE KINETIC TRACKING =================
document.addEventListener('DOMContentLoaded', () => {
  const chars = document.querySelectorAll('.kinetic-char');

  if (chars.length > 0) {
    window.addEventListener('mousemove', (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
        const maxDist = 260; // Smooth wave distance

        if (dist < maxDist) {
          const intensity = Math.pow(1 - dist / maxDist, 2); // Smooth ease curve
          const weight = Math.round(200 + intensity * 700);
          const scale = (1 + intensity * 0.18).toFixed(3);
          const translateY = -(intensity * 12).toFixed(1);

          char.style.fontWeight = weight;
          char.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          char.style.color = '#00f0ff';
          char.style.textShadow = `0 0 ${Math.round(intensity * 30)}px rgba(0, 240, 255, 0.8)`;
        } else {
          char.style.fontWeight = '300';
          char.style.transform = 'scale(1) translateY(0px)';
          char.style.color = '#ffffff';
          char.style.textShadow = 'none';
        }
      });
    });
  }
});