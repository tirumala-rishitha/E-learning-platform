// Course data
const courses = [
    {
        id: 1,
        title: "Complete JavaScript Course",
        instructor: "John Smith",
        description: "Master JavaScript from basics to advanced concepts with hands-on projects.",
        category: "programming",
        rating: 4.8,
        duration: "12 hours",
        progress: 75,
        image: "💻",
        enrolled: true,
        chapters: [
            "Introduction to JavaScript",
            "Variables and Data Types",
            "Functions and Scope",
            "DOM Manipulation",
            "Async JavaScript",
            "Modern ES6+ Features"
        ]
    },
    {
        id: 2,
        title: "UI/UX Design Fundamentals",
        instructor: "Sarah Johnson",
        description: "Learn the principles of user interface and user experience design.",
        category: "design",
        rating: 4.9,
        duration: "8 hours",
        progress: 45,
        image: "🎨",
        enrolled: true,
        chapters: [
            "Design Thinking Process",
            "User Research Methods",
            "Wireframing & Prototyping",
            "Visual Design Principles",
            "Usability Testing"
        ]
    },
    {
        id: 3,
        title: "Digital Marketing Strategy",
        instructor: "Mike Chen",
        description: "Build effective digital marketing campaigns that drive results.",
        category: "marketing",
        rating: 4.7,
        duration: "10 hours",
        progress: 30,
        image: "📊",
        enrolled: true,
        chapters: [
            "Marketing Fundamentals",
            "Content Marketing",
            "Social Media Strategy",
            "SEO & SEM",
            "Analytics & Measurement"
        ]
    },
    {
        id: 4,
        title: "Python for Data Science",
        instructor: "Dr. Emily Wong",
        description: "Learn Python programming for data analysis and machine learning.",
        category: "programming",
        rating: 4.8,
        duration: "15 hours",
        progress: 0,
        image: "🐍",
        enrolled: false,
        chapters: [
            "Python Basics",
            "NumPy & Pandas",
            "Data Visualization",
            "Statistical Analysis",
            "Machine Learning Intro"
        ]
    },
    {
        id: 5,
        title: "Business Strategy & Planning",
        instructor: "Robert Davis",
        description: "Develop strategic thinking skills for business success.",
        category: "business",
        rating: 4.6,
        duration: "6 hours",
        progress: 0,
        image: "💼",
        enrolled: false,
        chapters: [
            "Strategic Planning Framework",
            "Market Analysis",
            "Competitive Strategy",
            "Financial Planning",
            "Implementation & Control"
        ]
    },
    {
        id: 6,
        title: "React Advanced Patterns",
        instructor: "Alex Turner",
        description: "Master advanced React concepts and design patterns.",
        category: "programming",
        rating: 4.9,
        duration: "14 hours",
        progress: 60,
        image: "⚛️",
        enrolled: true,
        chapters: [
            "Component Patterns",
            "State Management",
            "Performance Optimization",
            "Testing Strategies",
            "Production Deployment"
        ]
    }
];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const courseModal = document.getElementById('course-modal');
const closeModal = document.querySelector('.close');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedCourses();
    renderAllCourses();
    renderEnrolledCourses();
    setupEventListeners();
    updateProgressCharts();
});

// Navigation functionality
function setupEventListeners() {
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            showPage(targetPage);
            updateActiveNavLink(link);
        });
    });

    // Hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetPage = button.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavLink(document.querySelector(`[data-page="${targetPage}"]`));
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Search functionality
    const searchInput = document.getElementById('course-search');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCourses);
    }

    // Modal close
    closeModal.addEventListener('click', () => {
        courseModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            courseModal.classList.remove('active');
        }
    });
}

function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Course rendering functions
function renderFeaturedCourses() {
    const featuredContainer = document.getElementById('featured-courses');
    const featuredCourses = courses.slice(0, 3);
    
    featuredContainer.innerHTML = featuredCourses.map(course => createCourseCard(course)).join('');
    
    // Add click listeners
    featuredContainer.querySelectorAll('.course-card').forEach((card, index) => {
        card.addEventListener('click', () => openCourseModal(featuredCourses[index]));
    });
}

