/*
==========================================
  01 - CONFIGURATION
==========================================
*/

const PROJECT_URLS = {
    pdfAnalyzer: "https://example.com/pdf-analyzer",
    resumeAnalyzer: "https://example.com/resume",
    chatbot: "https://example.com/chatbot",
    codeAnalyzer: "https://example.com/code",
    emotionDetection: "https://example.com/emotion"
};

const SOCIAL_LINKS = {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:hello@example.com"
};

const CONTACT_FORM_ENDPOINT = ""; // Leave empty to trigger Demo Mode

/*
==========================================
  02 - DATA STRUCTURES
==========================================
*/
const projectsData = [
    {
        id: 'pdfAnalyzer',
        num: '01',
        icon: '📄',
        title: 'AI PDF Analyzer',
        desc: 'Analyze PDFs, retrieve information, and ask questions using a RAG-powered AI system.',
        tags: ['RAG', 'LLM', 'LangChain'],
        cta: 'Launch Analyzer',
        url: "https://ai-rag-pdf-analyzer.streamlit.app/"
    },
    {
        id: 'resumeAnalyzer',
        num: '02',
        icon: '💼',
        title: 'AI Resume Analyzer',
        desc: 'Analyze a resume against a custom job description and generate an AI-powered ATS score.',
        tags: ['ATS', 'LLM', 'LangChain & APIs'],
        cta: 'Analyze Resume',
        url: "https://multi-ai-resume-analyzer.streamlit.app/"
    },
    {
        id: 'chatbot',
        num: '03',
        icon: '💬',
        title: 'AI Chatbot',
        desc: 'Interact with an intelligent conversational AI capable of understanding context and generating useful responses.',
        tags: ['LLM', 'NLP', 'APIs'],
        cta: 'Start Chatting',
        url: PROJECT_URLS.chatbot
    }
];

const techList = [
    'Python', 'HTML5', 'CSS3', 'JavaScript', 'Streamlit',
    'LangChain', 'RAG', 'LLMs', 'Machine Learning',
    'Generative AI', 'APIs', 'FAISS', 'NLP'
];

/*
==========================================
  03 - INITIALIZATION & DOM MANIPULATION
==========================================
*/
document.addEventListener("DOMContentLoaded", () => {

    // Remove Loader (with safety check)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1200);

    // Populate Dynamic Content
    populateServices();
    populateTech();
    setupSocialLinks();

    // Initialize Interactive Features
    initCursorGlow();
    initNavbar();
    initScrollReveal();
    initCounters();
    initTimeline();
    initContactForm();
});

function populateServices() {
    const grid = document.querySelector('.services-grid');
    if (!grid) return; // Safety check: stops here if grid is deleted

    let delay = 0.1;

    projectsData.forEach(p => {
        const card = document.createElement('div');
        card.className = `card service-card reveal fade-up`;
        card.style.transitionDelay = `${delay}s`;

        const tagsHtml = p.tags.map(tag => `<span>${tag}</span>`).join('');

        card.innerHTML = `
            <span class="service-number">${p.num}</span>
            <div class="service-icon">${p.icon}</div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="tags">${tagsHtml}</div>
            <a href="${p.url}" target="_blank" class="card-cta">
                ${p.cta} <span>&rarr;</span>
            </a>
        `;
        grid.appendChild(card);
        delay += 0.1;
    });
}

function populateTech() {
    const container = document.querySelector('.tech-grid');
    if (!container) return; // Safety check

    techList.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-badge';
        span.textContent = tech;
        container.appendChild(span);
    });
}

function setupSocialLinks() {
    // Safety check helper function
    const setLink = (id, url) => {
        const element = document.getElementById(id);
        if (element) {
            element.href = url;
        }
    };

    setLink('foot-github', SOCIAL_LINKS.github);
    setLink('foot-linkedin', SOCIAL_LINKS.linkedin);
    setLink('foot-email', SOCIAL_LINKS.email);
}

/*
==========================================
  04 - INTERACTION SYSTEM
==========================================
*/

function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return; // Safety check

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const btt = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');

    // Scroll effects
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (navbar) {
            if (currentScroll > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }

        if (btt) {
            if (currentScroll > 500) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }

        // Active link highlighting
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            const bottom = top + sec.offsetHeight;
            if (currentScroll >= top && currentScroll < bottom) {
                const id = sec.getAttribute('id');
                if (navLinks) {
                    navLinks.querySelectorAll('a').forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${id}`) {
                            a.classList.add('active');
                        }
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return; // Safety check

    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Start the entrance animation
                entry.target.classList.add('active');

                // 2. NEW: Clean up the transition delay after the entrance finishes!
                // This ensures all hover animations trigger instantly and at the exact same time.
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, 800); // 800ms matches our CSS reveal duration

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return; // Safety check

    const options = { threshold: 0.5 };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 30; // Control speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target < 10 ? `0${target}` : target;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current) < 10 ? `0${Math.ceil(current)}` : Math.ceil(current);
            }
        }, 30);
    }
}

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line');

    if (timelineItems.length === 0) return; // Safety check

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (timelineLine) {
                    timelineLine.classList.add('illuminated');
                }
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => observer.observe(item));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; // Safety check: stops here if the form is deleted

    const demoNotice = document.getElementById('demo-notice');
    const messageInput = document.getElementById('message');
    const charCurrent = document.getElementById('char-current');

    if (demoNotice && !CONTACT_FORM_ENDPOINT) {
        demoNotice.classList.remove('hidden');
    }

    // Character counter
    if (messageInput && charCurrent) {
        messageInput.addEventListener('input', () => {
            charCurrent.textContent = messageInput.value.length;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        // Basic Validation
        inputs.forEach(input => {
            const group = input.parentElement;
            if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
                if (group) group.classList.add('error');
                isValid = false;
            } else {
                if (group) group.classList.remove('error');
            }
        });

        if (!isValid) return;

        // Mock Submission State
        const btnText = document.querySelector('.btn-text');
        const spinner = document.querySelector('.loader-spinner');
        const successMsg = document.querySelector('.form-success');

        if (btnText) btnText.classList.add('hidden');
        if (spinner) spinner.classList.remove('hidden');

        setTimeout(() => {
            if (spinner) spinner.classList.add('hidden');
            if (btnText) btnText.classList.remove('hidden');
            if (successMsg) successMsg.classList.remove('hidden');

            form.reset();
            if (charCurrent) charCurrent.textContent = '0';

            setTimeout(() => {
                if (successMsg) successMsg.classList.add('hidden');
            }, 5000);

        }, 1500);
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement) input.parentElement.classList.remove('error');
        });
    });
}