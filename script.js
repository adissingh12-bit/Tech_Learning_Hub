/*
  TECH LEARNING HUB - JavaScript
  Handling interactivity, form validation, and UI state.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tech Learning Hub script loaded.');

    // --- Feature 1: Mobile Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon if needed (using emoji for simplicity since lucide is for React in this setup)
            navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // --- Feature 2: Dark Mode Toggle ---
    // Create a toggle button dynamically to demonstrate DOM manipulation
    const header = document.querySelector('nav');
    if (header) {
        const darkToggle = document.createElement('button');
        darkToggle.id = 'dark-mode-toggle';
        darkToggle.className = 'btn';
        darkToggle.style.padding = '0.5rem';
        darkToggle.style.marginLeft = '1rem';
        darkToggle.textContent = '🌙';
        darkToggle.title = 'Toggle Dark Mode';
        header.appendChild(darkToggle);

        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            
            // Persist preference in local storage
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Check for saved preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            darkToggle.textContent = '☀️';
        }
    }

    // --- Feature 3: Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            // Simple validation functions
            const setError = (element, message) => {
                const group = element.parentElement;
                const errorDisplay = group.querySelector('.error-message');
                errorDisplay.textContent = message;
                errorDisplay.style.display = 'block';
                element.style.borderColor = 'var(--error)';
            };

            const clearError = (element) => {
                const group = element.parentElement;
                const errorDisplay = group.querySelector('.error-message');
                errorDisplay.style.display = 'none';
                element.style.borderColor = '#cbd5e1';
            };

            // Reset errors
            [nameField, emailField, messageField].forEach(clearError);

            // Name validation
            if (nameField.value.trim().length < 2) {
                setError(nameField, 'Name must be at least 2 characters.');
                isValid = false;
            }

            // Email validation (regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                setError(emailField, 'Please enter a valid email address.');
                isValid = false;
            }

            // Message validation
            if (messageField.value.trim().length < 10) {
                setError(messageField, 'Message must be at least 10 characters.');
                isValid = false;
            }

            if (isValid) {
                // Success feedback
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // --- Feature 4: Dynamic Content (Course Filters) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                courseCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add fade in animation
                        card.style.animation = 'fadeInDown 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
