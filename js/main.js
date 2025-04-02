/**
 * VM Service Tech - Main JavaScript
 * Handles core website functionality including navigation, sliders, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMobileNavigation();
    initApplianceSlider();
    initFaqAccordion();
    initTestimonialSlider();
    initBrandLogoCarousel();
});

/**
 * Mobile Navigation Functionality
 * Toggles mobile menu and handles dropdown navigation
 */
/**
 * Mobile Navigation Functionality
 * Toggles mobile menu and handles dropdown navigation with icons
 */
/**
 * Mobile Navigation and Dropdown Functionality
 * Handles toggle for mobile menu and dropdown navigation
 */

/**
 * Initialize the continuously scrolling brand logo carousel
 * This creates a seamless infinite loop effect
 */
function initBrandLogoCarousel() {
    const sliderContainer = document.querySelector('.logos-slider-container');
    const slider = document.querySelector('.logos-slider');
    
    if (!slider || !sliderContainer) {
        console.error('Brand logo slider elements not found');
        return;
    }
    
    // Get all logo items
    const logoItems = slider.querySelectorAll('.logo-item');
    
    if (!logoItems.length) {
        console.error('No logo items found in the slider');
        return;
    }
    
    // Clone all logo items and append to create the continuous effect
    logoItems.forEach(item => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
    });
    
    // Optional: Adjust animation speed based on number of logos
    const speed = Math.max(20, logoItems.length * 2); // Base speed on quantity
    slider.style.animationDuration = `${speed}s`;
    
    // Optional: Add pause on hover functionality
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initBrandLogoCarousel();
});


function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    // Check if elements exist
    if (!mobileMenuBtn || !nav) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const expanded = nav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', expanded.toString());
    });
    
    // Handle dropdown behavior
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.mega-dropdown');
        
        // Skip if no link or dropdown found
        if (!link || !dropdown) return;
        
        // For desktop: Show dropdown on hover
        if (window.innerWidth >= 992) {
            item.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            item.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
        
        // For all devices: Toggle dropdown on click
        link.addEventListener('click', (e) => {
            // Prevent navigation if dropdown exists
            if (dropdown) {
                e.preventDefault();
            }
            
            // Toggle current dropdown
            const isActive = dropdown.classList.contains('active');
            
            // Close all dropdowns first
            document.querySelectorAll('.mega-dropdown').forEach(el => {
                el.classList.remove('active');
            });
            
            // Toggle the clicked dropdown
            if (!isActive) {
                dropdown.classList.add('active');
            }
        });
    });
    
    // Close dropdowns and mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const isNavClick = nav.contains(e.target);
        const isMenuBtnClick = mobileMenuBtn.contains(e.target);
        
        if (!isNavClick && !isMenuBtnClick) {
            // Close all dropdowns
            document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Close mobile menu
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Add this function to your existing event listener
document.addEventListener('DOMContentLoaded', () => {
    // Other initialization functions
    initMobileNavigation();
    // ... other init functions
});

/**
 * Helper function to create dropdown menu items with icons
 * @param {HTMLElement} container - The dropdown menu container
 * @param {string} icon - Icon identifier
 * @param {string} text - Link text
 */
function createDropdownItem(container, icon, text) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    // Convert text to URL slug
    const slug = text.toLowerCase().replace(/\s+/g, '-');
    a.href = `${icon}-${slug}.html`;
    
    // Create icon element
    const iconElement = document.createElement('span');
    iconElement.className = `icon icon-${icon}`;
    iconElement.innerHTML = getIconSvg(icon);
    
    a.appendChild(iconElement);
    a.appendChild(document.createTextNode(' ' + text));
    
    li.appendChild(a);
    container.appendChild(li);
}

/**
 * Get SVG icon based on type
 * @param {string} type - Icon type
 * @returns {string} - SVG markup
 */
