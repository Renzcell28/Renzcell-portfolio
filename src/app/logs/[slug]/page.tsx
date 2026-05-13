"use client";

import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AISummaryTool } from '@/components/portfolio/ai-summary-tool';
import { ArrowLeft, Calendar, User, Clock, BookOpen, ThumbsUp, Share2, Bookmark, Image as ImageIcon, Upload, X, ZoomIn, Trash2, Edit2, Save, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, use, useCallback } from 'react';
import { getLogBySlugFromDB, updateLogInDB, getLogByIdFromDB, generateSlug, ActivityLog } from '@/lib/db';

interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  timestamp: string;
}

const STORAGE_KEY = 'log_images';

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
  const [editedLog, setEditedLog] = useState<Partial<ActivityLog>>({});
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const log = getLogBySlugFromDB(slug);

  const loadImages = useCallback(() => {
    try {
      const storedImages = localStorage.getItem(`${STORAGE_KEY}_${slug}`);
      if (storedImages) {
        const parsed = JSON.parse(storedImages);
        setUploadedImages(parsed);
      } else {
        setUploadedImages([]);
      }
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

  useEffect(() => {
    if (!isLoadingImages) {
      localStorage.setItem(`${STORAGE_KEY}_${slug}`, JSON.stringify(uploadedImages));
    }
  }, [uploadedImages, slug, isLoadingImages]);

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
      // Generate new slug if title changed
      const newSlug = editedLog.title !== log.title 
        ? generateSlug(editedLog.title!, log.id)
        : log.slug;

      // Prepare updated log
      const updatedLog: Partial<ActivityLog> = {
        title: editedLog.title,
        description: editedLog.description,
        content: editedLog.content || editedLog.description,
        tags: typeof editedLog.tags === 'string' 
          ? (editedLog.tags as string).split(',').map(t => t.trim())
          : editedLog.tags,
        icon: editedLog.icon || log.icon,
        slug: newSlug,
      };

      // Update in database
      updateLogInDB(log.id, updatedLog);

      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = '✅ Log updated successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);

      // If slug changed, redirect to new URL
      if (newSlug !== log.slug) {
        router.push(`/logs/${newSlug}`);
      } else {
        // Reload the page to show updated content
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    setEditedLog(prev => ({ ...prev, tags: tagString }));
  };

  if (!log) {
    notFound();
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

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
        
        setUploadedImages(prev => [newImage, ...prev]);
        
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
        toast.textContent = '✅ Image uploaded to Cloudinary!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteImage = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setUploadedImages(prev => prev.filter(img => img.id !== imageId));
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
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
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
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
        
        setUploadedImages(prev => [newImage, ...prev]);
        
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
        toast.textContent = '✅ Image uploaded!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects... (keep same) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-[30%] right-[10%] w-3 h-3 bg-accent/30 rounded-full animate-float-delay" />
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-primary/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 bg-accent/25 rounded-full animate-float" />
        <div className="absolute top-[60%] left-[80%] w-2.5 h-2.5 bg-primary/15 rounded-full animate-float-delay" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <Button variant="ghost" asChild className="p-0 hover:bg-transparent text-muted-foreground hover:text-primary group">
              <Link href="/logs" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back to All Logs</span>
              </Link>
            </Button>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden shadow-2xl animate-fade-in-up animation-delay-200">
            {/* Edit Mode OR View Mode */}
            {isEditing ? (
              // Edit Mode
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Edit Activity Log</h2>
                  <button
                    onClick={cancelEditing}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Icon (Emoji)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedLog.icon || ""}
                        onChange={(e) => setEditedLog({...editedLog, icon: e.target.value})}
                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        maxLength={2}
                      />
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
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
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Description *</label>
                    <textarea
                      value={editedLog.description || ""}
                      onChange={(e) => setEditedLog({...editedLog, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Content (Markdown)</label>
                    <textarea
                      value={editedLog.content || ""}
                      onChange={(e) => setEditedLog({...editedLog, content: e.target.value})}
                      rows={8}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editedLog.tags) ? editedLog.tags.join(', ') : editedLog.tags || ""}
                      onChange={handleTagChange}
                      placeholder="Learning, Development, Bug Fix"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    {editedLog.tags && Array.isArray(editedLog.tags) && editedLog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {editedLog.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={saveEdit}
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-primary to-accent"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode (Original Content)
              <>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {log.tags.map((tag: string) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="px-3 py-1 text-xs font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h1 className="font-headline font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {log.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{log.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Renzcell Rick Loresco</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
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
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-card px-4 text-xs text-muted-foreground">DETAILED LOG</span>
                    </div>
                  </div>

                  <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/90 prose-li:text-foreground/90 prose-a:text-primary animate-fade-in animation-delay-400">
                    <div className="whitespace-pre-line text-base md:text-lg leading-relaxed">
                      {log.content}
                    </div>
                  </article>

                  {isLoadingImages ? (
                    <div className="mt-8 flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : uploadedImages.length > 0 && (
                    <div className="mt-8 animate-fade-in animation-delay-400">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        Attached Images ({uploadedImages.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all">
                            <img
                              src={image.url}
                              alt={image.filename}
                              className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                              onClick={() => setSelectedImage(image)}
                            />
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setSelectedImage(image)}
                                className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteImage(image.id)}
                                className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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

                <div className="border-t border-border p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          isLiked ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-muted-foreground'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          isBookmarked ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-muted-foreground'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 group">
                        <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                      
                      {/* Edit Button */}
                      <button
                        onClick={startEditing}
                        className="p-2 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                      
                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="p-2 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 group flex items-center gap-2"
                        >
                          {isUploading ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors hidden sm:inline">
                            Add Picture
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated: {log.date}
                    </div>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="mt-4 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors"
                  >
                    <p className="text-xs text-muted-foreground">
                      📷 Drag & drop an image here to upload (max 5MB)
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.filename}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-2 text-white text-sm">
                  <p>{selectedImage.filename}</p>
                  <p className="text-xs text-white/70">Uploaded: {selectedImage.timestamp}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 animate-fade-in-up animation-delay-500">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-2xl p-8 border border-primary/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="font-bold text-lg flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-2xl">📖</span>
                    Thanks for reading!
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Check out more of my daily activity logs and internship journey.
                  </p>
                </div>
                <Button asChild className="rounded-full h-12 px-8 font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Link href="/logs">
                    Explore More Logs
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
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
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(15px) translateX(5px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(8px); }
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
        .slide-in-from-bottom-4 { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}