function renderAllCourses() {
    const coursesContainer = document.getElementById('all-courses');
    coursesContainer.innerHTML = courses.map(course => createCourseCard(course)).join('');
    
    // Add click listeners
    coursesContainer.querySelectorAll('.course-card').forEach((card, index) => {
        card.addEventListener('click', () => openCourseModal(courses[index]));
    });
}

function renderEnrolledCourses() {
    const enrolledContainer = document.getElementById('enrolled-courses');
    const enrolledCourses = courses.filter(course => course.enrolled);
    
    enrolledContainer.innerHTML = enrolledCourses.map(course => `
        <div class="enrolled-course" onclick="openCourseModal(${JSON.stringify(course).replace(/"/g, '&quot;')})">
            <div class="enrolled-course-image">
                ${course.image}
            </div>
            <div class="enrolled-course-info">
                <h3 class="enrolled-course-title">${course.title}</h3>
                <p class="enrolled-course-instructor">by ${course.instructor}</p>
                <div class="course-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <span class="progress-text">Progress: ${course.progress}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

function createCourseCard(course) {
    return `
        <div class="course-card">
            <div class="course-image">
                ${course.image}
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">by ${course.instructor}</p>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        ${'★'.repeat(Math.floor(course.rating))}
                        <span>${course.rating}</span>
                    </div>
                    <div class="course-duration">
                        <i class="fas fa-clock"></i>
                        ${course.duration}
                    </div>
                </div>
                ${course.enrolled ? `
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${course.progress}%"></div>
                        </div>
                        <span class="progress-text">Progress: ${course.progress}%</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Course filtering
function filterCourses() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    
    let filteredCourses = courses;
    
    if (searchTerm) {
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (selectedCategory) {
        filteredCourses = filteredCourses.filter(course => 
            course.category === selectedCategory
        );
    }
    
    const coursesContainer = document.getElementById('all-courses');
    coursesContainer.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
    
    // Re-add click listeners
    coursesContainer.querySelectorAll('.course-card').forEach((card, index) => {
        card.addEventListener('click', () => openCourseModal(filteredCourses[index]));
    });
}

// Modal functionality
function openCourseModal(course) {
    document.getElementById('modal-course-title').textContent = course.title;
    document.getElementById('modal-course-description').textContent = course.description;
    document.getElementById('modal-progress').style.width = course.progress + '%';
    document.getElementById('modal-progress-text').textContent = course.progress + '%';
    
    const chapterList = document.getElementById('chapter-list');
    chapterList.innerHTML = course.chapters.map(chapter => `<li>${chapter}</li>`).join('');
    
    courseModal.classList.add('active');
}

// Progress charts
function updateProgressCharts() {
    const progressRing = document.querySelector('.progress-bar');
    if (progressRing) {
        const progress = 68;
        const circumference = 2 * Math.PI * 54;
        const strokeDashoffset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = strokeDashoffset;
    }
}

// Make functions globally accessible for onclick handlers
window.openCourseModal = openCourseModal;

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Dynamic greeting based on time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Good day';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// Course completion tracking
function markChapterComplete(courseId, chapterIndex) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        // Update progress based on chapter completion
        const progressIncrement = 100 / course.chapters.length;
        course.progress = Math.min(100, course.progress + progressIncrement);
        
        // Re-render relevant sections
        renderEnrolledCourses();
        updateProgressCharts();
    }
}

// Local storage for user progress
function saveProgress() {
    localStorage.setItem('courseProgress', JSON.stringify(courses));
}

function loadProgress() {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
        const savedCourses = JSON.parse(saved);
        savedCourses.forEach(savedCourse => {
            const course = courses.find(c => c.id === savedCourse.id);
            if (course) {
                course.progress = savedCourse.progress;
                course.enrolled = savedCourse.enrolled;
            }
        });
    }
}

// Initialize progress loading
loadProgress();

// Auto-save progress periodically
setInterval(saveProgress, 30000); // Save every 30 seconds

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && courseModal.classList.contains('active')) {
        courseModal.classList.remove('active');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe course cards for animation
document.querySelectorAll('.course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});