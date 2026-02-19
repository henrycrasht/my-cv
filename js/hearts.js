/* ===================================
   HEARTS.JS - Fixed Animation Logic
   =================================== */

let animationInProgress = false;
let isSlowMotion = false;

let triggerBtn, resetBtn, slowBtn, circleTessan, circleJosselin, intersectionGlow, heartResult;

const getSpeed = () => isSlowMotion ? 2 : 1;

function playAnimation() {
    if (animationInProgress) return;
    
    animationInProgress = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Animating...';
    
    resetAnimation(false);
    
    // Wait to show initial state
    setTimeout(() => {
        phase2a_SlideCirclesTogether();
    }, 500 * getSpeed());
}

// Phase 2a: SLIDE circles together (create overlap/intersection)
function phase2a_SlideCirclesTogether() {
    console.log('Phase 2a: Sliding circles together...');
    
    circleTessan.classList.add('slide-together');
    circleJosselin.classList.add('slide-together');
    
    // Show intersection glow once they start overlapping
    setTimeout(() => {
        intersectionGlow.style.opacity = '1';
        intersectionGlow.style.animation = 'pulse 2s ease-in-out infinite';
    }, 500 * getSpeed());
    
    // Wait for slide to complete, then morph
    setTimeout(() => {
        phase2b_MorphToOvals();
    }, 1200 * getSpeed());
}

// Phase 2b: MORPH into ovals (WHILE they're overlapping)
function phase2b_MorphToOvals() {
    console.log('Phase 2b: Morphing into ovals...');
    
    circleTessan.classList.add('morph-oval');
    circleJosselin.classList.add('morph-oval');
    
    // Keep intersection visible during morph
    // Wait for morph to complete
    setTimeout(() => {
        phase3_FlipToHeart();
    }, 1500 * getSpeed());
}

// Phase 3: Flip ovals into heart
function phase3_FlipToHeart() {
    console.log('Phase 3: Flipping to heart...');
    
    // Fade out content
    document.querySelectorAll('.circle-content').forEach(el => {
        el.style.opacity = '0';
    });
    
    // Fade out intersection
    intersectionGlow.style.opacity = '0';
    
    // Flip circles into heart position
    circleTessan.classList.add('flip-heart');
    circleJosselin.classList.add('flip-heart');
    
    setTimeout(() => {
        phase4_ShowHeart();
    }, 1600 * getSpeed());
}

// Phase 4: Show final heart + pulse
function phase4_ShowHeart() {
    console.log('Phase 4: Heart reveal!');
    
    // Hide circles
    circleTessan.style.opacity = '0';
    circleJosselin.style.opacity = '0';
    
    // Show heart
    setTimeout(() => {
        heartResult.style.opacity = '1';
        heartResult.style.transform = 'translate(-50%, -50%) scale(1)';
        heartResult.style.animation = 'heartPulse 0.8s ease-out';
        
        const icon = heartResult.querySelector('i');
        icon.style.animation = 'heartBeat 1.2s ease-in-out';
        
        setTimeout(() => {
            animationInProgress = false;
            triggerBtn.disabled = false;
            triggerBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Play Again';
        }, 1000 * getSpeed());
    }, 300);
}

function resetAnimation(updateButton = true) {
    console.log('Resetting...');
    
    // Remove all classes
    circleTessan.classList.remove('slide-together', 'morph-oval', 'flip-heart');
    circleJosselin.classList.remove('slide-together', 'morph-oval', 'flip-heart');
    
    // Reset styles
    circleTessan.style.cssText = '';
    circleJosselin.style.cssText = '';
    intersectionGlow.style.cssText = '';
    heartResult.style.cssText = '';
    
    // Reset content opacity
    document.querySelectorAll('.circle-content').forEach(el => {
        el.style.opacity = '1';
    });
    
    if (updateButton) {
        animationInProgress = false;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Animation';
    }
}

function toggleSlowMotion() {
    isSlowMotion = !isSlowMotion;
    
    if (isSlowMotion) {
        slowBtn.innerHTML = '<i class="fa-solid fa-gauge-high"></i> Normal Speed';
        slowBtn.style.background = 'var(--accent)';
        slowBtn.style.borderColor = 'var(--primary)';
    } else {
        slowBtn.innerHTML = '<i class="fa-solid fa-gauge-simple"></i> Slow Motion';
        slowBtn.style.background = 'white';
        slowBtn.style.borderColor = 'var(--stroke)';
    }
}

// INITIALIZE - Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing hearts animation...');
    
    // Get all elements
    triggerBtn = document.getElementById('triggerBtn');
    resetBtn = document.getElementById('resetBtn');
    slowBtn = document.getElementById('slowBtn');
    circleTessan = document.getElementById('circleTessan');
    circleJosselin = document.getElementById('circleJosselin');
    intersectionGlow = document.getElementById('intersectionGlow');
    heartResult = document.getElementById('heartResult');
    
    // Check if all elements exist
    if (!triggerBtn || !resetBtn || !slowBtn || !circleTessan || !circleJosselin || !intersectionGlow || !heartResult) {
        console.error('Error: Some elements are missing!');
        return;
    }
    
    // Add event listeners
    triggerBtn.addEventListener('click', playAnimation);
    resetBtn.addEventListener('click', () => resetAnimation(true));
    slowBtn.addEventListener('click', toggleSlowMotion);
    
    console.log('Hearts animation ready! Click "Play Animation" to start.');
});
