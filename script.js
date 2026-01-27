/**
 * Portfolio Website - Enhanced JavaScript
 * Fully Responsive & Interactive
 */

(function () {
    'use strict';

    // ========================================
    // 1. DOM Elements
    // ========================================
    const elements = {
        sidebar: document.getElementById('sidebar'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        menuLinks: document.querySelectorAll('.menu-link'),
        menuItems: document.querySelectorAll('.menu-item'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        skillCards: document.querySelectorAll('.skill-card'),
        sections: document.querySelectorAll('section'),
        revealElements: document.querySelectorAll('.reveal')
    };

    // ========================================
    // 2. Mobile Menu Toggle
    // ========================================
    function initMobileMenu() {
        if (!elements.menuBtn || !elements.navLinks) return;

        elements.menuBtn.addEventListener('click', () => {
            elements.navLinks.classList.toggle('active');
            const icon = elements.menuBtn.querySelector('i');

            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking on a link
        elements.navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                elements.navLinks.classList.remove('active');
                const icon = elements.menuBtn.querySelector('i');

                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.navLinks.contains(e.target) &&
                !elements.menuBtn.contains(e.target) &&
                elements.navLinks.classList.contains('active')) {
                elements.navLinks.classList.remove('active');
                const icon = elements.menuBtn.querySelector('i');

                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // ========================================
    // 3. Header Scroll Effect
    // ========================================
    function initHeaderScroll() {
        if (!elements.header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class
            if (currentScroll > scrollThreshold) {
                elements.header.classList.add('scrolled');
            } else {
                elements.header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // 4. Smooth Scrolling
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();

                    const headerHeight = elements.header ? elements.header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // 5. Skills Filter
    // ========================================
    function initSkillsFilter() {
        if (elements.filterBtns.length === 0 || elements.skillCards.length === 0) return;

        elements.filterBtns.forEach(button => {
            button.addEventListener('click', () => {
        // Remove active class from all buttons
                elements.filterBtns.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter skills with animation
                elements.skillCards.forEach((card, index) => {
                    // Add fade out effect
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            if (card.getAttribute('data-category') === filter) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }

                        // Add fade in effect
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    }, 200 + (index * 30));
                });
            });
        });
    }

    // ========================================
    // 6. Scroll Reveal Animation
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.skill-card, .project-card, .info-item');

        if (revealElements.length === 0) return;

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('reveal-active');
                }
            });
        };

        // Initial check
        revealOnScroll();

        // Check on scroll with throttle
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    revealOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ========================================
    // 7. Progress Bar Animation
    // ========================================
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        if (progressBars.length === 0) return;

        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (barPosition < windowHeight - 100 && !bar.classList.contains('animated')) {
                    const width = bar.style.width;
                    bar.style.width = '0';

                    setTimeout(() => {
                        bar.style.width = width;
                        bar.classList.add('animated');
                    }, 100);
                }
            });
        };

        // Initial check
        animateProgressBars();

        // Check on scroll
        window.addEventListener('scroll', animateProgressBars);
    }

    // ========================================
    // 8. Active Navigation Link
    // ========================================
    function initActiveNavLink() {
        if (elements.sections.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Remove active class from all nav links
                    elements.navLinksItems.forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add active class to current nav link
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        elements.sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ========================================
    // 9. Lazy Loading Images
    // ========================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // 10. Typing Effect for Hero
    // ========================================
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero h1');

        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let index = 0;
        const typeSpeed = 50;

        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            }
        }

        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // ========================================
    // 11. Contact Form Handler (if exists)
    // ========================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');

        if (!contactForm) return;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // ========================================
    // 12. Performance Optimization
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================================
    // 13. Initialize All Functions
    // ========================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
    }

    function initializeApp() {
        console.log('Portfolio initialized');

        // Initialize all features
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initSkillsFilter();
        initScrollReveal();
        initProgressBars();
        initActiveNavLink();
        initLazyLoading();
        // initTypingEffect(); // Uncomment if you want typing effect
        initContactForm();

        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // Start the application
    init();

})();