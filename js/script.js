document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize Vanta.js background
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.2,
        scaleMobile: 1.2,
        color: 0x00acc1,
        backgroundColor: 0x111111,
        points: 20.0,
        maxDistance: 30.0,
        spacing: 25.0,
        showDots: true,
        dotColor: 0xFF6347
    });

    // Typing effect
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Full Stack Developer', 'Cloud Engineer', 'Web Developer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Typing animation for designation
    function initTypingAnimation() {
        const text = "IT & Data Science Student";
        const typingText = document.getElementById('typing-text');
        if (!typingText) return;
        
        let index = 0;
        let isDeleting = false;
        let wait = 3000; // 3 seconds pause
        let typeSpeed = 100; // Typing speed in milliseconds
        
        function type() {
            const currentText = typingText.textContent;
            
            if (!isDeleting && index < text.length) {
                // Typing
                typingText.textContent = text.substring(0, index + 1);
                index++;
                typeSpeed = 100; // Typing speed
            } else if (isDeleting && index > 0) {
                // Deleting
                typingText.textContent = text.substring(0, index - 1);
                index--;
                typeSpeed = 50; // Faster deletion
            }
            
            // Change direction
            if (index === text.length) {
                isDeleting = true;
                typeSpeed = wait; // Pause at the end
            } else if (index === 0 && isDeleting) {
                isDeleting = false;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the animation after a short delay
        setTimeout(type, 1000);
    }
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Custom cursor - only for non-touch devices
    const cursor = document.querySelector('.cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for interactive elements
        const hoverElements = ['a', 'button', '.hobby', '.social-link', 'input', 'textarea'];
        hoverElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('hovered');
                });
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hovered');
                });
            });
        });
    } else {
        // Hide cursor on touch devices
        cursor.style.display = 'none';
    }

    // Animate skills on scroll
    const skillBars = document.querySelectorAll('.skill');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkills() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            skillBars.forEach(skill => {
                const skillLevel = skill.getAttribute('data-skill');
                const skillBar = skill.querySelector('.skill-level');
                skillBar.style.width = skillLevel + '%';
                skill.classList.add('visible');
            });
        }
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-text, .about-visual, .hobby, .skill, .resume-column');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
        
        // Animate skills when in view
        if (skillsSection) {
            animateSkills();
        }
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
        
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Initialize animations on page load
    animateOnScroll();
    
    // Add loaded class to body to trigger animations
    document.body.classList.add('loaded');
    
    // Initialize testimonial slider
    initTestimonialSlider();
});

// Testimonials Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides.length) return; // Exit if no slides found
    
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Show first slide by default
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and update dot
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Next slide function
    function nextSlide() {
        const newIndex = (currentSlide + 1) % totalSlides;
        showSlide(newIndex);
    }

    // Previous slide function
    function prevSlide() {
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(newIndex);
    }

    // Auto slide every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            startAutoSlide();
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(slideInterval);
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(slideInterval);
        startAutoSlide();
    });

    // Initialize
    showSlide(0);
    startAutoSlide();
}