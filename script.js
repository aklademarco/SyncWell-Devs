// Progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Floating contact button
const floatingContact = document.createElement('button');
floatingContact.className = 'floating-contact';
floatingContact.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Let's Chat
`;
document.body.appendChild(floatingContact);

floatingContact.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Dark mode functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌙';
document.body.appendChild(darkModeToggle);

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '☀️';
    } else {
        localStorage.setItem('darkMode', null);
        darkModeToggle.innerHTML = '🌙';
    }
});

// Typing effect
const heroText = document.querySelector('.hero-text');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.classList.add('typing-text');
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();
}

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Ensure the fade-in effect works for FAQ section
// Observe FAQ items specifically
const faqItems = document.querySelectorAll('#faq .fade-in');
faqItems.forEach(element => {
    observer.observe(element);
});

// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu hidden md:hidden fixed inset-0 bg-white z-40 pt-16';
mobileMenu.innerHTML = `
    <div class="px-4 py-2">
        <div class="flex flex-col space-y-4">
            <a href="#home" class="text-gray-800 hover:text-royal-blue px-3 py-2">Home</a>
            <a href="#services" class="text-gray-800 hover:text-royal-blue px-3 py-2">Services</a>
            <a href="#portfolio" class="text-gray-800 hover:text-royal-blue px-3 py-2">Portfolio</a>
            <a href="#about" class="text-gray-800 hover:text-royal-blue px-3 py-2">About</a>
            <a href="#contact" class="text-gray-800 hover:text-royal-blue px-3 py-2">Contact</a>
            <a href="#faq" class="text-gray-800 hover:text-royal-blue px-3 py-2">FAQ</a>
        </div>
    </div>
`;
document.body.appendChild(mobileMenu);

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-royal-blue');
        link.classList.add('text-gray-800');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-800');
            link.classList.add('text-royal-blue');
        }
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Get all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            `;
            submitButton.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    showPrompt('success', 'Form submitted successfully! We will get back to you soon.');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showPrompt('error', 'Something went wrong. Please try again later.');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    });
});

// Show prompt function
function showPrompt(type, message) {
    // Create prompt element
    const prompt = document.createElement('div');
    prompt.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    
    // Add message
    prompt.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'success' 
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(prompt);
    
    // Animate in
    setTimeout(() => {
        prompt.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        prompt.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(prompt);
        }, 300);
    }, 5000);
}

// Add hover effect to portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-card');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('transform', 'scale-105', 'transition', 'duration-300');
    });
    
    item.addEventListener('mouseleave', () => {
        item.classList.remove('transform', 'scale-105');
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('transform', 'scale-105', 'transition', 'duration-300');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('transform', 'scale-105');
    });
});

// Add hover effect to team member cards
const teamCards = document.querySelectorAll('.team-member');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('transform', 'scale-105', 'transition', 'duration-300');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('transform', 'scale-105');
    });
});

// Add click handler for portfolio links
const portfolioLinks = document.querySelectorAll('.portfolio-link');
portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const memberName = link.closest('.team-member').querySelector('h4').textContent;
        showPrompt('info', `Portfolio for ${memberName} will be available soon!`);
    });
});

// Add smooth scroll to top button
const scrollToTop = document.createElement('button');
scrollToTop.className = 'fixed bottom-4 right-4 bg-royal-blue text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300';
scrollToTop.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.remove('opacity-0');
        scrollToTop.classList.add('opacity-100');
    } else {
        scrollToTop.classList.remove('opacity-100');
        scrollToTop.classList.add('opacity-0');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fix for project images not displaying in dark mode
const portfolioImages = document.querySelectorAll('.portfolio-image');
portfolioImages.forEach(image => {
    image.style.filter = 'brightness(1)'; // Ensure images are visible in dark mode
});