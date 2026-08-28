// ================= 1. RADAR INTRO VIDEO SOUND TOGGLE =================
window.toggleRadarVoice = function() {
  const video = document.getElementById('radarVideo');
  const icon = document.getElementById('voiceIcon');
  const text = document.getElementById('voiceText');

  if (video) {
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch((e) => console.log('Autoplay audio blocked:', e));
      if (icon) icon.className = 'fa-solid fa-volume-high';
      if (text) text.innerText = 'PLAYING';
    } else {
      video.muted = true;
      if (icon) icon.className = 'fa-solid fa-volume-xmark';
      if (text) text.innerText = 'UNMUTE';
    }
  }
};

// ================= 2. 3D AVATAR CARD TILT PHYSICS =================
document.addEventListener('DOMContentLoaded', () => {
  const avatarCard = document.getElementById('avatar3DCard');
  if (avatarCard) {
    window.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const xOffset = (e.clientX - cardCenterX) / 12;
      const yOffset = (cardCenterY - e.clientY) / 12;

      avatarCard.style.transform = `rotateY(${xOffset}deg) rotateX(${yOffset}deg)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  // ================= 3. DURGESH TITLE CIRCULAR STRETCH WAVE =================
  const durgeshChars = document.querySelectorAll('.d-char');
  const durgeshWrapper = document.getElementById('durgesh3D');

  if (durgeshChars.length > 0) {
    window.addEventListener('mousemove', (e) => {
      durgeshChars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - charCenterX;
        const deltaY = e.clientY - charCenterY;
        const distance = Math.hypot(deltaX, deltaY);
        const maxRadius = 160;

        if (distance < maxRadius) {
          const force = 1 - distance / maxRadius;
          const angle = Math.atan2(deltaY, deltaX);

          const scaleX = (1 + force * 0.38 * Math.cos(angle)).toFixed(3);
          const scaleY = (1 + force * 0.38 * Math.sin(angle)).toFixed(3);
          const moveX = (-(deltaX / distance) * force * 10).toFixed(2);
          const moveY = (-(deltaY / distance) * force * 10).toFixed(2);

          char.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scaleX}, ${scaleY})`;
        } else {
          char.style.transform = 'translate(0px, 0px) scale(1, 1)';
        }
      });
    });

    if (durgeshWrapper) {
      durgeshWrapper.addEventListener('mouseleave', () => {
        durgeshChars.forEach((char) => {
          char.style.transform = 'translate(0px, 0px) scale(1, 1)';
        });
      });
    }
  }
});

// ================= 4. VIEW CV / RESUME 3D MODAL =================
window.openResumeModal = function() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.addEventListener('mousemove', handleCV3DTilt);
  }
};

window.closeResumeModal = function(e) {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    window.removeEventListener('mousemove', handleCV3DTilt);
    const card = document.getElementById('cvPaperCard');
    if (card) card.style.transform = 'none';
  }
};

function handleCV3DTilt(e) {
  const card = document.getElementById('cvPaperCard');
  if (!card) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
  const yAxis = (window.innerHeight / 2 - e.pageY) / -45;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}
// ================= INTERACTIVE NAVBAR ACTIVE ON CLICK & SCROLL =================
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-pill-item');
  const sections = document.querySelectorAll('main, section');

  // 1. Instant Active Highlight on Click
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      navLinks.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 2. Dynamic Highlight on Scroll
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
// ================= LIVE CONTACT FORM SUBMISSION =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
    }
  });
}
// ================= AI CHATBOT LOGIC =================
window.toggleChatBot = function() {
  const chatWin = document.getElementById('aiChatWindow');
  const botIcon = document.getElementById('botIcon');
  if (chatWin) {
    chatWin.classList.toggle('active');
    if (chatWin.classList.contains('active')) {
      botIcon.className = 'fa-solid fa-xmark';
      document.getElementById('chatInput').focus();
    } else {
      botIcon.className = 'fa-solid fa-robot';
    }
  }
};

window.quickAsk = function(question) {
  const input = document.getElementById('chatInput');
  input.value = question;
  handleChatSubmit(new Event('submit'));
};

window.handleChatSubmit = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const query = input.value.trim();
  if (!query) return;

  // Add User Message
  appendChatMessage(query, 'user-msg');
  input.value = '';

  // Show Typing Indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot-msg typing-msg';
  typingDiv.innerHTML = '<p><i class="fa-solid fa-circle-notch fa-spin"></i> Typing...</p>';
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Generate Smart Reply
  setTimeout(() => {
    typingDiv.remove();
    const reply = getBotReply(query.toLowerCase());
    appendChatMessage(reply, 'bot-msg');
  }, 600);
};

