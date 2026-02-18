/* =============================================
   VOGUE-INSPIRED PORTFOLIO - JAVASCRIPT
   ============================================= */

/**
 * Highlight Active Navigation Link
 * Based on current page URL
 */
function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to the matching link
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle Contact Form Submission
 * Client-side only (no backend)
 */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Since there's no backend, we'll create a mailto link
        // This provides a fallback for users who have email configured
        const mailtoLink = `mailto:zuraidorsey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

        // Show success message
        showFormStatus(
            'Thank you for your message! Opening your email client to send... If it doesn\'t open automatically, please email zuraidorsey@gmail.com with your message.',
            'success'
        );

        // Trigger mailto
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 500);

        // Reset form after delay
        setTimeout(() => {
            form.reset();
            showFormStatus('', '');
        }, 1500);
    });
}

/**
 * Display Form Status Message
 */
function showFormStatus(message, type) {
    const statusElement = document.getElementById('formStatus');
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.className = 'form-status ' + (type ? type : '');

    if (!message) {
        statusElement.textContent = '';
        statusElement.className = 'form-status';
    }
}

/**
 * Handle PDF Fallback
 * Show fallback message if PDF cannot load
 */
function setupPdfFallback() {
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfFallback = document.getElementById('pdfFallback');

    if (!pdfFrame) return;

    // Check if PDF exists and loads
    pdfFrame.addEventListener('load', function() {
        // PDF loaded successfully
        if (pdfFallback) {
            pdfFallback.style.display = 'none';
        }
    });

    pdfFrame.addEventListener('error', function() {
        // PDF failed to load
        if (pdfFallback) {
            pdfFallback.style.display = 'block';
        }
        pdfFrame.style.display = 'none';
    });

    // Timeout fallback (if PDF takes too long to load)
    setTimeout(() => {
        if (!pdfFrame.contentDocument && !pdfFrame.contentWindow && pdfFallback) {
            pdfFallback.style.display = 'block';
            pdfFrame.style.display = 'none';
        }
    }, 3000);
}

/**
 * Smooth Scroll Enhancement
 * For anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Mobile Menu Toggle (if needed in future)
 * Placeholder for responsive navigation
 */
function setupMobileNav() {
    // Placeholder for future mobile menu functionality
    // Currently using flex layout that's inherently responsive
}

/**
 * Initialize all scripts on page load
 */
function initializePortfolio() {
    highlightActiveNavLink();
    setupContactForm();
    setupPdfFallback();
    setupSmoothScroll();
    setupMobileNav();
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

/**
 * Optional: Reinitialize active nav on page changes
 * Useful if using AJAX navigation in the future
 */
window.addEventListener('hashchange', highlightActiveNavLink);
