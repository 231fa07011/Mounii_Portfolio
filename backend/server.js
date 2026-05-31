require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend'));

// MongoDB Connection
let isDbConnected = false;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db')
    .then(() => {
        console.log('MongoDB Connected');
        isDbConnected = true;
    })
    .catch(err => console.error('MongoDB connection error - the contact form will now save locally in terminal instead of crashing:', err.message));

// Schema
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Portfolio Static Data (to be fetched by frontend)
const portfolioData = {
    name: "NAGA MOUNIKA<br>VARIKUNTLA",
    title: "Aspiring Frontend Developer",
    tagline: "Innovative thinker, passionate developer, and eager learner focused on building responsive web applications.",
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
            description: "Guntur, Andhra Pradesh | CGPA: 7.79 / 10"
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
            duration: "07/2023 - Present",
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

// Routes
app.get('/api/portfolio', (req, res) => {
    res.json(portfolioData);
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Graceful fallback for local developer testing when MongoDB isn't installed
        if (!isDbConnected) {
            console.log(`\n==== NEW CONTACT MESSAGE (Local Backup Mode) ====`);
            console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            console.log(`=================================================\n`);
            return res.status(201).json({ success: "Message received successfully!" });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: "Message received successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save message" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
