"use client";

import { useState, useEffect, useRef } from 'react';
import { Rocket, ChevronLeft, ChevronRight, Play, Pause, Award } from 'lucide-react';

const ojtTimeline = [
  {
    date: "Feb 2026",
    title: "OJT Started + Learning Phase",
    description: "Started online OJT at MakerSpace Innohub. Learned Laravel + Vue.js integration. Completed SUI Modules 1-5. Started Axiom Scrumban development.",
    icon: "🚀"
  },
  {
    date: "Feb 15-20, 2026",
    title: "Axiom Scrumban - Notification System",
    description: "Built notification system with 3-day reminders, due today alerts, overdue alerts, and instant in-app notifications. Implemented project archive system.",
    icon: "💻"
  },
  {
    date: "Feb 23-25, 2026",
    title: "Axiom Scrumban - Bug Fixes",
    description: "Implemented permanent project deletion with confirmation. Configured Gmail SMTP for email notifications. Resolved 404 errors, PostgreSQL issues, route conflicts.",
    icon: "⚙️"
  },
  {
    date: "March 1-5, 2026",
    title: "SyncSnap - Gamification",
    description: "Implemented daily streaks, early bird bonuses (+10 points), milestone rewards, and leaderboard rankings.",
    icon: "🎮"
  },
  {
    date: "March 6-12, 2026",
    title: "SyncSnap - Blocker Management",
    description: "Implemented blocker status management (Pending/Processing/Resolved). Built email notification system for admin alerts.",
    icon: "🔒"
  },
  {
    date: "March 13-19, 2026",
    title: "SyncSnap - AI Reports",
    description: "Integrated Gemini API for AI report generation. Built deadline reminders with email notifications. Added date picker for custom ranges.",
    icon: "🤖"
  },
  {
    date: "March 20-25, 2026",
    title: "SyncSnap - Reports & Permissions",
    description: "Built MemberReport dashboard with team performance analytics. Implemented role-based access control and IDOR protection.",
    icon: "📈"
  },
  {
    date: "March 26-31, 2026",
    title: "SyncSnap - Final Features",
    description: "Added Reports Search, optimized Report Parsing, created vehicle comparison design template.",
    icon: "🔧"
  },
  {
    date: "April 1-2, 2026",
    title: "FlowState - Account Management",
    description: "Added Delete Account with confirmation modal, Change Password with password fields. Profile photos in assignee dropdown. Fixed API call for user deletion.",
    icon: "🔐"
  },
  {
    date: "April 3-6, 2026",
    title: "FlowState - Project Setup",
    description: "Created one-page pitch for digital solution. Cloned repository, installed dependencies, connected to MongoDB Atlas.",
    icon: "🌊"
  },
  {
    date: "April 7-12, 2026",
    title: "FlowState - UI Development",
    description: "Set up My Tasks page UI, Layout UI/UX, Blockers UI design, Floating Action Button, AI Insight page with custom date ranges.",
    icon: "🎨"
  },
  {
    date: "April 13-17, 2026",
    title: "FlowState - Settings & Team Features",
    description: "Built Settings page with Profile/Security/Preferences tabs. Added team selection page, View AI Analytics button, switch teams from sidebar.",
    icon: "⚙️"
  },
  {
    date: "April 14-18, 2026",
    title: "FlowState - Team Feed Complete",
    description: "Built Team Feed Tab System (Chat, Members, Activity, Settings). Members list with color-coded badges. Real-time messaging.",
    icon: "👥"
  },
  {
    date: "April 18-20, 2026",
    title: "FlowState - Settings Functionality",
    description: "Working name/email/password changes with verification. Delete account with confirmation modal.",
    icon: "🔧"
  },
  {
    date: "April 21 - May 5, 2026",
    title: "📚 NCII CSS Training",
    description: "Started TESDA NCII CSS training. Focused on training modules and assessment preparation.",
    icon: "📖"
  },
  {
    date: "May 6, 2026",
    title: "🎉 NCII CSS Assessment - PASSED! 🎉",
    description: "Successfully passed the NCII CSS competency assessment. Officially NCII Certified! ✅",
    icon: "🏅"
  },
  {
    date: "May 7-9, 2026",
    title: "FlowState - Workstream Features",
    description: "Added workstream rename with real-time database sync. Team rename with live updates. Real-time socket events. Custom FlowState logo.",
    icon: "🔄"
  },
  {
    date: "May 10-12, 2026",
    title: "FlowState - Authentication System",
    description: "Built secure signup with real-time password meter (8 chars, uppercase, special). Login backend with bcrypt. Responsive design.",
    icon: "🔑"
  }
];

