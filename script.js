 // Profile Image Scroll Animation
        const profileImage = document.getElementById('profileImage');
        const navbarLogo = document.querySelector('.navbar .logo');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 100;
            
            if (scrolled) {
                profileImage.classList.add('scrolled');
                if (navbarLogo) navbarLogo.classList.add('hide');
            } else {
                profileImage.classList.remove('scrolled');
                if (navbarLogo) navbarLogo.classList.remove('hide');
            }
        });

        // Menu Toggle
        function toggleMenu() {
            const menu = document.querySelector('.nav-links');
            menu.classList.toggle('active');
        }

        // Theme Toggle
        function toggleTheme() {
            document.body.classList.toggle('light-theme');
            const icon = document.getElementById('theme-icon');
            icon.textContent = document.body.classList.contains('light-theme') ? '🌙' : '🌞';
        }

        // Scroll Animation Observer for sections
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.hidden').forEach(section => {
            observer.observe(section);
        });

        // Card Animation Observer - fade in when scrolling down, fade out when scrolling up
        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const cards = entry.target.querySelectorAll('.card, .skill-card');
                
                if (entry.isIntersecting) {
                    cards.forEach(card => {
                        card.classList.remove('fade-out');
                        card.classList.add('fade-in');
                    });
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        cards.forEach(card => {
                            card.classList.remove('fade-in');
                            card.classList.add('fade-out');
                        });
                    }
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '-50px'
        });

        // Observe card containers
        const projectsSection = document.getElementById('projects');
        const skillsSection = document.getElementById('skills');
        
        if (projectsSection) {
            cardObserver.observe(projectsSection);
        }
        if (skillsSection) {
            cardObserver.observe(skillsSection);
        }

        // Progress Bar Animation
        const progressObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    });
                } else {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.width = '0%';
                    });
                }
            });
        }, { threshold: 0.5 });

        if (skillsSection) {
            progressObserver.observe(skillsSection);
        }

        // Three.js 3D Background
        const canvas = document.getElementById('canvas-3d');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        camera.position.z = 5;

        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create floating geometric shapes
        const geometry1 = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        const material1 = new THREE.MeshBasicMaterial({ 
            color: 0x00d4ff, 
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(geometry1, material1);
        torus.position.set(-2, 0, -2);
        scene.add(torus);

        const geometry2 = new THREE.OctahedronGeometry(0.5);
        const material2 = new THREE.MeshBasicMaterial({ 
            color: 0x7b2cbf, 
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const octahedron = new THREE.Mesh(geometry2, material2);
        octahedron.position.set(2, 1, -2);
        scene.add(octahedron);

        // Mouse movement interaction
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
            octahedron.rotation.x += 0.02;
            octahedron.rotation.y += 0.01;

            camera.position.x = mouseX * 0.5;
            camera.position.y = mouseY * 0.5;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Theme change effect on 3D elements
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-toggle') || e.target.closest('.theme-toggle')) {
                const isLight = document.body.classList.contains('light-theme');
                particlesMaterial.color.setHex(isLight ? 0x7b2cbf : 0x00d4ff);
            }
        });
