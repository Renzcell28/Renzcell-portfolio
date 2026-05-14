"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Briefcase, BookOpen, Home, LayoutGrid, Sparkles, Target, Brain } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Work', href: '/work', icon: Briefcase },
  { name: 'Logs', href: '/logs', icon: BookOpen },
  { name: 'AI Learning Path', href: '/ai-learning', icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-red-500/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center text-white font-headline font-bold text-lg shadow-lg shadow-red-500/25 group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block text-white">
            DevVault <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Portfolio</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] relative group",
                  isActive 
                    ? "bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-500 shadow-sm" 
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive && "text-red-500")} />
                <span className="hidden xs:inline">{item.name}</span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
                )}
                
                {/* Hover effect */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/5 to-red-600/5"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}