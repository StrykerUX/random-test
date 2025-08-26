// Efecto Parallax
document.addEventListener('DOMContentLoaded', function() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const navbar = document.querySelector('.navbar');
    
    // Parallax scroll effect
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Navbar opacity effect
        if (scrolled > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    }
    
    // Optimized scroll event with requestAnimationFrame
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Interactive buttons with ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .screenshot-item').forEach(el => {
        observer.observe(el);
    });
    
    // Mouse movement parallax effect for hero content
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        heroContent.style.transform = `translate(${(x - 50) * 0.1}px, ${(y - 50) * 0.1}px)`;
    });
    
    // Reset hero content position when mouse leaves
    hero.addEventListener('mouseleave', function() {
        heroContent.style.transform = 'translate(0, 0)';
    });
    
    // Add floating animation to feature icons
    document.querySelectorAll('.feature-icon').forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('floating');
    });
    
    // Particle effect for hero background
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            hero.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Game trailer modal (placeholder functionality)
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        alert('Trailer próximamente disponible!');
    });
    
    // Download buttons functionality
    document.querySelectorAll('.btn-download').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.trim();
            alert(`Descargando Epic Quest para ${platform}...`);
        });
    });
    
    // Play button functionality
    document.querySelector('.btn-primary').addEventListener('click', function() {
        alert('¡Preparando tu aventura épica!');
    });
});

// CSS Animations added via JavaScript
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float-up linear infinite;
        pointer-events: none;
    }
    
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(100vh) scale(0);
        }
        10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(10vh) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(0vh) scale(0);
        }
    }
    
    .hero-content {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);