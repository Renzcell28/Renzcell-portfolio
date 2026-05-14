"use client";

import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AISummaryTool } from '@/components/portfolio/ai-summary-tool';
import { ArrowLeft, Calendar, User, Clock, BookOpen, ThumbsUp, Share2, Bookmark, Image as ImageIcon, Upload, X, ZoomIn, Trash2, Edit2, Save, XCircle, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, use, useCallback } from 'react';
import { getLogBySlugFromDB, updateLogInDB, generateSlug, ActivityLog, getImagesForLog, addImageToLog, deleteImageFromDB, UploadedImage } from '@/lib/db';

// Helper function to format date for input (YYYY-MM-DD)
const formatDateForInput = (formattedDate: string): string => {
  try {
    const match = formattedDate.match(/(\w+) (\d+), (\d+)/);
    if (!match) return '';
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.indexOf(match[1]);
    const day = parseInt(match[2]);
    const year = parseInt(match[3]);
    
    if (monthIndex === -1) return '';
    
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } catch {
    return '';
  }
};

// Helper function to format date for display (Month Day, Year)
const formatDateForDisplay = (dateValue: string): string => {
  try {
    const [year, month, day] = dateValue.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch {
    return '';
  }
};

export default function LogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLog, setEditedLog] = useState<Partial<ActivityLog> & { dateValue?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const log = getLogBySlugFromDB(slug);

  // Load images from database
  const loadImages = useCallback(() => {
    try {
      const images = getImagesForLog(slug);
      setUploadedImages(images);
    } catch (error) {
      console.error('Error loading images:', error);
      setUploadedImages([]);
    } finally {
      setIsLoadingImages(false);
    }
  }, [slug]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Initialize edit form when editing starts
  const startEditing = () => {
    if (log) {
      setEditedLog({
        id: log.id,
        title: log.title,
        description: log.description,
        content: log.content,
        tags: log.tags,
        icon: log.icon,
        date: log.date,
        dateValue: formatDateForInput(log.date),
      });
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedLog({});
  };

  const saveEdit = async () => {
    if (!log || !editedLog.title || !editedLog.description) {
      alert('Please fill in title and description');
      return;
    }

    setIsSaving(true);

    try {
      const newSlug = editedLog.title !== log.title 
        ? generateSlug(editedLog.title!, log.id)
        : log.slug;

      const updatedLog: Partial<ActivityLog> = {
        title: editedLog.title,
        description: editedLog.description,
        content: editedLog.content || editedLog.description,
        tags: typeof editedLog.tags === 'string' 
          ? (editedLog.tags as string).split(',').map(t => t.trim())
          : editedLog.tags,
        icon: editedLog.icon || log.icon,
        slug: newSlug,
        date: editedLog.date || log.date,
      };

      updateLogInDB(log.id, updatedLog);

      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = '✅ Log updated successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);

      if (newSlug !== log.slug) {
        router.push(`/logs/${newSlug}`);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const formattedDate = formatDateForDisplay(dateValue);
      setEditedLog(prev => ({ ...prev, date: formattedDate, dateValue }));
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    setEditedLog(prev => ({ ...prev, tags: tagString }));
  };

  // Multiple image upload
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    const uploadedImagesList: Omit<UploadedImage, 'logSlug'>[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug);

      try {
        const response = await fetch('/api/upload-cloudinary', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (response.ok) {
          const newImage = {
            id: result.public_id,
            url: result.url,
            filename: file.name,
            timestamp: new Date().toLocaleString(),
          };
          uploadedImagesList.push(newImage);
          
          addImageToLog(slug, newImage);
          
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setUploadProgress(prev => ({ ...prev, [file.name]: -1 }));
      }
    }

    await loadImages();
    setIsUploading(false);
    
    const successCount = uploadedImagesList.length;
    if (successCount > 0) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = `✅ ${successCount} image${successCount > 1 ? 's' : ''} uploaded successfully!`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setUploadProgress({}), 3000);
  };

  const handleDeleteImage = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImageFromDB(imageId);
      setUploadedImages(prev => prev.filter(img => img.id !== imageId));
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = '🗑️ Image deleted!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug);

      try {
        const response = await fetch('/api/upload-cloudinary', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (response.ok) {
          const newImage = {
            id: result.public_id,
            url: result.url,
            filename: file.name,
            timestamp: new Date().toLocaleString(),
          };
          
          addImageToLog(slug, newImage);
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setUploadProgress(prev => ({ ...prev, [file.name]: -1 }));
      }
    }

    await loadImages();
    setIsUploading(false);
    setTimeout(() => setUploadProgress({}), 3000);
  };

  // Function to render formatted content
  const renderFormattedContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const sections: JSX.Element[] = [];
    let currentSection: JSX.Element[] = [];
    let isBulletList = false;
    let bulletItems: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('## ')) {
        if (currentSection.length > 0) {
          sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
          currentSection = [];
        }
        sections.push(
          <div key={`header-${i}`} className="mb-4 mt-6 first:mt-0">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{line.replace('## ', '')}</h2>
            </div>
          </div>
        );
        continue;
      }
      
      if (line.startsWith('### ')) {
        if (currentSection.length > 0) {
          sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
          currentSection = [];
        }
        sections.push(
          <div key={`subheader-${i}`} className="mb-3 mt-4">
            <h3 className="text-lg md:text-xl font-semibold text-foreground/90">{line.replace('### ', '')}</h3>
          </div>
        );
        continue;
      }
      
      if (line.trim().startsWith('- ')) {
        if (!isBulletList) {
          if (currentSection.length > 0) {
            sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
            currentSection = [];
          }
          isBulletList = true;
          bulletItems = [];
        }
        bulletItems.push(line.trim().replace('- ', ''));
        continue;
      } else if (isBulletList && line.trim() === '') {
        sections.push(
          <div key={`bullet-list-${i}`} className="mb-6 space-y-2">
            {bulletItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        );
        isBulletList = false;
        bulletItems = [];
        continue;
      } else if (isBulletList) {
        bulletItems.push(line.trim().replace('- ', ''));
        continue;
      }
      
      if (line.trim()) {
        currentSection.push(
          <p key={`paragraph-${i}`} className="text-foreground/80 leading-relaxed mb-4">
            {line}
          </p>
        );
      } else if (currentSection.length > 0) {
        sections.push(<div key={`section-end-${i}`} className="mb-6">{currentSection}</div>);
        currentSection = [];
      }
    }
    
    if (currentSection.length > 0) {
      sections.push(<div key="section-final" className="mb-6">{currentSection}</div>);
    }
    
    if (isBulletList && bulletItems.length > 0) {
      sections.push(
        <div key="bullet-list-final" className="mb-6 space-y-2">
          {bulletItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      );
    }
    
    return sections;
  };

  if (!log) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-red-500/30 rounded-full animate-float" />
        <div className="absolute top-[30%] right-[10%] w-3 h-3 bg-red-600/30 rounded-full animate-float-delay" />
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-red-500/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 bg-red-600/25 rounded-full animate-float" />
        <div className="absolute top-[60%] left-[80%] w-2.5 h-2.5 bg-red-500/15 rounded-full animate-float-delay" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <Button variant="ghost" asChild className="p-0 hover:bg-transparent text-muted-foreground hover:text-red-500 group">
              <Link href="/logs" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back to All Logs</span>
              </Link>
            </Button>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-red-500/20 overflow-hidden shadow-2xl animate-fade-in-up animation-delay-200">
            {isEditing ? (
              // Edit Mode
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Edit Activity Log</h2>
                  <button onClick={cancelEditing} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-red-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={editedLog.dateValue || ''}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Current: {editedLog.date}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Icon (Emoji)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedLog.icon || ""}
                        onChange={(e) => setEditedLog({...editedLog, icon: e.target.value})}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
                        maxLength={2}
                      />
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-2xl">
                        {editedLog.icon || "📝"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Title *</label>
                    <input
                      type="text"
                      value={editedLog.title || ""}
                      onChange={(e) => setEditedLog({...editedLog, title: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Description *</label>
                    <textarea
                      value={editedLog.description || ""}
                      onChange={(e) => setEditedLog({...editedLog, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Content (Markdown)</label>
                    <textarea
                      value={editedLog.content || ""}
                      onChange={(e) => setEditedLog({...editedLog, content: e.target.value})}
                      rows={8}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editedLog.tags) ? editedLog.tags.join(', ') : editedLog.tags || ""}
                      onChange={handleTagChange}
                      placeholder="Learning, Development, Bug Fix"
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
                    />
                    {editedLog.tags && Array.isArray(editedLog.tags) && editedLog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {editedLog.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={saveEdit} disabled={isSaving} className="flex-1 bg-gradient-to-r from-red-600 to-red-500">
                      {isSaving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                    </Button>
                    <Button onClick={cancelEditing} variant="outline" className="flex-1">Cancel</Button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/5 to-transparent" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {log.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs font-medium bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h1 className="font-headline font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {log.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-400" />
                        <span>{log.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-red-400" />
                        <span>Renzcell Rick Loresco</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span>5 min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-red-400" />
                        <span>Activity Log</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0">
                  <div className="mb-8 animate-slide-up animation-delay-300">
                    <AISummaryTool content={log.content} />
                  </div>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                    <div className="relative flex justify-center"><span className="bg-gray-900 px-4 text-xs text-muted-foreground">DETAILED LOG</span></div>
                  </div>

                  <article className="prose prose-lg max-w-none prose-invert animate-fade-in animation-delay-400">
                    {renderFormattedContent(log.content)}
                  </article>

                  {/* Upload Progress Indicators */}
                  {Object.keys(uploadProgress).length > 0 && (
                    <div className="mt-6 space-y-2">
                      {Object.entries(uploadProgress).map(([filename, progress]) => (
                        <div key={filename} className="bg-gray-800/20 rounded-lg p-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="truncate flex-1">{filename}</span>
                            <span>{progress === 100 ? '✓' : progress === -1 ? '✗' : `${progress}%`}</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${progress === 100 ? 'bg-red-500' : progress === -1 ? 'bg-red-700' : 'bg-red-500'}`} style={{ width: `${progress === -1 ? 100 : progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Uploaded Images Gallery */}
                  {isLoadingImages ? (
                    <div className="mt-8 flex justify-center py-8"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
                  ) : uploadedImages.length > 0 && (
                    <div className="mt-8 animate-fade-in animation-delay-400">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-red-500" />
                        Attached Images ({uploadedImages.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/40 transition-all">
                            <img src={image.url} alt={image.filename} className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setSelectedImage(image)} />
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => setSelectedImage(image)} className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"><ZoomIn className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteImage(image.id)} className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                              <p className="text-white text-xs truncate">{image.filename}</p>
                              <p className="text-white/60 text-[10px]">{new Date(image.timestamp).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-800 p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isLiked ? 'bg-red-500/20 text-red-500' : 'hover:bg-red-500/10 text-muted-foreground'}`}><ThumbsUp className="w-4 h-4" /></button>
                      <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isBookmarked ? 'bg-red-500/20 text-red-500' : 'hover:bg-red-500/10 text-muted-foreground'}`}><Bookmark className="w-4 h-4" /></button>
                      <button className="p-2 rounded-full hover:bg-red-500/10 transition-all duration-300 hover:scale-110 group"><Share2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" /></button>
                      <button onClick={startEditing} className="p-2 rounded-full hover:bg-red-500/10 transition-all duration-300 hover:scale-110 group"><Edit2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" /></button>
                      <div className="relative">
                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleMultipleImageUpload} className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="p-2 rounded-full hover:bg-red-500/10 transition-all duration-300 hover:scale-110 group flex items-center gap-2">
                          {isUploading ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />}
                          <span className="text-xs text-muted-foreground group-hover:text-red-500 transition-colors hidden sm:inline">Add Pictures</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Last updated: {log.date}</div>
                  </div>
                  <div onDragOver={handleDragOver} onDrop={handleDrop} className="mt-4 border-2 border-dashed border-gray-800 rounded-lg p-4 text-center hover:border-red-500/40 transition-colors">
                    <p className="text-xs text-muted-foreground">📷 Drag & drop multiple images here to upload (max 5MB each)</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Supports: JPG, PNG, WEBP, GIF</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
              <div className="relative max-w-4xl max-h-[90vh]">
                <img src={selectedImage.url} alt={selectedImage.filename} className="max-w-full max-h-[90vh] object-contain rounded-lg" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"><X className="w-5 h-5" /></button>
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-2 text-white text-sm">
                  <p>{selectedImage.filename}</p>
                  <p className="text-xs text-white/70">Uploaded: {selectedImage.timestamp}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 animate-fade-in-up animation-delay-500">
            <div className="bg-gradient-to-br from-red-500/10 via-red-600/5 to-transparent rounded-2xl p-8 border border-red-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="font-bold text-lg flex items-center gap-2 justify-center md:justify-start"><span className="text-2xl">📖</span>Thanks for reading!</h4>
                  <p className="text-muted-foreground text-sm">Check out more of my daily activity logs and internship journey.</p>
                </div>
                <Button asChild className="rounded-full h-12 px-8 font-bold bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Link href="/logs">Explore More Logs<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          75% { transform: translateY(10px) translateX(-5px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 9s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 11s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-500 { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}