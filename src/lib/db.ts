// lib/db.ts - Simple localStorage database for activity logs

export interface ActivityLog {
  id: number;
  slug: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  icon: string;
}

const STORAGE_KEY = 'activity_logs';

// Get all logs from localStorage
export function getAllLogsFromDB(): ActivityLog[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save a new log
export function saveLogToDB(log: ActivityLog): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getAllLogsFromDB();
  const updatedLogs = [log, ...existingLogs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

// Update an existing log
export function updateLogInDB(id: number, updatedLog: Partial<ActivityLog>): void {
  if (typeof window === 'undefined') return;
  
  const logs = getAllLogsFromDB();
  const updatedLogs = logs.map(log => 
    log.id === id ? { ...log, ...updatedLog } : log
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

// Delete a log
export function deleteLogFromDB(id: number): void {
  if (typeof window === 'undefined') return;
  
  const logs = getAllLogsFromDB();
  const updatedLogs = logs.filter(log => log.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

// Get a single log by slug
export function getLogBySlugFromDB(slug: string): ActivityLog | undefined {
  const logs = getAllLogsFromDB();
  return logs.find(log => log.slug === slug);
}

// Get a single log by ID
export function getLogByIdFromDB(id: number): ActivityLog | undefined {
  const logs = getAllLogsFromDB();
  return logs.find(log => log.id === id);
}

// Generate a unique slug from title
export function generateSlug(title: string, currentId?: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const existingLogs = getAllLogsFromDB();
  let slug = baseSlug;
  let counter = 1;
  
  // If updating, exclude current log from check
  while (existingLogs.some(log => log.slug === slug && log.id !== currentId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}