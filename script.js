// ================= 1. DURGESH KINETIC VARIABLE TYPOGRAPHY =================
document.addEventListener('DOMContentLoaded', () => {
  const kineticChars = document.querySelectorAll('.kinetic-char');

  if (kineticChars.length > 0) {
    window.addEventListener('mousemove', (e) => {
      kineticChars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
        const maxDist = 220; // Proximity radius

        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          const weight = Math.round(200 + intensity * 700);
          const scale = (1 + intensity * 0.15).toFixed(2);

          char.style.fontWeight = weight;
          char.style.transform = `scale(${scale}) translateY(-${intensity * 8}px)`;
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

// ================= 2. MODAL CONTROLLERS (GLOBAL WINDOW SCOPE) =================
// Journey Modal
window.openJourneyModal = function() {
  const m = document.getElementById('education-journey-modal');
  if (m) m.style.display = 'flex';
};

window.closeJourneyModal = function() {
  const m = document.getElementById('education-journey-modal');
  if (m) m.style.display = 'none';
};

// ID Card Modal
window.openIDCardModal = function() {
  const idM = document.getElementById('student-id-modal');
  if (idM) idM.style.display = 'flex';
};

window.closeIDCardModal = function() {
  const idM = document.getElementById('student-id-modal');
  if (idM) idM.style.display = 'none';
};

// Background Click to Close Modals
window.addEventListener('click', function(e) {
  const jModal = document.getElementById('education-journey-modal');
  const idModal = document.getElementById('student-id-modal');
  if (e.target === jModal) jModal.style.display = 'none';
  if (e.target === idModal) idModal.style.display = 'none';

});
// DURGESH Mouse Wave Tracking
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

// Video Sound Unmute Function
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