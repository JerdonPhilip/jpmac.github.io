document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const header = document.getElementById('mainHeader');

    function setMenu(open) {
        if (!mobileMenu || !menuToggle || !menuIcon) return;
        mobileMenu.classList.toggle('open', open);
        menuIcon.className = open ? 'fas fa-times text-lg' : 'fas fa-bars text-lg';
        menuToggle.setAttribute('aria-expanded', String(open));
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            setMenu(!mobileMenu.classList.contains('open'));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                setMenu(false);
                menuToggle.focus();
            }
        });
    }

    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.querySelectorAll('#mainHeader a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', () => setMenu(false));
    });

    const revealElements = document.querySelectorAll('.reveal:not(.visible)');
    if (revealElements.length > 0 && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('visible');
                    el.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'opacity') {
                            el.style.transition = '';
                            el.style.transitionDelay = '';
                            el.removeEventListener('transitionend', handler);
                        }
                    });
                    obs.unobserve(el);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -24px 0px'
        });

        revealElements.forEach((el) => {
            const parent = el.parentElement;
            let delay = 0;
            if (parent) {
                const siblings = Array.from(parent.children).filter((c) => c.classList.contains('reveal'));
                delay = Math.min(siblings.indexOf(el) * 80, 400);
            }
            el.style.transitionDelay = delay + 'ms';
            observer.observe(el);
        });
    } else {
        revealElements.forEach((el) => el.classList.add('visible'));
    }

    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        });
    }

    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
