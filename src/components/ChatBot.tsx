"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, User, Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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

  // Knowledge base about you
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.match(/hello|hi|hey|greetings|sup|good morning|good afternoon|good evening/i)) {
      return "🤖 Hello! I'm Renzcell Bot. How can I help you today? Feel free to ask about my skills, projects, experience, or anything else!";
    }
    
    if (lowerMessage.match(/your name|who are you|what's your name|introduce yourself/i)) {
      return `🤖 I'm Renzcell Bot, your AI assistant! I'm here to help you learn more about ${knowledgeBase.name}. What would you like to know?`;
    }
    
    if (lowerMessage.match(/about|bio|who is|tell me about|background/i)) {
      return `🤖 ${knowledgeBase.name} is a ${knowledgeBase.education}. He's passionate about full-stack development and building innovative web applications. ${knowledgeBase.certification} and currently completed OJT at MakerSpace Innohub.`;
    }
    
    if (lowerMessage.match(/skill|technologies|tech stack|what can you do|programming languages|tools/i)) {
      return `🤖 ${knowledgeBase.name} is proficient in: ${knowledgeBase.skills.join(', ')}. He specializes in full-stack development using these technologies.`;
    }
    
    if (lowerMessage.match(/project|work|built|created|developed|portfolio/i)) {
      return `🤖 ${knowledgeBase.name} has worked on several exciting projects including: ${knowledgeBase.projects.join(', ')}. These projects showcase his skills in full-stack development, AI integration, and real-time applications.`;
    }
    
    if (lowerMessage.match(/ojt|internship|training|maker space|makerspace/i)) {
      return `🤖 ${knowledgeBase.name} completed his OJT at ${knowledgeBase.ojt}. During this time, he worked on real-world projects including SyncSnap, FlowState, and contributed to various full-stack applications.`;
    }
    
    if (lowerMessage.match(/certification|ncii|certified|passed|exam|assessment/i)) {
      return `🤖 ${knowledgeBase.certification} 🎉 This certification validates his proficiency in computer systems servicing and web development.`;
    }
    
    if (lowerMessage.match(/education|school|university|college|study|learn/i)) {
      return `🤖 ${knowledgeBase.name} is currently pursuing ${knowledgeBase.education}. He's dedicated to continuous learning and staying updated with the latest technologies.`;
    }
    
    if (lowerMessage.match(/experience|work|job|career|professional/i)) {
      return `🤖 ${knowledgeBase.name} has experience in ${knowledgeBase.experience}. His OJT at MakerSpace Innohub provided hands-on experience with real-world projects and team collaboration.`;
    }
    
    if (lowerMessage.match(/contact|email|phone|reach|connect|get in touch/i)) {
      return `🤖 You can reach ${knowledgeBase.name} via:\n📧 ${knowledgeBase.contact.split('|')[0]}\n📞 ${knowledgeBase.contact.split('|')[1]}\n📍 ${knowledgeBase.location}`;
    }
    
    if (lowerMessage.match(/interest|passion|hobby|like|love|enjoy/i)) {
      return `🤖 ${knowledgeBase.name} is passionate about ${knowledgeBase.interests}. He loves solving complex problems and creating beautiful, functional applications that make a difference.`;
    }
    
    if (lowerMessage.match(/location|address|where|from/i)) {
      return `🤖 ${knowledgeBase.name} is based in ${knowledgeBase.location}. He's open to remote opportunities worldwide! 🌍`;
    }
    
    if (lowerMessage.match(/thank|thanks|appreciate|grateful/i)) {
      return "🤖 You're very welcome! 😊 I'm glad I could help. Feel free to ask if you have any other questions about Renzcell's work or experience!";
    }
    
    if (lowerMessage.match(/bye|goodbye|see you|farewell|exit/i)) {
      return "🤖 Thanks for chatting! 👋 Feel free to come back if you have more questions. Have a great day!";
    }
    
    if (lowerMessage.match(/help|what can you do|capabilities|features/i)) {
      return "🤖 I can help you learn about:\n• Skills & Technologies\n• Projects & Portfolio\n• Education & Certifications\n• OJT Experience\n• Contact Information\n\nJust ask me anything about Renzcell! 💬";
    }
    
    return "🤖 That's a great question! 💭 I'm happy to help. You can ask me about Renzcell's skills, projects, education, OJT experience, certifications, or contact information. What would you like to know?";
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
      const responseText = generateResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
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
        text: "🤖 Chat cleared! I'm Renzcell Bot, ready to help you again. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
      >
        <div className="relative">
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping opacity-75"></div>
          
          {/* Robot icon floating animation */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-float-robot">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          
          {/* Moving antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-antenna">
            <div className="w-0.5 h-3 sm:w-1 sm:h-4 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 -mt-1"></div>
          </div>
          
          {/* Moving eyes */}
          <div className="absolute top-3 left-2 sm:top-3.5 sm:left-2.5 flex gap-1.5">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-blink"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-blink delay-150"></div>
          </div>
          
          {/* Tooltip - hidden on mobile */}
          <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 text-xs bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with Renzcell Bot 🤖
          </span>
          
          {/* Online indicator */}
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop overlay - only on larger screens when not minimized */}
      {!isMinimized && (
        <div 
          className="hidden sm:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window - Medium Fixed Size (400px width, 550px height) */}
      <div className={`fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'bottom-4 right-4 w-[380px] h-14' 
          : 'bottom-6 right-6 w-[400px] h-[550px]'
      }`}>
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-500/20 overflow-hidden flex flex-col h-full animate-slide-up">
          
          {/* Header - Fixed spacing with no overlap */}
          <div className="flex-shrink-0 bg-gradient-to-r from-red-500/10 to-red-600/10 border-b border-red-500/20">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* Animated robot in header */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center animate-float-small">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-1 text-white">
                      Renzcell Bot
                      <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Online • AI Assistant
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? <Maximize2 className="w-3.5 h-3.5 text-gray-400" /> : <Minimize2 className="w-3.5 h-3.5 text-gray-400" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Status message - separate section with its own padding and border */}
            <div className="px-4 pb-4 pt-0 border-t border-red-500/10">
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-800/30 rounded-lg px-3 py-2">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span>🤖 Ready to help you! Ask me anything about Renzcell's skills, projects, or experience.</span>
              </div>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container - Scrollable area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                          : 'bg-gray-800/50 border border-red-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === 'bot' ? (
                          <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Bot className="w-2.5 h-2.5 text-red-500" />
                          </div>
                        ) : (
                          <User className="w-3 h-3 text-white/70" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.sender === 'bot' ? 'Renzcell Bot' : 'You'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-white break-words">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-fade-in-up">
                    <div className="bg-gray-800/50 border border-red-500/10 rounded-2xl px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                          <Bot className="w-2.5 h-2.5 text-red-500" />
                        </div>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Fixed at bottom */}
              <div className="flex-shrink-0 border-t border-gray-800 p-4 bg-gray-900/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Renzcell..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white placeholder:text-gray-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] text-gray-500 flex items-center gap-1">
                    <span className="animate-wave">🤖</span>
                    Ask about skills, projects, experience
                  </p>
                  <button
                    onClick={clearChat}
                    className="text-[10px] text-gray-500 hover:text-red-500 transition-colors"
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}