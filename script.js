document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor Elements
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Cursor position variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Mouse movement tracking
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor dot position immediately
        cursorDot.style.left = (mouseX - 4) + 'px';
        cursorDot.style.top = (mouseY - 4) + 'px';
    });
    
    // Smooth cursor outline animation
    function animateCursorOutline() {
        // Smooth interpolation for cursor outline
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = (outlineX - 20) + 'px';
        cursorOutline.style.top = (outlineY - 20) + 'px';
        
        requestAnimationFrame(animateCursorOutline);
    }
    
    animateCursorOutline();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.word, .hero-tagline');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
    
    // Enhanced word hover effects with magnetic attraction
    const words = document.querySelectorAll('.word');
    
    words.forEach(word => {
        word.addEventListener('mousemove', function(e) {
            const rect = word.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic effect - subtle attraction
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            word.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        word.addEventListener('mouseleave', function() {
            word.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Click effects with ripple
    words.forEach(word => {
        word.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = word.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            word.style.position = 'relative';
            word.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Particle system for background
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            animation: floatUp ${3 + Math.random() * 4}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 200);
    
    // Keyboard interactions
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            
            // Flash effect
            document.body.style.background = 'radial-gradient(ellipse at center, #2a2a4e 0%, #1a1a1a 70%)';
            setTimeout(() => {
                document.body.style.background = '';
            }, 100);
            
            // Shake words
            words.forEach((word, index) => {
                setTimeout(() => {
                    word.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        word.style.animation = '';
                    }, 500);
                }, index * 100);
            });
        }
    });
    
    // Dynamic cursor trail effect
    const trail = [];
    const trailLength = 8;
    
    function createTrailDot(x, y) {
        const dot = {
            x: x,
            y: y,
            life: trailLength,
            element: document.createElement('div')
        };
        
        dot.element.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 0, 255, ${dot.life / trailLength * 0.5});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${x - 2}px;
            top: ${y - 2}px;
            transition: opacity 0.1s ease;
        `;
        
        document.body.appendChild(dot.element);
        return dot;
    }
    
    window.addEventListener('mousemove', function(e) {
        // Add new trail dot
        trail.push(createTrailDot(e.clientX, e.clientY));
        
        // Update and remove old dots
        for (let i = trail.length - 1; i >= 0; i--) {
            const dot = trail[i];
            dot.life--;
            
            if (dot.life <= 0) {
                dot.element.remove();
                trail.splice(i, 1);
            } else {
                dot.element.style.opacity = (dot.life / trailLength * 0.5);
            }
        }
    });
    
    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
});

// CSS animations added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
`;
document.head.appendChild(style);