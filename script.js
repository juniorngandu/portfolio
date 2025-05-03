    // Initialisation AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Gestion du thème
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', toggleTheme);

    //-- JavaScript pour le filtrage -->

    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const serviceItems = document.querySelectorAll('.service-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Active le bouton cliqué
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filtre les services
                serviceItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });

        // Micro-interaction au survol des badges
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseover', () => {
                badge.style.transform = 'scale(1.1)';
                badge.style.transition = 'transform 0.2s';
            });
            badge.addEventListener('mouseout', () => {
                badge.style.transform = 'scale(1)';
            });
        });
    });

// <!-- JavaScript pour les nouvelles fonctionnalités -->

    // Conversion de devise
    const currencyRates = {
        usd: { eur: 0.85, gbp: 0.72, usd: 1 },
        gbp: { eur: 1.18, usd: 1.39, gbp: 1 },
        eur: { usd: 1.18, gbp: 0.85, eur: 1 }
    };

    document.querySelectorAll('.currency-selector button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.currency-selector .active').classList.remove('active');
            this.classList.add('active');
            
            const newCurrency = this.dataset.currency;
            convertPrices(newCurrency);
        });
    });

    function convertPrices(targetCurrency) {
        document.querySelectorAll('.price').forEach(priceElement => {
            const amount = parseInt(priceElement.querySelector('.amount').textContent);
            const convertedAmount = Math.round(amount * currencyRates.eur[targetCurrency]);
            priceElement.querySelector('.amount').textContent = convertedAmount;
            priceElement.querySelector('.currency').textContent = 
                targetCurrency === 'eur' ? '€' : targetCurrency === 'usd' ? '$' : '£';
        });
    }
    // section price plan
    document.addEventListener('DOMContentLoaded', function() {
        const popularBadge = document.querySelector('.popular-badge');
        
        setInterval(() => {
            popularBadge.style.transform = 'rotate(45deg) scale(1.05)';
            setTimeout(() => {
                popularBadge.style.transform = 'rotate(45deg) scale(1)';
            }, 300);
        }, 3000);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Animation au survol des cartes
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('popular')) {
                    card.style.borderColor = 'var(--primary-color)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('popular')) {
                    card.style.borderColor = 'rgba(0,0,0,0.1)';
                }
            });
        });

        // Effet de pulsation pour le plan recommandé
        const popularBadge = document.querySelector('.popular-badge');
        
        setInterval(() => {
            popularBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                popularBadge.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    });
    // Calculateur de devis
    const projectRates = {
        website: { simple: 500, medium: 1500, complex: 4000 },
        app: { simple: 1000, medium: 3000, complex: 8000 },
        desktop: { simple: 1000, medium: 3000, complex: 8000 }
    };

    document.getElementById('project-duration').addEventListener('input', function() {
        document.getElementById('duration-value').textContent = `${this.value} mois`;
    });

    document.getElementById('calculate-btn').addEventListener('click', function() {
        const projectType = document.getElementById('project-type').value;
        const complexity = document.getElementById('project-complexity').value;
        const duration = parseInt(document.getElementById('project-duration').value);
        
        const basePrice = projectRates[projectType][complexity];
        const totalPrice = basePrice * duration;
        
        const currency = document.querySelector('.currency-selector .active').dataset.currency;
        const symbol = currency === 'eur' ? '€' : currency === 'usd' ? '$' : '£';
        
        document.getElementById('quote-amount').textContent = `${symbol}${totalPrice.toLocaleString()}`;
        document.getElementById('quote-details').textContent = 
            `Projet ${projectType} de complexité ${complexity} sur ${duration} mois`;
    });

    // Carousel pour les témoignages (optionnel) //</script>
    // Vous pouvez intégrer un carousel Bootstrap ici si beaucoup de témoignages

