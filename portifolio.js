// Navbar functionality
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function () {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');

            // Update active state
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initialize active link
    updateActiveNavLink();
});


// ABOUT ME SECTION
// Add scroll-triggered animations
document.addEventListener('DOMContentLoaded', function () {
    const introSection = document.querySelector('.introContainer');

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.3 });

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.head h3, .head h1, .head .major, .head p, .social-links, .cta-button');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add typing effect for the headline (optional)
    const headline = document.querySelector('.head h1');
    const originalText = headline.textContent;
    headline.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            headline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect when section is in view
    const headlineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            headlineObserver.unobserve(headline);
        }
    });

    headlineObserver.observe(headline);
});


// SECOND ABOUT ME SECTION
// About section animations and interactions
document.addEventListener('DOMContentLoaded', function () {
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));

    function animateValue(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Add scroll-triggered animations
    const aboutElements = document.querySelectorAll('.about p, .about img, .skills-preview');

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.2 });

    aboutElements.forEach(el => {
        aboutObserver.observe(el);
    });

    // Parallax effect for the about image
    window.addEventListener('scroll', function () {
        const aboutImage = document.querySelector('.about-image');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;

        if (aboutImage && window.innerWidth > 768) {
            aboutImage.style.transform = `translateY(${rate}px) scale(1.02)`;
        }
    });
});