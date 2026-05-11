import { Project, ActivityLog, TimelineEvent } from './types';
import projectsData from '../data/projects.json';
import logsData from '../data/logs.json';

export async function getProjects(): Promise<Project[]> {
  // Simulating async fetch
  return projectsData.projects as Project[];
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function getLogs(): Promise<ActivityLog[]> {
  return logsData.logs as ActivityLog[];
}

export async function getLogBySlug(slug: string): Promise<ActivityLog | undefined> {
  const logs = await getLogs();
  return logs.find((l) => l.slug === slug);
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return [
    {
      date: 'Dec 2023',
      title: 'Internship Kickoff',
      description: 'Started internship at MIH, focusing on fullstack development and SEO.',
      type: 'milestone'
    },
    {
      date: 'Jan 2024',
      title: 'SEO Audit Lead',
      description: 'Appointed as technical lead for the Q1 audit project.',
      type: 'achievement'
    },
    {
      date: 'Feb 2024',
      title: 'Internal Tools Launch',
      description: 'Successfully deployed the Marketing Dashboard tool.',
      type: 'project'
    },
    {
      date: 'Mar 2024',
      title: 'Process Automation',
      description: 'Implemented Python scripts reducing manual work by 80%.',
      type: 'achievement'
    }
  ];
}