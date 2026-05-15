export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  completionDate: string;
  category: 'SEO Audit' | 'Frontend' | 'Research' | 'Fullstack' | 'Automation';
  imageUrl: string;
  featured?: boolean;
   gallery?: string[];
}

export interface ActivityLog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'project' | 'achievement';
}