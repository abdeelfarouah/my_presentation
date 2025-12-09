// Sample projects data
const projects = [
    {
        title: 'Snake game legacy',
        description: 'Jeu régressif du serpent.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        demo: 'https://snakegamelegacy.netlify.app',
        code: 'https://github.com/abdeelfarouah/retro-snake-game',
        image: './assets/images/projects/snake.jpg'
    },
    {
        title: 'Chi Fu Mi',
        description: 'Un jeu classique de pierre-papier-ciseaux développé avec JavaScript.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        demo: 'https://abdeelfarouah.github.io/chifoumi/',
        code: 'https://github.com/abdeelfarouah/chifoumi',
        image: './assets/images/projects/chifoumi.jpg'
    },
    {
        title: 'Neo Puzzle',
        description: 'Un jeu simple revisité du puzzle.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        demo: 'https://abdeelfarouah.github.io/puzzle/',
        code: 'https://github.com/abdeelfarouah/puzzle',
        image: './assets/images/projects/puzzle.jpg'
    },
    {
        title: 'Pokédex',
        description: 'Une application web présentant les 151 premiers Pokémon avec leurs caractéristiques.',
        tags: ['JavaScript', 'API', 'HTML5', 'CSS3'],
        demo: 'https://abdeelfarouah.github.io/pokemon-discovery/',
        code: 'https://github.com/Abdeelf902/pokemon-discovery',
        image: './assets/images/projects/pokedex.jpg'
    }
];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('back-to-top');
const currentYear = document.getElementById('current-year');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carousel functionality
let currentProjectIndex = 0;
let visibleCards = 1;

// Update visible cards based on screen size
function updateVisibleCards() {
    if (window.innerWidth >= 1024) {
        visibleCards = 3;
    } else if (window.innerWidth >= 640) {
        visibleCards = 2;
    } else {
        visibleCards = 1;
    }
    updateCarousel();
}

// Update carousel display
function updateCarousel() {
    if (!projectsGrid) return;
    
    // Ensure current index is within bounds
    currentProjectIndex = Math.max(0, Math.min(currentProjectIndex, projects.length - visibleCards));
    
    // Update project cards
    projectsGrid.innerHTML = projects.map((project, index) => `
        <div class="project-card ${index >= currentProjectIndex && index < currentProjectIndex + visibleCards ? 'active' : ''}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-links">
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Voir le projet
                    </a>
                    <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github"></i> Code source
                    </a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Démo</a>
                    <a href="${project.code}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Code</a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update navigation dots
    updateNavigationDots();
}

// Update navigation dots
function updateNavigationDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    const dotCount = Math.max(1, projects.length - visibleCards + 1);
    dotsContainer.innerHTML = Array.from({ length: dotCount }, (_, i) => 
        `<button class="dot ${i === currentProjectIndex ? 'active' : ''}" data-index="${i}" aria-label="Aller au projet ${i + 1}"></button>`
    ).join('');
    
    // Add event listeners to dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentProjectIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        });
    });
}

// Navigation functions
function nextProject() {
    if (currentProjectIndex < projects.length - visibleCards) {
        currentProjectIndex++;
        updateCarousel();
    }
}

function prevProject() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
        updateCarousel();
    }
}

// Initialize carousel
function initCarousel() {
    updateVisibleCards();
    
    // Add navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav prev';
    prevButton.innerHTML = '&larr;';
    prevButton.setAttribute('aria-label', 'Projet précédent');
    prevButton.addEventListener('click', prevProject);
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav next';
    nextButton.innerHTML = '&rarr;';
    nextButton.setAttribute('aria-label', 'Projet suivant');
    nextButton.addEventListener('click', nextProject);
    
    // Add dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    
    // Insert navigation elements
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.insertBefore(prevButton, projectsGrid);
        projectsSection.insertBefore(nextButton, projectsGrid.nextSibling);
        projectsSection.appendChild(dotsContainer);
    }
    
    // Update on window resize
    window.addEventListener('resize', updateVisibleCards);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevProject();
        if (e.key === 'ArrowRight') nextProject();
    });
}

// Load projects with carousel
function loadProjects() {
    if (!projectsGrid) return;
    
    // Initialize carousel
    initCarousel();
    
    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    projectsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    projectsGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            prevProject(); // Swipe right
        } else {
            nextProject(); // Swipe left
        }
    }
}

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Message envoyé avec succès ! Je vous recontacterai bientôt.');
        this.reset();
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Initialize
function init() {
    loadProjects();
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .project-card, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
