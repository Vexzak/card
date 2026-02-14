// Get elements
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const clickText = document.getElementById('clickText');
const closeBtn = document.getElementById('closeBtn');

let isOpen = false;

// Background music
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 1.0; // Set volume to 50%

// Envelope click handler
envelope.addEventListener('click', () => {
    if (!isOpen) {
        // Start music when envelope is clicked
        bgMusic.play().catch(err => console.log('Music play error:', err));
        openEnvelope();
    }
});

// Close button handler
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeEnvelope();
});

// Open envelope function
function openEnvelope() {
    isOpen = true;
    
    // Add open class to envelope
    envelope.classList.add('open');
    
    // Hide click text
    clickText.classList.add('hide');
    
    // Show letter with delay
    setTimeout(() => {
        letter.classList.add('show');
        
        // Add some sparkle effect
        createSparkles();
    }, 400);
}

// Close envelope function
function closeEnvelope() {
    isOpen = false;
    
    // Hide letter
    letter.classList.remove('show');
    
    // Close envelope
    setTimeout(() => {
        envelope.classList.remove('open');
        clickText.classList.remove('hide');
    }, 300);
}

// Create sparkles effect when letter appears
function createSparkles() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff85c1'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.width = '12px';
            sparkle.style.height = '12px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '100';
            sparkle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 120 + Math.random() * 150;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.5) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1200);
        }, i * 25);
    }
    
    // Add ribbon confetti
    createRibbonConfetti();
}

// Create ribbon confetti effect
function createRibbonConfetti() {
    const ribbonColors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const ribbon = document.createElement('div');
            ribbon.style.position = 'fixed';
            ribbon.style.left = `${20 + Math.random() * 60}%`;
            ribbon.style.top = '-50px';
            ribbon.style.width = '8px';
            ribbon.style.height = '40px';
            ribbon.style.background = ribbonColors[Math.floor(Math.random() * ribbonColors.length)];
            ribbon.style.borderRadius = '4px';
            ribbon.style.pointerEvents = 'none';
            ribbon.style.zIndex = '100';
            ribbon.style.opacity = '0.8';
            
            document.body.appendChild(ribbon);
            
            const fallDuration = 3000 + Math.random() * 2000;
            const rotations = 3 + Math.random() * 3;
            const sway = -100 + Math.random() * 200;
            
            ribbon.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 0.8
                },
                {
                    transform: `translateY(100vh) translateX(${sway}px) rotate(${rotations * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                ribbon.remove();
            }, fallDuration);
        }, i * 100);
    }
}

// Add some interactive hover effects
envelope.addEventListener('mouseenter', () => {
    if (!isOpen) {
        createMiniHearts();
    }
});

// Create mini hearts on hover
function createMiniHearts() {
    const heartTypes = ['💕', '💖', '💗', '💝', '💓'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.position = 'fixed';
            heart.style.left = (envelope.offsetLeft + Math.random() * envelope.offsetWidth) + 'px';
            heart.style.top = (envelope.offsetTop + envelope.offsetHeight) + 'px';
            heart.style.fontSize = (18 + Math.random() * 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5';
            heart.style.filter = 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.6))';
            
            document.body.appendChild(heart);
            
            // Random float direction
            const swayX = -30 + Math.random() * 60;
            const floatHeight = 80 + Math.random() * 50;
            
            // Animate heart floating up
            heart.animate([
                {
                    transform: 'translateY(0) translateX(0) scale(0.3) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(-${floatHeight}px) translateX(${swayX}px) scale(1.2) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                heart.remove();
            }, 1800);
        }, i * 150);
    }
}

// Optional: Close letter when clicking outside
document.addEventListener('click', (e) => {
    if (isOpen && 
        !letter.contains(e.target) && 
        !envelope.contains(e.target)) {
        closeEnvelope();
    }
});

// Prevent letter click from closing
letter.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add keyboard support (ESC to close)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        closeEnvelope();
    }
    // Close image modal on ESC
    if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        closeImageModal();
    }
});

// Image modal functionality
const giftEmoji = document.getElementById('giftEmoji');
const imageModal = document.getElementById('imageModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

// Open image modal when gift is clicked
giftEmoji.addEventListener('click', (e) => {
    e.stopPropagation();
    openImageModal();
});

// Close modal when close button is clicked
modalClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeImageModal();
});

// Close modal when overlay is clicked
modalOverlay.addEventListener('click', () => {
    closeImageModal();
});

function openImageModal() {
    imageModal.classList.add('show');
    proposalBox.classList.add('show');
    
    // Position and show the No button next to Yes button
    setTimeout(() => {
        const yesBtn = document.getElementById('btnYes');
        const yesRect = yesBtn.getBoundingClientRect();
        
        btnNo.classList.add('show');
        btnNo.style.position = 'fixed';
        btnNo.style.left = (yesRect.right + 15) + 'px'; // 15px gap from Yes button
        btnNo.style.top = yesRect.top + 'px';
        btnNo.style.opacity = '1';
    }, 300);
    
    // Create sparkle effect when opening
    createModalSparkles();
}

function closeImageModal() {
    imageModal.classList.remove('show');
    proposalBox.classList.remove('show');
    btnNo.classList.remove('show');
}

// Sparkle effect when modal opens
function createModalSparkles() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff85c1'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.width = '10px';
            sparkle.style.height = '10px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10002';
            sparkle.style.boxShadow = `0 0 15px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            document.body.appendChild(sparkle);
            
            const angle = (Math.PI * 2 * i) / 25;
            const distance = 150 + Math.random() * 200;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.5)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 20);
    }
}

// Date proposal functionality
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const loveOverlay = document.getElementById('loveOverlay');
const proposalBox = document.getElementById('proposalBox');

