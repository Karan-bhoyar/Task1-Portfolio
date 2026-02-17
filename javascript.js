
        /* ==================== CONFIGURATION ==================== */
        const defaultConfig = {
            hero_name: 'Karan Bhoyar',
            hero_tagline: 'Full Stack Developer | UI/UX Enthusiast | Problem Solver',
            about_title: 'About Me',
            about_description: "I'm a creative developer based in San Francisco with a passion for building exceptional digital experiences. With over 5 years of experience in web development, I specialize in creating responsive, user-friendly applications that solve real-world problems.",
            contact_title: "Let's Work Together",
            footer_text: '© 2026 Alex Morgan. All rights reserved.',
            primary_color: '#667eea',
            secondary_color: '#764ba2',
            text_color: '#ffffff',
            background_color: '#0a0a0f',
            accent_color: '#4facfe',
            font_family: 'Space Grotesk',
            font_size: 16
        };

        let config = { ...defaultConfig };

        /* ==================== ELEMENT SDK INITIALIZATION ==================== */
        function onConfigChange(newConfig) {
            // Update hero section
            const heroName = document.getElementById('heroName');
            if (heroName) {
                heroName.textContent = newConfig.hero_name || defaultConfig.hero_name;
            }

            // Update about section
            const aboutTitle = document.getElementById('aboutTitle');
            if (aboutTitle) {
                aboutTitle.textContent = newConfig.about_title || defaultConfig.about_title;
            }

            const aboutDescription = document.getElementById('aboutDescription');
            if (aboutDescription) {
                aboutDescription.textContent = newConfig.about_description || defaultConfig.about_description;
            }

            // Update contact section
            const contactTitle = document.getElementById('contactTitle');
            if (contactTitle) {
                contactTitle.textContent = newConfig.contact_title || defaultConfig.contact_title;
            }

            // Update footer
            const footerText = document.getElementById('footerText');
            if (footerText) {
                footerText.textContent = newConfig.footer_text || defaultConfig.footer_text;
            }

            // Apply font
            const customFont = newConfig.font_family || defaultConfig.font_family;
            document.documentElement.style.setProperty('--font-heading', `'${customFont}', sans-serif`);
            document.documentElement.style.setProperty('--font-body', `'${customFont}', sans-serif`);

            // Apply font size
            const baseSize = newConfig.font_size || defaultConfig.font_size;
            document.documentElement.style.fontSize = `${baseSize}px`;

            // Apply colors
            const primaryColor = newConfig.primary_color || defaultConfig.primary_color;
            const secondaryColor = newConfig.secondary_color || defaultConfig.secondary_color;
            const textColor = newConfig.text_color || defaultConfig.text_color;
            const bgColor = newConfig.background_color || defaultConfig.background_color;
            const accentColor = newConfig.accent_color || defaultConfig.accent_color;

            document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`);
            document.documentElement.style.setProperty('--text-primary', textColor);
            document.documentElement.style.setProperty('--dark-bg', bgColor);
            document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accentColor} 0%, #00f2fe 100%)`);
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ background_color: value });
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            config.secondary_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ secondary_color: value });
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
                        }
                    },
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ primary_color: value });
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            config.accent_color = value;
                            if (window.elementSdk) window.elementSdk.setConfig({ accent_color: value });
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        config.font_family = value;
                        if (window.elementSdk) window.elementSdk.setConfig({ font_family: value });
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        config.font_size = value;
                        if (window.elementSdk) window.elementSdk.setConfig({ font_size: value });
                    }
                }
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ['hero_name', config.hero_name || defaultConfig.hero_name],
                ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
                ['about_title', config.about_title || defaultConfig.about_title],
                ['about_description', config.about_description || defaultConfig.about_description],
                ['contact_title', config.contact_title || defaultConfig.contact_title],
                ['footer_text', config.footer_text || defaultConfig.footer_text]
            ]);
        }

        // Initialize Element SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
            config = window.elementSdk.config || defaultConfig;
        }

        /* ==================== DOM ELEMENTS ==================== */
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        const themeToggle = document.getElementById('themeToggle');
        const scrollTopBtn = document.getElementById('scrollTop');
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const projectCards = document.querySelectorAll('.project-card');
        const navLinks = document.querySelectorAll('.nav-link');
        const revealElements = document.querySelectorAll('.reveal');
        const skillBars = document.querySelectorAll('.skill-progress');
        const typingText = document.getElementById('typingText');

        /* ==================== PROJECT DATA ==================== */
        const projectsData = {
            1: {
                icon: '🛒',
                tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                title: 'E-Commerce Platform',
                description: 'A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, user authentication, and a powerful admin dashboard. Built with scalability in mind to handle thousands of products and concurrent users.',
                features: [
                    'Real-time inventory tracking',
                    'Secure payment processing',
                    'Admin dashboard with analytics',
                    'User reviews and ratings',
                    'Wishlist and cart functionality',
                    'Order tracking system'
                ]
            },
            2: {
                icon: '📊',
                tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
                title: 'Analytics Dashboard',
                description: 'An interactive data visualization platform that transforms complex data into actionable insights. Features customizable dashboards, real-time data streaming, and automated reporting capabilities for business intelligence.',
                features: [
                    'Interactive data visualizations',
                    'Real-time data streaming',
                    'Customizable dashboards',
                    'Automated report generation',
                    'Multi-user collaboration',
                    'Export to PDF/Excel'
                ]
            },
            3: {
                icon: '💬',
                tags: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
                title: 'Real-Time Chat App',
                description: 'A feature-rich messaging application with video calling capabilities, file sharing, and end-to-end encryption. Supports both iOS and Android platforms with a consistent user experience across devices.',
                features: [
                    'End-to-end encryption',
                    'Video and voice calls',
                    'File and media sharing',
                    'Group chat support',
                    'Push notifications',
                    'Message search and history'
                ]
            }
        };

        /* ==================== TYPING ANIMATION ==================== */
        const typingStrings = [
            'Full Stack Developer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Creative Thinker',
            'Code Craftsman'
        ];
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentString = typingStrings[stringIndex];
            
            if (isDeleting) {
                typingText.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentString.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        // Start typing animation
        setTimeout(typeWriter, 1000);

        /* ==================== MOBILE MENU TOGGLE ==================== */
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        /* ==================== THEME TOGGLE ==================== */
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        /* ==================== NAVBAR SCROLL EFFECT ==================== */
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (currentScroll > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }

            lastScroll = currentScroll;
        });

        /* ==================== SCROLL TO TOP ==================== */
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        /* ==================== SMOOTH SCROLL NAVIGATION ==================== */
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        /* ==================== REVEAL ANIMATIONS ==================== */
        function reveal() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Initial check

        /* ==================== SKILL BARS ANIMATION ==================== */
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 50) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                }
            });
        }

        window.addEventListener('scroll', animateSkillBars);
        animateSkillBars(); // Initial check
