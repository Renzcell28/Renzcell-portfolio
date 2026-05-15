"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, LayoutGrid, Plus, X, Save, Trash2, Upload, Edit, ExternalLink, Github } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  image: string;
  gallery: string[];
  fullDetails: string;
  projectLink: string;
  githubLink: string;
  featured: boolean;
  date: string;
}

interface NewProject {
  title: string;
  description: string;
  category: string;
  techStack: string;
  fullDetails: string;
  projectLink: string;
  githubLink: string;
  images: File[];
  imagePreviews: string[];
}

// Default placeholder image
const DEFAULT_PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23333333'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%23999999' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// Helper function to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [newProject, setNewProject] = useState<NewProject>({
    title: "",
    description: "",
    category: "",
    techStack: "",
    fullDetails: "",
    projectLink: "",
    githubLink: "",
    images: [],
    imagePreviews: []
  });

  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
    setCategories(['All', ...uniqueCategories]);
  }, [projects]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const storedProjects = localStorage.getItem('projects');
      let loadedProjects: Project[] = [];
      
      if (storedProjects) {
        loadedProjects = JSON.parse(storedProjects);
        loadedProjects = loadedProjects.map(p => ({
          ...p,
          image: (p.image && p.image.trim() !== '') ? p.image : DEFAULT_PLACEHOLDER_IMAGE,
          gallery: p.gallery || []
        }));
      } else {
        // Add some sample data for testing
        loadedProjects = [];
        localStorage.setItem('projects', JSON.stringify([]));
      }
      
      setProjects(loadedProjects);
      setFilteredProjects(loadedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = projects;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      );
    }
    
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

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
      validPreviews.push(URL.createObjectURL(file));
    }

    setNewProject(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles],
      imagePreviews: [...prev.imagePreviews, ...validPreviews]
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(newProject.imagePreviews[index]);
    setNewProject(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const convertImagesToBase64 = async (files: File[]): Promise<string[]> => {
    const base64Images: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      try {
        const base64 = await fileToBase64(file);
        base64Images.push(base64);
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      } catch (error) {
        console.error(`Error converting ${file.name}:`, error);
        setUploadProgress(prev => ({ ...prev, [file.name]: -1 }));
      }
    }
    
    return base64Images;
  };

  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    const validatedProjects = updatedProjects.map(p => ({
      ...p,
      image: (p.image && p.image.trim() !== '') ? p.image : DEFAULT_PLACEHOLDER_IMAGE,
      gallery: p.gallery || []
    }));
    localStorage.setItem('projects', JSON.stringify(validatedProjects));
    setProjects(validatedProjects);
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.category) {
      alert('Please fill in title, description, and category');
      return;
    }

    setIsSubmitting(true);

    try {
      const base64Images = await convertImagesToBase64(newProject.images);
      
      const techStackArray = newProject.techStack.split(',').map(t => t.trim()).filter(t => t);
      
      const existingProjects = localStorage.getItem('projects');
      const allProjects: Project[] = existingProjects ? JSON.parse(existingProjects) : [];
      
      const newId = allProjects.length > 0 ? Math.max(...allProjects.map(p => p.id)) + 1 : 1;
      
      const newProjectData: Project = {
        id: newId,
        title: newProject.title,
        description: newProject.description,
        category: newProject.category,
        techStack: techStackArray,
        image: base64Images.length > 0 ? base64Images[0] : DEFAULT_PLACEHOLDER_IMAGE,
        gallery: base64Images,
        fullDetails: newProject.fullDetails || newProject.description,
        projectLink: newProject.projectLink,
        githubLink: newProject.githubLink,
        featured: false,
        date: new Date().toISOString().split('T')[0]
      };
      
      allProjects.push(newProjectData);
      saveProjectsToStorage(allProjects);
      
      resetForm();
      setShowForm(false);
      showToast('✅ Project added successfully!');
      
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress({}), 3000);
    }
  };

  const handleEditProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      category: project.category,
      techStack: project.techStack?.join(', ') || '',
      fullDetails: project.fullDetails || '',
      projectLink: project.projectLink || '',
      githubLink: project.githubLink || '',
      images: [],
      imagePreviews: []
    });
    setShowForm(true);
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    if (!newProject.title || !newProject.description || !newProject.category) {
      alert('Please fill in title, description, and category');
      return;
    }

    setIsSubmitting(true);

    try {
      let base64Images: string[] = [];
      if (newProject.images.length > 0) {
        base64Images = await convertImagesToBase64(newProject.images);
      }
      
      const techStackArray = newProject.techStack.split(',').map(t => t.trim()).filter(t => t);
      
      const existingProjects = localStorage.getItem('projects');
      const allProjects: Project[] = existingProjects ? JSON.parse(existingProjects) : [];
      
      const updatedProjects = allProjects.map(p => {
        if (p.id === editingProject.id) {
          const existingGallery = p.gallery || [];
          const newGallery = base64Images.length > 0 ? [...existingGallery, ...base64Images] : existingGallery;
          const newImage = base64Images.length > 0 ? base64Images[0] : p.image;
          
          return {
            ...p,
            title: newProject.title,
            description: newProject.description,
            category: newProject.category,
            techStack: techStackArray,
            fullDetails: newProject.fullDetails || newProject.description,
            projectLink: newProject.projectLink,
            githubLink: newProject.githubLink,
            gallery: newGallery,
            image: (newImage && newImage.trim() !== '') ? newImage : DEFAULT_PLACEHOLDER_IMAGE,
            date: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      });
      
      saveProjectsToStorage(updatedProjects);
      resetForm();
      setEditingProject(null);
      setShowForm(false);
      showToast('✅ Project updated successfully!');
      
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress({}), 3000);
    }
  };

  const handleDeleteProject = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('⚠️ Are you sure you want to permanently delete this project?')) {
      const existingProjects = localStorage.getItem('projects');
      const allProjects = existingProjects ? JSON.parse(existingProjects) : [];
      const updatedProjects = allProjects.filter((p: Project) => p.id !== id);
      saveProjectsToStorage(updatedProjects);
      showToast('🗑️ Project deleted permanently!');
    }
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const resetForm = () => {
    newProject.imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    setNewProject({
      title: "",
      description: "",
      category: "",
      techStack: "",
      fullDetails: "",
      projectLink: "",
      githubLink: "",
      images: [],
      imagePreviews: []
    });
    setEditingProject(null);
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Custom Project Card Component
  const CustomProjectCard = ({ project }: { project: Project }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-red-500/50 transition-all duration-300 hover:shadow-xl group">
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          {!imgError ? (
            <img 
              src={project.image || DEFAULT_PLACEHOLDER_IMAGE} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center">
                <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Image not available</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">
              {project.category}
            </Badge>
            {project.date && (
              <span className="text-xs text-muted-foreground">{project.date}</span>
            )}
          </div>
          <h3 className="font-bold text-xl mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={() => handleViewProject(project)}
          >
            View Details →
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen relative pb-32">
      <div className="max-w-4xl mx-auto mb-16 space-y-6">
        <h1 className="font-headline font-black text-5xl md:text-6xl tracking-tight">Work Gallery</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          A modular collection of projects, audits, and technical solutions completed during my internship.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Search & Filter Toolbar */}
        <div className="w-full lg:w-1/4 space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Find a project..." 
                className="pl-10 h-11 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Categories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left min-h-[44px] ${
                    activeCategory === cat 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-card hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="relative group">
                  <CustomProjectCard project={project} />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => handleEditProject(project, e)}
                      className="p-2 rounded-lg bg-blue-500/80 hover:bg-blue-600 text-white backdrop-blur-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-12 text-center border border-dashed flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <LayoutGrid className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-2xl">No projects yet</h3>
                <p className="text-muted-foreground">Click the + button to add your first project.</p>
              </div>
              <Button onClick={() => { setShowForm(true); resetForm(); }} variant="default" className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button & Form Modal */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        {!showForm ? (
          <button 
            onClick={() => { resetForm(); setShowForm(true); }} 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        ) : (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => { setShowForm(false); resetForm(); }}
            />
            
            <div className="fixed inset-x-4 bottom-0 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl border border-red-500/20 w-auto sm:w-[550px] max-h-[90vh] overflow-y-auto z-50">
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-red-500/20 p-4 sm:p-5 flex justify-between items-center">
                <h3 className="font-bold text-base sm:text-lg">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="p-4 sm:p-5">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., E-Commerce Platform" 
                      value={newProject.title} 
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1" 
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Web Development, Mobile App, etc."
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      placeholder="Brief description of the project..." 
                      value={newProject.description} 
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})} 
                      rows={2} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1 resize-none" 
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="React, Node.js, MongoDB" 
                      value={newProject.techStack} 
                      onChange={(e) => setNewProject({...newProject, techStack: e.target.value})} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1" 
                    />
                  </div>

                  {/* Full Details */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Details</label>
                    <textarea 
                      placeholder="Detailed description of the project..." 
                      value={newProject.fullDetails} 
                      onChange={(e) => setNewProject({...newProject, fullDetails: e.target.value})} 
                      rows={3} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1 resize-y" 
                    />
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Live Project URL</label>
                    <input 
                      type="url" 
                      placeholder="https://example.com" 
                      value={newProject.projectLink} 
                      onChange={(e) => setNewProject({...newProject, projectLink: e.target.value})} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1" 
                    />
                  </div>

                  {/* GitHub Link */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GitHub URL</label>
                    <input 
                      type="url" 
                      placeholder="https://github.com/username/project" 
                      value={newProject.githubLink} 
                      onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})} 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50 mt-1" 
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Project Images</label>
                    <div className="flex items-center gap-3 mt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-red-500/50 hover:border-red-500 hover:bg-red-500/5 transition-all"
                      >
                        <Upload className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">Select Images</span>
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {newProject.images.length} file(s) selected
                      </span>
                    </div>

                    {newProject.imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {newProject.imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {Object.keys(uploadProgress).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(uploadProgress).map(([filename, progress]) => (
                          <div key={filename} className="bg-secondary/20 rounded p-1">
                            <div className="flex justify-between text-xs">
                              <span className="truncate">{filename}</span>
                              <span>{progress === 100 ? '✓' : progress === -1 ? '✗' : `${progress}%`}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    onClick={editingProject ? handleUpdateProject : handleAddProject} 
                    disabled={!newProject.title || !newProject.description || !newProject.category || isSubmitting} 
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-lg text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {editingProject ? 'Updating...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Project Detail Modal */}
      {showDetailModal && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailModal(false)}
        >
          <div className="relative bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm p-4 border-b border-red-500/20 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-full hover:bg-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {selectedProject.image && selectedProject.image !== DEFAULT_PLACEHOLDER_IMAGE && (
                <div className="mb-4">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <Badge className="bg-red-500/20 text-red-500">{selectedProject.category}</Badge>
                {selectedProject.date && (
                  <span className="text-xs text-muted-foreground ml-2">{selectedProject.date}</span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
              
              {selectedProject.fullDetails && selectedProject.fullDetails !== selectedProject.description && (
                <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Details</h3>
                  <p className="text-sm whitespace-pre-wrap">{selectedProject.fullDetails}</p>
                </div>
              )}
              
              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {(selectedProject.projectLink || selectedProject.githubLink) && (
                <div className="mt-4 flex gap-3">
                  {selectedProject.projectLink && (
                    <a href={selectedProject.projectLink} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline text-sm flex items-center gap-1">
                      Live Project <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline text-sm flex items-center gap-1">
                      GitHub <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
              
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Gallery ({selectedProject.gallery.length} images)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.gallery.map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt={`Project ${i + 1}`} 
                        className="rounded-lg w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_PLACEHOLDER_IMAGE;
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}