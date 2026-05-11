"use client";

import { useState, useEffect } from 'react';
import { Project } from '@/app/lib/types';
import { getProjects } from '@/app/lib/data-service';
import { ProjectCard } from '@/components/portfolio/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, LayoutGrid } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
      setFilteredProjects(data);
      setLoading(false);
    }
    load();
  }, []);

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
        p.techStack.some(t => t.toLowerCase().includes(q))
      );
    }
    
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
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
                    ? 'bg-primary text-primary-foreground shadow-md' 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-12 text-center border border-dashed flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <LayoutGrid className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-2xl">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              </div>
              <Button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}