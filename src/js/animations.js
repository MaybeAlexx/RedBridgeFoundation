import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize scroll animations
function initScrollAnimations() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// Smooth scroll to section
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetId,
            offsetY: 80
          },
          ease: "power2.inOut"
        });
      }
    });
  });
}

// Popup functionality
function showPopup() {
  const popup = document.getElementById('creditPopup');
  if (popup) {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

window.closePopup = function() {
  const popup = document.getElementById('creditPopup');
  if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Loading animation
window.addEventListener('load', () => {
  const loader = document.querySelector('.site-loader');
  const mainContent = document.querySelector('.main-content');
  
  if (loader && mainContent) {
    // Hide loader
    loader.classList.add('hidden');
    
    // Show main content with GSAP
    gsap.to(mainContent, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    // Enable scrolling
    document.body.style.overflow = '';
    
    // Remove loader after animation
    setTimeout(() => loader.remove(), 600);
  }
});

// Initial animations
document.addEventListener('DOMContentLoaded', () => {
  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
  
  // Initialize other animations
  initScrollAnimations();
  initSmoothScroll();
  
  // Show popup after 5 seconds
  setTimeout(showPopup, 5000);
  
  // Initial animations for navbar and hero
  gsap.from('.navbar', {
    y: -20,
    opacity: 0,
    duration: 1
  });

  gsap.from('.hero-content > *', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.2
  });

  // Close popup when clicking outside
  const creditPopup = document.getElementById('creditPopup');
  if (creditPopup) {
    creditPopup.addEventListener('click', (e) => {
      if (e.target.id === 'creditPopup') {
        closePopup();
      }
    });
  }
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: target,
        ease: 'power2.inOut'
      });
    }
  });
});

// Scroll animations
gsap.utils.toArray('.animate-on-scroll').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power2.out'
  });
});

// Navbar background opacity on scroll
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  toggleClass: { className: 'backdrop-blur-md', targets: '.navbar' },
  onUpdate: self => {
    gsap.to('.navbar', {
      backgroundColor: `rgba(255, 255, 255, ${Math.min(0.9, self.progress * 1.5)})`,
      duration: 0.3
    });
  }
});