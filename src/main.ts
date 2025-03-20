import './style.css';

// Add smooth scrolling for in-page navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
  anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Language Toggle Functionality
const languageSelector = document.getElementById('languageSelector');
const languageOptions = document.getElementById('languageOptions');
const languageOptionElements = document.querySelectorAll('.language-option');
const currentLanguageElement = document.querySelector('.current-language');

// Toggle language dropdown
languageSelector?.addEventListener('click', (e) => {
  e.stopPropagation();
  languageOptions?.classList.toggle('show');
});

// Hide dropdown when clicking outside
document.addEventListener('click', () => {
  languageOptions?.classList.remove('show');
});

// Set language when option is clicked
languageOptionElements.forEach((option) => {
  option.addEventListener('click', function(this: HTMLElement) {
    const lang = this.getAttribute('data-lang');
    if (lang && document.body.getAttribute('data-lang') !== lang) {
      document.body.setAttribute('data-lang', lang);

      // Update current language text
      if (currentLanguageElement) {
        currentLanguageElement.textContent = this.textContent || '';
      }

      // Save language preference to localStorage
      localStorage.setItem('preferred-language', lang);
    }
  });
});

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang) {
    document.body.setAttribute('data-lang', savedLang);

    // Update current language text based on saved preference
    const langOption = document.querySelector(`.language-option[data-lang="${savedLang}"]`);
    if (currentLanguageElement && langOption) {
      currentLanguageElement.textContent = langOption.textContent || '';
    }
  }
});

// Image Carousel Functionality
class Carousel {
  container: HTMLElement | null;
  slides: NodeListOf<Element>;
  indicators: NodeListOf<Element>;
  prevButton: HTMLElement | null;
  nextButton: HTMLElement | null;
  currentIndex: number;
  interval: number | null;

  constructor() {
    this.container = document.getElementById('carouselContainer');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicator');
    this.prevButton = document.getElementById('prevButton');
    this.nextButton = document.getElementById('nextButton');
    this.currentIndex = 0;
    this.interval = null;

    this.setupEventListeners();
    this.startAutoSlide();
  }

  setupEventListeners() {
    // Previous button click
    this.prevButton?.addEventListener('click', () => {
      this.goToSlide(this.currentIndex - 1);
      this.resetAutoSlide();
    });

    // Next button click
    this.nextButton?.addEventListener('click', () => {
      this.goToSlide(this.currentIndex + 1);
      this.resetAutoSlide();
    });

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    // Pause auto-slide on hover
    const carousel = document.querySelector('.image-carousel');
    carousel?.addEventListener('mouseenter', () => {
      this.stopAutoSlide();
    });

    carousel?.addEventListener('mouseleave', () => {
      this.startAutoSlide();
    });
  }

  goToSlide(index: number) {
    // Handle wrapping
    if (index < 0) {
      index = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      index = 0;
    }

    // Update current index
    this.currentIndex = index;

    // Move slides
    if (this.container) {
      this.container.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update indicators
    this.indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  startAutoSlide() {
    this.interval = window.setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});

// Add active class to navigation items based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) {
      current = section.getAttribute('id') || '';
    }
  });

  navItems.forEach((navItem) => {
    navItem.classList.remove('active');
    const navLink = navItem.querySelector('a');
    if (navLink && navLink.getAttribute('href') === `#${current}`) {
      navItem.classList.add('active');
    }
  });

  // Handle home specially since it's now carousel instead of banner
  const carouselElement = document.querySelector('.image-carousel');
  if (carouselElement && carouselElement.getBoundingClientRect().top > -150) {
    navItems.forEach(item => item.classList.remove('active'));
    const homeNavItem = document.querySelector('.nav-item:first-child');
    if (homeNavItem) {
      homeNavItem.classList.add('active');
    }
  }
});
