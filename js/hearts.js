/* ===================================
   HEARTS.JS - Animation Logic
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

// Phase 2: Merge into Venn diagram
function startPhase2() {
    console.log('Phase 2: Merging into Venn diagram...');
    
    // Add merging class
    circleTessan.classList.add('merging');
    circleJosselin.classList.add('merging');
    
    // Move circles closer together (overlap)
    circleTessan.style.transform = 'translateX(40px)';
    circleJosselin.style.transform = 'translateX(-40px)';
    
    // Create intersection highlight effect
    const intersection = document.createElement('div');
    intersection.className = 'venn-intersection';
    animationStage.appendChild(intersection);
    
    setTimeout(() => {
        intersection.style.opacity = '1';
    }, 100);
    
    // Wait for merge animation, then start Phase 3
    setTimeout(() => {
        startPhase3(intersection);
    }, 1500 * getSpeed());
}

// Phase 3: Transform into heart
function startPhase3(intersection) {
    console.log('Phase 3: Transforming into heart...');
    
    // Fade out intersection
    if (intersection) {
        intersection.style.opacity = '0';
        setTimeout(() => intersection.remove(), 600);
    }
    
    // Add heart transformation classes
    circleTessan.classList.add('to-heart-left');
    circleJosselin.classList.add('to-heart-right');
    
    // Scale down and rotate circles to prepare for heart shape
    circleTessan.style.transform = 'translateX(20px) scale(0.8) rotate(-45deg)';
    circleJosselin.style.transform = 'translateX(-20px) scale(0.8) rotate(45deg)';
    
    // Wait for transformation, then start Phase 4
    setTimeout(() => {
        startPhase4();
    }, 1200 * getSpeed());
}

// Phase 4: Complete heart + pulse
function startPhase4() {
    console.log('Phase 4: Heart reveal + pulse...');
    
    // Hide circles
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
        
    }, 300);
}

// Reset animation
function resetAnimation(updateButton = true) {
    console.log('Resetting animation...');
    
    // Remove all animation classes
    circleTessan.classList.remove('merging', 'to-heart-left');
    circleJosselin.classList.remove('merging', 'to-heart-right');
    heartResult.classList.remove('pulse-animation');
    
    // Reset transforms
    circleTessan.style.transform = '';
    circleJosselin.style.transform = '';
    circleTessan.style.opacity = '1';
    circleJosselin.style.opacity = '1';
    
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

// Optional: Auto-play on page load (remove if you don't want this)
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         playAnimation();
//     }, 1000);
// });

console.log('Hearts animation ready! Click "Play Animation" to start.');
