/* ──────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (progressBar) progressBar.style.width = scrolled + '%';
}, { passive: true });

/* ──────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
}, { passive: true });

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effects
document.querySelectorAll('a, button, input, textarea, .skill-card, .exp-card, .projet-card, .module-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ──────────────────────────────────────────────
   NAVBAR SCROLL BEHAVIOR
───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
}, { passive: true });

/* ──────────────────────────────────────────────
   HAMBURGER MENU
───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ──────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ──────────────────────────────────────────────
   ACTIVE NAV LINK (HIGHLIGHT CURRENT SECTION)
───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ──────────────────────────────────────────────
   SKILL TABS
───────────────────────────────────────────── */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillCards = document.querySelectorAll('.skill-card');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const cat = tab.dataset.cat;

    skillCards.forEach((card, i) => {
      const matches = cat === 'all' || card.dataset.cat === cat;
      if (matches) {
        card.style.display = '';
        card.style.animationDelay = (i * 0.05) + 's';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ──────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendBtn');
  const formMessage = document.getElementById('formMessage');
  const btnText = document.getElementById('btnText');

  if (!sendBtn) return;

  sendBtn.addEventListener('click', async () => {
    const name    = document.getElementById('userName')?.value.trim();
    const email   = document.getElementById('userEmail')?.value.trim();
    const subject = document.getElementById('userSubject')?.value.trim();
    const message = document.getElementById('userMessage')?.value.trim();

    if (!name || !email || !subject || !message) {
      showMsg('Veuillez remplir tous les champs.', 'error');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      showMsg('Veuillez entrer un email valide.', 'error');
      return;
    }

    sendBtn.disabled = true;
    if (btnText) btnText.textContent = '⏳ Envoi en cours...';

    try {
      const res = await fetch('https://formsubmit.co/ajax/juniorngandu18@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name, email, subject, message,
          _captcha: false,
          _template: 'table'
        })
      });

      if (res.ok) {
        showMsg('✓ Message envoyé avec succès ! Je vous répondrai très bientôt.', 'success');
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userSubject').value = '';
        document.getElementById('userMessage').value = '';
      } else {
        showMsg('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
      }
    } catch {
      showMsg('Erreur de connexion. Veuillez réessayer.', 'error');
    } finally {
      sendBtn.disabled = false;
      if (btnText) btnText.textContent = 'Envoyer le message →';
    }
  });

  function showMsg(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'form-msg ' + type;
    if (type === 'success') {
      setTimeout(() => { formMessage.className = 'form-msg'; }, 6000);
    }
  }
});

/* ──────────────────────────────────────────────
   SMOOTH NUMBER COUNTER ON REVEAL
───────────────────────────────────────────── */
function animateValue(el, end, duration = 1200) {
  const raw = el.textContent;
  const suffix = raw.replace(/[\d]/g, '');
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const nums = entry.target.querySelectorAll('.impact-num, .stat-num');
    nums.forEach(el => {
      const numMatch = el.textContent.match(/\d+/);
      if (numMatch) {
        const value = parseInt(numMatch[0]);
        if (value > 0) animateValue(el, value);
      }
    });
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-row, .hero-stats').forEach(el => counterObserver.observe(el));
