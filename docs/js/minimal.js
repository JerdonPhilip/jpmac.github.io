/* ========== MINIMAL PORTFOLIO INTERACTIONS ========== */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileMenu && menuIcon) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            // Update icon
            menuIcon.className = isOpen ? 'fas fa-times text-lg' : 'fas fa-bars text-lg';
            // Update ARIA attribute
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a mobile nav link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuIcon.className = 'fas fa-bars text-lg';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on outside click (optional, but we can add later if needed)
    }

    // --- Desktop & Mobile Resume Buttons (same action) ---
    const resumeButtons = [
        document.getElementById('desktopResumeBtn'),
        document.getElementById('mobileResumeBtn'),
        document.getElementById('downloadResumeBtn')
    ];

    resumeButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Create a temporary link and click it
                const link = document.createElement('a');
                link.href = './assets/files/Jerdon_Philip_Macaraeg_CV.pdf'; // your file path
                link.download = 'Jerdon_Philip_Macaraeg_Resume.pdf';         // name the downloaded file
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    });
    // View resume button
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume preview would open here. Replace with actual link.');
            // window.open('resume.pdf', '_blank');
        });
    }

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Reveal on Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // only animate once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately if no observer support
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // --- Smooth scroll for anchor links (already handled by CSS, but ensure desktop nav links close mobile menu if open) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // If mobile menu is open, close it
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    if (menuIcon) menuIcon.className = 'fas fa-bars text-lg';
                    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // --- Header shadow on scroll (optional, add subtle shadow when scrolled) ---
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

});