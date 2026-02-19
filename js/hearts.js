/* ===================================
   HEARTS.JS - Refined Animation Logic
   =================================== */

// Animation state
let animationInProgress = false;
let isSlowMotion = false;

// Get elements
const heartAnimation = document.getElementById('heartAnimation');
const triggerBtn = document.getElementById('triggerAnimation');
const resetBtn = document.getElementById('resetBtn');
const slowBtn = document.getElementById('slowBtn');
const animationStage = document.querySelector('.animation-stage');
const circleTessan = document.querySelector('.circle-tessan');
const circleJosselin = document.querySelector('.circle-josselin');
const heartResult = document.querySelector('.heart-result');

// Animation duration (normal vs slow motion)
const getSpeed = () => isSlowMotion ? 2 : 1;

// Main animation sequence
function playAnimation() {
    if (animationInProgress) return;
    
    animationInProgress = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Animating...';
    
    // Reset to initial state
    resetAnimation(false);
    
    // Phase 1: Two independent circles (already visible)
    // Wait 500ms to let user see initial state
    setTimeout(() => {
        startPhase2();
    }, 500 * getSpeed());
}

// Phase 2: Slide together + morph into half-ovals with intersection
function startPhase2() {
    console.log('Phase 2: Sliding together + morphing to half-ovals...');
    
    // Create intersection element FIRST (will show during merge)
    const intersection = document.createElement('div');
    intersection.className = 'venn-intersection';
    animationStage.appendChild(intersection);
    
    // Start morphing circles into half-ovals
    circleTessan.classList.add('morph-to-oval');
    circleJosselin.classList.add('morph-to-oval');
    
    // Slide circles toward center to create overlap
    setTimeout(() => {
        circleTessan.style.transform = 'translateX(50px)';
        circleJosselin.style.transform = 'translateX(-50px)';
        
        // Show intersection glow
        setTimeout(() => {
            intersection.style.opacity = '1';
        }, 300);
    }, 100);
    
    // Wait for oval morphing to complete, then start Phase 3
    setTimeout(() => {
        startPhase3(intersection);
    }, 2000 * getSpeed());
}

// Phase 3: Flip/rotate half-ovals into heart shape
function startPhase3(intersection) {
    console.log('Phase 3: Flipping half-ovals into heart...');
    
    // Fade out intersection gradually
    if (intersection) {
        intersection.style.opacity = '0';
    }
    
    // Fade out content inside ovals
    const contents = document.querySelectorAll('.circle-content');
    contents.forEach(content => {
        content.style.opacity = '0';
    });
    
    // Add heart flip transformation
    circleTessan.classList.add('flip-to-heart-left');
    circleJosselin.classList.add('flip-to-heart-right');
    
    // Rotate and position ovals to form heart shape
    setTimeout(() => {
        circleTessan.style.transform = 'translateX(-15px) translateY(-20px) rotate(-45deg) scaleX(0.6)';
        circleJosselin.style.transform = 'translateX(15px) translateY(-20px) rotate(45deg) scaleX(0.6)';
    }, 200);
    
    // Wait for flip animation, then show final heart
    setTimeout(() => {
        if (intersection) intersection.remove();
        startPhase4();
    }, 1500 * getSpeed());
}

// Phase 4: Complete heart + pulse
function startPhase4() {
    console.log('Phase 4: Heart reveal + pulse...');
    
    // Hide oval shapes
    circleTessan.style.opacity = '0';
    circleJosselin.style.opacity = '0';
    
    // Show heart result
    setTimeout(() => {
        heartResult.style.opacity = '1';
        heartResult.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Add pulse animation
        heartResult.classList.add('pulse-animation');
        
        // Animation complete
        setTimeout(() => {
            animationInProgress = false;
            triggerBtn.disabled = false;
            triggerBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Play Again';
        }, 1000 * getSpeed());
        
    }, 400);
}

// Reset animation
function resetAnimation(updateButton = true) {
    console.log('Resetting animation...');
    
    // Remove all animation classes
    circleTessan.classList.remove('morph-to-oval', 'flip-to-heart-left');
    circleJosselin.classList.remove('morph-to-oval', 'flip-to-heart-right');
    heartResult.classList.remove('pulse-animation');
    
    // Reset transforms
    circleTessan.style.transform = '';
    circleJosselin.style.transform = '';
    circleTessan.style.opacity = '1';
    circleJosselin.style.opacity = '1';
    
    // Reset content opacity
    const contents = document.querySelectorAll('.circle-content');
    contents.forEach(content => {
        content.style.opacity = '1';
    });
    
    // Hide heart
    heartResult.style.opacity = '0';
    heartResult.style.transform = 'translate(-50%, -50%) scale(0)';
    
    // Remove any intersection elements
    const intersections = document.querySelectorAll('.venn-intersection');
    intersections.forEach(el => el.remove());
    
    // Reset button
    if (updateButton) {
        animationInProgress = false;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Animation';
    }
}

// Toggle slow motion
function toggleSlowMotion() {
    isSlowMotion = !isSlowMotion;
    
    if (isSlowMotion) {
        slowBtn.innerHTML = '<i class="fa-solid fa-gauge-high"></i> Normal Speed';
        slowBtn.style.background = 'var(--accent)';
        slowBtn.style.borderColor = 'var(--primary)';
        console.log('Slow motion enabled (2x slower)');
    } else {
        slowBtn.innerHTML = '<i class="fa-solid fa-gauge-simple"></i> Slow Motion';
        slowBtn.style.background = 'white';
        slowBtn.style.borderColor = 'var(--stroke)';
        console.log('Normal speed enabled');
    }
}

// Event listeners
triggerBtn.addEventListener('click', playAnimation);
resetBtn.addEventListener('click', () => resetAnimation(true));
slowBtn.addEventListener('click', toggleSlowMotion);

console.log('Hearts animation ready! Click "Play Animation" to start.');
