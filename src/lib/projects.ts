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

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export const experience: Experience[] = [
  {
    period: "2023 — Present",
    role: "Fullstack Developer",
    company: "Roamtech Solution Limited.",
    description:
      "Built .",
  }
];

export const skills = [
  "TypeScript",
  "React / Next.js",
  "React Native",
  "Node.js",
  "Go",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "AWS",
  "Kubernetes",
];