function getIconSvg(type) {
    const icons = {
        refrigerator: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="12" y1="6" x2="12" y2="10"></line><line x1="4" y1="10" x2="20" y2="10"></line></svg>',
        washer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>',
        dryer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
        dishwasher: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="14" x2="9" y2="18"></line><line x1="15" y1="14" x2="15" y2="18"></line></svg>',
        stove: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><circle cx="8" cy="8" r="2"></circle><circle cx="16" cy="8" r="2"></circle><circle cx="8" cy="16" r="2"></circle><circle cx="16" cy="16" r="2"></circle></svg>',
        oven: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="4" y1="8" x2="20" y2="8"></line><line x1="12" y1="10" x2="12" y2="16"></line></svg>',
        appliance: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>'
    };
    
    return icons[type] || icons['appliance'];
}

/**
 * Appliance Slider Functionality
 * Handles the carousel for appliance types
 */
/**
 * Multi-item carousel with horizontal scrolling
 */
function initApplianceSlider() {
    const slider = document.querySelector('.appliance-slider');
    
    if (!slider) {
        console.error('Appliance slider not found');
        return;
    }
    
    const slidesContainer = slider.querySelector('.appliance-slides');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const slides = slidesContainer.querySelectorAll('.appliance-item');
    
    if (!slidesContainer || !slides.length) {
        console.error('Slider elements missing');
        return;
    }
    
    // Variables
    let currentIndex = 0;
    const slidesToShow = getSlidesToShow();
    let slideWidth = 0;
    
    // Get number of slides to show based on screen width
    function getSlidesToShow() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 992) return 3;
        if (window.innerWidth < 1200) return 4;
        return 5; // Default for large desktop
    }
    
    // Calculate dimensions
    function calculateDimensions() {
        // Calculate individual slide width
        const containerWidth = slidesContainer.clientWidth;
        slideWidth = Math.floor(containerWidth / slidesToShow);
        
        // Apply width to slides
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        
        // Update current scroll position
        scrollToSlide(currentIndex);
    }
    
    // Scroll to specific slide
    function scrollToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) {
            index = 0;
        } else if (index > slides.length - slidesToShow) {
            index = slides.length - slidesToShow;
        }
        
        currentIndex = index;
        
        // Calculate scroll position
        const scrollLeft = index * slideWidth;
        
        // Scroll the container smoothly
        slidesContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        
        // Update active dot
        updateActiveDot();
    }
    
    // Update active dot indicator
    function updateActiveDot() {
        // Calculate which dot should be active
        // For multi-item carousels, we can divide the slider into "pages"
        const totalPages = Math.ceil(slides.length / slidesToShow);
        const activePage = Math.floor(currentIndex / slidesToShow);
        
        // Set the active dot based on current page
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activePage);
        });
    }
    
    // Set up navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToSlide(currentIndex - slidesToShow);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToSlide(currentIndex + slidesToShow);
        });
    }
    
    // Set up dot navigation
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Each dot represents a "page" of slides
                scrollToSlide(index * slidesToShow);
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        calculateDimensions();
    });
    
    // Initialize slider
    calculateDimensions();
    
    // Monitor for scroll events
    slidesContainer.addEventListener('scroll', () => {
        // Get the current scroll position
        const scrollPosition = slidesContainer.scrollLeft;
        
        // Determine which slide is most visible
        currentIndex = Math.round(scrollPosition / slideWidth);
        
        // Update active dot
        updateActiveDot();
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initApplianceSlider();
});

/**
 * FAQ Accordion Functionality
 * Handles expanding/collapsing FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Check if this item is already open
            const isOpen = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.display = 'none';
            });
            
            // If clicked item wasn't open, open it
            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
                
                // Change plus icon to minus
                const icon = question.querySelector('.plus-icon');
                if (icon) {
                    icon.classList.add('minus');
                }
            }
        });
    });
}

/**
 * Testimonial Slider Functionality
 * Manages testimonial carousel if needed
 */
function initTestimonialSlider() {
    // Simple implementation for now - can be expanded later for automatic sliding
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // If there are many testimonials, we could implement a carousel
    // For now, we'll just ensure all are visible on mobile with CSS
}

/**
 * Helper function to animate scrolling to an element
 * @param {HTMLElement} element - The element to scroll to
 */
function scrollToElement(element) {
    if (!element) return;
    
    const headerOffset = 100; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Initialize smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            scrollToElement(targetElement);
        }
    });
});