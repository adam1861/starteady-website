// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Smooth Scrolling
function smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function for smooth animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF6B9D, #4ECDC4);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo('#home');
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Airtable Configuration (loaded from airtable-config.js)
const AIRTABLE_CONFIG = window.AIRTABLE_CONFIG || {
    baseId: 'YOUR_AIRTABLE_BASE_ID',
    apiKey: 'YOUR_AIRTABLE_API_KEY',
    tableName: 'Contact Submissions'
};

// Contact Form Handling with Airtable Integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Airtable
            const response = await fetch('/api/airtable-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: data.name, email: data.email, company: data.company, service: data.service, message: data.message })
            });

            const result = await response.json();

            if (result.success) {
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                showNotification('Sorry, there was an error. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Function to submit data to Airtable
async function submitToAirtable(data) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tableName)}`;
    
    const fields = AIRTABLE_CONFIG.fields || {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        service: 'Service',
        message: 'Message',
        dateSubmitted: 'Date Submitted'
    };
    
    const payload = {
        fields: {
            [fields.name]: data.name,
            [fields.email]: data.email,
            [fields.company]: data.company || '',
            [fields.service]: data.service,
            [fields.message]: data.message || '',
            [fields.dateSubmitted]: new Date().toISOString()
        }
    };
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Airtable API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    return await response.json();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            const text = counter.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !counter.dataset.animated) {
                counter.dataset.animated = 'true';
                animateCounter(counter, number);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => counterObserver.observe(stat));
});

// Enhanced Scroll Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroRobot = document.querySelector('.hero-robot');
    
    if (hero && heroRobot) {
        const rate = scrolled * -0.5;
        heroRobot.style.transform = `translateY(${rate}px)`;
    }
    
    // Scroll progress indicator
    updateScrollProgress(scrolled);
    
    // Active navigation highlighting
    updateActiveNavigation(scrolled);
});

// Scroll Progress Indicator
function updateScrollProgress(scrolled) {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        createScrollProgressBar();
    }
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercent = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolledPercent + '%';
    }
}

// Create scroll progress bar
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #FF6B9D, #4ECDC4);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
}

// Active Navigation Highlighting
function updateActiveNavigation(scrolled) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-menu a {
            font-size: 1.2rem;
            padding: 0.5rem 0;
            display: block;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
});

// Add loading class to body
document.body.classList.add('loading');

// Fallback: Remove loading class after 3 seconds if load event doesn't fire
setTimeout(() => {
    if (document.body.classList.contains('loading')) {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }
}, 3000);

// Preloader styles
const preloaderStyles = `
    body.loading {
        overflow: hidden;
    }
    
    body.loaded {
        overflow: auto !important;
    }
    
    body.loading::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body.loading::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    body.loaded::before,
    body.loaded::after {
        display: none;
    }
`;

const preloaderStyleSheet = document.createElement('style');
preloaderStyleSheet.textContent = preloaderStyles;
document.head.appendChild(preloaderStyleSheet);

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Ensure scrolling is enabled
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service Details Modal Logic
const serviceDetails = [
  {
    title: 'AI Chatbots',
    icon: '<i class="fas fa-comments"></i>',
    description: 'Intelligent conversational agents that engage customers 24/7, answer questions, and qualify leads automatically.',
    features: [
      '24/7 Customer Support',
      'Lead Qualification',
      'Multi-language Support',
      'Integration Ready'
    ],
    more: `<b>What you get:</b><br>• Custom chatbot flows<br>• Integration with your website or CRM<br>• Analytics dashboard<br>• Human handoff options<br><br><b>Use Cases:</b><br>Customer support, lead capture, appointment booking, FAQs, and more.`
  },
  {
    title: 'Business Automation',
    icon: '<i class="fas fa-cogs"></i>',
    description: 'Streamline operations with AI-powered automation that handles repetitive tasks and improves efficiency.',
    features: [
      'Process Automation',
      'Data Processing',
      'Workflow Optimization',
      'Cost Reduction'
    ],
    more: `<b>What you get:</b><br>• Automated workflows<br>• Integration with existing tools<br>• Custom triggers and actions<br>• Reporting & monitoring<br><br><b>Use Cases:</b><br>Invoice processing, HR onboarding, data entry, and more.`
  },
  {
    title: 'Lead Generation',
    icon: '<i class="fas fa-bullseye"></i>',
    description: 'AI-driven lead generation systems that identify, qualify, and nurture prospects for your business.',
    features: [
      'Prospect Identification',
      'Lead Scoring',
      'Automated Nurturing',
      'ROI Tracking'
    ],
    more: `<b>What you get:</b><br>• Targeted lead lists<br>• Automated outreach<br>• Lead scoring models<br>• CRM integration<br><br><b>Use Cases:</b><br>B2B prospecting, email campaigns, pipeline building, and more.`
  },
  {
    title: 'Marketing AI',
    icon: '<i class="fas fa-chart-line"></i>',
    description: 'Enhance your marketing efforts with AI-powered tools for content creation, optimization, and analytics.',
    features: [
      'Content Optimization',
      'Predictive Analytics',
      'Personalization',
      'Performance Tracking'
    ],
    more: `<b>What you get:</b><br>• AI content suggestions<br>• Campaign analytics<br>• Personalization engines<br>• A/B testing tools<br><br><b>Use Cases:</b><br>Ad optimization, content marketing, customer segmentation, and more.`
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('service-modal');
  const modalBody = document.getElementById('service-modal-body');
  const modalClose = document.querySelector('.service-modal-close');

  serviceCards.forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const details = serviceDetails[idx];
      modalBody.innerHTML = `
        <div class="service-modal-icon">${details.icon}</div>
        <h2 style="margin-top:0.5rem;">${details.title}</h2>
        <p>${details.description}</p>
        <ul style="margin-bottom:1.2rem;">${details.features.map(f=>`<li>${f}</li>`).join('')}</ul>
        <div class="service-modal-more">${details.more}</div>
      `;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal-section');
        revealObserver.observe(section);
    });
});

// Add reveal animation styles
const revealStyles = `
    .reveal-section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

const revealStyleSheet = document.createElement('style');
revealStyleSheet.textContent = revealStyles;
document.head.appendChild(revealStyleSheet); 