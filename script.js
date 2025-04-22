// Navbar scroll effect
  // Toggle mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navContainer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Initialisation des animations au scroll
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      once: true
    });
  });
  

document.getElementById('modernContactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Animation de succès
  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<i class="bi bi-check2"></i> Message envoyé';
  submitBtn.style.backgroundColor = '#4ade80';
  
  // Réinitialiser après 3 secondes
  setTimeout(() => {
    this.reset();
    submitBtn.innerHTML = '<span>Envoyer le message</span><i class="bi bi-arrow-right"></i>';
    submitBtn.style.backgroundColor = 'var(--neon)';
    
    // Réinitialiser les labels flottants
    const inputs = this.querySelectorAll('.floating input, .floating textarea');
    inputs.forEach(input => {
      const label = input.nextElementSibling;
      if(input.value === '') {
        label.style.top = '15px';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--gray-light)';
      }
    });
  }, 3000);
});

// Gestion du sélecteur de langue
document.querySelectorAll('.language-option').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelector('.language-option.active').classList.remove('active');
    this.classList.add('active');
    // Ici vous ajouteriez la logique pour changer la langue
  });
});

// Effet de survol amélioré pour les réseaux sociaux
document.querySelectorAll('.social-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const tooltip = this.querySelector('.social-tooltip');
    tooltip.setAttribute('data-text', tooltip.textContent);
  });
});