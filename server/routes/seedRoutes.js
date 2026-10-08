import express from 'express';
import Bio from '../models/Bio.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import User from '../models/User.js';

const router = express.Router();

const initialData = {
  bio: {
    name: "T. AKASH",
    title: "Information Technology Undergraduate",
    roles: [
      "Frontend Developer",
      "Full Stack Development Intern",
      "Python Application Developer",
      "IT Student @ B.Tech"
    ],
    location: "Dharmapuri, Tamil Nadu - 636810",
    phone: "+91 9942774636",
    email: "tamilakashakash52@gmail.com",
    githubUrl: "https://github.com/tamilakash",
    githubHandle: "github.com/tamilakash",
    objective: "Motivated Information Technology undergraduate with a strong interest in frontend development and Python application development. Seeking an entry-level opportunity to apply full stack development skills gained through academic training and hands-on internship experience.",
    photo: "/akash_photo.jpg"
  },
  skills: [
    { name: "Python", category: "programming", level: 85, icon: "fa-brands fa-python", color: "#3776AB" },
    { name: "JavaScript (JS)", category: "programming", level: 80, icon: "fa-brands fa-square-js", color: "#F7DF1E" },
    { name: "SQL", category: "programming", level: 75, icon: "fa-solid fa-database", color: "#00758F" },
    { name: "HTML5", category: "webTech", level: 90, icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS3", category: "webTech", level: 85, icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    { name: "React.js", category: "webTech", level: 75, icon: "fa-brands fa-react", color: "#61DAFB" },
    { name: "Data Structures", category: "coreConcepts", level: 80, icon: "fa-solid fa-diagram-project", color: "#A855F7" },
    { name: "DBMS (Database Systems)", category: "coreConcepts", level: 78, icon: "fa-solid fa-server", color: "#10B981" }
  ],
  projects: [
    {
      title: "Full Stack Web Application Suite",
      category: "Full Stack",
      tech: ["HTML5", "CSS3", "JavaScript", "Python"],
      description: "Hands-on project developed during internship at MIST Software Solutions featuring end-to-end user workflows.",
      link: "https://github.com/tamilakash"
    },
    {
      title: "Python Data Management Tool",
      category: "Python App",
      tech: ["Python", "SQL", "DBMS"],
      description: "Database-backed Python application designed for record manipulation and SQL querying.",
      link: "https://github.com/tamilakash"
    },
    {
      title: "Interactive React Portfolio",
      category: "Frontend",
      tech: ["React", "HTML5", "CSS Glassmorphic", "JS"],
      description: "Personal responsive web application showcasing academic timeline and internship credentials.",
      link: "https://github.com/tamilakash"
    }
  ],
  experience: [
    {
      role: "Full Stack Development Intern",
      company: "MIST Software Solutions Pvt. Ltd.",
      duration: "1 Month",
      highlights: [
        "Gained hands-on exposure to full stack development workflows across frontend and backend components.",
        "Applied core programming concepts in a real project environment, strengthening SDLC understanding.",
        "Collaborated with team members to understand industry practices in building and maintaining web apps."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology - Information Technology",
      institution: "College / University",
      period: "2024 - 2027",
      status: "Currently Pursuing",
      details: "Curriculum covering Data Structures, DBMS, Software Engineering, Python Programming, and Web Technologies."
    },
    {
      degree: "Higher Secondary Education (12th)",
      institution: "Variyar Higher Secondary School, Dharmapuri",
      period: "2021 - 2022",
      status: "Completed",
      details: "Mathematics, physics, and computer applications."
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Variyar Higher Secondary School, Dharmapuri",
      period: "2019 - 2020",
      status: "Completed",
      details: "Foundational education in mathematics, science, and core logic."
    }
  ]
};

// @desc    Seed database with Akash's resume content
// @route   POST /api/seed
router.post('/', async (req, res) => {
  try {
    await Bio.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await User.deleteMany({});

    const seededBio = await Bio.create(initialData.bio);
    const seededSkills = await Skill.insertMany(initialData.skills);
    const seededProjects = await Project.insertMany(initialData.projects);
    const seededExp = await Experience.insertMany(initialData.experience);
    const seededEdu = await Education.insertMany(initialData.education);
    
    const seededUser = await User.create({
      name: "T. Akash",
      email: "tamilakashakash52@gmail.com",
      password: "admin123",
      role: "admin"
    });

    res.json({
      message: '🎉 MongoDB Database successfully seeded!',
      counts: {
        bio: 1,
        skills: seededSkills.length,
        projects: seededProjects.length,
        experience: seededExp.length,
        education: seededEdu.length,
        user: 1
      },
      defaultAdmin: {
        email: seededUser.email,
        password: "admin123"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
