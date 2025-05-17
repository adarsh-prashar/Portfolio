// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }
});

// Color Picker Functionality
document.addEventListener('DOMContentLoaded', () => {
    const colorPickerToggle = document.getElementById('color-picker-toggle');
    const colorPickerDropdown = document.getElementById('color-picker-dropdown');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Toggle color picker dropdown
    colorPickerToggle.addEventListener('click', () => {
        colorPickerDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.color-picker')) {
            colorPickerDropdown.classList.remove('active');
        }
    });
    
    // Color theme selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-color', theme);
            localStorage.setItem('color-theme', theme);
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Load saved color theme
    const savedColorTheme = localStorage.getItem('color-theme') || 'default';
    document.documentElement.setAttribute('data-color', savedColorTheme);
    colorOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedColorTheme) {
            option.classList.add('active');
        }
    });

    // Background color functionality
    const bgOptions = document.querySelectorAll('.bg-option');
    
    bgOptions.forEach(option => {
        option.addEventListener('click', () => {
            const bgTheme = option.getAttribute('data-bg');
            document.documentElement.setAttribute('data-bg', bgTheme);
            localStorage.setItem('bg-theme', bgTheme);
            
            // Update active state
            bgOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Load saved background theme
    const savedBgTheme = localStorage.getItem('bg-theme') || 'midnight';
    document.documentElement.setAttribute('data-bg', savedBgTheme);
    bgOptions.forEach(option => {
        if (option.getAttribute('data-bg') === savedBgTheme) {
            option.classList.add('active');
        }
    });
});

// Text animation for role
document.addEventListener('DOMContentLoaded', () => {
    const roles = [
        "A Full Stack Web Developer",
        "A Problem Solver",
        "A Creative Designer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const roleElement = document.querySelector('.role');
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Speed adjustments
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeEffect, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.about-image-container');
    const image = document.querySelector('.about-image');
    const border = document.querySelector('.image-border');
    
    // Mouse move effect
    imageContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = imageContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Softer rotation for circular image
        image.style.transform = `
            scale(1.05)
            translateY(-10px)
            rotateY(${x * 10}deg)
            rotateX(${y * -10}deg)
        `;
        
        border.style.transform = `
            scale(1.1)
            rotateY(${x * -5}deg)
            rotateX(${y * 5}deg)
        `;
    });
    
    // Reset on mouse leave
    imageContainer.addEventListener('mouseleave', () => {
        image.style.transform = '';
        border.style.transform = '';
    });
    
    // Subtle pulse effect
    let pulseTimeout;
    const addPulseEffect = () => {
        if (Math.random() > 0.7) { // 30% chance to pulse
            image.style.transform = 'scale(1.02)';
            setTimeout(() => {
                image.style.transform = '';
            }, 200);
        }
        pulseTimeout = setTimeout(addPulseEffect, 3000);
    };
    
    addPulseEffect();
    
    // Cleanup
    return () => clearTimeout(pulseTimeout);
});

document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.project-information');
    const scrollAmount = 320; // Width of card + gap

    // Add scroll buttons to HTML
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    prevBtn.className = 'scroll-btn prev';
    nextBtn.className = 'scroll-btn next';
    prevBtn.innerHTML = '<i class="bx bx-chevron-left"></i>';
    nextBtn.innerHTML = '<i class="bx bx-chevron-right"></i>';
    
    document.querySelector('.project').appendChild(prevBtn);
    document.querySelector('.project').appendChild(nextBtn);

    // Scroll buttons functionality
    prevBtn.addEventListener('click', () => {
        projectContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        projectContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll buttons based on scroll position
    projectContainer.addEventListener('scroll', () => {
        prevBtn.style.opacity = projectContainer.scrollLeft > 0 ? '1' : '0';
        nextBtn.style.opacity = 
            projectContainer.scrollLeft < (projectContainer.scrollWidth - projectContainer.clientWidth) 
            ? '1' : '0';
    });
});

