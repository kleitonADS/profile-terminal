// --- Tipos de Dados do Perfil ---

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  date: string;
  description: string;
  team?: string[];
  technologies?: string[];
  url?: string;
  thumbnail?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  telefone?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  imageUrl?: string;
  about: string[];
  contact: Contact;
  resumeUrl: string;
  experience: Experience[];
  skills: Skill[];
  education: Education[];
  certificates: Certificate[];
  projects: Project[];
  languages: Language[];
  links: Link[];
}