"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, User, Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isProjectCard?: boolean;
  projectData?: {
    name: string;
    description: string;
    image: string;
    techStack: string[];
    features?: string[];
  };
}

// Project details with images and descriptions
const projectDetails = {
  "SyncSnap": {
    name: "SyncSnap",
    description: "A multi-tenant asynchronous daily standup and team collaboration system designed to help teams manage updates, track progress, and surface blockers in a more efficient and structured way.",
    image: "/SyncSnap/Screenshot (425).png",
    techStack: ["Laravel", "React", "PostgreSQL", "Gemini AI"],
    features: [
      "Asynchronous daily standup submissions",
      "Real-time team dashboard",
      "Blocker highlighting and prioritization",
      "Gamification with streaks and leaderboards",
      "AI-powered report generation",
      "Role-based access control"
    ]
  },
  "FlowState": {
    name: "FlowState",
    description: "A unified AI-powered project management and team collaboration system that manages tasks, workflows, and communication in real time.",
    image: "/Flowstate/Screenshot (381).png",
    techStack: ["Next.js", "MongoDB", "Tailwind CSS", "Gemini AI"],
    features: [
      "AI-powered task management",
      "Real-time collaboration",
      "Sprint planning with workload balancing",
      "Team feed with chat and activity tracking",
      "Blocker management system",
      "Customizable dashboard"
    ]
  },
  "Axiom Scrumban": {
    name: "Axiom Scrumban",
    description: "A project management system combining Scrum and Kanban methodologies for efficient team workflow and task tracking.",
    image: "/Axiom/Screenshot (425).png",
    techStack: ["Laravel", "Vue.js", "PostgreSQL"],
    features: [
      "Kanban-style task board",
      "Sprint planning and tracking",
      "Email notification system",
      "Project archive and restore",
      "Team collaboration tools"
    ]
  },
  "Base Platform & FurFund": {
    name: "Base Platform & FurFund",
    description: "A development and learning phase focused on exploring the Base blockchain platform, setting up Vercel environment, and building the initial prototype of FurFund.",
    image: "/FurFand/Screenshot (149).png",
    techStack: ["Next.js", "Base Blockchain", "Vercel"],
    features: [
      "Blockchain platform exploration",
      "Vercel deployment setup",
      "FurFund prototype development",
      "Future blockchain integration ready"
    ]
  },
  "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra": {
    name: "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra",
    description: "A UI/UX design task focused on creating a structured and visually appealing comparison page for the 2026 Chevrolet Silverado 1500 and 2026 Toyota Tundra.",
    image: "/Car/Screenshot (434).png",
    techStack: ["UI/UX Design", "Figma"],
    features: [
      "Side-by-side vehicle comparison",
      "Specifications and pricing tables",
      "Responsive design",
      "Modern automotive-style UI"
    ]
  }
};

