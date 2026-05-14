import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjects, getTimeline } from '@/app/lib/data-service';
import { ProjectCard } from '@/components/portfolio/project-card';
import TechStackSection from '@/components/TechStackSection';
import AutoSlidingRoadmap from '@/components/AutoSlidingRoadmap';
import ChatBot from '@/components/ChatBot';
import LearningPathGenerator from '@/components/LearningPathGenerator';

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const timelineEvents = await getTimeline();

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
                  <span>OPEN FOR OJT / INTERNSHIP OPPORTUNITIES</span>
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
              
              {/* Right Side - Profile Image */}
              <div className="flex-1 flex justify-center mb-6 lg:mb-0 animate-float">
                <div className="relative group">
                  {/* Decorative Ring Behind Image - Red Theme */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 blur-xl -z-10 animate-spin-slow" />
                  <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl -z-10 animate-pulse-slow" />
                  
                  {/* Image Container - Red Theme Border */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-red-500/30 shadow-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="/renzcell-profile.png"
                      alt="Renzcell Rick V. Loresco"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Decorative Badge on Image - Red Theme */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full p-1.5 md:p-2 shadow-lg animate-bounce-slow">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Professional Description Section - Red Theme */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs md:text-sm font-medium hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              About Me
            </div>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Aspiring full-stack developer with expertise in{' '}
              <span className="text-white font-medium">HTML, CSS, Java, JavaScript, and PHP</span>, 
              specializing in modern frameworks like{' '}
              <span className="text-white font-medium">React Native and Laravel</span>.
            </p>
          </div>
        </section>

        {/* Tech Stack Section - Client Component */}
        <TechStackSection />

        {/* Featured Projects */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        {/* OJT & Certification Section - Client Component */}
        <AutoSlidingRoadmap />

        {/* AI Learning Path Generator Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LearningPathGenerator />
        </section>

        {/* Personal Information Section - Red Theme */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 md:w-96 h-72 md:h-96 bg-red-400/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 md:w-96 h-72 md:h-96 bg-black/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            
            <div className="relative z-10 px-6 md:px-8 py-12 md:py-16">
              <div className="text-center mb-8 md:mb-10 animate-fade-in-up">
                <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2">
                  Contact Information
                </h2>
                <div className="w-20 h-1 bg-white/30 rounded-full mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6 animate-slide-in-left">
                  <div className="text-center lg:text-left">
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                      LORESCO RENZCELL RICK V.
                    </h3>
                    <div className="w-12 h-0.5 bg-white/40 rounded-full mx-auto lg:mx-0"></div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-center lg:justify-start group cursor-pointer">
                    <svg className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-white/90 text-sm md:text-base">041-H Coral, Mapandan, Pangasinan</p>
                      <a href="https://maps.google.com/?q=Mapandan+Pangasinan+Philippines" target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:text-white transition-colors inline-flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center lg:justify-start group cursor-pointer">
                    <svg className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+639664138823" className="text-white/90 text-sm md:text-base hover:text-white transition-colors">(+63) 966-413-8823</a>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center lg:justify-start group cursor-pointer">
                    <svg className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:renzcell.loresco.3@gmail.com" className="text-white/90 text-sm md:text-base hover:text-white transition-colors break-all">renzcell.loresco.3@gmail.com</a>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-center lg:justify-start pt-2 group">
                    <svg className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <div>
                      <p className="text-white/90 text-sm md:text-base font-medium">Bachelor of Science in Information Technology</p>
                      <div className="flex items-center gap-2 mt-1">
                        <img src="/udd.jpg" alt="Universidad de Dagupan Logo" className="h-6 w-auto object-contain bg-white/10 rounded p-0.5" />
                        <span className="text-white/70 text-xs md:text-sm">Universidad de Dagupan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 animate-slide-in-right">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span className="text-white/80 text-xs uppercase tracking-wider">My Location</span>
                    </div>
                    <div className="rounded-lg overflow-hidden h-48 md:h-56 lg:h-64">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123760.73922608666!2d120.383812957762!3d16.040588730497147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339165b1d3e6ad5f%3A0xc668c1b5e9f76946!2sMapandan%2C%20Pangasinan!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapandan, Pangasinan Map" className="rounded-lg"></iframe>
                    </div>
                    <p className="text-white/50 text-xs text-center mt-3">Mapandan, Pangasinan, Philippines</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <a href="mailto:renzcell.loresco.3@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </a>
                    <a href="tel:+639664138823" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Me
                    </a>
                    <a href="https://maps.google.com/?q=Mapandan+Pangasinan+Philippines" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10 pt-6 border-t border-white/20 animate-fade-in-up">
                <p className="text-white/60 text-xs md:text-sm">Available for full-time opportunities and freelance projects</p>
                <div className="flex justify-center gap-4 mt-3">
                  <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse-slow"></div>
                  <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse-slower"></div>
                  <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse-slow"></div>
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