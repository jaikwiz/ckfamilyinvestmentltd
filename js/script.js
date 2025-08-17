// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Gallery Filtering (if on gallery page)
    const galleryFilters = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                galleryFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Form Validation and EmailJS (if on contact page)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init("fAJCWuxEjLRuSHxvX"); // Replace with your actual EmailJS public key
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                isValid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Prepare email parameters
                const templateParams = {
                    from_name: name.value.trim(),
                    from_email: email.value.trim(),
                    from_phone: phone.value.trim(),
                    message: message.value.trim(),
                    to_email: 'youngjwizzy@gmail.com'
                };
                
                // Send email using EmailJS
                emailjs.send('service_3ex5ae5', 'template_1l48i6g', templateParams)
                    .then(function(response) {
                        // Success
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = '<i class="fas fa-check-circle"></i><h3>Message Sent Successfully!</h3><p>Thank you for contacting us. We will get back to you soon.</p>';
                        
                        contactForm.innerHTML = '';
                        contactForm.appendChild(successMessage);
                    }, function(error) {
                        // Error
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i><h3>Message Failed to Send</h3><p>Sorry, there was an error sending your message. Please try again or contact us directly.</p>';
                        
                        contactForm.innerHTML = '';
                        contactForm.appendChild(errorMessage);
                        
                        // Reset form
                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                    });
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.classList.add('error-input');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.classList.remove('error-input');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    if (scrollElements.length > 0) {
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Initialize on page load
        handleScrollAnimation();
    }
}); 