function appendChatMessage(text, className) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${className}`;
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `<p>${text}</p><span class="msg-time">${timeStr}</span>`;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(q) {
  if (q.includes('who') || q.includes('about') || q.includes('durgesh') || q.includes('raj')) {
    return "Durgesh Yadav is a passionate <strong>Full-Stack Developer</strong> and B.Tech CSE student (2025-2029) based in India. He creates modern, interactive web experiences!";
  } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) {
    return "Durgesh is skilled in <strong>C, C++, HTML5, CSS3, JavaScript</strong>, Responsive Web Design, 3D Web UI, RESTful APIs, and basic troubleshooting & data operations.";
  } else if (q.includes('project') || q.includes('work')) {
    return "He has built 6 featured projects including <strong>E-Commerce Website, Portfolio, Weather App, Blog Platform, Game Landing Page</strong>, and <strong>Task Manager</strong>. Scroll to the Projects section to check them out!";
  } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('call')) {
    return "You can reach Durgesh via Email at <a href='mailto:dy4991919@gmail.com' style='color:#ff3366;'>dy4991919@gmail.com</a> or call/WhatsApp at <a href='tel:+919369578796' style='color:#ff3366;'>+91 9369578796</a>.";
  } else if (q.includes('resume') || q.includes('cv') || q.includes('qualification')) {
    return "Durgesh scored <strong>86% in 10th</strong>, <strong>65.5% in 12th</strong>, and is pursuing B.Tech in CSE at Maharana Pratap Engineering College. Click <em>'View CV'</em> on the Home page to see his complete resume!";
  } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
    return "Hello! 😊 How can I assist you with Durgesh's portfolio today?";
  } else {
    return "Thanks for asking! Durgesh is available for freelance work and collaborations. You can message him directly using the Contact form at the bottom!";
  }
}
// ================= FIRE FLAME CURSOR PARTICLE SYSTEM =================
(function() {
  const canvas = document.getElementById('fireCursorCanvas');
  const core = document.getElementById('cursorCore');
  if (!canvas || !core) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -100, y: -100, isHovering: false };
  const particles = [];

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    core.style.left = `${mouse.x}px`;
    core.style.top = `${mouse.y}px`;

    // Normal movement emits 2 flame sparks, Hover emits 6 sparks
    const spawnCount = mouse.isHovering ? 6 : 2;
    for (let i = 0; i < spawnCount; i++) {
      createFireParticle(mouse.x, mouse.y, mouse.isHovering);
    }
  });

  function createFireParticle(x, y, supercharge) {
    const angle = (Math.random() * Math.PI) + Math.PI * 0.5; // Natural upward drift
    const speed = (Math.random() * 2 + 1) * (supercharge ? 2.2 : 1);
    
    // Crimson to Fire Gradient Colors
    const colors = supercharge 
      ? ['#ffffff', '#ff3366', '#ff0055', '#ffaa00', '#ff2a00'] 
      : ['#ff3366', '#d61c4e', '#8f0e31', '#ff597b'];

    particles.push({
      x: x + (Math.random() - 0.5) * (supercharge ? 16 : 8),
      y: y + (Math.random() - 0.5) * (supercharge ? 16 : 8),
      vx: (Math.random() - 0.5) * (supercharge ? 3.5 : 1.5),
      vy: -Math.cos(angle) * speed - (supercharge ? 2.5 : 1.2),
      size: (Math.random() * (supercharge ? 7 : 4)) + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.03 + (supercharge ? 0.02 : 0.035),
      growth: supercharge ? 1.02 : 0.98
    });
  }

  function renderFire() {
    ctx.clearRect(0, 0, width, height);

    // Clickable Hover Ambient Spark Burst
    if (mouse.isHovering && mouse.x > 0) {
      createFireParticle(mouse.x, mouse.y, true);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.size *= p.growth;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.size <= 0.3) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.shadowBlur = mouse.isHovering ? 18 : 8;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(renderFire);
  }
  renderFire();

  // Hover detection on all interactive buttons & cards
  const clickables = 'a, button, input, textarea, .reel-service-card, .project-glass-card, .split-dy-badge, .avatar-3d-card, .durgesh-3d-wrapper';
  
  function bindHoverTriggers() {
    document.querySelectorAll(clickables).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        mouse.isHovering = true;
        document.body.classList.add('fire-supercharged');
      });
      el.addEventListener('mouseleave', () => {
        mouse.isHovering = false;
        document.body.classList.remove('fire-supercharged');
      });
    });
  }
  bindHoverTriggers();
})();
// ================= EMOJI UNIVERSE CURSOR REACTION =================
let emojiMouseX = window.innerWidth / 2;
let emojiMouseY = window.innerHeight / 2;
let currentEmojiX = emojiMouseX;
let currentEmojiY = emojiMouseY;

window.addEventListener('mousemove', (e) => {
  emojiMouseX = e.clientX;
  emojiMouseY = e.clientY;
});

function animateEmojiUniverse() {
  currentEmojiX += (emojiMouseX - currentEmojiX) * 0.08;
  currentEmojiY += (emojiMouseY - currentEmojiY) * 0.08;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (currentEmojiX - centerX) / centerX;
  const deltaY = (currentEmojiY - centerY) / centerY;

  const emojis = document.querySelectorAll('.emoji-item');
  emojis.forEach((item) => {
    const depth = parseFloat(item.getAttribute('data-depth')) || 1.5;
    const moveX = -deltaX * 40 * depth;
    const moveY = -deltaY * 40 * depth;
    const rot = deltaX * 12 * depth;
    
    item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotate(${rot}deg)`;
  });

  requestAnimationFrame(animateEmojiUniverse);
}
animateEmojiUniverse();
// ================= FORMSPREE DIRECT AJAX SUBMIT =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const formData = new FormData(contactForm);

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.style.pointerEvents = 'none';
    status.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.innerHTML = 'Message Sent! ✅';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = 'Send Message';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.pointerEvents = 'auto';
        }, 3500);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      btn.innerHTML = 'Failed to Send ❌';
      btn.style.background = '#ef4444';
      btn.style.borderColor = '#ef4444';
      btn.style.pointerEvents = 'auto';

      setTimeout(() => {
        btn.innerHTML = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3500);
    }
  });
}