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

// Galaxy / Antigravity Background
const canvas = document.getElementById('galaxy-canvas');
let ctx = null;
if (canvas) {
    ctx = canvas.getContext('2d');
}

let width, height;
let particles = [];

function initGlobalCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    if (canvas) {
        initGlobalCanvas();
        initParticles();
    }
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.baseX = this.x;
        this.baseY = this.y;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        // Antigravity (repel from mouse)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        if (distance < maxDist) {
            const force = (maxDist - distance) / maxDist;
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;
        }
    }
    draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 238, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    if (!width || !height) return;
    const numParticles = Math.min((width * height) / 10000, 120);
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animateGalaxy() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 238, 0, ${0.15 - distance / 120 * 0.15})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateGalaxy);
}

// Initialize only if canvas exists
if (canvas) {
    initGlobalCanvas();
    initParticles();
    animateGalaxy();
}
