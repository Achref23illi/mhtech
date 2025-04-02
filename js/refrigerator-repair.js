/**
 * VM Service Tech - Refrigerator Repair Page Specific JavaScript
 * Handles specific functionality for the refrigerator repair page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all page-specific components
    initFaqAccordion();
    initBackToTop();
    initProblemCardHover();
});

/**
 * Initialize FAQ Accordion Functionality
 * Handles expanding/collapsing FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Check if elements exist
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            // Check if this item is already open
            const isOpen = answer.style.display === 'block';
            
            // Close all items
            faqItems.forEach(faq => {
                const faqAnswer = faq.querySelector('.faq-answer');
                const faqQuestion = faq.querySelector('.faq-question');
                
                if (faqAnswer && faqQuestion) {
                    faqAnswer.style.display = 'none';
                    faqQuestion.classList.remove('active');
                }
            });
            
            // If clicked item wasn't open, open it
            if (!isOpen) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
    });
    
    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        const firstQuestion = faqItems[0].querySelector('.faq-question');
        
        if (firstAnswer && firstQuestion) {
            firstAnswer.style.display = 'block';
            firstQuestion.classList.add('active');
        }
    }
}

/**
 * Initialize Back to Top Button
 * Shows/hides the back to top button based on scroll position
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    // If the button doesn't exist, exit
    if (!backToTopButton) return;
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize Problem Card Hover Effects
 * Adds subtle animation to problem cards on hover
 */
function initProblemCardHover() {
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
}

/**
 * Testimonial Slider Functionality
 * If the page includes a testimonial slider
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // If not enough testimonials for a slider, exit
    if (!testimonialContainer || testimonials.length < 4) return;
    
    // Add testimonial slider functionality here if needed
    // This could include automatic sliding, pagination, etc.
}

/**
 * Service Area Accordion for Mobile
 * Collapses service areas into accordions on small screens
 */
function initServiceAreaAccordion() {
    // Only initialize on mobile screens
    if (window.innerWidth > 768) return;
    
    const areaColumns = document.querySelectorAll('.area-column');
    
    areaColumns.forEach(column => {
        const heading = column.querySelector('h3');
        const list = column.querySelector('ul');
        
        if (heading && list) {
            // Hide lists initially
            list.style.display = 'none';
            
            // Add click event to headings
            heading.addEventListener('click', () => {
                const isVisible = list.style.display === 'block';
                
                // Hide all lists
                document.querySelectorAll('.area-column ul').forEach(ul => {
                    ul.style.display = 'none';
                });
                
                // Toggle the clicked list
                if (!isVisible) {
                    list.style.display = 'block';
                }
            });
        }
    });
}

// Check screen size and initialize responsive features
window.addEventListener('resize', () => {
    initServiceAreaAccordion();
});

// Initialize responsive features on load
window.addEventListener('load', () => {
    initServiceAreaAccordion();
});