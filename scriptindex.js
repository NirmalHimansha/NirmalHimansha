let scene, camera, renderer, particles, particleMaterial;
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

function initParticles() {
    const canvas = document.getElementById("particles-canvas");

    // Set up Three.js scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create particles geometry
    const particleCount = 3000;  // Increased from 500 to 2000
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;  // Spread over a larger area
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material with glow effect
    particleMaterial = new THREE.PointsMaterial({
        color: 0x69EBFC,
        size: 0.06,  // Slightly reduced for better density effect
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Move particles based on mouse position
    targetX += (mouseX - targetX) * 0.1;
    targetY += (mouseY - targetY) * 0.1;

    particles.position.x = targetX * 4;
    particles.position.y = -targetY * 4;

    renderer.render(scene, camera);
}

// Track mouse movement
document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Handle screen resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initParticles();
