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
});

/**
 * Mobile Navigation Functionality
 * Toggles mobile menu and handles dropdown navigation
 */
/**
 * Mobile Navigation Functionality
 * Toggles mobile menu and handles dropdown navigation with icons
 */
function initMobileNavigation() {
    // Create mobile menu toggle button
    const header = document.querySelector('.main-header .container');
    const nav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.createElement('button');
    
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Insert before nav element
    header.insertBefore(mobileMenuBtn, nav);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const expanded = nav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', expanded.toString());
    });
    
    // Handle dropdown menus
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        // Create dropdown toggle with icon
        const link = item.querySelector('a');
        
        // Create dropdown menu container if it doesn't exist
        let dropdownMenu = item.querySelector('.dropdown-menu');
        if (!dropdownMenu) {
            dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';
            item.appendChild(dropdownMenu);
            
            // Add dropdown items based on the section
            if (link.textContent.trim() === 'Repair') {
                createDropdownItem(dropdownMenu, 'refrigerator', 'Refrigerator Repair');
                createDropdownItem(dropdownMenu, 'washer', 'Washer Repair');
                createDropdownItem(dropdownMenu, 'dryer', 'Dryer Repair');
                createDropdownItem(dropdownMenu, 'dishwasher', 'Dishwasher Repair');
                createDropdownItem(dropdownMenu, 'stove', 'Stove Repair');
                createDropdownItem(dropdownMenu, 'oven', 'Oven Repair');
            } else if (link.textContent.trim() === 'Installation') {
                createDropdownItem(dropdownMenu, 'appliance', 'Appliance Installation');
                createDropdownItem(dropdownMenu, 'washer', 'Washer Installation');
                createDropdownItem(dropdownMenu, 'dryer', 'Dryer Installation');
                createDropdownItem(dropdownMenu, 'dishwasher', 'Dishwasher Installation');
            }
        }
        
        // Create toggle button with arrow icon
        const dropdownToggle = document.createElement('button');
        dropdownToggle.className = 'dropdown-toggle';
        dropdownToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        dropdownToggle.setAttribute('aria-label', 'Toggle dropdown menu');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        
        link.appendChild(dropdownToggle);
        
        // Toggle dropdown visibility
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = item.classList.contains('open');
            
            // Close all dropdowns
            dropdownItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                const otherToggle = otherItem.querySelector('.dropdown-toggle');
                if (otherToggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current dropdown
            if (!isExpanded) {
                item.classList.add('open');
                dropdownToggle.setAttribute('aria-expanded', 'true');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            dropdownItems.forEach(item => {
                item.classList.remove('open');
                const toggle = item.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close mobile menu
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

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
function initApplianceSlider() {
    const slider = document.querySelector('.appliance-slider');
    
    if (!slider) return;
    
    const slidesContainer = slider.querySelector('.appliance-slides');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const slides = slidesContainer.querySelectorAll('.appliance-item');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slidesToShow = getSlidesToShow();
    
    // Determine number of slides to show based on screen width
    function getSlidesToShow() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 992) return 3;
        return 5; // Default for desktop
    }
    
    // Update slider on window resize
    window.addEventListener('resize', () => {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            goToSlide(0); // Reset to first slide on resize
        }
    });
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = 0;
        } else if (slideIndex > slides.length - slidesToShow) {
            slideIndex = slides.length - slidesToShow;
        }
        
        currentSlide = slideIndex;
        
        // Calculate scroll position
        const slideWidth = slides[0].offsetWidth;
        slidesContainer.scrollLeft = slideIndex * slideWidth;
        
        // Update active dot
        updateActiveDot();
    }
    
    // Update active dot indicator
    function updateActiveDot() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize slider position
    goToSlide(0);
}

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