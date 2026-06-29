"use client";

import Link from 'next/link';
import { ArrowRight, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/portfolio/project-card';
import TechStackSection from '@/components/TechStackSection';
import AutoSlidingRoadmap from '@/components/AutoSlidingRoadmap';
import ChatBot from '@/components/ChatBot';
import ResumeSection from '@/components/ResumeSection';
import { useEffect, useRef, useState } from 'react';

// Hardcoded featured projects
const featuredProjects = [
  {
    id: "1",
    title: "SyncSnap",
    description: "A multi-tenant asynchronous daily standup and team collaboration system designed to help teams manage updates, track progress, and surface blockers in a more efficient and structured way.",
    category: "Web Development",
    techStack: ["Laravel", "React", "PostgreSQL"],
    imageUrl: "/SyncSnap/Screenshot (425).png",
    gallery: [],
    fullDetails: "",
    projectLink: "",
    githubLink: "",
    featured: true,
    completionDate: "2024"
  },
  {
    id: "2",
    title: "FlowState",
    description: "A unified AI-powered project management and team collaboration system that manages tasks, workflows, and communication in real time.",
    category: "Web Development",
    techStack: ["Next.js", "MongoDB"],
    imageUrl: "/Flowstate/Screenshot (381).png",
    gallery: [],
    fullDetails: "",
    projectLink: "",
    githubLink: "",
    featured: true,
    completionDate: "2024"
  },
  {
    id: "3",
    title: "Base Platform & FurFund",
    description: "A development and learning phase focused on exploring the Base blockchain platform, setting up Vercel environment, and building the initial prototype of FurFund.",
    category: "Web Development",
    techStack: ["Next.js"],
    imageUrl: "/FurFand/Screenshot (149).png",
    gallery: [],
    fullDetails: "",
    projectLink: "",
    githubLink: "",
    featured: true,
    completionDate: "2024"
  },
  {
    id: "4",
    title: "2026 Chevrolet Silverado 1500 vs. Toyota Tundra",
    description: "A UI/UX design task focused on creating a structured and visually appealing comparison page for the 2026 Chevrolet Silverado 1500 and 2026 Toyota Tundra.",
    category: "UI/UX Design",
    techStack: ["UI/UX Design", "Figma"],
    imageUrl: "/Car/Screenshot (434).png",
    gallery: [],
    fullDetails: "",
    projectLink: "",
    githubLink: "",
    featured: true,
    completionDate: "2024"
  }
];

// Scroll animation hook
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return visibleElements;
};

