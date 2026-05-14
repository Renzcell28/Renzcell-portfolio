import { Metadata } from 'next';
import LearningPathGenerator from '@/components/LearningPathGenerator';
import { Sparkles, Target, Brain, Rocket, Trophy, Clock, BookOpen, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Learning Path Generator | DevVault Portfolio',
  description: 'Get personalized AI-generated learning roadmaps for your career goals.',
};

export default function AILearningPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-xs font-bold mb-4">
            <Sparkles className="w-3 h-3" />
            <span>AI-POWERED CAREER GUIDANCE</span>
          </div>
          
          <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            AI Learning Path Generator
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Get personalized, AI-generated learning roadmaps tailored to your career goals.
          </p>
        </div>

        {/* Learning Path Generator Component */}
        <LearningPathGenerator />
      </div>
    </div>
  );
}