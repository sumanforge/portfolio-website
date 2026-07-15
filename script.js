document.addEventListener('DOMContentLoaded', () => {

    // --- Light & Dark Theme Manager Subsystem ---
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    const activeSavedTheme = localStorage.getItem('portfolio-theme');
    if (activeSavedTheme === 'light') {
        rootElement.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            rootElement.classList.toggle('light-mode');
            if (rootElement.classList.contains('light-mode')) {
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    // --- Custom Inertial Follower Cursor ---
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function easeCursor() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;
        
        cursorX += distX * 0.15;
        cursorY += distY * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(easeCursor);
    }
    easeCursor();

    const targetElements = document.querySelectorAll('.hover-target, a, button, input, textarea');
    targetElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        elem.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });

    // --- Typist Subroutine Layout ---
    const roles = ["Full Stack Developer", "Java Developer", "PHP Developer", "UI/UX Designer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 2000;
    const textTarget = document.getElementById('typing-text');

    function executeTypingEngine() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let dynamicTimeout = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            dynamicTimeout = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            dynamicTimeout = 500;
        }

        setTimeout(executeTypingEngine, dynamicTimeout);
    }
    if (roles.length) setTimeout(executeTypingEngine, 1000);

    // --- Section Scroll Intersection Detection ---
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Navigation Selection Follow Link Tracker ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // --- Responsive Slide Drawer ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // --- Card Transform Engine Layer ---
    const cards = document.querySelectorAll('.tilt-target');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (-10 * (mouseY / (cardHeight / 2))).toFixed(2);
            const rotateY = (10 * (mouseX / (cardWidth / 2))).toFixed(2);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // --- Async Contact Form Handler (Google Apps Script Engine) ---
    const form = document.getElementById('portfolio-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    // PASTE YOUR GOOGLE WEB APP EXECUTION URL HERE
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyo9pYSnsHShWI-drf4LmCI2XqRR30sIBOjsZBpDlGZN-5Oj9lxeRNo13rmIiD-z-Y/exec';

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.textContent = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            statusMsg.style.display = "block";
            statusMsg.className = "form-status-message";
            statusMsg.textContent = "Sending your message...";

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Bypasses cross-origin restrictions on automated app script triggers
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(() => {
                statusMsg.textContent = "Message sent successfully!";
                statusMsg.classList.add('success-msg');
                form.reset();
            })
            .catch(error => {
                console.error(error);
                statusMsg.textContent = "Submission issue. Please check your network.";
                statusMsg.classList.add('error-msg');
            })
            .then(function() {
                submitBtn.textContent = "Send Message";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    statusMsg.style.display = "none";
                }, 6000);
            });
        });
    }
});