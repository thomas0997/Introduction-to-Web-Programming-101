// Franco, Thomas James V — CYB 201
/* ---- Burger menu toggle ---- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('show');
});

/* ---- Submenu toggles (mobile) ---- */
document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        const isOpen = submenu.classList.toggle('show');
        btn.setAttribute('aria-expanded', isOpen);
        btn.textContent = isOpen ? '▴' : '▾';
    });
});

/* ---- Highlight active nav link on scroll ---- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('#hero, #courses, #services, #gallery, #contact');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ---- Course card data ---- */
const courseData = {
    html: {
        name: "HTML Fundamentals",
        duration: "20 Hours",
        description: "Learn the structure of webpages using HTML5.",
        skills: ["Semantic HTML", "Forms", "Tables", "Multimedia"]
    },
    css: {
        name: "CSS Styling & Layout",
        duration: "25 Hours",
        description: "Design responsive, modern websites with CSS3.",
        skills: ["Responsive Design", "Flexbox", "Grid Layout", "Animations", "Media Queries"]
    },
    javascript: {
        name: "JavaScript Essentials",
        duration: "30 Hours",
        description: "Add interactivity and logic to your webpages.",
        skills: ["Variables", "Functions", "DOM Manipulation", "Events", "Validation"]
    },
    python: {
        name: "Python Programming",
        duration: "35 Hours",
        description: "Build a strong foundation in Python programming.",
        skills: ["Python Syntax", "Variables", "Loops", "Functions", "File Handling"]
    },
    networking: {
        name: "Networking Fundamentals",
        duration: "28 Hours",
        description: "Understand how computer networks communicate.",
        skills: ["OSI Model", "TCP/IP", "IP Addressing", "Routing", "Switching"]
    },
    database: {
        name: "Database Management",
        duration: "24 Hours",
        description: "Learn to design and manage relational databases.",
        skills: ["SQL", "Tables", "Primary Keys", "Foreign Keys", "CRUD Operations"]
    }
};

/* ---- Course card modal ---- */
const modalOverlay = document.getElementById('course-modal-overlay');
const modalTitle = document.getElementById('course-modal-title');
const modalDuration = document.getElementById('course-modal-duration');
const modalDesc = document.getElementById('course-modal-desc');
const modalSkills = document.getElementById('course-modal-skills');
const modalClose = document.getElementById('course-modal-close');

function openCourseModal(courseKey){
    const course = courseData[courseKey];
    if (!course) return;
    modalTitle.textContent = course.name;
    modalDuration.textContent = `Duration: ${course.duration}`;
    modalDesc.textContent = course.description;
    modalSkills.innerHTML = '';
    course.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        modalSkills.appendChild(li);
    });
    modalOverlay.classList.add('show');
}

function closeCourseModal(){
    modalOverlay.classList.remove('show');
}

document.querySelectorAll('.card[data-course]').forEach(card => {
    card.addEventListener('click', () => openCourseModal(card.dataset.course));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCourseModal(card.dataset.course);
        }
    });
});

modalClose.addEventListener('click', closeCourseModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeCourseModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCourseModal();
});
