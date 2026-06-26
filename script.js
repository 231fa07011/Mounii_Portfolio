document.addEventListener('DOMContentLoaded', () => {
    // API URL
    const API_BASE = 'http://localhost:5000/api';

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Navbar Scroll Effect & Progress Bar
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Scroll Position for Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Progress Bar Calculation
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;

        // Back to Top Visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top Click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Fetch and Populate Portfolio Data
    async function fetchPortfolioData() {
        try {
            const response = await fetch(`${API_BASE}/portfolio`);
            const data = await response.json();
            populateFrontend(data);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            // Fallback for demo if backend is not running
            populateFrontend(getFallbackData());
        }
    }

    function populateFrontend(data) {
        // Hero
        document.getElementById('hero-name').innerHTML = data.name;
        document.getElementById('hero-tagline').textContent = data.title;
        document.getElementById('hero-summary').textContent = data.summary;
        document.getElementById('about-text').textContent = data.summary;
        document.getElementById('github-link').href = data.social.github;
        document.getElementById('linkedin-link').href = data.social.linkedin;
        if(data.social.leetcode) document.getElementById('leetcode-link').href = data.social.leetcode;
        
        document.getElementById('footer-github').href = data.social.github;
        document.getElementById('footer-linkedin').href = data.social.linkedin;
        if(data.social.leetcode) document.getElementById('footer-leetcode').href = data.social.leetcode;

        // Correct contact info
        document.getElementById('contact-phone').textContent = data.social.phone;
        document.getElementById('contact-email').textContent = data.social.email;

        // Skills
        const techSkills = document.getElementById('technical-skills');
        const softSkills = document.getElementById('soft-skills');
        const toolSkills = document.getElementById('tools-skills');
        const coreSkills = document.getElementById('core-skills');

        // Clear existing tags
        if (techSkills) techSkills.innerHTML = '';
        if (softSkills) softSkills.innerHTML = '';
        if (toolSkills) toolSkills.innerHTML = '';
        if (coreSkills) coreSkills.innerHTML = '';

        function getSkillIcon(skill) {
            const icons = {
                'HTML5': '<i class="fab fa-html5"></i>',
                'CSS3': '<i class="fab fa-css3-alt"></i>',
                'JavaScript': '<i class="fab fa-js"></i>',
                'JSX': '<i class="fas fa-atom"></i>',
                'React.js': '<i class="fab fa-react"></i>',
                'Python': '<i class="fab fa-python"></i>',
                'Basics in C': '<i class="fas fa-code"></i>',
                'MySQL': '<i class="fas fa-database"></i>',
                'MongoDB': '<i class="fas fa-leaf"></i>',
                'Git': '<i class="fab fa-git-alt"></i>',
                'GitHub': '<i class="fab fa-github"></i>',
                'VS Code': '<i class="fas fa-laptop-code"></i>',
                'Basics in Docker': '<i class="fab fa-docker"></i>',
                'REST APIs': '<i class="fas fa-network-wired"></i>',
                'Data Structures': '<i class="fas fa-sitemap"></i>',
                'DBMS': '<i class="fas fa-server"></i>',
                'Data Visualization': '<i class="fas fa-chart-bar"></i>',
                'Frontend Development': '<i class="fas fa-window-restore"></i>',
                'OOP': '<i class="fas fa-cubes"></i>',
                'Operating Systems': '<i class="fas fa-desktop"></i>',
                'Machine Learning': '<i class="fas fa-brain"></i>',
                'Communication': '<i class="fas fa-comments"></i>',
                'Teamwork': '<i class="fas fa-users"></i>',
                'Problem Solving': '<i class="fas fa-lightbulb"></i>',
                'Team Collaboration': '<i class="fas fa-hands-helping"></i>',
                'Time Management': '<i class="fas fa-clock"></i>',
                'Adaptability': '<i class="fas fa-sync-alt"></i>'
            };
            return icons[skill] || '<i class="fas fa-check-circle"></i>';
        }

        // Web Development and Programming Skills
        if (techSkills) {
            const allTech = [...(data.skills.technical || []), ...(data.skills.databases || []), ...(data.skills.containerization || [])];
            allTech.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.innerHTML = `${getSkillIcon(skill)} ${skill}`;
                techSkills.appendChild(span);
            });
        }

        if (softSkills && data.skills.soft) {
            data.skills.soft.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.innerHTML = `${getSkillIcon(skill)} ${skill}`;
                softSkills.appendChild(span);
            });
        }

        if (toolSkills && data.skills.tools) {
            data.skills.tools.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.innerHTML = `${getSkillIcon(skill)} ${skill}`;
                toolSkills.appendChild(span);
            });
        }

        if (coreSkills && data.skills.coreConcepts) {
            data.skills.coreConcepts.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.innerHTML = `${getSkillIcon(skill)} ${skill}`;
                coreSkills.appendChild(span);
            });
        }

        // Education
        const eduTimeline = document.getElementById('education-timeline');
        if (eduTimeline) {
            eduTimeline.innerHTML = '';
            data.education.forEach(edu => {
                const div = document.createElement('div');
                div.className = 'timeline-item';
                div.innerHTML = `
                    <span class="edu-year">${edu.duration}</span>
                    <h4>${edu.degree}</h4>
                    <p style="font-weight: 600; color: var(--primary);">${edu.institution}</p>
                    <small>${edu.description}</small>
                `;
                eduTimeline.appendChild(div);
            });
        }

        // Experience & Internship
        const expTimeline = document.getElementById('experience-timeline');
        if (expTimeline && data.experience) {
            expTimeline.innerHTML = '';
            data.experience.forEach(exp => {
                const div = document.createElement('div');
                div.className = 'timeline-item';
                div.innerHTML = `
                    <span class="edu-year">${exp.duration}</span>
                    <h4>${exp.title}</h4>
                    <p style="font-weight: 600; color: var(--primary);">${exp.organization}</p>
                    <small>${(exp.description || '').replace(/\n/g, '<br>')}</small>
                `;
                expTimeline.appendChild(div);
            });
        }

        // Achievements / NCC
        const achievementsTimeline = document.getElementById('achievements-timeline');
        if (achievementsTimeline && data.achievements) {
            achievementsTimeline.innerHTML = '';
            data.achievements.forEach(ach => {
                const div = document.createElement('div');
                div.className = 'timeline-item';
                div.innerHTML = `
                    <span class="edu-year" style="background: var(--gradient-2);">${ach.organization}</span>
                    <h4>${ach.title}</h4>
                    <small style="display: block; margin-top: 10px;">${(ach.description || '').replace(/\n/g, '<br>')}</small>
                `;
                achievementsTimeline.appendChild(div);
            });
        }

        // Certifications
        const certList = document.getElementById('certifications-list');
        if (certList) {
            certList.innerHTML = ''; 
            data.certifications.forEach(cert => {
                certList.innerHTML += `
                    <div class="cert-card" data-aos="fade-up">
                        <div class="cert-icon"><i class="fas fa-certificate"></i></div>
                        <div class="cert-org">${cert.organization}</div>
                        <h3>${cert.title}</h3>
                        <p class="cert-desc">${(cert.description || '').replace(/\n/g, '<br>')}</p>
                    </div>
                `;
            });
        }

        // Projects
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            
            data.projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-category', project.category || 'web');
                card.innerHTML = `
                    <div class="project-img"><i class="fas fa-code"></i></div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${(project.description || '').replace(/\n/g, '<br>')}</p>
                        <div class="project-tech">
                            ${project.technologies.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
                        </div>
                        ${project.link && project.link !== '#' ? `
                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                View Project <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
        }

        // Project Filtering Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                
                document.querySelectorAll('.project-card').forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        // Refresh AOS with new elements
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 100);
    }

    // Contact Form Action
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = 'Message sent! I will get back to you soon.';
                formStatus.style.color = '#10b981';
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Something went wrong');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! ' + error.message;
            formStatus.style.color = '#ef4444';
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    // Fallback Data for UI development/preview
    function getFallbackData() {
        return {
            name: "NAGA MOUNIKA<br>VARIKUNTLA",
            title: "Aspiring Frontend Developer",
            summary: "Aspiring Frontend Developer with strong knowledge of HTML, CSS, JavaScript, React.js, and MySQL, focused on building responsive web applications. Strong problem-solving abilities and continuous learning mindset support success in dynamic development environments.",
            skills: {
                technical: ["HTML5", "CSS3", "JavaScript", "JSX", "React.js", "Python", "Basics in C"],
                databases: ["MySQL", "MongoDB"],
                tools: ["Git", "GitHub", "VS Code"],
                soft: ["Communication", "Teamwork", "Problem Solving", "Team Collaboration", "Time Management", "Adaptability"],
                containerization: ["Basics in Docker"],
                coreConcepts: ["REST APIs", "Data Structures", "DBMS", "Data Visualization", "Frontend Development", "OOP", "Operating Systems", "Machine Learning"]
            },
            education: [
                {
                    institution: "Vignan's Foundation for Science, Technology & Research University",
                    degree: "Bachelor of Technology in Information Technology",
                    duration: "07/2023 - 05/2027",
                    description: "Guntur, Andhra Pradesh | CGPA: 7.92 / 10"
                },
                {
                    institution: "Sri Chaitanya Junior College",
                    degree: "Higher Secondary (MPC)",
                    duration: "06/2021 - 03/2023",
                    description: "Ongole, Andhra Pradesh | Percentage/CGPA: 90.6%"
                },
                {
                    institution: "Apex High School",
                    degree: "Secondary School (SSC)",
                    duration: "03/2020 - 06/2021",
                    description: "Ongole, Andhra Pradesh | Percentage/CGPA: 98%"
                }
            ],
            experience: [
                {
                    title: "Web Development Course",
                    organization: "Web Development Training",
                    duration: "07/2023",
                    description: "• Learned how to build websites using HTML, CSS, and JavaScript.\n• Gained skills in creating responsive and user-friendly web pages.\n• Worked on projects involving front-end design and basic back-end concepts."
                }
            ],
            projects: [
                { 
                    title: "Real Time College Fest & Concert Updates", 
                    description: "• Sends instant notifications for schedules, changes, and important announcements.\n• Shows event details clearly like time, venue, and registration information.\n• Improved event participation awareness for 500+ students.\n• Displayed event information for 20+ events including schedules and registrations.\n• Implemented real-time updates using Socket.IO with <1 second notification delay.", 
                    technologies: ["Node.js", "Socket.IO", "Express.js", "JavaScript", "HTML5/CSS3"], 
                    link: "#",
                    category: "web"
                },
                {
                    title: "Online Shopping System",
                    description: "• Allows users to browse and buy products online easily.\n• Provides secure payment and order tracking interfaces.\n• Shows product details, prices, and offers in one centralized place.\n• Helps users shop anytime without visiting physical stores.\n• Developed an Online Shopping System handling 100+ product listings and improving user browsing efficiency by 40%.",
                    technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "Web Apps"],
                    link: "https://nagamounika.bytexl.live/",
                    category: "web"
                },
                {
                    title: "Plagiarism Detection",
                    description: "• Compared 50+ text entries for similarity detection.\n• Generates a similarity report with an accurate percentage score.\n• Helps ensure original and authentic content writing.\n• Built plagiarism detection system with 90% matching accuracy using smart text comparison algorithms.",
                    technologies: ["Node.js", "Express.js", "JavaScript", "HTML5/CSS3", "Algorithms"],
                    link: "https://231fa07011.github.io/Plagarism-Detection/",
                    category: "software"
                }
            ],
            certifications: [
                { 
                    title: "Generative AI", 
                    organization: "Google Cloud / Concepts",
                    description: "• Covers basics of AI models like GPT, image generation, and prompt engineering.\n• Learned how AI creates text, images, and other content using machine learning techniques."
                },
                {
                    title: "Software Testing (NPTEL)",
                    organization: "NPTEL / Swayam",
                    description: "• Covers testing concepts like manual testing, automation basics, test cases, bug tracking, and validation techniques.\n• Demonstrates a solid understanding of software quality assurance and error-finding methodologies."
                },
                {
                    title: "Online Communication in the Digital Age",
                    organization: "NPTEL / Swayam",
                    description: "• Focuses on effective communication using digital platforms, covering email writing, online etiquette, and professional virtual communication.\n• Improves skills for virtual meetings, social media, and online teamwork."
                },
                {
                    title: "Deep Learning - IIT Ropar (NPTEL)",
                    organization: "IIT Ropar / NPTEL",
                    description: "• CNNs, RNNs, attention mechanisms, and optimization techniques."
                },
                {
                    title: "Cambridge English – Preliminary (PET)",
                    organization: "Cambridge Assessment English",
                    description: "• International certification demonstrating robust everyday English language skills, writing fluency, and intermediate communication proficiency."
                }
            ],
            achievements: [
                {
                    title: "National Cadet Corps (NCC)",
                    organization: "National Cadet Corps",
                    description: "• Earned B Certificate with A Grade in the National Cadet Corps (NCC), demonstrating exceptional leadership, discipline, personal integrity, and commitment to community service."
                }
            ],
            social: {
                github: "https://github.com/231fa07011",
                linkedin: "https://www.linkedin.com/in/naga-mounika-varikuntla-894658283",
                leetcode: "https://leetcode.com/u/uUFOLFopkH/",
                phone: "+91 7331102982",
                email: "nagamounika624@gmail.com"
            }
        };
    }

    fetchPortfolioData();
});
