import bloodheroImg from "@/assets/project-bloodhero.png";
import agromarketImg from "@/assets/project-agromarket.png";
import movierecsImg from "@/assets/project-movierecs.png";
import lyriqaImg from "@/assets/project-lyriqa.png";
import jobtrackerImg from "@/assets/project-jobtracker.png";

export type Platform = "Web" | "Mobile" | "Web & Mobile";

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  platform: Platform;
  description: string;
  stack: string[];
  demos: { src: any; alt: string }[];
  links: ProjectLink[];
  apk?: string;
}

// To add a new project, append an object to this array.
export const projects: Project[] = [
  {
    id: "bloodhero",
    title: "BloodHero",
    year: "2024",
    platform: "Web & Mobile",
    description:
      "A real-time blood donation and SOS emergency network. Connects potential blood donors and recipients instantly, coordinates emergency SOS broadcasts, and tracks donor schedules and points.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    demos: [{ src: bloodheroImg, alt: "BloodHero SOS emergency network mockup" }],
    links: [
      { label: "Live Demo", href: "https://blood-heroes-six.vercel.app/dashboard", primary: true },
      { label: "Source Code", href: "https://github.com/Timothy970/blood-donation-system" },
    ],
    apk: "https://github.com/Timothy970/blood-donation-system/releases/download/v1.0.0/bloodhero.apk",
  },
  {
    id: "agromarket",
    title: "AgroMarket",
    year: "2024",
    platform: "Web",
    description:
      "A digital marketplace connecting local farmers directly with consumers. Enables direct produce purchases, flexible payment options, and fast delivery scheduling to support local agriculture.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    demos: [{ src: agromarketImg, alt: "AgroMarket produce marketplace mockup" }],
    links: [
      { label: "Live Demo", href: "https://agromarket-5c9k.onrender.com/", primary: true },
      { label: "Source Code", href: "https://github.com/Timothy970/AgroMarket" },
    ],
  },
  {
    id: "movierecs",
    title: "MovieRecs",
    year: "2024",
    platform: "Web",
    description:
      "A movie recommendation and browsing platform. Features popular movies, search and filter features, responsive grid views, and page pagination.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    demos: [{ src: movierecsImg, alt: "MovieRecs movie recommendation mockup" }],
    links: [
      { label: "Live Demo", href: "https://movie-app-khaki-seven-17.vercel.app/", primary: true },
      { label: "Source Code", href: "https://github.com/Timothy970/movie-app" },
    ],
  },
  {
    id: "lyriqa",
    title: "Lyriqa",
    year: "2025",
    platform: "Web",
    description:
      "An AI-powered poetry creation platform. Enables users to generate highly structured, thematic poems in various styles, combining human creative inputs with Google Genkit and Gemini.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Genkit", "Gemini AI"],
    demos: [{ src: lyriqaImg, alt: "Lyriqa AI poem generator mockup" }],
    links: [
      { label: "Live Demo", href: "https://lyriqa.vercel.app/", primary: true },
      { label: "Source Code", href: "https://github.com/Timothy970/poem_generator" },
    ],
  },
  {
    id: "jobtracker",
    title: "Job Tracker",
    year: "2024",
    platform: "Web",
    description:
      "A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking job applications. Features an interactive dashboard with search filters, application status statistics, user profile management with image uploads, and visual charts representing application trends.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Styled Components", "Recharts"],
    demos: [{ src: jobtrackerImg, alt: "Job Tracker dashboard mockup" }],
    links: [
      { label: "Live Demo", href: "https://job-tracker-nu-ivory.vercel.app/", primary: true },
      { label: "Source Code", href: "https://github.com/Timothy970/Job-Tracker" },
    ],
  },
];

export interface SubProject {
  name: string;
  category: string;
  technologies: string[];
  highlights: string[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  subProjects?: SubProject[];
}

export const experience: Experience[] = [
  {
    period: "2023 — Present",
    role: "Software Engineer",
    company: "Roamtech Limited Solutions",
    description:
      "Develop and maintain enterprise-grade web, backend, and mobile applications across multiple financial technology and communication products. Contribute across the full software development lifecycle from system architecture and API integrations to containerized deployment, SQL optimization, and high-availability production support.",
    subProjects: [
      {
        name: "Afrisend",
        category: "Cross-Border Money Transfer Platform",
        technologies: ["Go", "PHP", "Vue.js", "React Native", "MySQL", "Redis", "Docker", "Kubernetes", "Helm"],
        highlights: [
          "Developed secure backend services supporting local and international cross-border money transfers.",
          "Designed and implemented RESTful APIs consumed by web and mobile applications.",
          "Integrated banking systems, mobile money providers, payment gateways, and foreign exchange partners using REST and SOAP services.",
          "Built transaction validation, automated reconciliation, and retry mechanisms to improve payment reliability.",
          "Investigated and resolved production incidents while maintaining high system availability.",
          "Optimized SQL queries and backend workflows for high-volume transaction processing.",
        ],
      },
      {
        name: "Emalify",
        category: "Business Communications Platform",
        technologies: ["PHP", "Vue.js", "MySQL", "REST APIs"],
        highlights: [
          "Designed and implemented RESTful APIs and backend services for SMS delivery and messaging workflows.",
          "Developed reusable backend components and frontend modules, including template management and reporting features.",
        ],
      },
      {
        name: "Adenzo",
        category: "E-commerce Platform",
        technologies: ["Go (Golang)", "Next.js", "MySQL", "REST APIs"],
        highlights: [
          "Developed scalable backend services using Go and REST APIs consumed by web applications.",
          "Implemented secure authentication, session handling, and e-commerce business logic.",
          "Developed responsive frontend functionality using Next.js.",
        ],
      },
    ],
  },
];

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Go (Golang)", "PHP (Laravel)", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    category: "Backend & Systems",
    items: ["REST APIs", "Microservices", "Express.js", "Node.js", "SOAP Services", "Payment Integrations", "API Security"],
  },
  {
    category: "Frontend & Mobile",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "React Native", "Responsive UI"],
  },
  {
    category: "Databases & DevOps",
    items: ["MySQL", "Redis", "Docker", "Kubernetes", "Helm", "Linux", "Git & GitHub Actions"],
  },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  instructor: string;
  issueDate: string;
  credentialUrl: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: "react-native-2025",
    title: "React Native - The Practical Guide",
    issuer: "Udemy",
    instructor: "Maximilian Schwarzmüller (Academind)",
    issueDate: "June 2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-75982a33-d8ce-4ba8-9093-50e8c53d5588/",
    skills: ["React Native", "Cross-Platform Mobile", "iOS & Android Development"],
  },
  {
    id: "mern-2025",
    title: "MERN 2025 Edition - MongoDB, Express, React and NodeJS",
    issuer: "Udemy",
    instructor: "Jānis Smilga",
    issueDate: "August 2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-2081a59f-0db1-4db3-9bc8-45d45f82792f/",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "Full-Stack Web"],
  },
];


export const skills = [
  "Go (Golang)",
  "PHP (Laravel)",
  "TypeScript",
  "React / Next.js",
  "Vue.js",
  "React Native",
  "REST & SOAP APIs",
  "Payment Integrations",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "Helm",
  "Linux",
  "Microservices",
];