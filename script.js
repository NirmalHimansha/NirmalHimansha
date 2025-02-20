        // Navbar Toggle
        function toggleMenu() {
            const menu = document.querySelector('.nav-links');
            const toggle = document.querySelector('.menu-toggle');
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        }
        // Preloader
        window.addEventListener("load", () => {
            document.getElementById("preloader").style.opacity = "0";
            setTimeout(() => { document.getElementById("preloader").style.display = "none"; }, 500);
        });

        // Theme Toggle
        const themeToggle = document.getElementById("theme-toggle");
        const themeIcon = document.getElementById("theme-icon");
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            themeIcon.textContent = document.body.classList.contains("light-theme") ? "🌚" : "🌞";
        });
        // Scroll Animation
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".hidden").forEach(section => {
            observer.observe(section);
        });