export default function AutoSlidingRoadmap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + visibleCards >= ojtTimeline.length ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, visibleCards]);

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children[0]) {
      // Removed the "as HTMLElement" type assertion
      const cardWidth = scrollRef.current.children[0].offsetWidth;
      scrollRef.current.scrollTo({
        left: currentIndex * (cardWidth + 24),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev + visibleCards >= ojtTimeline.length ? 0 : prev + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? Math.max(0, ojtTimeline.length - visibleCards) : prev - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
            <Rocket className="w-4 h-4" />
            My OJT Journey
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-xl p-3 md:p-4 shadow-lg border border-gray-700">
              <img 
                src="/Makespace.png"
                alt="MakerSpace Innohub Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          </div>
          
          <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Internship Roadmap
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            A visual timeline of my accomplishments and growth during OJT at{' '}
            <span className="font-semibold text-red-500">MakerSpace Innohub</span>
          </p>
          
          <div className="inline-flex items-center gap-2 mt-2 p-2 md:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-xs md:text-sm font-medium text-yellow-400">NCII CSS Certified ✅</span>
            <span className="text-xs text-gray-500">| Passed: <span className="font-bold text-yellow-600">May 6, 2026</span></span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 mb-6 max-w-6xl mx-auto">
          <button 
            onClick={toggleAutoPlay} 
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
            title={isAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-gray-400" /> : <Play className="w-4 h-4 text-gray-400" />}
          </button>
          <button 
            onClick={handlePrev} 
            className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-red-500" />
          </button>
          <button 
            onClick={handleNext} 
            className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-red-500" />
          </button>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
          
          <div 
            ref={scrollRef} 
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 px-2 hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ojtTimeline.map((event, index) => (
              <div key={index} className="relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group">
                <div className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-red-500/40 hover:shadow-xl transition-all duration-300">
                  {index < ojtTimeline.length - 1 && (
                    <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-red-500/20 hidden lg:block"></div>
                  )}
                  
                  <div className={`px-4 py-2 border-b border-gray-800 ${event.date === "May 6, 2026" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20" : "bg-red-500/5"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${event.date === "May 6, 2026" ? "text-yellow-500" : "text-red-500"}`}>
                        {event.date}
                      </span>
                      <span className="text-lg">{event.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className={`font-headline font-bold text-base md:text-lg mb-2 line-clamp-2 ${event.date === "May 6, 2026" ? "text-yellow-500" : "text-white"}`}>
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group">
              <div className="relative h-full bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-2xl border border-red-500/30 overflow-hidden">
                <div className="bg-red-500/10 px-4 py-2 border-b border-red-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-500">May 2026 - Present</span>
                    <span className="text-lg">🌟</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-headline font-bold text-base md:text-lg mb-2 text-white">Continuing OJT & Skill Development</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Actively working on FlowState project, implementing new features, fixing bugs, and collaborating with the development team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(ojtTimeline.length / visibleCards) }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => { 
                setIsAutoPlaying(false); 
                setCurrentIndex(i * visibleCards); 
                setTimeout(() => setIsAutoPlaying(true), 5000); 
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / visibleCards) === i 
                  ? 'w-8 bg-red-500' 
                  : 'w-2 bg-red-500/30 hover:bg-red-500/50'
              }`} 
            />
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
          <span>←</span> Swipe or drag to explore my journey <span>→</span>
        </p>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}