// Helper to check if user is asking about a specific project
const getProjectFromQuery = (message: string): string | null => {
  const lowerMessage = message.toLowerCase().trim();
  
  const projectNames = Object.keys(projectDetails);
  
  for (const project of projectNames) {
    const lowerProject = project.toLowerCase();
    
    if (lowerMessage === lowerProject || 
        lowerMessage.includes(lowerProject) ||
        lowerProject.includes(lowerMessage)) {
      return project;
    }
    
    const variations = {
      "syncsnap": "SyncSnap",
      "sync snap": "SyncSnap",
      "sync": "SyncSnap",
      "flowstate": "FlowState",
      "flow state": "FlowState",
      "flow": "FlowState",
      "axiom": "Axiom Scrumban",
      "axiom scrumban": "Axiom Scrumban",
      "scrumban": "Axiom Scrumban",
      "furfund": "Base Platform & FurFund",
      "fur fund": "Base Platform & FurFund",
      "base platform": "Base Platform & FurFund",
      "chevrolet": "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra",
      "silverado": "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra",
      "tundra": "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra",
      "car comparison": "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra",
      "vehicle comparison": "2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra"
    };
    
    for (const [key, value] of Object.entries(variations)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
  }
  
  return null;
};

// Welcome message
const WELCOME_MESSAGE = {
  text: "🤖 **Hi there!** I'm Renzcell Bot, your AI assistant!\n\nI can help you with:\n• 📁 **Projects** - Type project names like 'SyncSnap' or 'FlowState'\n• 📋 **List all projects** - See everything I've worked on\n• 🛠️ **Skills & Technologies** - Ask about my tech stack\n• 🎓 **Education & Certifications** - Learn about my background\n• 📞 **Contact Information** - How to reach me\n\nWhat would you like to know about Renzcell? ✨",
  sender: 'bot' as const
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [showFloatingMessage, setShowFloatingMessage] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🤖 Hello! I'm Renzcell Bot, your AI assistant! I can help answer questions about Renzcell's skills, experience, projects, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const floatingMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Knowledge base
  const knowledgeBase = {
    name: "Renzcell Rick V. Loresco",
    education: "BSIT Student at Universidad De Dagupan",
    skills: ["HTML5", "CSS3", "Java", "JavaScript", "PHP", "React Native", "Laravel", "MySQL", "MariaDB", "MongoDB", "PostgreSQL", "Figma", "Canva"],
    projects: ["Axiom Scrumban", "SyncSnap", "FlowState"],
    ojt: "OJT at MakerSpace Innohub",
    certification: "NCII CSS Certified (Passed May 6, 2026)",
    experience: "Full-stack development, AI integration, real-time applications",
    interests: "Web development, AI, mobile apps, UI/UX design",
    contact: "Email: renzcell.loresco.3@gmail.com | Phone: (+63) 966-413-8823",
    location: "041-H Coral, Mapandan, Pangasinan"
  };

  // Cycle floating message
  useEffect(() => {
    const cycleFloatingMessage = () => {
      if (!isOpen) {
        setShowFloatingMessage(true);
        floatingMessageTimeoutRef.current = setTimeout(() => {
          setShowFloatingMessage(false);
          floatingMessageTimeoutRef.current = setTimeout(() => {
            cycleFloatingMessage();
          }, 5000);
        }, 5000);
      }
    };
    
    cycleFloatingMessage();
    
    return () => {
      if (floatingMessageTimeoutRef.current) {
        clearTimeout(floatingMessageTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Show welcome message when chat opens
  useEffect(() => {
    if (isOpen && !hasWelcomed && !isMinimized) {
      setHasWelcomed(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: WELCOME_MESSAGE.text,
          sender: 'bot',
          timestamp: new Date()
        }]);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [isOpen, hasWelcomed, isMinimized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [isOpen, isMinimized]);

  const generateResponse = (userMessage: string): { text: string; isProjectCard?: boolean; projectData?: any } => {
    const lowerMessage = userMessage.toLowerCase();
    
    const projectName = getProjectFromQuery(userMessage);
    if (projectName) {
      const project = projectDetails[projectName as keyof typeof projectDetails];
      if (project) {
        return {
          text: `🤖 Here's detailed information about **${project.name}**:`,
          isProjectCard: true,
          projectData: project
        };
      }
    }
    
    if (lowerMessage.match(/list all projects|all projects|show projects|what projects|projects you have|list projects|available projects/i)) {
      const projectList = Object.keys(projectDetails).map(name => `• **${name}**`).join('\n');
      return {
        text: `🤖 Here are all the projects I've worked on:\n\n${projectList}\n\nType the name of any project (e.g., "SyncSnap") to see detailed information!`,
        isProjectCard: false
      };
    }
    
    if (lowerMessage.match(/hello|hi|hey|greetings|sup|good morning|good afternoon|good evening/i)) {
      return { text: "🤖 Hello! I'm Renzcell Bot. How can I help you today? Feel free to ask about my skills, projects, experience, or anything else!", isProjectCard: false };
    }
    
    if (lowerMessage.match(/your name|who are you|what's your name|introduce yourself/i)) {
      return { text: `🤖 I'm Renzcell Bot, your AI assistant! I'm here to help you learn more about ${knowledgeBase.name}. What would you like to know?`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/about|bio|who is|tell me about|background/i)) {
      return { text: `🤖 ${knowledgeBase.name} is a ${knowledgeBase.education}. He's passionate about full-stack development and building innovative web applications. ${knowledgeBase.certification} and currently completed OJT at MakerSpace Innohub.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/skill|technologies|tech stack|what can you do|programming languages|tools/i)) {
      return { text: `🤖 ${knowledgeBase.name} is proficient in: ${knowledgeBase.skills.join(', ')}. He specializes in full-stack development using these technologies.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/ojt|internship|training|maker space|makerspace/i)) {
      return { text: `🤖 ${knowledgeBase.name} completed his OJT at ${knowledgeBase.ojt}. During this time, he worked on real-world projects including SyncSnap, FlowState, and contributed to various full-stack applications.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/certification|ncii|certified|passed|exam|assessment/i)) {
      return { text: `🤖 ${knowledgeBase.certification} 🎉 This certification validates his proficiency in computer systems servicing and web development.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/education|school|university|college|study|learn/i)) {
      return { text: `🤖 ${knowledgeBase.name} is currently pursuing ${knowledgeBase.education}. He's dedicated to continuous learning and staying updated with the latest technologies.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/experience|work|job|career|professional/i)) {
      return { text: `🤖 ${knowledgeBase.name} has experience in ${knowledgeBase.experience}. His OJT at MakerSpace Innohub provided hands-on experience with real-world projects and team collaboration.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/contact|email|phone|reach|connect|get in touch/i)) {
      return { text: `🤖 You can reach ${knowledgeBase.name} via:\n📧 ${knowledgeBase.contact.split('|')[0]}\n📞 ${knowledgeBase.contact.split('|')[1]}\n📍 ${knowledgeBase.location}`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/interest|passion|hobby|like|love|enjoy/i)) {
      return { text: `🤖 ${knowledgeBase.name} is passionate about ${knowledgeBase.interests}. He loves solving complex problems and creating beautiful, functional applications that make a difference.`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/location|address|where|from/i)) {
      return { text: `🤖 ${knowledgeBase.name} is based in ${knowledgeBase.location}. He's open to remote opportunities worldwide! 🌍`, isProjectCard: false };
    }
    
    if (lowerMessage.match(/thank|thanks|appreciate|grateful/i)) {
      return { text: "🤖 You're very welcome! 😊 I'm glad I could help. Feel free to ask if you have any other questions about Renzcell's work or experience!", isProjectCard: false };
    }
    
    if (lowerMessage.match(/bye|goodbye|see you|farewell|exit/i)) {
      return { text: "🤖 Thanks for chatting! 👋 Feel free to come back if you have more questions. Have a great day!", isProjectCard: false };
    }
    
    return { text: "🤖 That's a great question! 💭 I'm happy to help. You can ask me about Renzcell's skills, projects, education, OJT experience, certifications, or contact information.\n\n💡 **Try these commands:**\n• Type a project name like **SyncSnap** or **FlowState**\n• Type **List all projects** to see all projects\n• Ask about **skills**, **education**, or **contact**", isProjectCard: false };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        isProjectCard: response.isProjectCard,
        projectData: response.projectData
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "🤖 Chat cleared! I'm Renzcell Bot, ready to help you again. What would you like to know?\n\n💡 **Try these:**\n• Type **SyncSnap** to see project details\n• Type **List all projects** to see all projects\n• Type **Skills** to see my tech stack",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Project Card Component
  const ProjectCard = ({ project }: { project: { name: string; description: string; image: string; techStack: string[]; features?: string[] } }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div className="bg-gray-800/80 rounded-xl overflow-hidden border border-red-500/20 mt-2 mb-1">
        <div className="aspect-video w-full overflow-hidden bg-gray-900">
          {!imgError && project.image ? (
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <Bot className="w-12 h-12 text-gray-600" />
            </div>
          )}
        </div>
        <div className="p-3">
          <h4 className="font-bold text-white text-sm mb-1">{project.name}</h4>
          <p className="text-gray-400 text-xs mb-2 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[9px]">
                {tech}
              </span>
            ))}
          </div>
          {project.features && project.features.length > 0 && (
            <details className="text-[10px] text-gray-500">
              <summary className="cursor-pointer hover:text-red-400 transition-colors">🔍 View features ({project.features.length})</summary>
              <ul className="mt-1 space-y-0.5 pl-3">
                {project.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="text-gray-400">• {feature}</li>
                ))}
                {project.features.length > 4 && (
                  <li className="text-gray-500">+{project.features.length - 4} more features</li>
                )}
              </ul>
            </details>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div 
          className={`absolute bottom-16 right-0 mb-2 transition-all duration-500 ${
            showFloatingMessage 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-gradient-to-r from-red-600/95 to-red-500/95 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-red-400/30 shadow-xl max-w-[220px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-white font-semibold">🤖 Renzcell Bot</span>
            </div>
            <p className="text-[11px] text-white/90 mt-1.5 leading-relaxed">
              Need help? Ask me about projects, skills & more!
            </p>
            <div className="absolute -bottom-1 right-4 w-2.5 h-2.5 bg-red-500/95 rotate-45 border-r border-b border-red-400/30"></div>
          </div>
        </div>
        
        <button
          onClick={() => {
            setIsOpen(true);
            setShowFloatingMessage(false);
          }}
          className="relative group animate-float-robot"
        >
          <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping opacity-75"></div>
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-antenna">
            <div className="w-0.5 h-3 sm:w-1 sm:h-4 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 -mt-1"></div>
          </div>
          <div className="absolute top-3 left-2 sm:top-3.5 sm:left-2.5 flex gap-1.5">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-blink"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-blink delay-150"></div>
          </div>
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 text-xs bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with Renzcell Bot 🤖
          </span>
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
        </button>
      </div>
    );
  }

  return (
    <>
      {!isMinimized && (
        <div 
          className="hidden sm:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Adjusted position - moved lower to avoid browser address bar */}
      <div className={`fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'bottom-4 right-4 w-[380px] h-14 animate-slide-down' 
          : 'bottom-6 right-6 w-[420px] h-[600px] animate-slide-up'
      }`}>
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-500/20 overflow-hidden flex flex-col h-full">
          
          {/* Header - Made more compact */}
          <div className="flex-shrink-0 bg-gradient-to-r from-red-500/10 to-red-600/10 border-b border-red-500/20">
            <div className="px-4 py-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center animate-float-small">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs flex items-center gap-1 text-white">
                      Renzcell Bot
                      <Sparkles className="w-2.5 h-2.5 text-yellow-500 animate-pulse" />
                    </h3>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      Online • AI Assistant
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? <Maximize2 className="w-3 h-3 text-gray-400" /> : <Minimize2 className="w-3 h-3 text-gray-400" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Status bar - More compact */}
            <div className="px-4 pb-2.5 pt-0">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-gray-800/30 rounded-lg px-2.5 py-1.5">
                <div className="flex gap-0.5">
                  <span className="w-0.5 h-0.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-0.5 h-0.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-0.5 h-0.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span>🤖 Type a project name like "SyncSnap" or "FlowState"</span>
              </div>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 min-h-0 custom-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                          : 'bg-gray-800/50 border border-red-500/10'
                      }`}
                    >
                      {/* Message header */}
                      <div className="flex items-center gap-1.5 mb-1">
                        {message.sender === 'bot' ? (
                          <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-1.5 h-1.5 text-red-500" />
                          </div>
                        ) : (
                          <User className="w-2.5 h-2.5 text-white/70 flex-shrink-0" />
                        )}
                        <span className="text-[10px] opacity-70">
                          {message.sender === 'bot' ? 'Renzcell Bot' : 'You'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {/* Message content */}
                      <div className="text-xs whitespace-pre-wrap break-words">
                        {message.text.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>{line}</p>
                        ))}
                      </div>
                      {/* Project card */}
                      {message.isProjectCard && message.projectData && (
                        <ProjectCard project={message.projectData} />
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start w-full">
                    <div className="bg-gray-800/50 border border-red-500/10 rounded-2xl px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                          <Bot className="w-1.5 h-1.5 text-red-500" />
                        </div>
                        <div className="flex gap-0.5">
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - More compact */}
              <div className="flex-shrink-0 border-t border-gray-800 p-3 bg-gray-900/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Try: SyncSnap, FlowState..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-xs text-white placeholder:text-gray-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[9px] text-gray-500 flex items-center gap-1">
                    <span className="animate-wave">🤖</span>
                    Try: "SyncSnap", "FlowState", or "List all projects"
                  </p>
                  <button
                    onClick={clearChat}
                    className="text-[9px] text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear chat
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-robot {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-small {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes antenna {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        
        @keyframes wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float-robot {
          animation: float-robot 3s ease-in-out infinite;
        }
        
        .animate-float-small {
          animation: float-small 2s ease-in-out infinite;
        }
        
        .animate-antenna {
          animation: antenna 2s ease-in-out infinite;
          transform-origin: center top;
        }
        
        .animate-blink {
          animation: blink 3s infinite;
        }
        
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          display: inline-block;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </>
  );
}