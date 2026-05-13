"use client";

import { Code2, Cpu } from 'lucide-react';

const techStackData = [
  // Programming Languages
  { 
    name: "HTML5", 
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "from-orange-500 to-orange-600",
    description: "Semantic markup for modern web applications"
  },
  { 
    name: "CSS3", 
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "from-blue-500 to-blue-600",
    description: "Responsive designs with Flexbox & Grid"
  },
  { 
    name: "Java", 
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "from-red-600 to-red-700",
    description: "Object-oriented programming & backend logic"
  },
  { 
    name: "JavaScript", 
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "from-yellow-500 to-yellow-600",
    description: "Dynamic interactions & frontend logic"
  },
  { 
    name: "PHP", 
    category: "Programming",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "from-purple-600 to-purple-700",
    description: "Server-side scripting & backend development"
  },
  // Frameworks & Tools
  { 
    name: "React Native", 
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-500 to-cyan-600",
    description: "Cross-platform mobile app development"
  },
  { 
    name: "Laravel", 
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    color: "from-red-500 to-red-600",
    description: "Elegant PHP framework for web artisans"
  },
  { 
    name: "Socket.io", 
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    color: "from-gray-500 to-gray-600",
    description: "Real-time, bidirectional event-based communication"
  },
  { 
    name: "GitHub", 
    category: "Tool",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "from-gray-700 to-gray-800",
    description: "Version control & collaborative development"
  },
  { 
    name: "VS Code", 
    category: "Tool",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "from-blue-500 to-blue-600",
    description: "Powerful code editor with extensions"
  },
  { 
    name: "XAMPP", 
    category: "Tool",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xampp/xampp-original.svg",
    color: "from-orange-600 to-orange-700",
    description: "Local web server environment for testing"
  },
  // Databases
  { 
    name: "MySQL", 
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "from-blue-500 to-blue-600",
    description: "Relational database management system"
  },
  { 
    name: "MariaDB", 
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
    color: "from-amber-600 to-amber-700",
    description: "Open-source relational database"
  },
  { 
    name: "MongoDB", 
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-600 to-green-700",
    description: "NoSQL document database for modern apps"
  },
  { 
    name: "PostgreSQL", 
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "from-sky-600 to-blue-700",
    description: "Advanced open-source relational database"
  },
  // Design Tools
  { 
    name: "Canva", 
    category: "Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    color: "from-indigo-500 to-indigo-600",
    description: "Graphic design & visual content creation"
  },
  { 
    name: "Figma", 
    category: "Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "from-purple-500 to-purple-600",
    description: "UI/UX design & prototyping tool"
  }
];

const categories = {
  Programming: techStackData.filter(t => t.category === "Programming"),
  Framework: techStackData.filter(t => t.category === "Framework"),
  Tool: techStackData.filter(t => t.category === "Tool"),
  Database: techStackData.filter(t => t.category === "Database"),
  Design: techStackData.filter(t => t.category === "Design")
};

export default function TechStackSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            <Code2 className="w-3 h-3" />
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A comprehensive toolkit of programming languages, frameworks, databases, and design tools
          </p>
        </div>

        <div className="space-y-10 md:space-y-12">
          {Object.entries(categories).map(([category, items]) => (
            items.length > 0 && (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <div className="w-8 h-0.5 bg-primary/30 rounded-full"></div>
                  <h3 className="font-headline font-bold text-lg md:text-xl text-foreground">
                    {category}
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-transparent rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {items.map((tech, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`h-1 bg-gradient-to-r ${tech.color}`}></div>
                      <div className="p-4 md:p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-md`}>
                            <img 
                              src={tech.logo} 
                              alt={tech.name}
                              className="w-6 h-6 object-contain brightness-0 invert"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground text-base md:text-lg">
                              {tech.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">{tech.category}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                          {tech.description}
                        </p>
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-primary/70 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                            Proficient
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="flex justify-center mt-10 md:mt-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/5 rounded-full border border-primary/10 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-bold text-primary">{techStackData.length}+</span> Technologies & Tools
            </span>
            <div className="w-1 h-1 rounded-full bg-primary/30"></div>
            <span className="text-xs text-muted-foreground">Always learning 📚</span>
          </div>
        </div>
      </div>
    </section>
  );
}