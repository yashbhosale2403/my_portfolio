document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    const bootLines = document.querySelectorAll('#boot-text p:not(.blinking-cursor)');
    
    // Simulate terminal boot sequence
    let delay = 0;
    bootLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, delay);
        delay += 600 + Math.random() * 400; // Random delay between lines
    });

    // Hide preloader after boot
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, delay + 800);

    // 2. Custom Cursor Glow Follow
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Typing Animation (Hero Section)
    const typeText = document.getElementById('typewriter');
    const words = ["Red Teaming...", "Vulnerability Hunting...", "Securing Systems...", "Penetration Testing..."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function buildTypingEffect() {
        if (!typeText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typeText.textContent = currentWord.substring(0, charIndex);
            typeSpeed = 50; 
        } else {
            charIndex++;
            typeText.textContent = currentWord.substring(0, charIndex);
            typeSpeed = 100;
        }

        // Wait before deleting
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // pause before typing new word
        }

        setTimeout(buildTypingEffect, typeSpeed);
    }
    
    // Start typing after preloader finishes
    setTimeout(buildTypingEffect, delay + 1000);

    // 5. Scroll Reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 6. Contact Form Submission Prevent
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.btn-submit');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing...';
            submitBtn.style.color = '#fff';
            
            // Simulate network request
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="sys-msg">[OK]</span> Payload Delivered';
                submitBtn.style.background = 'rgba(0, 255, 159, 0.2)';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // 7. Mobile Menu Hamburger Toggle (Basic setup)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('active');
        });
        
        // Let menu close on link click for better mobile UX
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 8. Theme Toggle (Light/Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeToggle && themeIcon) {
        // Check saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});
