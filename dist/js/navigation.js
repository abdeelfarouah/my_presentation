/**
 * Gestion de la navigation du site
 */
class Navigation {
    constructor() {
        this.initNavigation();
        this.updateActiveLink();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupStickyHeader();
        this.setupBackToTop();
    }

    /**
     * Initialise les éléments de navigation
     */
    initNavigation() {
        this.currentPage = this.getCurrentPage();
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navContainer = document.querySelector('.nav-links');
        this.header = document.querySelector('.header');
        this.backToTopBtn = document.getElementById('back-to-top');
    }

    /**
     * Détermine la page courante
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        if (page === 'index.html' || page === '') return 'index';
        if (page.startsWith('about')) return 'about';
        if (page.startsWith('projects')) return 'projects';
        if (page.startsWith('contact')) return 'contact';
        if (page.startsWith('appointment')) return 'appointment';
        if (page.startsWith('legal')) return 'legal';
        if (page.startsWith('cgv')) return 'cgv';
        if (page.startsWith('privacy')) return 'privacy';
        if (page.startsWith('cookies')) return 'cookies';
        if (page.startsWith('sitemap')) return 'sitemap';
        return 'index';
    }

    /**
     * Met à jour le lien actif dans la navigation
     */
    updateActiveLink() {
        if (!this.navLinks) return;
        
        this.navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.replace('.html', '').replace('#', '');
            
            if ((this.currentPage === 'index' && linkHref === 'index.html') || 
                linkPage === this.currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Configure le menu mobile
     */
    setupMobileMenu() {
        if (!this.mobileMenuBtn) return;

        // Gestion du clic sur le bouton menu
        this.mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = this.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            this.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            this.navContainer.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Fermer le menu lors du clic sur un lien
        if (this.navLinks) {
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navContainer.classList.remove('active');
                    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }

        // Fermer le menu lors d'un clic à l'extérieur
        document.addEventListener('click', (e) => {
            const isClickInside = this.navContainer.contains(e.target) || 
                                this.mobileMenuBtn.contains(e.target);
            
            if (!isClickInside && this.navContainer.classList.contains('active')) {
                this.navContainer.classList.remove('active');
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /**
     * Configure le défilement fluide
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Si c'est un lien vers une ancre sur la même page
                if (targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        
                        // Mise à jour de l'URL sans rechargement de la page
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        } else {
                            location.hash = targetId;
                        }
                    }
                }
            });
        });
    }

    /**
     * Configure l'en-tête collant
     */
    setupStickyHeader() {
        if (!this.header) return;

        let lastScroll = 0;
        const headerHeight = this.header.offsetHeight;
        
        // Ajoute une marge au body pour compenser la hauteur du header fixe
        document.body.style.paddingTop = `${headerHeight}px`;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                this.header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !this.header.classList.contains('scroll-down')) {
                // Scroll vers le bas
                this.header.classList.remove('scroll-up');
                this.header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && this.header.classList.contains('scroll-down')) {
                // Scroll vers le haut
                this.header.classList.remove('scroll-down');
                this.header.classList.add('scroll-up');
            }
            
            // Ajout d'une classe quand on défile vers le bas
            if (currentScroll > headerHeight) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    /**
     * Configure le bouton de retour en haut
     */
    setupBackToTop() {
        if (!this.backToTopBtn) return;

        // Afficher/cacher le bouton
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.backToTopBtn.classList.add('show');
            } else {
                this.backToTopBtn.classList.remove('show');
            }
        });

        // Gestion du clic
        this.backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

export { Navigation };