// --------------------section recommandations--------------------
    document.addEventListener('DOMContentLoaded', function() {
    // Animation des statistiques
    const stats = document.querySelectorAll('.stat-card .display-4');
    const targetValues = [98, 5, 4.6, 92];
    const durations = [1000, 1000, 1000, 1800];
    
    stats.forEach((stat, index) => {
        const target = targetValues[index];
        const duration = durations[index];
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = index === 2 ? current.toFixed(1) : Math.round(current);
            if (index === 2) stat.textContent += '/5';
            if (index !== 2) stat.textContent += index === 0 || index === 3 ? '%' : '+';
        }, 16);
    });

    // Lightbox pour les vidéos
    const videoTestimonials = document.querySelectorAll('.testimonial-card iframe');
    videoTestimonials.forEach(video => {
        video.addEventListener('click', () => {
            video.classList.toggle('fullscreen');
        });
    });
});
// --------------------section parcours academique--------------------
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des éléments
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const items = document.querySelectorAll('.timeline-item');
            
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Gestion des QR Codes
    const qrCodes = document.querySelectorAll('.qr-code');
    const qrModal = new bootstrap.Modal('#qrModal');
    
    qrCodes.forEach(qr => {
        // Génération dynamique du QR Code
        const qrUrl = qr.dataset.qr;
        const qrDisplay = document.getElementById('qrCodeDisplay');
        
        qr.addEventListener('click', function() {
            document.getElementById('verificationLink').href = qrUrl;
            QRCode.toCanvas(qrDisplay, qrUrl, { width: 200 }, error => {
                if (error) console.error(error);
            });
            qrModal.show();
        });
    });

    // Animation des projets académiques
    const projects = document.querySelectorAll('.academic-project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.querySelector('img').style.transform = 'scale(1.05)';
        });
        project.addEventListener('mouseleave', () => {
            project.querySelector('img').style.transform = 'scale(1)';
        });
    });
});

// --------------------section EXPERIENCES--------------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des expériences
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const items = document.querySelectorAll('.timeline-item');
            
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Vérifier si l'élément du graphique existe avant de l'initialiser
    const skillsChartCanvas = document.getElementById('skillsChart');
    if (skillsChartCanvas) {
        const ctx = skillsChartCanvas.getContext('2d');
        
        // Obtenir les valeurs des variables CSS
        const getCssVar = (name) => {
            return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        };
        
        const textColor = getCssVar('--text-color');
        const secondaryColor = getCssVar('--secondary-color');
        
        const skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Front-end', 'Back-end', 'UI/UX', 'DevOps', 'Gestion de projet', 'Cloud'],
                datasets: [
                    {
                        label: '2017-2019',
                        data: [65, 70, 50, 40, 60, 55],
                        backgroundColor: 'rgba(255, 180, 0, 0.2)',
                        borderColor: 'rgba(255, 180, 0, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 180, 0, 1)'
                    },
                    {
                        label: '2019-2021',
                        data: [85, 80, 70, 60, 70, 75],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        label: '2021-Présent',
                        data: [95, 90, 80, 85, 90, 90],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(153, 102, 255, 1)'
                    }
                ]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            color: textColor
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: secondaryColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Mise à jour des couleurs selon le thème
        function updateChartColors() {
            const newTextColor = getCssVar('--text-color');
            const newSecondaryColor = getCssVar('--secondary-color');
            
            skillsChart.options.scales.r.pointLabels.color = newTextColor;
            skillsChart.options.scales.r.ticks.color = newSecondaryColor;
            skillsChart.options.plugins.legend.labels.color = newTextColor;
            skillsChart.update();
        }

        // Écouteur pour le changement de thème
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                setTimeout(updateChartColors, 300);
            });
        }
    }
});

// Données des projets (simulées)
const projectsData = [
    {
        id: 1,
        title: "Application SaaS",
        category: "web",
        description: "Plateforme SaaS complète de gestion de contenu avec système de templates personnalisables.",
        image: "https://via.placeholder.com/600x400?text=Projet+Web",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        tech: ["React", "Node.js", "MongoDB"],
        performance: { score: "98%", speed: "0.8s", uptime: "99.9%" },
        client: {
            name: "Sophie Martin",
            position: "CEO @WebSolutions",
            testimonial: "Cette plateforme a transformé notre workflow et augmenté notre productivité de 40%."
        },
        links: {
            project: "#",
            code: "#",
            video: "#"
        }
    },
    // Ajoutez d'autres projets ici...
];

// Configuration de la pagination
const projectsPerPage = 6;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    displayProjects();
    setupPagination();
    updateStats();

    // Filtrage des projets
    document.querySelectorAll('.portfolio-filters button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.portfolio-filters button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            currentPage = 1;
            displayProjects();
            setupPagination();
        });
    });

    // Charger plus de projets
    document.getElementById('load-more').addEventListener('click', function() {
        currentPage++;
        displayProjects(true);
    });

    // Initialisation des tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Afficher les projets
