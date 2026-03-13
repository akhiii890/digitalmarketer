// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor dot immediately
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

// Smooth follower animation loop
function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animateCursor);
}
// Start animation if not on mobile
if(window.innerWidth > 768) {
    animateCursor();
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between list and X
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    } else {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    }
});

// Close menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
        if(entry.target.classList.contains('delay-1')) entry.target.style.transitionDelay = "0.1s";
        if(entry.target.classList.contains('delay-2')) entry.target.style.transitionDelay = "0.2s";
        if(entry.target.classList.contains('delay-3')) entry.target.style.transitionDelay = "0.3s";
        if(entry.target.classList.contains('delay-4')) entry.target.style.transitionDelay = "0.4s";
        
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translate(0, 0)";
        
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => observer.observe(el));

// Hero Animations on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.animate-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, 300 + (index * 150)); // stagger effect
    });
});
