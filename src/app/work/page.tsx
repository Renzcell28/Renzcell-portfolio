"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, LayoutGrid, X, ExternalLink, Github, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  myTasks: string[];
}

// Hardcoded projects
const HARDCODED_PROJECTS: Project[] = [
  {
    id: 1,
    title: "SyncSnap",
    description: "SyncSnap is a multi-tenant asynchronous daily standup and team collaboration system designed to help teams manage updates, track progress, and surface blockers in a more efficient and structured way.",
    category: "Web Development",
    techStack: ["Laravel", "React", "PostgreSQL"],
    image: "/SyncSnap/Screenshot (425).png",
    gallery: [
      "/SyncSnap/Screenshot (133).png",
      "/SyncSnap/Screenshot (132).png",
      "/SyncSnap/Screenshot (131).png",
      "/SyncSnap/Screenshot (130).png",
      "/SyncSnap/Screenshot (129).png",
      "/SyncSnap/Screenshot (128).png",
      "/SyncSnap/Screenshot (127).png",
      "/SyncSnap/Screenshot (126).png",
      "/SyncSnap/Screenshot (125).png",
      "/SyncSnap/Screenshot (124).png",
      "/SyncSnap/Screenshot (123).png",
      "/SyncSnap/Screenshot (122).png",
      "/SyncSnap/Screenshot (121).png",
      "/SyncSnap/Screenshot (117).png",
      "/SyncSnap/Screenshot (116).png",
      "/SyncSnap/Screenshot (115).png",
      "/SyncSnap/Screenshot (99).png",
      "/SyncSnap/Screenshot (98).png",
      "/SyncSnap/Screenshot (97).png",
      "/SyncSnap/Screenshot (95).png",
      "/SyncSnap/Screenshot (93).png",
      "/SyncSnap/Screenshot (92).png",
      "/SyncSnap/Screenshot (90).png",
      "/SyncSnap/Screenshot (89).png",
      "/SyncSnap/Screenshot (88).png",
      "/SyncSnap/Screenshot (87).png",
      "/SyncSnap/Screenshot (86).png",
      "/SyncSnap/Screenshot (85).png"
    ],
    fullDetails: `SyncSnap is a multi-tenant asynchronous daily standup and team collaboration system designed to help teams manage updates, track progress, and surface blockers in a more efficient and structured way. Instead of relying on traditional live standup meetings, SyncSnap allows team members to submit their daily updates anytime before a set deadline, while still keeping the whole team aligned through a centralized dashboard and real-time visibility features.

The system enables Team Leads or Scrum Masters to create dedicated workspaces where members join using a secure invite code. Once inside, users can quickly submit their daily standup (Yesterday, Today, Blockers), which is automatically organized and displayed in a team dashboard. Blockers are highlighted and prioritized so managers can immediately identify and resolve issues without waiting for meetings.

SyncSnap also introduces productivity-focused features such as gamification through streak tracking, early submission rewards, and leaderboards to encourage consistency. With real-time updates, structured reporting, and multi-team support, SyncSnap helps teams stay connected, improve accountability, and maintain productivity while eliminating the need for repetitive daily meetings.`,
    projectLink: "",
    githubLink: "",
    featured: true,
    date: "2026",
    myTasks: [
      "System Planning & Requirements - Reviewed and analyzed the SyncSnap Product Requirements Document (PRD). Defined core system flow for workspace, standup submission, and dashboard structure. Planned multi-tenant architecture for separating teams and ensuring data isolation.",
      "Workspace & Invite System - Designed workspace creation flow for Team Leads/Admins. Implemented invite code-based joining system for team members. Ensured secure workspace-to-user association.",
      "Standup System Development - Built structure for daily standup submission (Yesterday, Today, Blockers). Implemented validation for one submission per user per workspace per day. Designed timestamp handling for accurate daily tracking.",
      "Team Dashboard (Daily Snap) - Developed dashboard structure to display all team submissions. Implemented blocker highlighting and prioritization at the top of the feed. Added logic for showing submitted vs missing users per day.",
      "AI Integration (Gemini System) - Integrated Google Gemini AI to enhance standup data processing and insights. Used AI to generate summaries from team standup submissions. Improved readability of blockers and progress reports using AI-generated insights. Supported smarter decision-making by transforming raw updates into structured summaries.",
      "Gamification Features - Implemented daily streak tracking system for continuous submissions. Added early bird bonus logic for submissions before deadline time. Designed leaderboard concept for tracking top consistent users.",
      "Real-Time & Collaboration Features - Integrated real-time updates for standup submissions and dashboard refresh. Ensured live visibility of blockers and updates without page reload. Improved team synchronization across workspace activities.",
      "UI/UX Structure - Designed clean and simple standup form layout for fast input. Planned mobile-first UI for quick daily usage. Ensured distraction-free dashboard design for better readability.",
      "Authentication & Data Handling - Structured user authentication flow for workspace access. Linked users correctly to their respective workspace data. Ensured secure handling of submissions and identity mapping.",
      "Performance & System Logic - Designed efficient querying for daily dashboard aggregation. Optimized real-time updates for scalability and responsiveness. Ensured proper timezone handling for accurate 'today' calculations."
    ]
  },
  {
    id: 2,
    title: "FlowState",
    description: "A system update for Flowstate focused on improving sidebar interactions, modal positioning, sprint planning features, and AI-assisted task management. These updates enhance usability, real-time synchronization, and intelligent workload balancing across the platform.",
    category: "Web Development",
    techStack: ["Next.js", "MongoDB"],
    image: "/Flowstate/Screenshot (381).png",
    gallery: [
      "/Flowstate/Screenshot (237).png",
      "/Flowstate/Screenshot (239).png",
      "/Flowstate/Screenshot (241).png",
      "/Flowstate/Screenshot (243).png",
      "/Flowstate/Screenshot (242).png",
      "/Flowstate/Screenshot (244).png",
      "/Flowstate/Screenshot (245).png",
      "/Flowstate/Screenshot (280).png",
      "/Flowstate/Screenshot (315).png",
      "/Flowstate/Screenshot (316).png",
      "/Flowstate/Screenshot (318).png",
      "/Flowstate/Screenshot (319).png",
      "/Flowstate/Screenshot (320).png",
      "/Flowstate/Screenshot (325).png",
      "/Flowstate/Screenshot (331).png",
      "/Flowstate/Screenshot (332).png",
      "/Flowstate/Screenshot (338).png",
      "/Flowstate/Screenshot (339).png",
      "/Flowstate/Screenshot (340).png",
      "/Flowstate/Screenshot (342).png",
      "/Flowstate/Screenshot (343).png",
      "/Flowstate/Screenshot (344).png",
      "/Flowstate/Screenshot (345).png",
      "/Flowstate/Screenshot (508).png",
      "/Flowstate/Screenshot (507).png",
      "/Flowstate/Screenshot (506).png",
      "/Flowstate/Screenshot (505).png",
      "/Flowstate/Screenshot (504).png",
      "/Flowstate/Screenshot (503).png",
      "/Flowstate/Screenshot (502).png",
      "/Flowstate/Screenshot (501).png",
      "/Flowstate/Screenshot (500).png",
      "/Flowstate/Screenshot (499).png",
      "/Flowstate/Screenshot (498).png",
      "/Flowstate/Screenshot (496).png"
    ],
    fullDetails: `FlowState is a unified AI-powered project management and team collaboration system designed to replace fragmented tools like chat apps, spreadsheets, and manual tracking with a single structured platform that manages tasks, workflows, and communication in real time. It helps teams eliminate lost tasks and unnoticed blockers by providing clear visibility of work progress, structured daily updates, and centralized dashboards for managers and team members.

The system is built to support a "Simplicity First" approach, starting with essential features like task logging, time tracking, and blocker monitoring, then gradually evolving into advanced capabilities such as multi-team management, asynchronous standups, and automated workflow organization. As it matures, FlowState introduces AI-driven features that generate summaries, predict risks like missed deadlines or burnout, and optimize task prioritization and sprint planning.

Overall, FlowState aims to improve productivity, accountability, and collaboration by combining real-time system updates, intuitive user experience, and intelligent automation into a scalable platform that grows from basic workflow tracking into a powerful AI-assisted project management ecosystem.`,
    projectLink: "",
    githubLink: "",
    featured: true,
    date: "2026",
    myTasks: [
      "UI/UX & Navigation Improvements - Improved collapsed sidebar interactions with workspace hover tooltips ('Switch Workspace', 'Select a team to continue'). Added navigation icon tooltips in collapsed mode without affecting layout or sidebar width. Fixed Create Team and Join Team modals to stay centered using portal rendering.",
      "Task & Priority System - Added 'View Priority Tasks' button in My Tasks tab to display REGULAR TASKS – BY PRIORITY table with filters (Today, This Week, This Month). Added 'Blocker Priority' button in Live Blockers tab with workstream and deadline filtering.",
      "Sprint Planner Enhancements - Improved Sprint Planner with workload balancing and task ordering by urgency. Integrated Google Gemini AI for intelligent workload balancing and blocker resolution suggestions.",
      "System Synchronization Fixes - Fixed sidebar team switching synchronization across AI Insights and Team Activity pages."
    ]
  },
  {
    id: 3,
    title: "Base Platform & FurFund",
    description: "A development and learning phase focused on exploring the Base blockchain platform and setting up the required development environment using Vercel, while also building the initial prototype of FurFund, a project designed to establish a foundation for future blockchain-based features and enhancements.",
    category: "Web Development",
    techStack: ["Next.js"],
    image: "/FurFand/Screenshot (149).png",
    gallery: [
      "/FurFand/Screenshot (141).png",
      "/FurFand/Screenshot (142).png",
      "/FurFand/Screenshot (143).png",
      "/FurFand/Screenshot (144).png",
      "/FurFand/Screenshot (145).png",
      "/FurFand/Screenshot (146).png",
      "/FurFand/Screenshot (147).png",
      "/FurFand/Screenshot (150).png",
      "/FurFand/Screenshot (152).png",
      "/FurFand/Screenshot (153).png",
      "/FurFand/Screenshot (154).png",
      "/FurFand/Screenshot (155).png",
      "/FurFand/Screenshot (156).png",
      "/FurFand/Screenshot (160).png",
      "/FurFand/Screenshot (159).png",
      "/FurFand/Screenshot (161).png",
      "/FurFand/Screenshot (162).png",
      "/FurFand/Screenshot (164).png",
      "/FurFand/Screenshot (165).png",
      "/FurFand/Screenshot (166).png",
      "/FurFand/Screenshot (167).png",
      "/FurFand/Screenshot (168).png",
      "/FurFand/Screenshot (169).png",
      "/FurFand/Screenshot (170).png",
      "/FurFand/Screenshot (173).png"
    ],
    fullDetails: `This focus area covers both learning and practical implementation, starting with understanding the Base platform ecosystem and preparing the necessary tools for development and deployment. The setup includes creating accounts and configuring environments on Base App and Vercel, ensuring readiness for future blockchain integration, smart contract development, and decentralized application deployment.

Alongside the learning phase, the initial version of FurFund was developed as a prototype project. This step involved creating the first structure of the system, defining its base architecture, and establishing a starting point for future improvements. The prototype serves as a foundation for upcoming features, allowing the project to grow into a more complete and functional application over time.

Overall, this phase combines platform learning, environment setup, and early-stage project development, ensuring both technical readiness and a solid foundation for continued expansion of FurFund.`,
    projectLink: "",
    githubLink: "",
    featured: true,
    date: "2026",
    myTasks: [
      "Base Platform Learning & Setup - Learned the basics of the Base platform and its ecosystem for blockchain development. Successfully set up accounts on Base App and Vercel for deployment and development readiness. Prepared the initial development environment to support future blockchain-based features and integrations.",
      "FurFund Prototype Development - Built the initial prototype of FurFund, establishing the first working structure of the project. Defined the foundational layout and system flow for future feature expansion. Set up the base architecture to support upcoming enhancements and development iterations."
    ]
  },
  {
    id: 4,
    title: "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra – Comparison Page Design",
    description: "A UI/UX design task focused on creating a structured and visually appealing comparison page for the 2026 Chevrolet Silverado 1500 and 2026 Toyota Tundra. The design was created to provide users with a clear side-by-side vehicle comparison experience.",
    category: "UI/UX Design",
    techStack: ["UI/UX Design"],
    image: "/Car/Screenshot (434).png",
    gallery: [
      "/Car/Screenshot (435).png",
      "/Car/Screenshot (436).png",
      "/Car/Screenshot (437).png",
      "/Car/Screenshot (438).png",
      "/Car/Screenshot (439).png",
      "/Car/Screenshot (440).png",
      "/Car/Screenshot (441).png",
      "/Car/Screenshot (442).png",
      "/Car/Screenshot (443).png",
      "/Car/Screenshot (444).png",
      "/Car/Screenshot (445).png"
    ],
    fullDetails: `This task involved designing a comparison page template that presents vehicle information in an organized and visually balanced format. The layout was planned to improve readability and help users quickly compare important details between the two truck models without confusion or excessive scrolling.

The design focused on maintaining a modern automotive-style interface with structured content sections for specifications, engine performance, towing capacity, interior features, technology, pricing, and overall vehicle highlights. Attention was also given to spacing, typography, visual hierarchy, and responsive layout behavior to ensure a smooth viewing experience across different screen sizes.

The template was built to support scalability, allowing additional vehicle comparison pages to follow the same design structure in future implementations. Overall, the task emphasized clean presentation, user-friendly navigation, and efficient information comparison for automotive content.`,
    projectLink: "",
    githubLink: "",
    featured: false,
    date: "2026",
    myTasks: [
      "UI/UX Design - Created the full comparison page layout for the 2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra. Designed a clean side-by-side comparison structure for easier content readability. Organized sections for specifications, performance, pricing, and feature highlights.",
      "Layout & User Experience - Improved visual hierarchy to help users quickly identify key differences between vehicles. Applied responsive design considerations for desktop and mobile viewing. Structured content spacing and alignment for better readability and navigation.",
      "Design Planning - Built a reusable template structure for future vehicle comparison pages. Focused on modern automotive-style UI presentation and organized information flow. Ensured the design supports scalable content expansion and additional comparison categories."
    ]
  },
  {
    id: 5,
    title: "FURPET: Pet Services Finder System",
    description: "A web platform for locating pet services with user authentication, listings, and database management. Built as a capstone project to help pet owners easily find and connect with pet service providers.",
    category: "Web Development",
    techStack: ["Laravel", "MySQL", "PHP", "JavaScript", "Bootstrap"],
    image: "/d2462231-eb86-4878-994d-0c7995d367f2.jpg",
    gallery: [
      "/d2462231-eb86-4878-994d-0c7995d367f2.jpg"
    ],
    fullDetails: `FURPET is a comprehensive web platform designed to help pet owners easily find and connect with pet service providers in their area. The system allows users to search for various pet services including grooming, boarding, veterinary care, walking, and training facilities.

Key features include user authentication with role-based access for pet owners and service providers, service listings with detailed information and ratings, advanced search and filtering capabilities, booking management system, review and rating functionality, and an admin dashboard for platform management.

The platform was built using Laravel for robust backend functionality, MySQL for efficient database management, JavaScript for interactive frontend features, and Bootstrap for responsive design. This capstone project demonstrates full-stack development capabilities and attention to user experience in a specialized service marketplace context.`,
    projectLink: "",
    githubLink: "",
    featured: true,
    date: "2025",
    myTasks: [
      "Full Stack Development - Built the complete FURPET system as a capstone project from concept to deployment.",
      "Database Design - Designed and implemented MySQL database schema for users, service listings, bookings, and reviews.",
      "Backend Development - Developed Laravel backend with authentication, authorization, and CRUD operations for all entities.",
      "Frontend Development - Created responsive UI using Bootstrap and JavaScript for seamless user experience.",
      "Feature Implementation - Implemented service search, filtering, booking system, rating system, and admin dashboard.",
      "User Management - Developed role-based access control for pet owners, service providers, and administrators.",
      "Testing & Deployment - Conducted thorough testing and deployed the application for production use."
    ]
  }
];