function displayProjects(append = false) {
    const container = document.getElementById('portfolio-container');
    const activeFilter = document.querySelector('.portfolio-filters button.active').dataset.filter;
    
    if (!append) {
        container.innerHTML = '';
    }
    
    const filteredProjects = projectsData.filter(project => {
        return activeFilter === 'all' || project.category === activeFilter;
    });
    
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = filteredProjects.slice(0, append ? endIndex : projectsPerPage);
    
    projectsToShow.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = `col-lg-4 col-md-6 portfolio-item ${append ? 'animate__animated animate__fadeIn' : ''}`;
        projectElement.setAttribute('data-category', project.category);
        projectElement.setAttribute('data-aos', 'fade-up');
        projectElement.setAttribute('data-aos-delay', `${(index % 3) * 100}`);
        
        projectElement.innerHTML = `
            <div class="portfolio-card">
                <div class="portfolio-img">
                    <img src="${project.image}" alt="${project.title}" class="img-fluid">
                    <div class="portfolio-overlay">
                        <div class="portfolio-links">
                            <a href="#" class="btn btn-sm btn-primary view-project" data-id="${project.id}">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="${project.links.project}" class="btn btn-sm btn-light" target="_blank">
                                <i class="fas fa-link"></i>
                            </a>
                            ${project.video ? `
                            <a href="#" class="btn btn-sm btn-danger view-video" data-video="${project.video}">
                                <i class="fas fa-play"></i>
                            </a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h4>${project.title}</h4>
                    <p class="text-muted">${project.description.substring(0, 60)}...</p>
                    <div class="portfolio-tech">
                        ${project.tech.map(tech => `<span class="badge bg-secondary">${tech}</span>`).join('')}
                    </div>
                    <div class="mt-2">
                        <span class="badge bg-success">
                            <i class="fas fa-chart-line me-1"></i> ${project.performance.score}
                        </span>
                    </div>
                </div>
            </div>
            `
            ;
        
        container.appendChild(projectElement);
    });
    
    // Écouteurs pour les modals
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.dataset.id);
            openProjectModal(projectId);
        });
    });
    
    document.querySelectorAll('.view-video').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.dataset.video;
            // Ici vous pouvez ouvrir une modal spécifique pour la vidéo
        });
    });
}

// Configurer la pagination
function setupPagination() {
    const pagination = document.getElementById('portfolio-pagination');
    const activeFilter = document.querySelector('.portfolio-filters button.active').dataset.filter;
    const filteredProjects = projectsData.filter(project => {
        return activeFilter === 'all' || project.category === activeFilter;
    });
    
    const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
    pagination.innerHTML = '';
    
    if (pageCount <= 1) return;
    
    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        li.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            displayProjects();
            
            // Mettre à jour l'état actif de la pagination
            document.querySelectorAll('#portfolio-pagination .page-item').forEach(item => {
                item.classList.remove('active');
            });
            li.classList.add('active');
            
            // Faire défiler vers le haut
            window.scrollTo({
                top: document.getElementById('portfolio').offsetTop - 100,
                behavior: 'smooth'
            });
        });
        
        pagination.appendChild(li);
    }
}

// Mettre à jour les statistiques
function updateStats() {
    document.getElementById('total-projects').textContent = projectsData.length;
    // Ici vous pourriez faire un calcul réel de la moyenne des évaluations
}

// Ouvrir la modal du projet
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    // Mettre à jour le contenu de la modal
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-description').textContent = project.description;
    
    // Media principal (vidéo ou image)
    const mainMedia = document.getElementById('modal-main-media');
    if (project.video) {
        mainMedia.innerHTML = `
            <iframe src="${project.video}" frameborder="0" allowfullscreen></iframe>
        `;
    } else {
        mainMedia.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="img-fluid rounded">
        `;
    }
    
    // Statistiques de performance
    document.getElementById('performance-score').textContent = project.performance.score;
    document.getElementById('performance-speed').textContent = project.performance.speed;
    document.getElementById('performance-uptime').textContent = project.performance.uptime;
    
    // Détails techniques
    const techDetails = document.getElementById('modal-tech-details');
    techDetails.innerHTML = project.tech.map(tech => `<li>${tech}</li>`).join('');
    
    // Badges technologies
    const techBadges = document.getElementById('modal-tech-badges');
    techBadges.innerHTML = project.tech.map(tech => 
        `<span class="badge bg-primary me-2">${tech}</span>`
    ).join('');
    
    // Liens
    document.getElementById('modal-project-link').href = project.links.project;
    document.getElementById('modal-code-link').href = project.links.code;
    document.getElementById('modal-video-link').href = project.links.video;
    
    // Témoignage client
    document.getElementById('client-name').textContent = project.client.name;
    document.getElementById('client-position').textContent = project.client.position;
    document.getElementById('client-testimonial').textContent = `"${project.client.testimonial}"`;
    
    // Gallerie (simulée)
    const gallery = document.getElementById('modal-gallery');
    gallery.innerHTML = `
        <div class="col-6 col-md-3">
            <img src="https://via.placeholder.com/200x150?text=Capture+1" alt="Capture 1" class="img-fluid rounded">
        </div>
        <div class="col-6 col-md-3">
            <img src="https://via.placeholder.com/200x150?text=Capture+2" alt="Capture 2" class="img-fluid rounded">
        </div>
        <div class="col-6 col-md-3">
            <img src="https://via.placeholder.com/200x150?text=Capture+3" alt="Capture 3" class="img-fluid rounded">
        </div>
        <div class="col-6 col-md-3">
            <img src="https://via.placeholder.com/200x150?text=Capture+4" alt="Capture 4" class="img-fluid rounded">
        </div>
    `;
    
    // Afficher la modal
    const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
    modal.show();
}