export default function Home() {
  const visibleElements = useScrollAnimation();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* ================= ANIMATED BACKGROUND (Red Theme) ================= */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-700/50 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="flex flex-col gap-16 md:gap-20 lg:gap-24 pb-20 relative z-10">
        {/* Hero Section - Red Theme */}
        <section className="relative pt-12 md:pt-16 pb-10 md:pb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
            <div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-red-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-red-600/10 rounded-full blur-[100px] animate-pulse-slower" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-full blur-[120px] animate-spin-slow" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
              
              {/* Left Side - Content */}
              <div className="flex-1 text-center lg:text-left animate-fade-in-up">
                {/* Status Badge with Glow - Red Theme */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-500 text-xs font-bold mb-4 md:mb-5 shadow-lg shadow-red-500/10 hover:scale-105 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <Zap className="w-3 h-3" />
                  <span>OPEN FOR WORK</span>
                </div>
                
                {/* Name with gradient animation - Red Theme */}
                <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 leading-[1.2] animate-slide-in-left">
                  <span className="text-white">Renzcell Rick V.</span>{' '}
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent animate-gradient-x">
                    Loresco
                  </span>
                </h1>
                
                {/* BSIT Student */}
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-4 animate-fade-in-up animation-delay-200">
                  BSIT Student{' '}
                  <span className="text-gray-500 text-base sm:text-lg md:text-xl">@ Universidad De Dagupan</span>
                </div>
                
                {/* Career Objective */}
                <div className="relative max-w-2xl lg:max-w-full mx-auto lg:mx-0 mb-6 animate-fade-in-up animation-delay-400">
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                    To get an IT position where I can use my skills to contribute, learn, and grow while helping the organization succeed.
                  </p>
                </div>
                
                {/* Call to Action Buttons - Red Theme */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-6 md:mt-8 animate-fade-in-up animation-delay-600">
                  <Button asChild size="default" className="h-9 md:h-10 px-4 md:px-6 rounded-full font-bold shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 text-xs md:text-sm bg-gradient-to-r from-red-600 to-red-500 text-white">
                    <Link href="/work">
                      View My Projects
                      <ArrowRight className="ml-2 w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="default" className="h-9 md:h-10 px-4 md:px-6 rounded-full font-bold backdrop-blur-sm bg-gray-900/50 hover:bg-gray-900/80 hover:scale-105 transition-all duration-300 text-xs md:text-sm border-red-500/30 hover:border-red-500 text-white">
                    <Link href="/logs">
                      Read Learning Logs
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right Side - Profile Image with Floating Icons */}
              <div className="flex-1 flex justify-center mb-6 lg:mb-0">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 blur-xl -z-10 animate-spin-slow" />
                  <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl -z-10 animate-pulse-slow" />
                  
                  {/* Main Profile Image */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-red-500/30 shadow-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="/renzcell-profile.png"
                      alt="Renzcell Rick V. Loresco"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Floating Icons - Programming Languages & Tools */}
                  {/* HTML5 */}
                  <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 lg:-top-8 lg:-right-6 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-float-1 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  
                  {/* CSS3 */}
                  <div className="absolute -top-2 left-0 md:-top-3 md:left-2 lg:-top-4 lg:left-4 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-float-2 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.5 4.5L5.5 17.5L12 19.5L18.5 17.5L19.5 4.5H4.5Z"/>
                      <path d="M12 17.5L17 16L17.5 10H12V13H14.5L14 15L12 15.5L10 15L9.5 13H7L7.5 16L12 17.5Z" fill="white"/>
                    </svg>
                  </div>
                  
                  {/* JavaScript */}
                  <div className="absolute top-1/2 -right-6 md:-right-8 lg:-right-10 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float-3 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 4H20V20H4V4Z" fill="#F7DF1E"/>
                      <path d="M13 13H15V17C15 17.5 14.5 18 14 18H13V13Z" fill="black"/>
                    </svg>
                  </div>
                  
                  {/* React */}
                  <div className="absolute top-1/2 -left-6 md:-left-8 lg:-left-10 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-float-4 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="4" fill="white"/>
                      <path d="M12 4C7.5 4 4 7.5 4 12C4 16.5 7.5 20 12 20C16.5 20 20 16.5 20 12C20 7.5 16.5 4 12 4Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  
                  {/* Node.js */}
                  <div className="absolute -bottom-4 right-2 md:-bottom-6 md:right-4 lg:-bottom-8 lg:right-6 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-float-5 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  
                  {/* PHP */}
                  <div className="absolute -bottom-3 -left-1 md:-bottom-4 md:-left-2 lg:-bottom-5 lg:-left-3 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg animate-float-6 z-20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#777BB4"/>
                      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PHP</text>
                    </svg>
                  </div>
                  
                  {/* Laravel */}
                  <div className="absolute -top-3 right-6 md:-top-4 md:right-8 lg:-top-5 lg:right-10 w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-float-7 z-20">
                    <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 2L8 6L12 2L16 6L20 2V22H4V2Z" fill="#FF2D20"/>
                    </svg>
                  </div>
                  
                  {/* Git */}
                  <div className="absolute bottom-0 -right-3 md:bottom-1 md:-right-4 lg:bottom-2 lg:-right-5 w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-float-8 z-20">
                    <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#F05032"/>
                      <path d="M12 6v6l4 2" fill="none" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  
                  {/* Bottom Center Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-500 rounded-full p-1.5 md:p-2 shadow-lg animate-bounce-slow z-20">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Professional Description Section - with scroll animation */}
        <section 
          id="about-section"
          data-scroll
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${
            visibleElements.has('about-section') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-20'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6 md:p-8 lg:p-10 shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
              </div>
              
              <div className="text-center space-y-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mx-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About Me
                </div>
              </div>
              
             <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center">
  Fresh <span className="text-white font-medium">Information Technology graduate</span> with experience in{' '}
  <span className="text-white font-medium">full-stack web development</span> through internship and academic projects.
  Proficient in{' '}
  <span className="text-white font-medium">
    Laravel, Next.js, Node.js, JavaScript, PHP, HTML, CSS, and MySQL
  </span>
  , with experience integrating{' '}
  <span className="text-white font-medium">
    Gemini AI and OpenRouter AI
  </span>
  . Passionate about building responsive, user-friendly web applications and eager to contribute, learn, and grow as a software developer.
</p>
              <div className="flex justify-center gap-2 my-6">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
                <span>🎓 BSIT Student @ Universidad De Dagupan</span>
                <span>🏅 NCII CSS Certified</span>
                <span>💼 OJT at MakerSpace Innohub</span>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4 italic">
                "Building innovative solutions through code, one project at a time."
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - Client Component */}
        <TechStackSection />

        {/* Featured Projects - with scroll animation */}
        <section 
          id="projects-section"
          data-scroll
          className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200 ${
            visibleElements.has('projects-section') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-20'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-4">
            <div className="space-y-2 text-center md:text-left animate-slide-in-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
                <Code2 className="w-4 h-4" />
                Selected Work
              </div>
              <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl text-white">Featured Highlights</h2>
            </div>
            <Button variant="link" asChild className="p-0 text-red-500 h-auto font-bold group animate-slide-in-right">
              <Link href="/work" className="flex items-center text-sm md:text-base">
                Explore All Projects
                <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        {/* OJT & Certification Section - Client Component */}
        <div
          id="ojt-section"
          data-scroll
          className={`transition-all duration-1000 delay-300 ${
            visibleElements.has('ojt-section') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-20'
          }`}
        >
          <AutoSlidingRoadmap />
        </div>

        {/* Resume Section - Client Component */}
        <div
          id="resume-section"
          data-scroll
          className={`transition-all duration-1000 delay-400 ${
            visibleElements.has('resume-section') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-20'
          }`}
        >
          <ResumeSection />
        </div>

        {/* Personal Information Section - Dark Red/Black Theme with scroll animation */}
        <section 
          id="contact-section"
          data-scroll
          className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-500 ${
            visibleElements.has('contact-section') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-20'
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-950 via-red-950/30 to-gray-950 border border-red-500/20 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-red-500/10">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 md:w-96 h-72 md:h-96 bg-red-600/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 md:w-96 h-72 md:h-96 bg-red-700/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-red-500/5 via-red-600/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            
            <div className="relative z-10 px-6 md:px-8 py-12 md:py-16">
              <div className="text-center mb-8 md:mb-10 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                  <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-red-400 font-medium">GET IN TOUCH</span>
                </div>
                <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2">
                  Contact Information
                </h2>
                <div className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto"></div>
                <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
                  Feel free to reach out for collaborations or just a friendly hello
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column - Personal Info */}
                <div className="space-y-6 animate-slide-in-left">
                  <div className="text-center lg:text-left">
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                      LORESCO RENZCELL RICK V.
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto lg:mx-0"></div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center lg:justify-start group">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a href="tel:+639664138823" className="text-gray-300 text-sm md:text-base hover:text-red-400 transition-colors">(+63) 966-413-8823</a>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center lg:justify-start group">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href="mailto:renzcell.loresco.3@gmail.com" className="text-gray-300 text-sm md:text-base hover:text-red-400 transition-colors break-all">renzcell.loresco.3@gmail.com</a>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-center lg:justify-start pt-2 group">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm md:text-base font-medium">Bachelor of Science in Information Technology</p>
                      <div className="flex items-center gap-2 mt-1">
                        <img src="/udd.jpg" alt="Universidad de Dagupan Logo" className="h-5 w-auto object-contain bg-white/10 rounded p-0.5" />
                        <span className="text-gray-400 text-xs md:text-sm">Universidad de Dagupan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Map & Actions */}
                <div className="space-y-4 animate-slide-in-right">
                  <div className="bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 border border-red-500/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">School Location</span>
                    </div>
                    <div className="rounded-lg overflow-hidden h-48 md:h-56 lg:h-64 border border-red-500/10">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.490433426612!2d120.3960759748455!3d16.03915828463489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339165b1d3e6ad5f%3A0xc668c1b5e9f76946!2sUniversidad%20de%20Dagupan!5e0!3m2!1sen!2sph!4v1710000000000!5m2!1sen!2sph" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                        title="Universidad de Dagupan Map" 
                        className="rounded-lg">
                      </iframe>
                    </div>
                    <p className="text-gray-500 text-[10px] text-center mt-3">Universidad de Dagupan, Arellano Street, Dagupan City, Pangasinan</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <a href="mailto:renzcell.loresco.3@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 text-sm transition-all duration-300 hover:scale-105 border border-red-500/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </a>
                    <a href="tel:+639664138823" className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 text-sm transition-all duration-300 hover:scale-105 border border-red-500/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Me
                    </a>
                    <a href="https://maps.google.com/?q=Universidad+de+Dagupan+Dagupan+City" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 text-sm transition-all duration-300 hover:scale-105 border border-red-500/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10 pt-6 border-t border-red-500/10 animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-gray-400 text-xs md:text-sm">Available for full-time opportunities and freelance projects</p>
                </div>
                <div className="flex justify-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-red-500/40 animate-pulse-slow"></div>
                  <div className="w-1 h-1 rounded-full bg-red-500/30 animate-pulse-slower"></div>
                  <div className="w-1 h-1 rounded-full bg-red-500/40 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= ANIMATION STYLES ================= */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        
        @keyframes pulseSlower {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.08); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Floating icon animations with different delays */
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-5deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(8deg); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
        
        @keyframes float6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(-7deg); }
        }
        
        @keyframes float7 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-13px) rotate(4deg); }
        }
        
        @keyframes float8 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(-4deg); }
        }
        
        .animate-float-1 { animation: float1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float2 3.5s ease-in-out infinite; }
        .animate-float-3 { animation: float3 2.8s ease-in-out infinite; }
        .animate-float-4 { animation: float4 4s ease-in-out infinite; }
        .animate-float-5 { animation: float5 3.2s ease-in-out infinite; }
        .animate-float-6 { animation: float6 3.8s ease-in-out infinite; }
        .animate-float-7 { animation: float7 2.5s ease-in-out infinite; }
        .animate-float-8 { animation: float8 3.3s ease-in-out infinite; }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradientShift 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulseSlower 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      
      {/* ChatBot Component - ONLY appears on this landing page */}
      <ChatBot />
    </div>
  );
}