import { Wrench, Smartphone, Layers } from 'lucide-react';

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  points: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  duration: string;
  gpa: string;
  location: string;
}

export interface ProjectItem {
  title: string;
  desc: string;
  category: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  icon: any; // Lucide icon component
  color: string; // Tailwind background gradient values
  borderColor: string; // Tailwind border hover classes
}

export interface BlogItem {
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  location: string;
  leetcode: string;
  hackerrank: string;
  codechef: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    fullName: string;
    role: string;
    subRole: string;
    bio: string;
    availability: string;
  };
  socials: SocialLinks;
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  blogs: BlogItem[];
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Sumanth",
    fullName: "Jallipalli R P G Sumanth",
    role: "AI/ML & Flutter Dev",
    subRole: "AI / ML Undergraduate",
    bio: "AI Machine Learning undergraduate skilled in Flutter, Python, AI agents, and full-stack development with experience building real-time and AI-powered applications. Seeking a Software Engineering Internship to contribute to scalable and impactful engineering solutions.",
    availability: "Seeking a Software Engineering Internship"
  },
  socials: {
    github: "https://github.com/jruthik271",
    linkedin: "https://www.linkedin.com/in/sumanth-jallipalli-a36174291/",
    email: "jruthik271@gmail.com",
    phone: "+91 9491895027",
    location: "Chintalapudi, Andhra Pradesh - 534460, India",
    leetcode: "https://leetcode.com/jruthik271",
    hackerrank: "https://www.hackerrank.com/jruthik271",
    codechef: "https://www.codechef.com/users/jruthik271"
  },
  experiences: [
    {
      role: "Full Stack Developer Intern (Flutter)",
      company: "Technical Hub – Surampalem, India",
      duration: "May 2026 – Present",
      points: [
        "Developed CogniVision, a fully voice-navigable assistive mobile application using Flutter and Dart to restore environmental awareness and independent mobility for visually impaired individuals.",
        "Integrated the Gemini 2.0 Live API for low-latency visual streaming, paired with optimized YOLOv8n and MobileFaceNet TFLite models to achieve real-time spatial object tracking and achieved reliable offline face recognition.",
        "Collaborated under industry mentorship and presented the project at ProjectSpace 8.0 to multiple teams, demonstrating technical communication and cross-team collaboration."
      ]
    },
    {
      role: "Full Stack Developer Intern (Flutter)",
      company: "Technical Hub – Surampalem, India",
      duration: "May 2025 – June 2025",
      points: [
        "Engineered Mecha-Connect, an on-demand roadside assistance mobile platform using Flutter and Dart to streamline emergency support services for vehicle breakdowns and fuel shortages.",
        "Implemented active background GPS location tracking using the Google Maps API to instantly match users with nearby verified mechanics, fuel delivery agents, and service providers.",
        "Worked closely with industry mentors and presented the project at ISHIP to multiple teams, demonstrating technical communication and cross-team collaboration."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Artificial Intelligence and Machine Learning",
      school: "Aditya Engineering College",
      duration: "Oct 2023 – Present",
      gpa: "8.06 / 10.00",
      location: "Surampalem, India"
    }
  ],
  certifications: [
    "Postman API Fundamentals – Student Expert",
    "Cisco Networking Academy - Python Essentials (1 & 2)",
    "HackerRank Certifications: Python (Basic), C (Basic), SQL (Basic), Problem Solving (Basic)",
    "MongoDB Node.js Developer Certification",
    "GitHub Foundations Certification"
  ],
  skills: [
    {
      title: "Languages",
      skills: [
        { name: "Dart (Primary)", level: 90 },
        { name: "Python", level: 85 },
        { name: "C", level: 80 },
        { name: "JavaScript", level: 70 }
      ]
    },
    {
      title: "Frameworks & BaaS",
      skills: [
        { name: "Flutter (Mobile/Web)", level: 95 },
        { name: "Node.js / Express.js", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "Firebase", level: 80 }
      ]
    },
    {
      title: "Databases & DevOps",
      skills: [
        { name: "MongoDB / Mongoose", level: 85 },
        { name: "MySQL / Oracle SQL", level: 80 },
        { name: "Git / Postman", level: 90 },
        { name: "Data Structures & Algorithms", level: 85 }
      ]
    }
  ],
  projects: [
    {
      title: "CogniVision",
      desc: "Fully voice-navigable assistive mobile application using Flutter and Dart to restore environmental awareness and independent mobility for visually impaired individuals, powered by Gemini 2.0 Live and YOLOv8.",
      category: "Mobile",
      tags: ["Flutter", "Dart", "Gemini 2.0", "YOLOv8", "TFLite"],
      demoUrl: "#",
      githubUrl: "https://github.com/jruthik271/cognivision",
      icon: Wrench,
      color: "from-blue-500/20 to-blue-500/0",
      borderColor: "group-hover:border-blue-500/50"
    },
    {
      title: "WorkNow",
      desc: "Production-ready job search mobile application with dynamic location filtering, processing different job listings across multiple categories with real-time UI updates and ~99% responsive interaction rate.",
      category: "Mobile",
      tags: ["Flutter 3.x", "Dart", "StatefulWidget", "Material Design"],
      demoUrl: "#",
      githubUrl: "https://github.com/jruthik271/worknow",
      icon: Smartphone,
      color: "from-green-500/20 to-green-500/0",
      borderColor: "group-hover:border-green-500/50"
    },
    {
      title: "Mecha-Connect",
      desc: "On-demand roadside assistance mobile platform using Flutter and Dart to streamline emergency support services for vehicle breakdowns and fuel shortages with real-time background GPS tracking.",
      category: "Mobile",
      tags: ["Flutter", "Dart", "Google Maps API", "Geolocation"],
      demoUrl: "#",
      githubUrl: "https://github.com/jruthik271/mecha-connect",
      icon: Layers,
      color: "from-purple-500/20 to-purple-500/0",
      borderColor: "group-hover:border-purple-500/50"
    }
  ],
  blogs: [
    {
      title: "Understanding React Server Components",
      date: "Oct 15, 2023",
      readTime: "5 min read",
      category: "React",
      excerpt: "A deep dive into how React Server Components work and why they represent the future of React development."
    },
    {
      title: "Mastering Tailwind CSS Animations",
      date: "Nov 02, 2023",
      readTime: "8 min read",
      category: "CSS",
      excerpt: "Learn how to create complex, performant animations using only Tailwind CSS utility classes."
    },
    {
      title: "Building Scalable Node.js Backends",
      date: "Dec 10, 2023",
      readTime: "12 min read",
      category: "Node.js",
      excerpt: "Architecture patterns and best practices for building enterprise-grade backend systems with Node.js."
    }
  ]
};