//---------------------------SCRIPT CONTACT---------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des articles
    const filterButtons = document.querySelectorAll('.blog-filters button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const items = document.querySelectorAll('.blog-item');
            
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Recherche d'articles
    const searchInput = document.getElementById('blog-search');
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('.blog-item');
        
        items.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const text = item.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Animation des cartes au survol
    const blogCards = document.querySelectorAll('.blog-item .card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Validation du formulaire
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (this.checkValidity()) {
            // Simulation d'envoi
            const submitText = document.getElementById('submitText');
            const submitSpinner = document.getElementById('submitSpinner');
            
            submitText.textContent = 'Envoi en cours...';
            submitSpinner.classList.remove('d-none');
            
            // Simuler un envoi API (à remplacer par un vrai appel)
            setTimeout(() => {
                submitText.textContent = 'Message envoyé !';
                submitSpinner.classList.add('d-none');
                
                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    submitText.textContent = 'Envoyer le message';
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                }, 3000);
            }, 2000);
        }
        
        this.classList.add('was-validated');
    }, false);

    // Animation des éléments de contact
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// ----------------------- // Gestion de l'envoi-----------------------------------------
// Initialisation (à placer dans un fichier JS séparé ou dans des balises <script>)
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser EmailJS avec votre User ID
    emailjs.init('WIina1Ir8pC88aV8L');
    
    const contactForm = document.getElementById('contactForm');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Afficher le spinner et désactiver le bouton
      submitText.textContent = 'Envoi en cours...';
      submitSpinner.classList.remove('d-none');
      contactForm.querySelector('button[type="submit"]').disabled = true;
      
      // Masquer les messages précédents
      successMessage.classList.add('d-none');
      errorMessage.classList.add('d-none');
      
      // Envoyer le formulaire via EmailJS
      emailjs.sendForm('service_f5izzm4', 'template_jovm7lh', this)
        .then(function() {
          // Succès
          contactForm.reset();
          successMessage.classList.remove('d-none');
        }, function(error) {
          // Erreur
          console.error('Erreur EmailJS:', error);
          errorMessage.classList.remove('d-none');
        })
        .finally(function() {
          // Réinitialiser le bouton dans tous les cas
          submitText.textContent = 'Envoyer';
          submitSpinner.classList.add('d-none');
          contactForm.querySelector('button[type="submit"]').disabled = false;
        });
    });
  });
  // -----------------------footer -----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des tooltips pour les badges
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Contact rapide
    const quickContactForm = document.getElementById('quickContactForm');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Envoi...';
            submitBtn.disabled = true;
            
            // Simuler l'envoi
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Mailchimp - Personnaliser le message de succès
    window.addEventListener('message', function(event) {
        if (event.data.event === 'subscriptionSuccess') {
            // Afficher un message personnalisé
            alert('Merci pour votre abonnement !');
        }
    });

    // Animation des cartes de certification
    document.querySelectorAll('.certification-badges img').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(255, 180, 0, 0.3)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

//-- Mailchimp Script -->
(function($) {
    window.fnames = new Array(); 
    window.ftypes = new Array();
    fnames[0]='EMAIL';ftypes[0]='email';
    fnames[1]='FNAME';ftypes[1]='text';
}(jQuery));
var $mcj = jQuery.noConflict(true);