// Track if button has been repositioned
let buttonRepositioned = false;

// Smooth repelling No button - moves away but stays visible
document.addEventListener('mousemove', (e) => {
    if (!btnNo || !imageModal.classList.contains('show')) return;
    
    const btnRect = btnNo.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to button center
    const distanceX = btnCenterX - mouseX;
    const distanceY = btnCenterY - mouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Repel radius - button starts moving when mouse is within 150px
    const repelRadius = 150;
    
    if (distance < repelRadius && distance > 0) {
        buttonRepositioned = true;
        
        // Calculate repel strength (stronger when closer)
        const repelStrength = (repelRadius - distance) / repelRadius;
        
        // Move button away from cursor
        const moveAmount = repelStrength * 40;
        
        // Calculate direction away from mouse
        const directionX = distanceX / distance;
        const directionY = distanceY / distance;
        
        // Calculate new position
        let newX = btnRect.left + directionX * moveAmount;
        let newY = btnRect.top + directionY * moveAmount;
        
        // STRICT boundary checking - keep well within screen
        const padding = 80;
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;
        
        // Clamp position
        newX = Math.max(padding, Math.min(maxX, newX));
        newY = Math.max(padding, Math.min(maxY, newY));
        
        // Double check it's actually visible
        if (newX < 0 || newY < 0 || newX > window.innerWidth - btnRect.width || newY > window.innerHeight - btnRect.height) {
            // Reset to safe position if somehow out of bounds
            newX = window.innerWidth - 250;
            newY = window.innerHeight / 2;
        }
        
        // Apply position - make it FIXED so it can move anywhere
        btnNo.style.position = 'fixed';
        btnNo.style.left = newX + 'px';
        btnNo.style.top = newY + 'px';
        btnNo.style.transform = 'none';
        btnNo.style.transition = 'none';
    }
});

// Yes button - show love confession
btnYes.addEventListener('click', () => {
    showLoveConfession();
});

// No button click (just in case they catch it)
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Jump to random visible position if clicked
    const padding = 100;
    const randomX = padding + Math.random() * (window.innerWidth - 300);
    const randomY = padding + Math.random() * (window.innerHeight - 200);
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
});

function showLoveConfession() {
    // Show love overlay (but keep everything else visible)
    loveOverlay.classList.add('show');
    
    // Create massive sparkle explosion
    createMassiveSparkleExplosion();
    
    // Create continuous heart rain
    createHeartRain();
    
    // Create magical trails all around
    createMagicalTrails();
}

function createMassiveSparkleExplosion() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff85c1', '#fff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.width = (10 + Math.random() * 20) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '100000';
            sparkle.style.boxShadow = `0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            document.body.appendChild(sparkle);
            
            const angle = (Math.PI * 2 * i) / 100;
            const distance = 200 + Math.random() * 400;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(2) rotate(${720 + Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                sparkle.remove();
            }, 2500);
        }, i * 15);
    }
}

function createHeartRain() {
    const heartTypes = ['💕', '💖', '💗', '💝', '💓', '❤️', '💞'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.fontSize = (30 + Math.random() * 40) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100000';
            heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))';
            
            document.body.appendChild(heart);
            
            const fallDuration = 3000 + Math.random() * 2000;
            const sway = -100 + Math.random() * 200;
            
            heart.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg) scale(0.5)',
                    opacity: 0
                },
                {
                    transform: `translateY(${window.innerHeight + 100}px) translateX(${sway}px) rotate(${360 + Math.random() * 360}deg) scale(1.5)`,
                    opacity: 1
                }
            ], {
                duration: fallDuration,
                easing: 'linear'
            });
            
            setTimeout(() => {
                heart.remove();
            }, fallDuration);
        }, i * 100);
    }
    
    // Continue heart rain
    setTimeout(createHeartRain, 5000);
}

function createMagicalTrails() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#fff'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.width = '4px';
            trail.style.height = '100px';
            trail.style.background = `linear-gradient(to bottom, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            trail.style.left = Math.random() * window.innerWidth + 'px';
            trail.style.top = Math.random() * window.innerHeight + 'px';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '100000';
            trail.style.opacity = '0.6';
            
            document.body.appendChild(trail);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 300;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            trail.animate([
                {
                    transform: `translate(0, 0) rotate(${Math.random() * 360}deg)`,
                    opacity: 0.8
                },
                {
                    transform: `translate(${endX}px, ${endY}px) rotate(${360 + Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            setTimeout(() => {
                trail.remove();
            }, 2000);
        }, i * 50);
    }
    
    // Continue magical trails
    setTimeout(createMagicalTrails, 2000);
}

// Magic cursor dust trail
let lastSparkleTime = 0;
const sparkleInterval = 15; // Create sparkle every 15ms (more frequent!)

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    if (currentTime - lastSparkleTime > sparkleInterval) {
        createCursorSparkle(e.clientX, e.clientY);
        lastSparkleTime = currentTime;
    }
});

function createCursorSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    
    // Random colors from pink palette
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff85c1', '#fff0f5'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.backgroundColor = randomColor;
    sparkle.style.boxShadow = `0 0 15px ${randomColor}, 0 0 30px ${randomColor}, 0 0 45px ${randomColor}`;
    
    // Bigger size variation
    const size = 8 + Math.random() * 12;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    // More dramatic drift
    const driftX = -40 + Math.random() * 80;
    const driftY = 40 + Math.random() * 60;
    
    document.body.appendChild(sparkle);
    
    // Animate with random drift
    sparkle.animate([
        {
            transform: `translate(0, 0) scale(1.5) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(${driftX}px, ${driftY}px) scale(0) rotate(${360 + Math.random() * 360}deg)`,
            opacity: 0
        }
    ], {
        duration: 1200 + Math.random() * 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}