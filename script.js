
'use strict';

/* =====================================================
   CONFIGURATION ET UTILITAIRES
===================================================== */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const isMobile = window.matchMedia('(pointer: coarse)').matches;


/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

const progressBar = $('#scrollProgress');

function updateScrollProgress() {
  if (!progressBar) return;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener('scroll', updateScrollProgress, {
  passive: true
});

window.addEventListener('resize', updateScrollProgress, {
  passive: true
});

updateScrollProgress();


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = $('#cursor');
const cursorRing = $('#cursorRing');

if (cursor && cursorRing && !isMobile && !prefersReducedMotion) {

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  let animationFrame = null;

  document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateRing);
    }
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    const distance = Math.hypot(mouseX - ringX, mouseY - ringY);

    if (distance > 0.5) {
      animationFrame = requestAnimationFrame(animateRing);
    } else {
      ringX = mouseX;
      ringY = mouseY;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      animationFrame = null;
    }
  }

  // Effet au survol des éléments interactifs
  const interactiveElements = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    '[role="button"]',
    '.skill-card',
    '.exp-card',
    '.projet-card',
    '.module-card'
  ].join(', ');

  document.addEventListener('mouseover', event => {
    if (event.target.closest(interactiveElements)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', event => {
    if (
      event.target.closest(interactiveElements) &&
      !event.relatedTarget?.closest(interactiveElements)
    ) {
      document.body.classList.remove('cursor-hover');
    }
  });

}


/* =====================================================
   NAVBAR SCROLL BEHAVIOR
===================================================== */

const navbar = $('#navbar');

function updateNavbar() {
  if (!navbar) return;

  navbar.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', updateNavbar, {
  passive: true
});

updateNavbar();


/* =====================================================
   HAMBURGER MENU
===================================================== */

const hamburger = $('#hamburger');
const mobileMenu = $('#mobileMenu');

if (hamburger && mobileMenu) {

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');

    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute(
      'aria-label',
      isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
    );
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Fermeture après clic sur un lien
  $$('.mobile-link', mobileMenu).forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Fermeture lors d'un clic extérieur
  document.addEventListener('click', event => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Fermeture lorsque l'écran passe en mode desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = $$('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion) {

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add('visible');
  });

}


/* =====================================================
   ACTIVE NAV LINK
===================================================== */

const sections = $$('section[id]');
const navLinks = $$('.nav-links a');

if ('IntersectionObserver' in window) {

  const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      const activeLink = $(
        `.nav-links a[href="#${CSS.escape(entry.target.id)}"]`
      );

      if (activeLink) {
        activeLink.classList.add('active');
      }

    });

  }, {
    threshold: 0.3,
    rootMargin: '-10% 0px -40% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* =====================================================
   SKILL TABS
===================================================== */

const skillTabs = $$('.skill-tab');
const skillCards = $$('.skill-card');

skillTabs.forEach(tab => {

  tab.addEventListener('click', () => {

    // Désactivation des autres onglets
    skillTabs.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    // Activation de l'onglet sélectionné
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const category = tab.dataset.cat;

    skillCards.forEach((card, index) => {

      const matches =
        category === 'all' ||
        card.dataset.cat === category;

      card.style.display = matches ? '' : 'none';

      if (matches && !prefersReducedMotion) {
        card.style.animationDelay = `${index * 0.05}s`;
      } else {
        card.style.animationDelay = '';
      }

    });

  });

});


/* =====================================================
   CONTACT FORM
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const sendBtn = $('#sendBtn');
  const formMessage = $('#formMessage');
  const btnText = $('#btnText');

  const nameInput = $('#userName');
  const emailInput = $('#userEmail');
  const subjectInput = $('#userSubject');
  const messageInput = $('#userMessage');

  if (!sendBtn) return;

  const originalButtonText = btnText
    ? btnText.textContent
    : 'Envoyer le message →';

  let isSending = false;

  function showMsg(message, type) {

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-msg ${type}`;

    formMessage.setAttribute('role', 'status');
    formMessage.setAttribute('aria-live', 'polite');

  }

  function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }

  function setLoading(loading) {

    sendBtn.disabled = loading;
    sendBtn.setAttribute('aria-busy', String(loading));

    if (btnText) {
      btnText.textContent = loading
        ? 'Envoi en cours...'
        : originalButtonText;
    }

  }

  sendBtn.addEventListener('click', async () => {

    if (isSending) return;

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const subject = subjectInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    // Vérification des champs
    if (!name || !email || !subject || !message) {
      showMsg('Veuillez remplir tous les champs.', 'error');
      return;
    }

    // Vérification de l'adresse e-mail
    if (!validateEmail(email)) {
      showMsg('Veuillez entrer une adresse e-mail valide.', 'error');
      emailInput?.focus();
      return;
    }

    // Protection contre les messages trop longs
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      showMsg('Certains champs dépassent la longueur autorisée.', 'error');
      return;
    }

    isSending = true;
    setLoading(true);

    try {

      const response = await fetch(
        'https://formsubmit.co/ajax/juniorngandu18@gmail.com',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },

          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _captcha: false,
            _template: 'table'
          })

        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error('Réponse invalide du serveur.');
      }

      if (!response.ok || result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'Échec de l’envoi.');
      }

      showMsg(
        'Message envoyé avec succès ! Je vous répondrai très bientôt.',
        'success'
      );

      // Réinitialisation du formulaire
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (subjectInput) subjectInput.value = '';
      if (messageInput) messageInput.value = '';

    } catch (error) {

      console.error('Erreur formulaire :', error);

      showMsg(
        'Impossible d’envoyer votre message. Vérifiez votre connexion ou réessayez plus tard.',
        'error'
      );

    } finally {

      isSending = false;
      setLoading(false);

    }

  });

});


/* =====================================================
   SMOOTH NUMBER COUNTER
===================================================== */

function animateValue(element, endValue, duration = 1200) {

  if (!element || element.dataset.animated === 'true') return;

  element.dataset.animated = 'true';

  const originalText = element.textContent.trim();

  const prefix = originalText.match(/^\D*/)?.[0] || '';
  const suffix = originalText.match(/\D*$/)?.[0] || '';

  const startTime = performance.now();

  function update(currentTime) {

    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    // Fonction d'accélération/décélération
    const eased = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.floor(endValue * eased);

    element.textContent = prefix + currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = originalText;
      element.textContent = prefix + endValue + suffix;
    }

  }

  if (prefersReducedMotion) {
    element.textContent = prefix + endValue + suffix;
    return;
  }

  requestAnimationFrame(update);

}


/* =====================================================
   COUNTER OBSERVER
===================================================== */

const counterElements = $$('.impact-row, .hero-stats');

if ('IntersectionObserver' in window) {

  const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const numbers = $$('.impact-num, .stat-num', entry.target);

      numbers.forEach(element => {

        const match = element.textContent.match(/\d+/);

        if (!match) return;

        const value = parseInt(match[0], 10);

        if (value > 0) {
          animateValue(element, value);
        }

      });

      counterObserver.unobserve(entry.target);

    });

  }, {
    threshold: 0.5
  });

  counterElements.forEach(element => {
    counterObserver.observe(element);
  });

} else {

  counterElements.forEach(container => {

    $$('.impact-num, .stat-num', container).forEach(element => {

      const match = element.textContent.match(/\d+/);

      if (match) {
        animateValue(element, parseInt(match[0], 10));
      }

    });

  });

}


/* =====================================================
   INITIALISATION
===================================================== */

console.info(
  '%cJunior.dev | Portfolio chargé avec succès.',
  'color: #2563eb; font-weight: bold; font-size: 13px;'
);
