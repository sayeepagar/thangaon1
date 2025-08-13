// Government Higher Secondary School Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initGallery();
    initContactForm();
    initSmoothScrolling();
    initBackToTop();
    initAnimations();
    
    // Add notification styles immediately
    addNotificationStyles();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navList) {
        // Toggle mobile navigation
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = navList.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile nav when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNavLink, 16));
    updateActiveNavLink(); // Initial call
}

// Scroll effects
function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(var(--color-surface), 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
}

// Gallery functionality
function initGallery() {
    const galleryTabs = document.querySelectorAll('.gallery__tab');
    const galleryGrid = document.querySelector('.gallery__grid');

    if (!galleryTabs.length || !galleryGrid) return;

    // Sample gallery data for different categories with image paths
    const galleryData = {
        events: [
            { 
                title: 'Annual Sports Day 2024', 
                description: 'Students showcasing their athletic talents',
                image: 'assets/events/ev1.jpg'
            },
            { 
                title: 'Science Exhibition', 
                description: 'Innovative projects by our students',
                image: 'assets/events/ev2.jpg'
            },
            { 
                title: 'Cultural Program', 
                description: 'Celebrating diversity through arts',
                image: 'assets/events/ev3.jpg'
            },
            { 
                title: 'Independence Day Celebration', 
                description: 'Patriotic fervor and cultural performances',
                image: 'assets/events/ev4.jpg'
            },
            { 
                title: 'Teachers Day Event', 
                description: 'Honoring our dedicated educators',
                image: 'assets/events/ev5.jpg'
            },
            { 
                title: 'Republic Day Parade', 
                description: 'Students marching with pride',
                image: 'assets/events/ev6.jpg'
            }
        ],
        infrastructure: [
            { 
                title: 'Smart Classrooms', 
                description: 'Modern digital learning environments',
                image: 'assets/infrastructure/in1.jpg'
            },
            { 
                title: 'Science Laboratory', 
                description: 'Well-equipped labs for practical learning',
                image: 'assets/infrastructure/in6.jpg'
            },
            { 
                title: 'Library', 
                description: 'Extensive collection of books and digital resources',
                image: 'assets/infrastructure/in2.jpg'
            },
            { 
                title: 'Computer Lab', 
                description: 'Latest technology for digital literacy',
                image: 'assets/infrastructure/in3.jpg'
            },
            { 
                title: 'Sports Ground', 
                description: 'Spacious playground for various sports',
                image: 'assets/infrastructure/in4.jpg'
            },
            { 
                title: 'Auditorium', 
                description: 'Modern facility for events and assemblies',
                image: 'assets/infrastructure/in5.jpg'
            }
        ],
        activities: [
            { 
                title: 'Art & Craft Workshop', 
                description: 'Creative expression through various mediums',
                image: 'assets/activities/a1.jpg'
            },
            { 
                title: 'Music Class', 
                description: 'Learning traditional and contemporary music',
                image: 'assets/activities/a2.jpg'
            },
            { 
                title: 'Dance Performance', 
                description: 'Cultural dance forms and modern choreography',
                image: 'assets/activities/a3.jpg'
            },
            { 
                title: 'Drama Club', 
                description: 'Theatrical performances by students',
                image: 'assets/activities/a4.jpg'
            },
            { 
                title: 'Debate Competition', 
                description: 'Enhancing public speaking skills',
                image: 'assets/activities/a5.jpg'
            },
            { 
                title: 'Quiz Contest', 
                description: 'Testing knowledge across subjects',
                image: 'assets/activities/a6.png'
            }
        ],
        achievements: [
            { 
                title: 'District Level Winner', 
                description: 'First prize in inter-school competition',
                image: 'assets/achievements/district-winner.jpg'
            },
            { 
                title: 'State Science Fair', 
                description: 'Students representing at state level',
                image: 'assets/achievements/state-science-fair.jpg'
            },
            { 
                title: 'Sports Championship', 
                description: 'Winning the regional sports meet',
                image: 'assets/achievements/sports-championship.jpg'
            },
            { 
                title: 'Best School Award', 
                description: 'Recognition for excellence in education',
                image: 'assets/achievements/best-school-award.jpg'
            },
            { 
                title: 'Digital India Award', 
                description: 'Achievement in technology integration',
                image: 'assets/achievements/digital-india-award.jpg'
            },
            { 
                title: 'Environment Award', 
                description: 'Recognition for eco-friendly initiatives',
                image: 'assets/achievements/environment-award.jpg'
            }
        ]
    };

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update gallery content
            updateGalleryContent(tabName, galleryData[tabName] || []);
        });
    });

    // Initialize with events tab
    updateGalleryContent('events', galleryData.events);

    function updateGalleryContent(category, items) {
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-item__placeholder">
                    <div class="image-placeholder">
                        <img src="${item.image}" alt="${item.title}" class="gallery-item__image" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='📸';">
                    </div>
                    <div class="gallery-item__overlay">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            
            // Add entrance animation
            galleryItem.style.opacity = '0';
            galleryItem.style.transform = 'translateY(20px)';
            galleryGrid.appendChild(galleryItem);

            // Animate in
            setTimeout(() => {
                galleryItem.style.transition = 'all 0.4s ease';
                galleryItem.style.opacity = '1';
                galleryItem.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}


// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    function validateForm(data) {
        const errors = [];

        if (!data.name || !data.name.trim()) {
            errors.push('Name is required');
        }

        if (!data.email || !data.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.phone || !data.phone.trim()) {
            errors.push('Phone number is required');
        }

        if (!data.subject) {
            errors.push('Please select a subject');
        }

        if (!data.message || !data.message.trim()) {
            errors.push('Message is required');
        }

        if (errors.length > 0) {
            showNotification(errors.join(', '), 'error');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', throttle(toggleBackToTopButton, 16));

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleBackToTopButton();
}

// Initialize animations and intersection observers
function initAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .quick-link, .program-card, .faculty-card, .scheme-card, .gallery-item, .topper-card');
    animateElements.forEach(element => {
        element.classList.add('animate-target');
        observer.observe(element);
    });

    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-target {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .animate-target,
                .animate-in {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add notification styles
function addNotificationStyles() {
    if (document.querySelector('#notification-styles')) return;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.id = 'notification-styles';
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            padding: var(--space-16);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        }
        
        .notification--success {
            background-color: rgba(var(--color-success-rgb), 0.1);
            border: 1px solid var(--color-success);
            color: var(--color-success);
        }
        
        .notification--error {
            background-color: rgba(var(--color-error-rgb), 0.1);
            border: 1px solid var(--color-error);
            color: var(--color-error);
        }
        
        .notification--info {
            background-color: rgba(var(--color-info-rgb), 0.1);
            border: 1px solid var(--color-info);
            color: var(--color-info);
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-12);
        }
        
        .notification__close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: currentColor;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .notification__close:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Utility function for debouncing
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

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" aria-label="Close notification">×</button>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }

    function removeNotification(element) {
        if (!element || !element.parentNode) return;
        element.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, 300);
    }
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile navigation
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navList = document.getElementById('nav-list');
        
        if (navToggle && navList && navList.classList.contains('active')) {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile navigation on resize to desktop
    if (window.innerWidth > 768) {
        const navToggle = document.getElementById('nav-toggle');
        const navList = document.getElementById('nav-list');
        
        if (navToggle && navList) {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
}, 250));

// Error handling for images and resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Handle image loading errors (replace with placeholder if needed)
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Performance monitoring (basic)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
            }
        }, 0);
    });
}