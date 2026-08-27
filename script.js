// Initialize AOS
AOS.init();

// ========================================================
// 3D INTERACTIVE PARTICLE WAVE & CONSTELLATION MESH
// ========================================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

const symbols = ['< />', '{ }', 'AI', '∫dx', 'λ', '01', '&&', '=>', 'DY'];

class Particle3D {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // Depth
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.2 + 1;
        this.isSymbol = Math.random() > 0.85;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.baseColor = Math.random() > 0.5 ? '#38bdf8' : '#c084fc';
    }

    draw() {
        ctx.save();
        if (this.isSymbol) {
            ctx.font = `${10 * this.z}px monospace`;
            ctx.fillStyle = this.baseColor;
            ctx.globalAlpha = 0.35 * this.z;
            ctx.fillText(this.symbol, this.x, this.y);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.z, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor;
            ctx.shadowBlur = 10 * this.z;
            ctx.shadowColor = this.baseColor;
            ctx.globalAlpha = 0.6 * this.z;
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.x += this.vx * this.z;
        this.y += this.vy * this.z;

        // Bounce back smoothly
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (repel & connect)
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 4;
                this.y -= (dy / dist) * force * 4;
            }
        }
    }
}

// Populate particles
const count = Math.floor((width * height) / 10000);
particles = Array.from({ length: Math.min(count, 90) }, () => new Particle3D());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                let alpha = (1 - dist / 110) * 0.22;
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateBackground() {
    ctx.clearRect(0, 0, width, height);
    connectParticles();
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateBackground);
}

animateBackground();
// AI Assistant Logic
const aiToggleBtn = document.getElementById("ai-toggle-btn");
const aiChatWindow = document.getElementById("ai-chat-window");
const aiCloseBtn = document.getElementById("ai-close-btn");
const aiChatForm = document.getElementById("ai-chat-form");
const aiUserInput = document.getElementById("ai-user-input");
const aiChatMessages = document.getElementById("ai-chat-messages");

aiToggleBtn.addEventListener("click", () => {
    aiChatWindow.classList.toggle("hidden");
});

aiCloseBtn.addEventListener("click", () => {
    aiChatWindow.classList.add("hidden");
});

