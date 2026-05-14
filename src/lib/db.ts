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

export interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  timestamp: string;
  logSlug: string;
}

const STORAGE_KEY = 'activity_logs';
const IMAGES_STORAGE_KEY = 'activity_log_images';

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
  
  // Also delete associated images
  deleteImagesForLog(getLogByIdFromDB(id)?.slug || '');
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
  
  while (existingLogs.some(log => log.slug === slug && log.id !== currentId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// ============ IMAGE STORAGE FUNCTIONS ============

// Get all images for a specific log
export function getImagesForLog(logSlug: string): UploadedImage[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const allImages: UploadedImage[] = JSON.parse(stored);
    return allImages.filter(img => img.logSlug === logSlug);
  } catch {
    return [];
  }
}

// Save multiple images for a log
export function saveImagesForLog(logSlug: string, images: Omit<UploadedImage, 'logSlug'>[]): void {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  const allImages: UploadedImage[] = stored ? JSON.parse(stored) : [];
  
  // Remove old images for this log
  const filteredImages = allImages.filter(img => img.logSlug !== logSlug);
  
  // Add new images
  const newImages: UploadedImage[] = images.map(img => ({
    ...img,
    logSlug,
  }));
  
  const updatedImages = [...newImages, ...filteredImages];
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(updatedImages));
}

// Add a single image to a log
export function addImageToLog(logSlug: string, image: Omit<UploadedImage, 'logSlug'>): void {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  const allImages: UploadedImage[] = stored ? JSON.parse(stored) : [];
  
  const newImage: UploadedImage = {
    ...image,
    logSlug,
  };
  
  allImages.push(newImage);
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(allImages));
}

// Delete an image
export function deleteImageFromDB(imageId: string): void {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  if (!stored) return;
  
  const allImages: UploadedImage[] = JSON.parse(stored);
  const updatedImages = allImages.filter(img => img.id !== imageId);
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(updatedImages));
}

// Delete all images for a log
export function deleteImagesForLog(logSlug: string): void {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  if (!stored) return;
  
  const allImages: UploadedImage[] = JSON.parse(stored);
  const updatedImages = allImages.filter(img => img.logSlug !== logSlug);
  localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(updatedImages));
}