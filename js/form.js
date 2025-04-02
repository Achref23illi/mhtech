/**
 * VM Service Tech - Form Handler
 * Manages form validation and submission for service request forms
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handlers
    initServiceRequestForm();
    initContactForm();
});

/**
 * Initialize Service Request Form
 * Handles the booking form for appliance repair requests
 */
function initServiceRequestForm() {
    const requestForm = document.getElementById('service-request-form');
    
    if (!requestForm) return;
    
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            submitForm(this, 'service-request');
        }
    });
}

/**
 * Initialize Contact Form
 * Handles the general contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            submitForm(this, 'contact');
        }
    });
}

/**
 * Validate Form Fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input, select, textarea');
    
    // Clear previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    fields.forEach(field => {
        field.classList.remove('error');
        
        // Check required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
        
        // Validate email format
        if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Validate phone format
        if (field.dataset.type === 'phone' && field.value.trim()) {
            const phonePattern = /^[\d\s\(\)\-\+]{10,15}$/;
            if (!phonePattern.test(field.value)) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

/**
 * Show Form Error Message
 * @param {HTMLElement} field - The field with an error
 * @param {string} message - Error message to display
 */
function showError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Submit Form Data
 * @param {HTMLFormElement} form - The form to submit
 * @param {string} formType - Type of form being submitted
 */
function submitForm(form, formType) {
    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Collect form data
    const formData = new FormData(form);
    const formDataObject = {};
    
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    
    // Add form type to data
    formDataObject.formType = formType;
    
    // In a real implementation, you would send this data to your server
    // For demonstration, we'll simulate a successful submission after a delay
    setTimeout(() => {
        // Simulate successful submission
        showFormMessage(form, 'success', 'Your request has been submitted successfully. We will contact you shortly.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        
        // Console log for debugging (remove in production)
        console.log('Form submission data:', formDataObject);
    }, 1500);
    
    // For a real implementation, use fetch API to submit form data:
    /*
    fetch('your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showFormMessage(form, 'success', 'Your request has been submitted successfully. We will contact you shortly.');
        form.reset();
    })
    .catch(error => {
        showFormMessage(form, 'error', 'There was a problem submitting your form. Please try again or contact us directly.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    });
    */
}

/**
 * Show Form Submission Message
 * @param {HTMLFormElement} form - The form element
 * @param {string} type - Message type ('success' or 'error')
 * @param {string} message - The message to display
 */
function showFormMessage(form, type, message) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(messageElement, form.firstChild);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => messageElement.remove(), 500);
        }, 5000);
    }
}