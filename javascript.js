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



/* ==================== TYPING ANIMATION ==================== */
/* ==================== TYPING ANIMATION ==================== */



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

/* ==================== FORM VALIDATION ==================== */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    if (field.type === 'email') {
        if (!value || !validateEmail(value)) {
            formGroup.classList.add('error');
            return false;
        }
    } else {
        if (!value) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    formGroup.classList.remove('error');
    return true;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(subject)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    if (isValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
            validateField(input);
        }
    });
});