// Automated AI Answers Database
function getAIResponse(userText) {
    const text = userText.toLowerCase();

    if (text.includes("who are you") || text.includes("name") || text.includes("intro")) {
        return "I am Aria, Durgesh's AI portfolio assistant! I can help you learn more about his background, projects, and skills.";
    } else if (text.includes("skill") || text.includes("tech") || text.includes("stack")) {
        return "Durgesh is skilled in HTML5, CSS3, JavaScript, React.js, Node.js, Canvas Animations, and Git/GitHub!";
    } else if (text.includes("project") || text.includes("work")) {
        return "Durgesh has built several projects including a Clinic Management Portal, Attendance Tracker, and this Animated Portfolio!";
    } else if (text.includes("contact") || text.includes("email") || text.includes("whatsapp") || text.includes("number")) {
        return "You can email him at dy4991919@gmail.com or WhatsApp him at +91 9369578796. Feel free to use the contact form below!";
    } else if (text.includes("hire") || text.includes("job") || text.includes("available")) {
        return "Durgesh is open to freelance projects and software development roles! Drop a message in the contact section to discuss.";
    } else if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
        return "Hey there! How can I help you explore Durgesh's portfolio today?";
    } else {
        return "That sounds interesting! For detailed inquiries, please send a message using the contact form or reach out directly on WhatsApp.";
    }
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-msg ${sender === "bot" ? "bot-msg" : "user-msg"}`;
    msgDiv.innerText = text;
    aiChatMessages.appendChild(msgDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

aiChatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = aiUserInput.value.trim();
    if (!query) return;

    appendMessage("user", query);
    aiUserInput.value = "";

    setTimeout(() => {
        const response = getAIResponse(query);
        appendMessage("bot", response);
    }, 450);
});

// Quick Action Chips Function
window.sendQuickMessage = function(text) {
    if (aiChatWindow.classList.contains("hidden")) {
        aiChatWindow.classList.remove("hidden");
    }
    appendMessage("user", text);
    setTimeout(() => {
        const response = getAIResponse(text);
        appendMessage("bot", response);
    }, 450);
};
// Dynamic 3D Name Tilt & Subtle Parallax Effect on Cursor Move
const nameHeader = document.getElementById("interactive-name");
const portraitImg = document.getElementById("hero-img");

window.addEventListener("mousemove", (e) => {
    if (!nameHeader) return;

    const { innerWidth, innerHeight } = window;
    const xRatio = (e.clientX / innerWidth) - 0.5;
    const yRatio = (e.clientY / innerHeight) - 0.5;

    // 3D tilt angle calculation
    const rotX = -yRatio * 12;
    const rotY = xRatio * 15;
    nameHeader.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    // Parallax depth motion on photo
    if (portraitImg) {
        portraitImg.style.transform = `scale(1.02) translate(${xRatio * 15}px, ${yRatio * 15}px)`;
    }
});
// Embedded Anime Chatbot Logic
const animeChatForm = document.getElementById("anime-chat-form");
const animeUserInput = document.getElementById("anime-user-input");
const animeChatMessages = document.getElementById("anime-chat-messages");
const animeSpeechText = document.getElementById("anime-speech-text");

function getAnimeResponse(query) {
    const q = query.toLowerCase();
    if (q.includes("skill") || q.includes("tech")) {
        return "Durgesh is expert in HTML, CSS, JavaScript, React.js, Node.js, and interactive web graphics!";
    } else if (q.includes("project") || q.includes("work")) {
        return "He has built a Clinic Management System, Lab Tracker, and this amazing animated portfolio!";
    } else if (q.includes("contact") || q.includes("call")) {
        return "You can reach him via WhatsApp at +91 9369578796 or email at dy4991919@gmail.com!";
    } else {
        return "That's cool! Feel free to explore his featured projects or drop a message below!";
    }
}

function appendAnimeMsg(sender, text) {
    const div = document.createElement("div");
    div.className = `a-msg ${sender}`;
    div.innerText = text;
    animeChatMessages.appendChild(div);
    animeChatMessages.scrollTop = animeChatMessages.scrollHeight;
    
    if(sender === 'bot') {
        animeSpeechText.innerText = text; // Update speech bubble too!
    }
}

if (animeChatForm) {
    animeChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = animeUserInput.value.trim();
        if (!text) return;

        appendAnimeMsg("user", text);
        animeUserInput.value = "";

        setTimeout(() => {
            const reply = getAnimeResponse(text);
            appendAnimeMsg("bot", reply);
        }, 400);
    });
}

window.sendAnimeMsg = function(topic) {
    appendAnimeMsg("user", topic);
    setTimeout(() => {
        const reply = getAnimeResponse(topic);
        appendAnimeMsg("bot", reply);
    }, 400);
};
// ==========================================
// ANIME GIRL NAV TRANSITION LOGIC
// ==========================================
window.triggerAnimeTransition = function(targetId, event) {
    event.preventDefault(); // Default jump rokenge taaki smooth animation dikhe

    const overlay = document.getElementById("anime-overlay");
    const dialogue = document.getElementById("anime-dialogue");
    
    if (!overlay) return;

    // Custom dialogues based on clicked option
    const messages = {
        home: "Heading back to Home base! 🚀",
        projects: "Pulling up Durgesh's awesome Projects! 💻",
        about: "Let's check out his Skills & About section! ✨",
        contact: "Opening up the Contact portal for you! 📞"
    };

    if (dialogue) {
        dialogue.innerText = messages[targetId] || "Navigating...";
    }

    // 1. Anime character slides in from side
    overlay.classList.add("active");

    // 2. Page scrolls smoothly after a brief cinematic delay
    setTimeout(() => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    }, 450);

    // 3. Hide anime overlay after transition completes
    setTimeout(() => {
        overlay.classList.remove("active");
    }, 1300);
};
window.toggleIntroVoice = function() {
    const video = document.getElementById("hero-avatar-video");
    const icon = document.getElementById("audioIcon");
    const btn = document.getElementById("audioToggleBtn");
    
    if (!video) return;

    if (video.muted) {
        video.muted = false;
        video.currentTime = 0; // Starts intro from beginning with sound
        video.play();
        icon.className = "fa-solid fa-volume-high";
        btn.querySelector("span").innerText = "Mute";
    } else {
        video.muted = true;
        icon.className = "fa-solid fa-volume-xmark";
        btn.querySelector("span").innerText = "Unmute Intro";
    }
};
// ==========================================
// RESUME MODAL HANDLER
// ==========================================
window.openResumeModal = function() {
    const modal = document.getElementById("resumeModalOverlay");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Background scroll stop
    }
};

window.closeResumeModal = function() {
    const modal = document.getElementById("resumeModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto"; // Re-enable scroll
    }
};
// ==========================================
// ROADMAP SCROLL ANIMATION OBSERVER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const roadmapItems = document.querySelectorAll(".roadmap-item");

    const roadmapObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered smooth opening animation
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    roadmapItems.forEach(item => roadmapObserver.observe(item));
});
// ==========================================
// HANGING 3D ID CARD TOGGLE LOGIC
// ==========================================
window.toggleHangingID = function() {
    const overlay = document.getElementById("hangingIdOverlay");
    if (overlay) {
        overlay.classList.toggle("active");
        if (overlay.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }
};
// Cursor Proximity Font Weight Effect for "DURGESH"
const nameContainer = document.getElementById('interactive-name');
if (nameContainer) {
  const letters = nameContainer.querySelectorAll('.letter');

  document.addEventListener('mousemove', (e) => {
    letters.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;

      // Distance calculate karo cursor aur letter ke beech ka
      const distanceX = e.clientX - letterCenterX;
      const distanceY = e.clientY - letterCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Agar cursor paas hai (radius 180px), toh weight badhao
      if (distance < 180) {
        const weight = Math.max(100, Math.min(900, 900 - (distance * 4.5)));
        const scale = Math.max(1, Math.min(1.15, 1.15 - (distance / 1200)));
        
        letter.style.fontWeight = Math.round(weight);
        letter.style.transform = `scale(${scale}) translateY(-${(180 - distance) / 15}px)`;
        letter.style.color = '#00f0ff';
      } else {
        // Door jaane par normal kar do
        letter.style.fontWeight = '100';
        letter.style.transform = 'scale(1) translateY(0px)';
        letter.style.color = '#ffffff';
      }
    });
  });
}
// Variable Typography Weight Tracking for "DURGESH"
const kineticChars = document.querySelectorAll('.kinetic-char');

if (kineticChars.length > 0) {
  window.addEventListener('mousemove', (e) => {
    kineticChars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      // Distance calculation
      const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
      const maxDistance = 240; // Effect radius in px

      if (dist < maxDistance) {
        // Normalizes distance: 0 (closest) to 1 (far away)
        const intensity = 1 - dist / maxDistance;
        
        // Dynamic weight: 200 (ultra thin) to 900 (ultra bold)
        const targetWeight = Math.round(200 + intensity * 700);
        const scale = (1 + intensity * 0.12).toFixed(2);
        
        char.style.fontWeight = targetWeight;
        char.style.transform = `scale(${scale}) translateY(-${intensity * 6}px)`;
        char.style.color = intensity > 0.6 ? '#ffffff' : '#e2e8f0';
        char.style.textShadow = intensity > 0.5 ? '0 0 25px rgba(0, 240, 255, 0.4)' : 'none';
      } else {
        char.style.fontWeight = '200';
        char.style.transform = 'scale(1) translateY(0px)';
        char.style.color = '#cbd5e1';
        char.style.textShadow = 'none';
      }
    });
  });
}
// Toggle Sound for AI Intro Video
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
      if (text) text.innerText = 'Unmute Voice';
    }
  }
}