"use client";

import { useState, useEffect, useRef } from 'react';
import { Rocket, Award, MapPin, Compass, Flag, Star, Shield, Brain, Code, Zap, Palette, Calendar, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

const ojtJourney = [
  {
    week: "Week 1",
    date: "Feb 2026",
    title: "Launch Point",
    subtitle: "OJT Started + Learning Phase",
    description: "Started online OJT at MakerSpace Innohub. Learned Laravel + Vue.js integration. Completed SUI Modules 1-5. Started Axiom Scrumban development.",
    icon: "🚀",
    type: "start",
    skills: ["Laravel", "Vue.js", "Scrumban"],
    progress: 5
  },
  {
    week: "Week 2-3",
    date: "Feb 15-20, 2026",
    title: "Notification Peak",
    subtitle: "Axiom Scrumban - Notification System",
    description: "Built notification system with 3-day reminders, due today alerts, overdue alerts, and instant in-app notifications. Implemented project archive system.",
    icon: "💻",
    type: "milestone",
    skills: ["Notifications", "Real-time", "Archiving"],
    progress: 12
  },
  {
    week: "Week 3-4",
    date: "Feb 23-25, 2026",
    title: "Debugger's Pass",
    subtitle: "Axiom Scrumban - Bug Fixes",
    description: "Implemented permanent project deletion with confirmation. Configured Gmail SMTP for email notifications. Resolved 404 errors, PostgreSQL issues, route conflicts.",
    icon: "⚙️",
    type: "technical",
    skills: ["Debugging", "SMTP", "PostgreSQL"],
    progress: 18
  },
  {
    week: "Week 4-5",
    date: "March 1-5, 2026",
    title: "Gamification Valley",
    subtitle: "SyncSnap - Gamification",
    description: "Implemented daily streaks, early bird bonuses (+10 points), milestone rewards, and leaderboard rankings.",
    icon: "🎮",
    type: "feature",
    skills: ["Gamification", "Leaderboards", "Rewards"],
    progress: 25
  },
  {
    week: "Week 5-6",
    date: "March 6-12, 2026",
    title: "Blocker Fortress",
    subtitle: "SyncSnap - Blocker Management",
    description: "Implemented blocker status management (Pending/Processing/Resolved). Built email notification system for admin alerts.",
    icon: "🔒",
    type: "security",
    skills: ["Status Management", "Email Alerts", "Admin Systems"],
    progress: 32
  },
  {
    week: "Week 6-7",
    date: "March 13-19, 2026",
    title: "AI Summit",
    subtitle: "SyncSnap - AI Reports",
    description: "Integrated Gemini API for AI report generation. Built deadline reminders with email notifications. Added date picker for custom ranges.",
    icon: "🤖",
    type: "advanced",
    skills: ["AI Integration", "Gemini API", "Reports"],
    progress: 40
  },
  {
    week: "Week 7-8",
    date: "March 20-25, 2026",
    title: "Analytics Ridge",
    subtitle: "SyncSnap - Reports & Permissions",
    description: "Built MemberReport dashboard with team performance analytics. Implemented role-based access control and IDOR protection.",
    icon: "📈",
    type: "security",
    skills: ["Analytics", "RBAC", "Security"],
    progress: 48
  },
  {
    week: "Week 8-9",
    date: "March 26-31, 2026",
    title: "Optimization Point",
    subtitle: "SyncSnap - Final Features",
    description: "Added Reports Search, optimized Report Parsing, created vehicle comparison design template.",
    icon: "🔧",
    type: "technical",
    skills: ["Optimization", "Search", "Design"],
    progress: 55
  },
  {
    week: "Week 9",
    date: "April 1-2, 2026",
    title: "Security Gateway",
    subtitle: "FlowState - Account Management",
    description: "Added Delete Account with confirmation modal, Change Password with password fields. Profile photos in assignee dropdown. Fixed API call for user deletion.",
    icon: "🔐",
    type: "security",
    skills: ["Security", "Account Management", "API"],
    progress: 62
  },
  {
    week: "Week 9-10",
    date: "April 3-6, 2026",
    title: "Mountain Base",
    subtitle: "FlowState - Project Setup",
    description: "Created one-page pitch for digital solution. Cloned repository, installed dependencies, connected to MongoDB Atlas.",
    icon: "🌊",
    type: "setup",
    skills: ["MongoDB", "Setup", "Infrastructure"],
    progress: 68
  },
  {
    week: "Week 10-11",
    date: "April 7-12, 2026",
    title: "UI Canyon",
    subtitle: "FlowState - UI Development",
    description: "Set up My Tasks page UI, Layout UI/UX, Blockers UI design, Floating Action Button, AI Insight page with custom date ranges.",
    icon: "🎨",
    type: "design",
    skills: ["UI/UX", "Design", "Frontend"],
    progress: 74
  },
  {
    week: "Week 11",
    date: "April 13-17, 2026",
    title: "Team Summit",
    subtitle: "FlowState - Settings & Team Features",
    description: "Built Settings page with Profile/Security/Preferences tabs. Added team selection page, View AI Analytics button, switch teams from sidebar.",
    icon: "⚙️",
    type: "feature",
    skills: ["Team Management", "Settings", "UI"],
    progress: 79
  },
  {
    week: "Week 11-12",
    date: "April 14-18, 2026",
    title: "Collaboration Peak",
    subtitle: "FlowState - Team Feed Complete",
    description: "Built Team Feed Tab System (Chat, Members, Activity, Settings). Members list with color-coded badges. Real-time messaging.",
    icon: "👥",
    type: "feature",
    skills: ["Real-time Chat", "WebSockets", "Collaboration"],
    progress: 83
  },
  {
    week: "Week 12",
    date: "April 18-20, 2026",
    title: "Settings Valley",
    subtitle: "FlowState - Settings Functionality",
    description: "Working name/email/password changes with verification. Delete account with confirmation modal.",
    icon: "🔧",
    type: "technical",
    skills: ["Verification", "Security", "User Management"],
    progress: 87
  },
  {
    week: "Week 13-14",
    date: "April 21 - May 5, 2026",
    title: "Training Grounds",
    subtitle: "NCII CSS Training",
    description: "Started TESDA NCII CSS training. Focused on training modules and assessment preparation.",
    icon: "📖",
    type: "learning",
    skills: ["CSS", "Hardware", "Networking"],
    progress: 92
  },
  {
    week: "Week 14",
    date: "May 6, 2026",
    title: "Victory Peak",
    subtitle: "NCII CSS Assessment - PASSED! 🎉",
    description: "Successfully passed the NCII CSS competency assessment. Officially NCII Certified! ✅",
    icon: "🏅",
    type: "achievement",
    skills: ["Certification", "Assessment", "Success"],
    progress: 96
  },
  {
    week: "Week 14-15",
    date: "May 7-9, 2026",
    title: "Real-time Ridge",
    subtitle: "FlowState - Workstream Features",
    description: "Added workstream rename with real-time database sync. Team rename with live updates. Real-time socket events. Custom FlowState logo.",
    icon: "🔄",
    type: "advanced",
    skills: ["Real-time Sync", "WebSockets", "Branding"],
    progress: 98
  },
  {
    week: "Week 15",
    date: "May 10-12, 2026",
    title: "Authentication Citadel",
    subtitle: "FlowState - Authentication System",
    description: "Built secure signup with real-time password meter (8 chars, uppercase, special). Login backend with bcrypt. Responsive design.",
    icon: "🔑",
    type: "security",
    skills: ["Authentication", "bcrypt", "Security"],
    progress: 100
  }
];

const JourneyMap = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid'); // grid, timeline, map
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
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'from-yellow-500 to-orange-500';
    if (progress >= 70) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-cyan-500';
    return 'from-red-500 to-orange-500';
  };

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
            <Rocket className="w-4 h-4" />
            Weekly Expedition Log
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
            15-Week Development Journey
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            A weekly breakdown of my OJT adventure at{' '}
            <span className="font-semibold text-red-500">MakerSpace Innohub</span>
          </p>
          
          <div className="inline-flex items-center gap-3 mt-2 p-2 md:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-xs md:text-sm font-medium text-yellow-400">NCII CSS Certified ✅</span>
            <span className="text-xs text-gray-500">| Conquered: <span className="font-bold text-yellow-600">May 6, 2026</span></span>
          </div>
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
              {/* Grid View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedWeek(selectedWeek === idx + currentPage * itemsPerPage ? null : idx + currentPage * itemsPerPage)}
                    className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                      getTypeColor(item.type)
                    } ${selectedWeek === idx + currentPage * itemsPerPage ? 'scale-105 shadow-2xl' : 'hover:scale-102'}`}
                  >
                    {/* Week Badge */}
                    <div className="absolute -top-3 left-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.week}
                    </div>

                    <div className="p-4 pt-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{item.subtitle}</p>

                      {/* Description */}
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="text-[10px] bg-gray-700/50 px-1.5 py-0.5 rounded text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                          <span>Journey Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${getProgressColor(item.progress)} rounded-full h-full transition-all duration-500`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedWeek === idx + currentPage * itemsPerPage && (
                      <div className="border-t border-gray-700 p-4 bg-gray-800/30 rounded-b-xl">
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">Key Achievements</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {item.description.split('. ').slice(0, 2).map((point, i) => (
                            point && <li key={i} className="flex items-start gap-1">
                              <span className="text-red-500">•</span>
                              <span>{point}.</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
            /* Timeline View */
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
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
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
              <div className="text-2xl font-bold text-red-500">15</div>
              <div className="text-xs text-gray-400">Weeks of Journey</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-blue-500">18</div>
              <div className="text-xs text-gray-400">Milestones Achieved</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-green-500">100%</div>
              <div className="text-xs text-gray-400">Journey Complete</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-yellow-500">NCII</div>
              <div className="text-xs text-gray-400">CSS Certified</div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8 flex items-center justify-center gap-1">
          <Compass className="w-3 h-3" /> Click on any card to explore weekly details | 15 weeks of continuous growth
        </p>
      </div>

      <style jsx>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default JourneyMap;