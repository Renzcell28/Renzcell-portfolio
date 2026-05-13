"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronRight, BookOpen, Plus, X, Save, Trash2, Filter, Search, Clock, ChevronLeft, ChevronsLeft, ChevronsRight, Briefcase, MapPin, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllLogsFromDB, saveLogToDB, deleteLogFromDB, generateSlug, ActivityLog } from '@/lib/db';

const ITEMS_PER_PAGE = 10;

export default function LogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
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
    const date = new Date(log.date);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }))];

  const [newLog, setNewLog] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
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
        const logMonth = new Date(log.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        return logMonth === selectedMonth;
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

  const handleAddLog = () => {
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
      
      // Save to database
      saveLogToDB(newEntry);
      
      // Reload logs
      loadLogs();
      
      // Reset form
      setNewLog({
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: "",
        description: "",
        content: "",
        tags: "",
        icon: "📝"
      });
      setShowForm(false);
      
      // Show success message
      alert('✅ Activity log added successfully!');
    }
  };

  const handleDeleteLog = (id: number) => {
    if (confirm('Are you sure you want to delete this activity log?')) {
      deleteLogFromDB(id);
      loadLogs();
      alert('🗑️ Activity log deleted!');
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
    setSelectedMonth("");
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen relative pb-32">
      {/* Header Section with Company Info */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
          <Briefcase className="w-3 h-3" />
          <span>OJT COMPANY</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Activity Logs
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Add, manage, and track your daily activities and accomplishments during OJT.
          </p>
        </div>

        {/* MakerSpace Innohub Company Card */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border border-primary/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 p-2">
                <img 
                  src="/Makespace.png"
                  alt="MakerSpace Innohub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-headline font-bold text-xl md:text-2xl">
                  MakerSpace Innohub
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Active
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Building the Future of Digital Business with AI & Expert Marketing. We combine Custom Software Development, 
                SEO Authority, and Business Automation to turn your vision into a market leader.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>001 Zinnia St., Nilombot, Mapandan, Pangasinan</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>OJT Period: February - May 2026</span>
                </div>
                <a 
                  href="https://www.makerspace.ph/#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors group"
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
            <p className="text-2xl font-bold text-primary">{logs.length}</p>
            <p className="text-xs text-muted-foreground">Total Logs</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
            <p className="text-2xl font-bold text-primary">{allTags.length}</p>
            <p className="text-xs text-muted-foreground">Unique Tags</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
            <p className="text-2xl font-bold text-primary">🏅</p>
            <p className="text-xs text-muted-foreground">NCII Certified</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card/50 border border-border">
            <p className="text-2xl font-bold text-primary">{totalPages}</p>
            <p className="text-xs text-muted-foreground">Total Pages</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 text-sm ${showFilters || selectedTag || selectedMonth ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-primary/50'}`}>
            <Filter className="w-4 h-4" />
            Filters
            {(selectedTag || selectedMonth) && <span className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">{(selectedTag ? 1 : 0) + (selectedMonth ? 1 : 0)}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 rounded-lg bg-card border border-border animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Filter by Tag</label>
                <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                  <option value="">All Tags</option>
                  {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Filter by Month</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                  <option value="">All Months</option>
                  {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={clearFilters} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">Clear Filters</button>
            </div>
          </div>
        )}

        {(selectedTag || selectedMonth || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && <Badge variant="secondary" className="flex items-center gap-1">Search: {searchTerm}<X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} /></Badge>}
            {selectedTag && <Badge variant="secondary" className="flex items-center gap-1 bg-primary/20">Tag: {selectedTag}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag("")} /></Badge>}
            {selectedMonth && <Badge variant="secondary" className="flex items-center gap-1">Month: {selectedMonth}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMonth("")} /></Badge>}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} activity logs</p>
      </div>

      {/* Activity Logs List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {currentLogs.length === 0 && !logs.length ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No activity logs yet</h3>
            <p className="text-muted-foreground">Click the + button to add your first activity log!</p>
          </div>
        ) : currentLogs.length === 0 && logs.length > 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No logs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">Clear all filters</button>
          </div>
        ) : (
          currentLogs.map((log) => (
            <Link key={log.id} href={`/logs/${log.slug}`} className="block group">
              <Card className="hover:shadow-md transition-all border-border/50 hover:border-primary/50 overflow-hidden cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 text-xs font-code text-muted-foreground flex-wrap">
                        <span className="text-xl">{log.icon}</span>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{log.date}</div>
                        <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />2 min read</div>
                      </div>
                      <h2 className="font-headline font-bold text-lg md:text-xl group-hover:text-primary transition-colors">
                        {log.title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{log.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {log.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 cursor-pointer hover:bg-primary/20 transition-colors" onClick={(e) => { e.preventDefault(); setSelectedTag(tag); }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.preventDefault(); handleDeleteLog(log.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-8 flex justify-center items-center gap-2">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-border hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-border hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return (
                <button key={pageNum} onClick={() => goToPage(pageNum)} className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === pageNum ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-border hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-border hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      )}

      {/* Floating Action Button */}
<div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
  {!showForm ? (
    <button 
      onClick={() => setShowForm(true)} 
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
    >
      <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
      <span className="absolute right-full mr-3 px-2 py-1 text-xs bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
        Add Activity Log
      </span>
    </button>
  ) : (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={() => setShowForm(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 bottom-0 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl border border-border w-auto sm:w-[500px] max-h-[90vh] overflow-y-auto z-50 animate-slide-up">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 sm:p-5 flex justify-between items-center">
          <h3 className="font-bold text-base sm:text-lg">Add Activity Log</h3>
          <button 
            onClick={() => setShowForm(false)} 
            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <div className="p-4 sm:p-5">
          <div className="space-y-4 sm:space-y-3">
            {/* Date Picker */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Date</label>
              <input 
                type="date" 
                onChange={(e) => { 
                  const selectedDate = new Date(e.target.value); 
                  const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); 
                  setNewLog({...newLog, date: formattedDate}); 
                }} 
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>

            {/* Icon Picker */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Icon (Emoji)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="📝" 
                  value={newLog.icon} 
                  onChange={(e) => setNewLog({...newLog, icon: e.target.value})} 
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
                  maxLength={2} 
                />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                  {newLog.icon || "📝"}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter title" 
                value={newLog.title} 
                onChange={(e) => setNewLog({...newLog, title: e.target.value})} 
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                placeholder="Enter short description" 
                value={newLog.description} 
                onChange={(e) => setNewLog({...newLog, description: e.target.value})} 
                rows={2} 
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" 
              />
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground">
                  {newLog.description.length} / 500 characters
                </span>
              </div>
            </div>

            {/* Full Content */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Full Content (Markdown)</label>
              <div className="relative">
                <textarea 
                  placeholder="Enter detailed content in markdown... Use ## for headings, - for lists, etc." 
                  value={newLog.content} 
                  onChange={(e) => setNewLog({...newLog, content: e.target.value})} 
                  rows={5} 
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y font-mono" 
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                  Markdown supported
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Tags (comma separated)</label>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Learning, Development, Bug Fix" 
                  value={newLog.tags} 
                  onChange={(e) => setNewLog({...newLog, tags: e.target.value})} 
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
                />
                {newLog.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {newLog.tags.split(',').map((tag, i) => tag.trim() && (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button 
              onClick={handleAddLog} 
              disabled={!newLog.title || !newLog.description} 
              className="w-full mt-3 sm:mt-4 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white text-sm sm:text-base font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              Save Activity Log
            </button>

            {/* Cancel Button on Mobile */}
            <button 
              onClick={() => setShowForm(false)} 
              className="w-full mt-2 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-secondary/50 transition-colors sm:hidden"
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
      `}</style>
    </div>
  );
}