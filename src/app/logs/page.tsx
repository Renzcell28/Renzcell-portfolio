"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronRight, BookOpen, Plus, X, Save, Trash2, Filter, Search, Clock, ChevronLeft, ChevronsLeft, ChevronsRight, Briefcase, MapPin, CalendarDays, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllLogsFromDB, saveLogToDB, deleteLogFromDB, generateSlug, ActivityLog, addImageToLog } from '@/lib/db';

const ITEMS_PER_PAGE = 10;

// Helper function to format date for input (YYYY-MM-DD)
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format date for display (Month Day, Year)
const formatDateForDisplay = (year: number, month: number, day: number): string => {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function LogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Image upload states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get today's date in YYYY-MM-DD format for the date picker default
  const today = new Date();
  const defaultDateValue = formatDateForInput(today);
  const defaultFormattedDate = formatDateForDisplay(today.getFullYear(), today.getMonth() + 1, today.getDate());
  
  // Load logs from localStorage on mount
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const loadedLogs = getAllLogsFromDB();
    setLogs(loadedLogs);
    setFilteredLogs(loadedLogs);
  };

  const allTags = [...new Set(logs.flatMap(log => log.tags))];
  
  const months = [...new Set(logs.map(log => {
    const match = log.date.match(/(\w+) (\d+), (\d+)/);
    if (match) {
      return `${match[1]} ${match[3]}`;
    }
    return '';
  }))];

  const [newLog, setNewLog] = useState({
    dateValue: defaultDateValue,
    date: defaultFormattedDate,
    title: "",
    description: "",
    content: "",
    tags: "",
    icon: "📝"
  });

  useEffect(() => {
    let filtered = [...logs];
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedTag) {
      filtered = filtered.filter(log => log.tags.includes(selectedTag));
    }
    if (selectedMonth) {
      filtered = filtered.filter(log => {
        const match = log.date.match(/(\w+) (\d+), (\d+)/);
        if (match) {
          return `${match[1]} ${match[3]}` === selectedMonth;
        }
        return false;
      });
    }
    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, selectedTag, selectedMonth]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const [year, month, day] = dateValue.split('-').map(Number);
      const formattedDate = formatDateForDisplay(year, month, day);
      setNewLog({...newLog, dateValue, date: formattedDate});
    }
  };

  // Handle image selection
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

    setSelectedImages(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...validPreviews]);
  };

  // Remove image from selection
  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Upload images to Cloudinary
  const uploadImages = async (slug: string): Promise<boolean> => {
    if (selectedImages.length === 0) return true;

    setIsUploadingImages(true);
    let allSuccess = true;

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
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
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setUploadProgress(prev => ({ ...prev, [file.name]: -1 }));
        allSuccess = false;
      }
    }

    setIsUploadingImages(false);
    setTimeout(() => setUploadProgress({}), 3000);
    
    return allSuccess;
  };

  const handleAddLog = async () => {
    if (newLog.title && newLog.description) {
      const newId = Date.now();
      const slug = generateSlug(newLog.title);
      const newEntry: ActivityLog = {
        id: newId,
        slug: slug,
        date: newLog.date,
        title: newLog.title,
        description: newLog.description,
        content: newLog.content || `## ${newLog.title}\n\n${newLog.description}`,
        tags: newLog.tags.split(',').map(tag => tag.trim()),
        icon: newLog.icon || "📝"
      };
      
      // Save log to database
      saveLogToDB(newEntry);
      
      // Upload images if any
      if (selectedImages.length > 0) {
        await uploadImages(slug);
      }
      
      // Reload logs
      loadLogs();
      
      // Clean up preview URLs
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      
      // Reset form
      setNewLog({
        dateValue: defaultDateValue,
        date: defaultFormattedDate,
        title: "",
        description: "",
        content: "",
        tags: "",
        icon: "📝"
      });
      setSelectedImages([]);
      setImagePreviews([]);
      setShowForm(false);
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = `✅ Activity log added successfully! ${selectedImages.length > 0 ? `(${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} uploaded)` : ''}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleDeleteLog = (id: number) => {
    if (confirm('Are you sure you want to delete this activity log?')) {
      deleteLogFromDB(id);
      loadLogs();
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4';
      toast.textContent = '🗑️ Activity log deleted!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
    setSelectedMonth("");
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen relative pb-32 bg-black">
      {/* Header Section with Company Info - Red Theme */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-2">
          <Briefcase className="w-3 h-3" />
          <span>OJT COMPANY</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">
            Activity Logs
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Add, manage, and track your daily activities and accomplishments during OJT.
          </p>
        </div>

        {/* MakerSpace Innohub Company Card - Red Theme */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-red-500/5 via-red-600/5 to-transparent border border-red-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-800 flex items-center justify-center shadow-md border border-gray-700 p-2">
                <img 
                  src="/Makespace.png"
                  alt="MakerSpace Innohub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-headline font-bold text-xl md:text-2xl text-white">
                  MakerSpace Innohub
                </h2>
                <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                  Active
                </Badge>
              </div>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Building the Future of Digital Business with AI & Expert Marketing. We combine Custom Software Development, 
                SEO Authority, and Business Automation to turn your vision into a market leader.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>001 Zinnia St., Nilombot, Mapandan, Pangasinan</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>OJT Period: February - May 2026</span>
                </div>
                <a 
                  href="https://www.makerspace.ph/#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 transition-colors group"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="group-hover:underline">makerspace.ph</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Red Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{logs.length}</p>
            <p className="text-xs text-gray-500">Total Logs</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{allTags.length}</p>
            <p className="text-xs text-gray-500">Unique Tags</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">🏅</p>
            <p className="text-xs text-gray-500">NCII Certified</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{totalPages}</p>
            <p className="text-xs text-gray-500">Total Pages</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar - Red Theme */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white"
              />
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 text-sm ${showFilters || selectedTag || selectedMonth ? 'bg-red-500 text-white border-red-500' : 'bg-gray-900 border-gray-800 hover:border-red-500/50'}`}>
            <Filter className="w-4 h-4" />
            Filters
            {(selectedTag || selectedMonth) && <span className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">{(selectedTag ? 1 : 0) + (selectedMonth ? 1 : 0)}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 rounded-lg bg-gray-900 border border-gray-800 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-2 block">Filter by Tag</label>
                <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white">
                  <option value="">All Tags</option>
                  {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-2 block">Filter by Month</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white">
                  <option value="">All Months</option>
                  {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={clearFilters} className="px-3 py-1.5 text-sm text-gray-500 hover:text-white transition-colors">Clear Filters</button>
            </div>
          </div>
        )}

        {(selectedTag || selectedMonth || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800">Search: {searchTerm}<X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} /></Badge>}
            {selectedTag && <Badge variant="secondary" className="flex items-center gap-1 bg-red-500/20 text-red-400">Tag: {selectedTag}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag("")} /></Badge>}
            {selectedMonth && <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800">Month: {selectedMonth}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMonth("")} /></Badge>}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">Showing {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} activity logs</p>
      </div>

      {/* Activity Logs List - Red Theme */}
      <div className="max-w-4xl mx-auto space-y-4">
        {currentLogs.length === 0 && !logs.length ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2 text-white">No activity logs yet</h3>
            <p className="text-gray-500">Click the + button to add your first activity log!</p>
          </div>
        ) : currentLogs.length === 0 && logs.length > 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-white">No logs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400">Clear all filters</button>
          </div>
        ) : (
          currentLogs.map((log) => (
            <Link key={log.id} href={`/logs/${log.slug}`} className="block group">
              <Card className="hover:shadow-md transition-all border-gray-800 hover:border-red-500/50 overflow-hidden cursor-pointer bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 text-xs font-code text-gray-500 flex-wrap">
                        <span className="text-xl">{log.icon}</span>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-red-400" />{log.date}</div>
                        <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-red-400" />2 min read</div>
                      </div>
                      <h2 className="font-headline font-bold text-lg md:text-xl group-hover:text-red-500 transition-colors text-white">
                        {log.title}
                      </h2>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{log.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {log.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 cursor-pointer hover:bg-red-500/20 transition-colors bg-red-500/10 text-red-400" onClick={(e) => { e.preventDefault(); setSelectedTag(tag); }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.preventDefault(); handleDeleteLog(log.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-900/30 text-red-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-red-500/5 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls - Red Theme */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-8 flex justify-center items-center gap-2">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return (
                <button key={pageNum} onClick={() => goToPage(pageNum)} className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === pageNum ? 'bg-red-500 text-white border-red-500' : 'border-gray-800 hover:border-red-500/50'}`}>
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      )}

      {/* Floating Action Button with Image Upload - Red Theme */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)} 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span className="absolute right-full mr-3 px-2 py-1 text-xs bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              Add Activity Log
            </span>
          </button>
        ) : (
          <>
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
              onClick={() => setShowForm(false)}
            />
            
            <div className="fixed inset-x-4 bottom-0 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-red-500/20 w-auto sm:w-[550px] max-h-[90vh] overflow-y-auto z-50 animate-slide-up">
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-red-500/20 p-4 sm:p-5 flex justify-between items-center">
                <h3 className="font-bold text-base sm:text-lg text-white">Add Activity Log</h3>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-full hover:bg-gray-800 transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="p-4 sm:p-5">
                <div className="space-y-4 sm:space-y-3">
                  {/* Date Picker */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Date
                    </label>
                    <input 
                      type="date" 
                      value={newLog.dateValue}
                      onChange={handleDateChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white" 
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      Selected: {newLog.date}
                    </p>
                  </div>

                  {/* Icon Picker */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">Icon (Emoji)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="📝" 
                        value={newLog.icon} 
                        onChange={(e) => setNewLog({...newLog, icon: e.target.value})} 
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white" 
                        maxLength={2} 
                      />
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-2xl">
                        {newLog.icon || "📝"}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter title" 
                      value={newLog.title} 
                      onChange={(e) => setNewLog({...newLog, title: e.target.value})} 
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white" 
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      placeholder="Enter short description" 
                      value={newLog.description} 
                      onChange={(e) => setNewLog({...newLog, description: e.target.value})} 
                      rows={2} 
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm resize-none text-white" 
                    />
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500">
                        {newLog.description.length} / 500 characters
                      </span>
                    </div>
                  </div>

                  {/* Full Content */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">Full Content (Markdown)</label>
                    <div className="relative">
                      <textarea 
                        placeholder="Enter detailed content in markdown... Use ## for headings, - for lists, etc." 
                        value={newLog.content} 
                        onChange={(e) => setNewLog({...newLog, content: e.target.value})} 
                        rows={5} 
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm resize-y font-mono text-white" 
                      />
                      <div className="absolute bottom-2 right-2 text-[10px] text-gray-500">
                        Markdown supported
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">Tags (comma separated)</label>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Learning, Development, Bug Fix" 
                        value={newLog.tags} 
                        onChange={(e) => setNewLog({...newLog, tags: e.target.value})} 
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white" 
                      />
                      {newLog.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {newLog.tags.split(',').map((tag, i) => tag.trim() && (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-400">Upload Images (Optional)</label>
                    
                    <div className="flex items-center gap-3">
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
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-red-500/50 hover:border-red-500 hover:bg-red-500/5 transition-all duration-300"
                      >
                        <Upload className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">Select Images</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        {selectedImages.length} file{selectedImages.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border border-gray-800"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Progress */}
                    {Object.keys(uploadProgress).length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {Object.entries(uploadProgress).map(([filename, progress]) => (
                          <div key={filename} className="bg-gray-800/20 rounded p-1.5">
                            <div className="flex justify-between text-xs mb-0.5">
                              <span className="truncate text-[10px] text-gray-400">{filename}</span>
                              <span className="text-[10px] text-gray-400">{progress === 100 ? '✓' : progress === -1 ? '✗' : `${progress}%`}</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  progress === 100 ? 'bg-red-500' : progress === -1 ? 'bg-red-700' : 'bg-red-500'
                                }`}
                                style={{ width: `${progress === -1 ? 100 : progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Save Button - Red Theme */}
                  <button 
                    onClick={handleAddLog} 
                    disabled={!newLog.title || !newLog.description || isUploadingImages} 
                    className="w-full mt-3 sm:mt-4 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white text-sm sm:text-base font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isUploadingImages ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading images...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        Save Activity Log
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => setShowForm(false)} 
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-800 text-gray-500 text-sm font-medium hover:bg-gray-800/50 transition-colors sm:hidden"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-top {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: slide-in 0.3s ease-out; }
        .slide-in-from-top-2 { animation: slide-in-top 0.3s ease-out; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        @media (min-width: 640px) {
          .animate-slide-up { animation: none; }
        }
      `}</style>
    </div>
  );
}