/* ===================================
   SIMPLE CIRCLE INTERSECTION
   =================================== */

let animationInProgress = false;
let isSlowMotion = false;

let triggerBtn, resetBtn, slowBtn, circleTessan, circleJosselin, intersection;

const getSpeed = () => isSlowMotion ? 2 : 1;

function playAnimation() {
    if (animationInProgress) return;
    
    animationInProgress = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Animating...';
    
    resetAnimation(false);
    
    console.log('Starting animation...');
    
    // Step 1: Wait a moment to show initial state
    setTimeout(() => {
        console.log('Step 1: Circles sliding together...');
        
        // Step 2: Slide circles together
        circleTessan.classList.add('merged');
        circleJosselin.classList.add('merged');
        
        // Step 3: After circles merge, show intersection highlight
        setTimeout(() => {
            console.log('Step 2: Showing intersection...');
            intersection.classList.add('visible');
            
            // Animation complete
            setTimeout(() => {
                console.log('Animation complete!');
                animationInProgress = false;
                triggerBtn.disabled = false;
                triggerBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Play Again';
            }, 1000 * getSpeed());
            
        }, 1200 * getSpeed());
        
    }, 500 * getSpeed());
}

function resetAnimation(updateButton = true) {
    console.log('Resetting animation...');
    
    // Remove animation classes
    circleTessan.classList.remove('merged');
    circleJosselin.classList.remove('merged');
    intersection.classList.remove('visible');
    
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
        console.log('Slow motion enabled (2x slower)');
    } else {
        slowBtn.innerHTML = '<i class="fa-solid fa-gauge-simple"></i> Slow Motion';
        slowBtn.style.background = 'white';
        slowBtn.style.borderColor = 'var(--stroke)';
        console.log('Normal speed');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing circle intersection animation...');
    
    triggerBtn = document.getElementById('triggerBtn');
    resetBtn = document.getElementById('resetBtn');
    slowBtn = document.getElementById('slowBtn');
    circleTessan = document.getElementById('circleTessan');
    circleJosselin = document.getElementById('circleJosselin');
    intersection = document.getElementById('intersection');
    
    if (!triggerBtn || !circleTessan || !circleJosselin || !intersection) {
        console.error('Error: Missing elements!');
        return;
    }
    
    triggerBtn.addEventListener('click', playAnimation);
    resetBtn.addEventListener('click', () => resetAnimation(true));
    slowBtn.addEventListener('click', toggleSlowMotion);
    
    console.log('Animation ready! Click "Play Animation".');
});
