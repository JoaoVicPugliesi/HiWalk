const gsapFox = () => {
    let leftXTo, leftYTo, rightXTo, rightYTo;
    let cachedLeftEye = null;
    let cachedRightEye = null;

    // Dynamically retrieve and cache the eye elements and build quickTo controllers
    const getQuickTo = () => {
        const leftEye = document.getElementById('left-eye');
        const rightEye = document.getElementById('right-eye');

        if (!leftEye || !rightEye) {
            return false;
        }

        // Re-initialize if the elements are re-injected or updated in the DOM
        if (leftEye !== cachedLeftEye || rightEye !== cachedRightEye) {
            cachedLeftEye = leftEye;
            cachedRightEye = rightEye;
            leftXTo = gsap.quickTo(leftEye, "x", { duration: 0.25, ease: "power2.out" });
            leftYTo = gsap.quickTo(leftEye, "y", { duration: 0.25, ease: "power2.out" });
            rightXTo = gsap.quickTo(rightEye, "x", { duration: 0.25, ease: "power2.out" });
            rightYTo = gsap.quickTo(rightEye, "y", { duration: 0.25, ease: "power2.out" });
        }
        return true;
    };

    window.addEventListener('mousemove', (e) => {
        if (!getQuickTo()) return;

        const leftEyeBg = document.getElementById('left-eye-bg');
        const rightEyeBg = document.getElementById('right-eye-bg');
        if (!leftEyeBg || !rightEyeBg) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Elliptical boundaries for natural movement inside the wider eye sockets
        const maxMovementX = 45; // Max horizontal movement in SVG units
        const maxMovementY = 15; // Max vertical movement in SVG units
        const radiusOfInfluence = 200; // Distance in client pixels to reach maximum eye shift

        // Left Eye Tracking
        const leftRect = leftEyeBg.getBoundingClientRect();
        const leftCenterX = leftRect.left + leftRect.width / 2;
        const leftCenterY = leftRect.top + leftRect.height / 2;
        const leftDeltaX = mouseX - leftCenterX;
        const leftDeltaY = mouseY - leftCenterY;
        const leftAngle = Math.atan2(leftDeltaY, leftDeltaX);
        const leftDistance = Math.hypot(leftDeltaX, leftDeltaY);
        const leftDeflection = Math.min(leftDistance / radiusOfInfluence, 1);
        leftXTo(Math.cos(leftAngle) * maxMovementX * leftDeflection);
        leftYTo(Math.sin(leftAngle) * maxMovementY * leftDeflection);

        // Right Eye Tracking
        const rightRect = rightEyeBg.getBoundingClientRect();
        const rightCenterX = rightRect.left + rightRect.width / 2;
        const rightCenterY = rightRect.top + rightRect.height / 2;
        const rightDeltaX = mouseX - rightCenterX;
        const rightDeltaY = mouseY - rightCenterY;
        const rightAngle = Math.atan2(rightDeltaY, rightDeltaX);
        const rightDistance = Math.hypot(rightDeltaX, rightDeltaY);
        const rightDeflection = Math.min(rightDistance / radiusOfInfluence, 1);
        rightXTo(Math.cos(rightAngle) * maxMovementX * rightDeflection);
        rightYTo(Math.sin(rightAngle) * maxMovementY * rightDeflection);
    });

    // Reset eye positions to rest center when the cursor leaves the window
    document.addEventListener('mouseleave', () => {
        if (getQuickTo()) {
            leftXTo(0);
            leftYTo(0);
            rightXTo(0);
            rightYTo(0);
        }
    });
};

export default gsapFox;

