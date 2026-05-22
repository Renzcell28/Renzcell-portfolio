"use client";

import { useState, useEffect } from 'react';
import { Rocket, Award, Calendar, ChevronLeft, ChevronRight, Maximize2, Minimize2, Compass } from 'lucide-react';

// OJT Journey Data - 61 days (Monday to Friday only)
// Start: Feb 4, 2026 | End: May 27, 2026

const ojtJourney = [
  {
    week: "Week 1",
    date: "Feb 4-6, 2026",
    title: "Launch Point",
    subtitle: "OJT Started + Learning Phase",
    accomplishments: [
      "Started online OJT at MakerSpace Innohub",
      "Read SUI Modules 1-5",
      "Learned Laravel + Vue.js integration",
      "Started Axiom Scrumban development"
    ],
    icon: "🚀",
    type: "start",
    skills: ["Laravel", "Vue.js", "Scrumban"],
    days: 3
  },
  {
    week: "Week 2",
    date: "Feb 9-13, 2026",
    title: "Axiom Scrumban Setup",
    subtitle: "Project Management Development",
    accomplishments: [
      "Built basic new page for Axiom Scrumban",
      "Created Project Management Document with features and recommendations",
      "Worked on Laravel integration planning",
      "Found bugs and UI design for HR website in AxionHR",
      "Continued learning Vue JS"
    ],
    icon: "📋",
    type: "setup",
    skills: ["Project Management", "Documentation", "Vue JS"],
    days: 5
  },
  {
    week: "Week 3",
    date: "Feb 16-20, 2026",
    title: "Notification Peak",
    subtitle: "Axiom Scrumban - Notification System",
    accomplishments: [
      "Built notification system with 3-day reminders, due today alerts, overdue alerts",
      "Implemented instant in-app notifications for project creation",
      "Added project archive system from notification cards",
      "Worked on task progress tracking for upcoming deadlines",
      "Created flowchart for Axiom Scrumban",
      "Implemented responsive grid layout with color-coded notification cards"
    ],
    icon: "🔔",
    type: "milestone",
    skills: ["Notifications", "Real-time", "Archiving"],
    days: 5
  },
  {
    week: "Week 4",
    date: "Feb 23-27, 2026",
    title: "Debugger's Pass",
    subtitle: "Axiom Scrumban - Bug Fixes & QA",
    accomplishments: [
      "Implemented permanent project deletion with confirmation",
      "Configured Gmail SMTP for email notifications",
      "Resolved 404 delete/archive failures",
      "Fixed PostgreSQL JSON query issues and route conflicts",
      "Fixed BOM encoding bugs and ActivityLog null errors",
      "Resolved Vue warnings",
      "QA tested Sinag Villas Website",
      "Assisted with heat press transfer printing for t-shirts and mugs"
    ],
    icon: "🐛",
    type: "technical",
    skills: ["Debugging", "SMTP", "PostgreSQL", "QA"],
    days: 5
  },
  {
    week: "Week 5",
    date: "Mar 2-6, 2026",
    title: "Gamification Valley",
    subtitle: "SyncSnap - Gamification & Workspace",
    accomplishments: [
      "Implemented daily streaks, early bird bonuses (+10 points)",
      "Added milestone rewards and leaderboard rankings",
      "Created database tables for core functionalities",
      "Added success toasts for earned bonuses",
      "Added warning messages for duplicate submissions",
      "Implemented blocker status management (Pending/Processing/Resolved)",
      "Fixed errors in Email Notification System for admin alerts",
      "Separated workspaces and organized members under respective workspaces",
      "Added admin response feature to member blocker reports via email",
      "Implemented search bar for workspaces"
    ],
    icon: "🎮",
    type: "feature",
    skills: ["Gamification", "Leaderboards", "Rewards"],
    days: 5
  },
  {
    week: "Week 6",
    date: "Mar 9-13, 2026",
    title: "Blocker Fortress",
    subtitle: "SyncSnap - Blocker Management",
    accomplishments: [
      "Built workspace cards with color-coded headers",
      "Added status controls with Pending/Processing/Resolved badges",
      "Added three-dot menu options for status management",
      "Resolved email errors and implemented proper admin-to-member threading",
      "Gemini API now working correctly for blocker data",
      "Status tracking - both processing blockers visible and actionable",
      "AI Reports working - Gemini generates blockers tables with names, dates, fixes",
      "Fixed 500 errors breaking report generation"
    ],
    icon: "🛡️",
    type: "security",
    skills: ["Status Management", "Email Alerts", "Admin Systems"],
    days: 5
  },
  {
    week: "Week 7",
    date: "Mar 16-20, 2026",
    title: "AI Summit",
    subtitle: "SyncSnap - AI Reports & Analytics",
    accomplishments: [
      "Added Reports Search - workspace name search for admins",
      "Optimized Report Parsing - eliminated duplicate formatting",
      "Implemented IDOR Protection across all controllers",
      "Separated Admin & Member Reports",
      "Fixed Notification Count - personal unread count",
      "Fixed 419 CSRF errors in stats endpoint",
      "Enhanced deadline reminder emails with working workspace links",
      "Successfully integrated OpenAI GPT-3.5-turbo for AI report generation",
      "Cleaned Up AI Reports - 4 clean unique summaries",
      "Opened up blocker visibility for all team members",
      "Added date picker for 7 days, 30 days, or custom ranges",
      "Built deadline reminders - automated email reminders 30 minutes before deadlines"
    ],
    icon: "🤖",
    type: "advanced",
    skills: ["AI Integration", "Gemini API", "Reports"],
    days: 5
  },
  {
    week: "Week 8",
    date: "Mar 23-27, 2026",
    title: "Analytics Ridge",
    subtitle: "SyncSnap - Reports & Permissions",
    accomplishments: [
      "Fixed OpenRouter API - switched to openai/gpt-3.5-turbo",
      "AI Reports LIVE - real 4-paragraph reports using standup data",
      "Eliminated 'No summary available' error",
      "Fixed Notification Detail Navigation for member dropdown",
      "Fixed 'Mark All Read' functionality with loading states",
      "Implemented role-based access control for reports",
      "Worked on initial design of AI-generated report UI",
      "Built MemberReport - team performance, activity trends, blocker impact analysis",
      "Set up Multi-Provider AI System with OpenRouter as backup",
      "Fixed member access to notification details",
      "Resolved CSRF token errors",
      "Added sidebar collapse with orange hover effects",
      "Created design template for 2026 Chevrolet Silverado vs Toyota Tundra comparison page",
      "Reviewed SOP for Page Creation phases",
      "Started setting up page template"
    ],
    icon: "📊",
    type: "security",
    skills: ["Analytics", "RBAC", "Security"],
    days: 5
  },
  {
    week: "Week 9",
    date: "Mar 30 - Apr 3, 2026",
    title: "FlowState Setup",
    subtitle: "New Project - FlowState Initialization",
    accomplishments: [
      "Created one-page pitch for digital solution to improve daily operations",
      "Cloned repository, installed dependencies, configured environment variables",
      "Connected web application to MongoDB Atlas",
      "Successfully stored user data in MongoDB database",
      "Set up initial UI for My Tasks page",
      "Created Layout UI/UX for FlowState",
      "Learned basics of Base platform and set up accounts on Base App and Vercel",
      "Built initial prototype of FurFund"
    ],
    icon: "🌊",
    type: "setup",
    skills: ["MongoDB", "Setup", "Infrastructure"],
    days: 5
  },
  {
    week: "Week 10",
    date: "Apr 6-10, 2026",
    title: "UI Canyon",
    subtitle: "FlowState - UI Development",
    accomplishments: [
      "Set up initial UI for AI Insight page",
      "Added custom date range: 7 Days, 30 Days, 90 Days, and Custom Range",
      "Added tabs: AI Digest, Risk Monitor, Sprint Planner, and Security",
      "Created team selection page for AI analytics",
      "Added 'View AI Analytics' button to AI Insight page",
      "Set up initial UI for Settings page with Profile, Security, Preferences tabs",
      "Added dark mode and password change in Settings",
      "Floating Action Button only shows on Dashboard page",
      "Created Blockers UI design",
      "Added No Team Message to all pages when user has no team",
      "Fixed settings page so user name updates correctly"
    ],
    icon: "🎨",
    type: "design",
    skills: ["UI/UX", "Design", "Frontend"],
    days: 5
  },
  {
    week: "Week 11",
    date: "Apr 13-17, 2026",
    title: "Team Summit",
    subtitle: "FlowState - Team Features Complete",
    accomplishments: [
      "Created team selection page with team cards (name, code, member count, copy/open buttons)",
      "Built Team Feed Tab System with 4 tabs (Chat, Members, Activity, Settings)",
      "Members Tab - shows all members with colored badges (purple=Admin, blue=Member)",
      "Activity Tab - shows team activity history with individual view",
      "Settings Tab - Leave Group button and Delete Team button (admin only)",
      "Chat Tab - real-time messaging with sender info and timestamps",
      "Switch teams directly from sidebar dropdown",
      "Team feed changes when picking a team in sidebar",
      "Invite code shown in chat header with copy button",
      "Admins can delete team - removes from database and sidebar",
      "Members can leave team - removes from sidebar and database",
      "Applied full functionality to Settings page:",
      "• Working name change with database and localStorage sync",
      "• Working email change with duplicate checking",
      "• Working password change with current password verification",
      "• Added Delete Account button with confirmation modal"
    ],
    icon: "👥",
    type: "feature",
    skills: ["Team Management", "Real-time Chat", "WebSockets"],
    days: 5
  },
  {
    week: "Week 12",
    date: "Apr 20, 2026",
    title: "Pre-Training Sprint",
    subtitle: "FlowState Final Features Before Training",
    accomplishments: [
      "Added expandable dropdowns for Delete Account with Yes/No confirmation modal",
      "Added Change Password with password fields",
      "Profile photos now appear in assignee dropdown",
      "Only admins can change assignees (members view only)",
      "Changed API call from body to query parameter for user deletion",
      "Adjusted resume viewer to fit and display entire document properly"
    ],
    icon: "⚡",
    type: "technical",
    skills: ["Security", "Account Management", "API"],
    days: 1
  },
  {
    week: "Week 13-14",
    date: "Apr 21 - May 5, 2026",
    title: "Training Grounds",
    subtitle: "NCII CSS Training (12 Days)",
    accomplishments: [
      "TESDA NCII CSS Training - Day 1 to Day 12",
      "Focused on computer hardware servicing concepts",
      "Learned networking concepts and configuration",
      "Completed assessment preparation modules",
      "Completed all practical exercises and training requirements"
    ],
    icon: "📖",
    type: "learning",
    skills: ["CSS", "Hardware", "Networking"],
    days: 12
  },
  {
    week: "Week 14",
    date: "May 6, 2026",
    title: "Victory Peak",
    subtitle: "NCII CSS Assessment - PASSED! 🎉",
    accomplishments: [
      "Successfully passed the NCII CSS competency assessment",
      "Officially NCII Certified!",
      "Returned to FlowState development after certification achievement"
    ],
    icon: "🏅",
    type: "achievement",
    skills: ["Certification", "Assessment", "Success"],
    days: 1
  },
  {
    week: "Week 14-15",
    date: "May 7-9, 2026",
    title: "Real-time Ridge",
    subtitle: "FlowState - Workstream & UI Features",
    accomplishments: [
      "Added functionality to rename workstreams with real-time database sync via socket.io",
      "Added admin ability to rename team from Settings tab",
      "Added real-time socket events for name changes without page refresh",
      "Changed reaction tooltip to white theme and removed close button",
      "Replaced all placeholder logos with custom FlowState logo across navbar, sidebar, footer",
      "Implemented hover-triggered pencil icon on sidebar workstreams for editing",
      "Implemented 50-character limit with live counter in rename field",
      "Resolved blocker count synchronization issue in Team Activity",
      "Redesigned landing page with interactive FAQ dropdowns"
    ],
    icon: "🔄",
    type: "advanced",
    skills: ["Real-time Sync", "WebSockets", "Branding"],
    days: 3
  },
  {
    week: "Week 15",
    date: "May 11-15, 2026",
    title: "Authentication Citadel",
    subtitle: "FlowState - Security & Settings",
    accomplishments: [
      "Added password change in Security Tab with validation rules",
      "Built secure signup with real-time password meter (8 chars, uppercase, special)",
      "Email @ validation with progress bar and checkbox indicators",
      "Implemented server-side validation with bcrypt password hashing",
      "Duplicate email blocking for secure credential storage",
      "Built login backend with email lookup and bcrypt password comparison",
      "Secure error handling and user data return for session management",
      "Built clickable logo that toggles sidebar width (64px to 256px)",
      "Organized menu items with hover tooltips and active state indicators",
      "Built full Settings profile management with photo/resume uploads",
      "Added roles/skills editing and password validation",
      "Added editable shift scheduling with time picker",
      "Live end-time/break preview and database persistence"
    ],
    icon: "🔑",
    type: "security",
    skills: ["Authentication", "bcrypt", "Security"],
    days: 5
  },
  {
    week: "Week 16",
    date: "May 18-21, 2026",
    title: "Final Push",
    subtitle: "FlowState Completion & Documentation",
    accomplishments: [
      "Resolved deadline date and time fetching problem in Sprint Planner tab",
      "Regular tasks now properly display deadline dates and times",
      "Fixed deadline display for blockers in BLOCKERS PRIORITY section",
      "Fixed Monitor Tab functionality and UI",
      "Built responsive dark theme portfolio with 10+ animations",
      "Created reusable components (ProjectCard, ChatBot, AISummaryTool, ResumeSection)",
      "Created OJT timeline featuring 18 milestones across 8 categories",
      "Created 5 API routes with OpenRouter AI (5 model fallbacks)",
      "Designed questions that auto-retry five AI models for technical summaries",
      "Created comprehensive User Manual / User Guide documentation",
      "Designed System Architecture documentation with API flow and module interactions",
      "Built activity logs display with search and filters",
      "Designed chatbot with floating button and animations"
    ],
    icon: "📝",
    type: "milestone",
    skills: ["Documentation", "UI/UX", "Portfolio"],
    days: 4
  },
  {
    week: "Week 16-17",
    date: "May 22-27, 2026",
    title: "Journey's End",
    subtitle: "OJT Completion - 61 Days Total",
    accomplishments: [
      "Built real-time notification system using Socket.IO for teams and workstreams",
      "Designed popup notifications with user profile pictures and team names",
      "Added message previews, timestamps, and notification sounds",
      "Fixed major notification issues: duplicate popups, delayed messages",
      "Fixed cross-team message mix-ups",
      "Fixed cases where users needed to send message first before receiving notifications",
      "Implemented conditional Team Members tab visibility for admins only",
      "Built full member management: edit details, reset passwords with validation",
      "Toggle self-edit permissions per member",
      "Created event-driven system with polling fallback for instant updates",
      "Developed 5 secure endpoints with admin validation",
      "Completed all pending features",
      "OJT officially concluded on May 27, 2026"
    ],
    icon: "🎯",
    type: "achievement",
    skills: ["Socket.IO", "Real-time", "Completion"],
    days: 4
  }
];

