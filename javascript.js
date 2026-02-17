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
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

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
        title: 'Chat Application',
        description: 'A feature-rich messaging application with video calling capabilities, file sharing, and end-to-end encryption. Supports both iOS and Android platforms with a consistent user experience across devices.',
        features: [
            'End-to-end encryption',
            'Video and voice calls',
            'File and media sharing',
            'Group chat support',
            'Push notifications',
            'Message search and history'
        ]
    },
    4: {
        icon: '✨',
        tags: ['Next.js', 'Stripe', 'Prisma', 'OpenAI'],
        title: 'AI Content Generator',
        description: 'A SaaS platform for AI-powered content creation with subscription management and credits system. Generates high-quality marketing content, blog posts, and social media captions using advanced AI models.',
        features: [
            'AI-powered content generation',
            'Subscription management',
            'Credits/usage tracking',
            'Template library',
            'Bulk export capabilities',
            'API access for integrations'
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

function typeWriter() {
    const currentString = typingStrings[stringIndex];

    if (!isDeleting) {
        typingText.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
    } else {
        typingText.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentString.length) {
        typingSpeed = 1500;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % typingStrings.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

setTimeout(typeWriter, 800);


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

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/* ==================== NAVBAR SCROLL EFFECT ==================== */
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

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
reveal();

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
animateSkillBars();

/* ==================== TABS ==================== */
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

/* ==================== PROJECT FILTERING ==================== */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('active');
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            }
        });
    });
});

/* ==================== PROJECT MODAL ==================== */
function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    document.getElementById('modalImage').textContent = project.icon;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = project.tags.map(tag => 
        `<span class="modal-tag">${tag}</span>`
    ).join('');

    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId);
    });
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Morgan_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);