// Get unique categories
const categories = ['All', ...new Set(HARDCODED_PROJECTS.map(p => p.category))];

export default function WorkPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(HARDCODED_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState('');

  // Filter projects based on category and search
  const updateFilters = (category: string, query: string) => {
    let result = HARDCODED_PROJECTS;
    
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      );
    }
    
    setFilteredProjects(result);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    updateFilters(category, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateFilters(activeCategory, query);
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentGalleryIndex(0);
    setShowDetailModal(true);
  };

  const openGalleryImage = (image: string) => {
    setSelectedGalleryImage(image);
    setShowGalleryModal(true);
  };

  const nextImage = () => {
    if (selectedProject && currentGalleryIndex < selectedProject.gallery.length - 1) {
      setCurrentGalleryIndex(currentGalleryIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedProject && currentGalleryIndex > 0) {
      setCurrentGalleryIndex(currentGalleryIndex - 1);
    }
  };

  // Custom Project Card Component
  const CustomProjectCard = ({ project }: { project: Project }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div 
        className="bg-card rounded-xl overflow-hidden border border-border hover:border-red-500/50 transition-all duration-300 hover:shadow-xl group cursor-pointer"
        onClick={() => handleViewProject(project)}
      >
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          {project.featured && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-yellow-500/90 text-black border-0 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          {!imgError && project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <LayoutGrid className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-red-500/20 text-red-500">
              {project.category}
            </Badge>
            {project.date && (
              <span className="text-xs text-muted-foreground">{project.date}</span>
            )}
          </div>
          <h3 className="font-bold text-xl mb-2 line-clamp-1 text-white">{project.title}</h3>
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
            onClick={(e) => {
              e.stopPropagation();
              handleViewProject(project);
            }}
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
          A modular collection of projects, audits, and technical solutions completed during my internship and academic work.
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
                onChange={(e) => handleSearch(e.target.value)}
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
                  onClick={() => handleCategoryChange(cat)}
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
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="relative group">
                  <CustomProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-12 text-center border border-dashed flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <LayoutGrid className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-2xl">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {showDetailModal && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetailModal(false)}
        >
          <div 
            className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-red-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm p-4 border-b border-red-500/20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedProject.featured && (
                <div className="mb-4">
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-0 flex items-center gap-1 w-fit">
                    <Star className="w-3 h-3 fill-current" />
                    Featured Project
                  </Badge>
                </div>
              )}
              
              {/* Main Image with Gallery Navigation */}
              {selectedProject.gallery.length > 0 && (
                <div className="mb-6">
                  <div className="relative rounded-lg overflow-hidden bg-gray-800">
                    <img 
                      src={selectedProject.gallery[currentGalleryIndex]} 
                      alt={`${selectedProject.title} - ${currentGalleryIndex + 1}`}
                      className="w-full h-96 object-contain bg-gray-900 cursor-pointer"
                      onClick={() => openGalleryImage(selectedProject.gallery[currentGalleryIndex])}
                    />
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          disabled={currentGalleryIndex === 0}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 transition-all"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          disabled={currentGalleryIndex === selectedProject.gallery.length - 1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 transition-all"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          {currentGalleryIndex + 1} / {selectedProject.gallery.length}
                        </div>
                      </>
                    )}
                  </div>
                  {selectedProject.gallery.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                      {selectedProject.gallery.slice(0, 8).map((img, idx) => (
                        <div
                          key={idx}
                          className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            currentGalleryIndex === idx ? 'border-red-500' : 'border-transparent hover:border-gray-500'
                          }`}
                          onClick={() => setCurrentGalleryIndex(idx)}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {selectedProject.gallery.length > 8 && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                          +{selectedProject.gallery.length - 8}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-red-500/20 text-red-500 px-3 py-1">
                  {selectedProject.category}
                </Badge>
                {selectedProject.date && (
                  <span className="text-sm text-gray-400">
                    {selectedProject.date}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>
              
              {selectedProject.fullDetails && (
                <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Project Details</h3>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{selectedProject.fullDetails}</p>
                </div>
              )}
              
              {selectedProject.myTasks && selectedProject.myTasks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">My Tasks & Contributions</h3>
                  <div className="space-y-3">
                    {selectedProject.myTasks.map((task, idx) => (
                      <div key={idx} className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                        <p className="text-gray-300 text-sm leading-relaxed">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm border border-red-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(selectedProject.projectLink || selectedProject.githubLink) && (
                <div className="flex flex-wrap gap-4">
                  {selectedProject.projectLink && (
                    <a 
                      href={selectedProject.projectLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a 
                      href={selectedProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors border border-gray-700"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Gallery Modal */}
      {showGalleryModal && selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
          onClick={() => setShowGalleryModal(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <img 
              src={selectedGalleryImage} 
              alt="Full size"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}