const JourneyMap = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(6);
      else setItemsPerPage(8);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(ojtJourney.length / itemsPerPage);
  const currentItems = ojtJourney.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const getTypeColor = (type) => {
    switch(type) {
      case 'start': return 'border-green-500 bg-green-500/10';
      case 'achievement': return 'border-yellow-500 bg-yellow-500/10';
      case 'milestone': return 'border-blue-500 bg-blue-500/10';
      case 'security': return 'border-red-500 bg-red-500/10';
      case 'advanced': return 'border-purple-500 bg-purple-500/10';
      case 'technical': return 'border-gray-500 bg-gray-500/10';
      case 'design': return 'border-pink-500 bg-pink-500/10';
      case 'feature': return 'border-cyan-500 bg-cyan-500/10';
      case 'setup': return 'border-orange-500 bg-orange-500/10';
      case 'learning': return 'border-indigo-500 bg-indigo-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'from-yellow-500 to-orange-500';
    if (progress >= 70) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-cyan-500';
    return 'from-red-500 to-orange-500';
  };

  const startDate = "February 4, 2026";
  const endDate = "May 27, 2026";
  const totalOJTDays = 61;

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
            <Rocket className="w-4 h-4" />
            OJT Weekly Expedition Log
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 md:p-4 shadow-xl border border-gray-700">
              <img 
                src="/Makespace.png"
                alt="MakerSpace Innohub Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          </div>
          
          <h2 className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Weekly Development Journey
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Linggo-linggong detalye ng aking <span className="font-bold text-red-500">{totalOJTDays}-araw</span> na OJT journey sa{' '}
            <span className="font-semibold text-red-500">MakerSpace Innohub</span>
          </p>
          
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2">
            <div className="inline-flex items-center gap-2 p-2 md:p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-xs md:text-sm font-medium text-green-400">{startDate} → {endDate}</span>
            </div>
            <div className="inline-flex items-center gap-2 p-2 md:p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-xs md:text-sm font-medium text-blue-400">{totalOJTDays} Araw (Lunes-Biyernes)</span>
            </div>
            <div className="inline-flex items-center gap-2 p-2 md:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs md:text-sm font-medium text-yellow-400">NCII CSS Certified ✅ Mayo 6, 2026</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            * Hindi kasama ang Sabado at Linggo | Lunes hanggang Biyernes lamang ang bilang
          </p>
          <p className="text-xs text-gray-600">
            📖 NCII Training: Abril 21 - Mayo 5, 2026 (12 araw) | ✅ Assessment Passed: Mayo 6, 2026
          </p>
        </div>

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Timeline
            </button>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-7xl mx-auto">
          {[
            { type: 'start', label: 'Start', color: 'border-green-500' },
            { type: 'milestone', label: 'Milestone', color: 'border-blue-500' },
            { type: 'achievement', label: 'Achievement', color: 'border-yellow-500' },
            { type: 'security', label: 'Security', color: 'border-red-500' },
            { type: 'advanced', label: 'Advanced', color: 'border-purple-500' },
            { type: 'technical', label: 'Technical', color: 'border-gray-500' },
            { type: 'design', label: 'Design', color: 'border-pink-500' },
            { type: 'feature', label: 'Feature', color: 'border-cyan-500' },
            { type: 'setup', label: 'Setup', color: 'border-orange-500' },
            { type: 'learning', label: 'Training', color: 'border-indigo-500' },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full border ${item.color}`}></div>
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {viewMode === 'grid' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentItems.map((item, idx) => {
                  const globalIndex = idx + currentPage * itemsPerPage;
                  const progress = Math.round(((globalIndex + 1) / ojtJourney.length) * 100);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedWeek(selectedWeek === globalIndex ? null : globalIndex)}
                      className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                        getTypeColor(item.type)
                      } ${selectedWeek === globalIndex ? 'scale-105 shadow-2xl' : 'hover:scale-102'}`}
                    >
                      <div className="absolute -top-3 left-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.week}
                      </div>

                      <div className="p-4 pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{item.icon}</div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </div>
                            <div className="text-[10px] text-gray-600 mt-1">{item.days} araw</div>
                          </div>
                        </div>

                        <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-400 mb-3">{item.subtitle}</p>
                        
                        {/* Preview ng accomplishments */}
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {item.accomplishments.slice(0, 2).join(". ")}.
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-[10px] bg-gray-700/50 px-1.5 py-0.5 rounded text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>Journey Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`bg-gradient-to-r ${getProgressColor(progress)} rounded-full h-full transition-all duration-500`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {selectedWeek === globalIndex && (
                        <div className="border-t border-gray-700 p-4 bg-gray-800/30 rounded-b-xl">
                          <h4 className="text-xs font-semibold text-gray-400 mb-2">📋 Weekly Accomplishments</h4>
                          <ul className="text-xs text-gray-300 space-y-1 max-h-40 overflow-y-auto">
                            {item.accomplishments.map((acc, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-red-500">✓</span>
                                <span>{acc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-8 h-8 rounded-lg text-sm transition-all ${
                        currentPage === i
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500"></div>
              {ojtJourney.map((item, idx) => (
                <div key={idx} className="relative mb-8 ml-16 group">
                  <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-900 group-hover:scale-125 transition-transform"></div>
                  <div className={`bg-gradient-to-r ${getTypeColor(item.type)} rounded-xl p-4 border transition-all hover:shadow-xl`}>
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-red-500">{item.week}</span>
                        <h3 className="font-bold text-white text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </div>
                        <div className="text-xs text-gray-600">{item.days} araw</div>
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-semibold text-gray-400 mt-3 mb-2">📋 Accomplishments:</h4>
                    <ul className="text-gray-300 text-sm mb-3 space-y-1 list-disc list-inside">
                      {item.accomplishments.slice(0, 4).map((acc, i) => (
                        <li key={i} className="text-xs">{acc}</li>
                      ))}
                      {item.accomplishments.length > 4 && (
                        <li className="text-xs text-gray-500">+{item.accomplishments.length - 4} more accomplishments...</li>
                      )}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-red-500">{totalOJTDays}</div>
              <div className="text-xs text-gray-400">Total OJT Days</div>
              <div className="text-[10px] text-gray-600 mt-1">(Lunes-Biyernes lamang)</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-blue-500">{ojtJourney.length}</div>
              <div className="text-xs text-gray-400">Mga Linggo</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-green-500">100%</div>
              <div className="text-xs text-gray-400">Journey Complete</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-yellow-500">NCII</div>
              <div className="text-xs text-gray-400">CSS Certified</div>
              <div className="text-[10px] text-gray-600 mt-1">Mayo 6, 2026</div>
            </div>
          </div>
          
          {/* Total Accomplishments Counter */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              📊 Total Weekly Accomplishments: {ojtJourney.reduce((sum, week) => sum + week.accomplishments.length, 0)} tasks completed
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8 flex items-center justify-center gap-1">
          <Compass className="w-3 h-3" /> I-click ang card para sa lingguhang detalye | {startDate} → {endDate} | {totalOJTDays} araw ng pag-unlad
        </p>
      </div>

      <style jsx>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default JourneyMap;