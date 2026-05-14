"use client";

import { useState } from 'react';
import { Sparkles, Loader2, Target, BookOpen, Clock, CheckCircle, ChevronRight, Zap, Trophy, Brain, Code, Database, Layout, Server, Shield, GitBranch, Cloud, Cpu, Smartphone, RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  resources: string[];
  skills: string[];
  completed: boolean;
}

interface LearningPath {
  title: string;
  description: string;
  totalDuration: string;
  steps: RoadmapStep[];
  recommendedTech: string[];
  careerOpportunities: string[];
  summary?: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

export default function LearningPathGenerator() {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: number]: boolean }>({});
  const [generationCount, setGenerationCount] = useState(0);

  const careerGoals = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      icon: <Layout className="w-5 h-5" />,
      description: 'Build beautiful, responsive user interfaces',
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'Vue', 'Angular', 'Tailwind', 'Next.js']
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      icon: <Server className="w-5 h-5" />,
      description: 'Create robust APIs and database systems',
      color: 'from-green-500 to-emerald-500',
      skills: ['Node.js', 'Python', 'Java', 'SQL', 'Docker']
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      icon: <Code className="w-5 h-5" />,
      description: 'Master both frontend and backend',
      color: 'from-purple-500 to-pink-500',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript']
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      icon: <Cloud className="w-5 h-5" />,
      description: 'Automate deployment and infrastructure',
      color: 'from-orange-500 to-red-500',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux']
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Create native mobile applications',
      color: 'from-teal-500 to-cyan-500',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Engineer',
      icon: <Brain className="w-5 h-5" />,
      description: 'Build intelligent systems and models',
      color: 'from-indigo-500 to-purple-500',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy']
    }
  ];

  const toggleStepComplete = (stepId: number) => {
    setProgress(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Generate unique summary paragraphs based on the roadmap and a random seed
  const generateUniqueSummary = (roadmap: LearningPath, goal: string, seed: number) => {
    const goalName = goal.charAt(0).toUpperCase() + goal.slice(1);
    const totalSteps = roadmap.steps.length;
    const mainTechnologies = roadmap.recommendedTech.slice(0, 5).join(', ');
    const careerPaths = roadmap.careerOpportunities.slice(0, 3).join(', ');
    
    // Different summary variations based on seed to ensure uniqueness
    const summaryVariations = [
      {
        p1: `The ${roadmap.title} offers a structured ${roadmap.totalDuration} pathway to becoming a skilled ${goalName} developer. This comprehensive roadmap is divided into ${totalSteps} progressive phases, each designed to build upon the previous knowledge. By following this AI-generated learning path, you'll gain practical, job-ready skills that employers are actively seeking in ${new Date().getFullYear()}.`,
        p2: `Throughout this journey, you'll master essential tools including ${mainTechnologies}, developing proficiency in ${totalSteps * 2}+ core competencies. Each phase includes curated resources from industry experts, hands-on coding exercises, and real-world project opportunities. The curriculum emphasizes both theoretical understanding and practical application, ensuring you can immediately contribute to development teams.`,
        p3: `Upon completion, you'll be qualified for positions such as ${careerPaths}, with a portfolio of projects demonstrating your capabilities. The flexible ${roadmap.totalDuration} timeline can be adjusted to fit your schedule, whether you're learning full-time or balancing other commitments. Start your transformation today by working through each phase sequentially and tracking your progress.`
      },
      {
        p1: `Embark on your ${goalName} developer journey with this AI-crafted ${roadmap.totalDuration} learning roadmap. The path consists of ${totalSteps} carefully sequenced stages, each targeting specific competencies required in modern ${goalName} development. This roadmap has been generated uniquely for you, featuring the latest technologies and industry best practices.`,
        p2: `You'll gain hands-on experience with ${mainTechnologies}, mastering techniques through ${totalSteps} progressive learning modules. Each step provides curated learning resources, practical coding challenges, and skill-building exercises. The roadmap is designed to take you from foundational concepts to advanced, production-ready capabilities.`,
        p3: `Completing this roadmap positions you for exciting career opportunities including ${careerPaths}. The ${roadmap.totalDuration} timeframe is an estimate based on consistent study; you can accelerate or extend based on your learning pace. Track your progress through each phase and celebrate milestones as you build your development expertise.`
      },
      {
        p1: `Transform into a professional ${goalName} developer with this AI-personalized ${roadmap.totalDuration} learning roadmap. The journey includes ${totalSteps} comprehensive phases, each strategically designed to build essential skills progressively. This roadmap incorporates real industry requirements and emerging technologies shaping the ${new Date().getFullYear()} tech landscape.`,
        p2: `Your learning adventure covers ${mainTechnologies}, with each phase delivering ${totalSteps * 2}+ actionable skills and knowledge areas. Access premium learning resources, practical projects, and skill assessments throughout the journey. The curriculum balances theoretical foundations with practical implementation, preparing you for real-world development challenges.`,
        p3: `Career opportunities awaiting you include ${careerPaths}, with competitive salaries and growth potential. The ${roadmap.totalDuration} timeline is adaptable to your lifestyle, whether you're learning intensively or part-time. Begin your transformation now by tackling each phase sequentially and watching your skills grow.`
      },
      {
        p1: `This AI-generated ${roadmap.totalDuration} roadmap provides a clear pathway to ${goalName} developer proficiency across ${totalSteps} structured phases. Each phase has been carefully crafted to address specific skill gaps and industry demands, ensuring you learn what matters most for ${new Date().getFullYear()}'s job market.`,
        p2: `Throughout your learning journey, you'll explore ${mainTechnologies}, developing expertise through hands-on projects and real-world scenarios. The curriculum includes ${totalSteps * 2}+ practical skills, each backed by curated resources from leading educators and industry practitioners.`,
        p3: `Upon completion, you'll be ready for roles including ${careerPaths}, supported by a portfolio of projects demonstrating your capabilities. The flexible ${roadmap.totalDuration} timeline allows you to learn at your own pace while maintaining quality and depth of understanding.`
      },
      {
        p1: `Your personalized ${goalName} developer roadmap spans ${roadmap.totalDuration} and includes ${totalSteps} progressive learning phases. This AI-crafted pathway focuses on the most in-demand skills and technologies for ${new Date().getFullYear()}, ensuring you're learning relevant, marketable skills throughout your journey.`,
        p2: `You'll master ${mainTechnologies} while developing ${totalSteps * 2}+ practical competencies. Each phase includes expert-curated resources, coding exercises, and project-based learning opportunities designed to reinforce your understanding and build confidence.`,
        p3: `Career paths opening to you include ${careerPaths}, with opportunities across industries and company sizes. The ${roadmap.totalDuration} timeline is achievable with consistent effort, and you can track your progress through each phase as you build toward professional readiness.`
      }
    ];
    
    // Use seed to select a variation (ensures different text each time)
    const variationIndex = seed % summaryVariations.length;
    const variation = summaryVariations[variationIndex];
    
    return {
      paragraph1: variation.p1,
      paragraph2: variation.p2,
      paragraph3: variation.p3,
    };
  };

  const generateLearningPath = async () => {
    if (!selectedGoal) return;

    setLoading(true);
    setError(null);

    try {
      const timestamp = Date.now();
      const uniqueSeed = timestamp + generationCount;
      
      const response = await fetch('/api/ai/learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          goal: selectedGoal,
          seed: uniqueSeed,
          variation: generationCount
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate learning path');
      }
      
      const safeSteps = Array.isArray(data.steps) && data.steps.length > 0 ? data.steps : [];
      const safeRecommendedTech = Array.isArray(data.recommendedTech) ? data.recommendedTech : [];
      const safeCareerOpportunities = Array.isArray(data.careerOpportunities) ? data.careerOpportunities : [];
      
      const roadmapData = {
        title: data.title || `${selectedGoal} Developer Roadmap ${new Date().getFullYear()}`,
        description: data.description || `Complete roadmap to become a ${selectedGoal} developer`,
        totalDuration: data.totalDuration || '6-10 months',
        steps: safeSteps.map((step: any, index: number) => ({
          id: index + 1,
          title: step.title || `Step ${index + 1}`,
          description: step.description || 'Learn essential skills',
          duration: step.duration || '4-6 weeks',
          resources: Array.isArray(step.resources) ? step.resources.slice(0, 3) : [],
          skills: Array.isArray(step.skills) ? step.skills.slice(0, 3) : [],
          completed: false
        })),
        recommendedTech: safeRecommendedTech,
        careerOpportunities: safeCareerOpportunities,
      };
      
      // Generate unique summary based on the roadmap and seed
      const uniqueSummary = generateUniqueSummary(roadmapData, selectedGoal, uniqueSeed);
      roadmapData.summary = uniqueSummary;
      
      setLearningPath(roadmapData);
      setProgress({});
      setGenerationCount(prev => prev + 1);
      
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'AI service unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const regenerateLearningPath = () => {
    generateLearningPath();
  };

  const calculateOverallProgress = () => {
    if (!learningPath) return 0;
    const completedCount = Object.values(progress).filter(Boolean).length;
    return (completedCount / learningPath.steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Goal Selection */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-4">
          <Target className="w-3 h-3" />
          <span>CAREER GOAL SELECTOR</span>
        </div>
        <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl mb-3 text-white">
          Choose Your <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Career Path</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select your desired career goal and get a personalized AI-generated learning roadmap
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerGoals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoal(goal.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
              selectedGoal === goal.id
                ? `border-red-500 bg-gradient-to-r ${goal.color} bg-opacity-10 shadow-lg shadow-red-500/20`
                : 'border-gray-800 hover:border-red-500/50 bg-gray-900/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color} text-white`}>
                {goal.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{goal.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{goal.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {goal.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      {skill}
                    </span>
                  ))}
                  {goal.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{goal.skills.length - 3}</span>
                  )}
                </div>
              </div>
              {selectedGoal === goal.id && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Generate Button */}
      {selectedGoal && !learningPath && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={generateLearningPath}
            disabled={loading}
            className="px-8 py-6 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating Your Learning Path...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Learning Path
              </>
            )}
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={generateLearningPath}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Learning Path Result */}
      {learningPath && learningPath.steps && learningPath.steps.length > 0 && (
        <div className="mt-8 animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white">{learningPath.title}</h3>
                  <button
                    onClick={regenerateLearningPath}
                    disabled={loading}
                    className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors group"
                    title="Generate different roadmap"
                  >
                    <RefreshCw className={`w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <p className="text-gray-400">{learningPath.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800 text-gray-300">
                    <Clock className="w-3 h-3" />
                    {learningPath.totalDuration}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800 text-gray-300">
                    <BookOpen className="w-3 h-3" />
                    {learningPath.steps.length} Steps
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-800"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - calculateOverallProgress() / 100)}`}
                      className="text-red-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{Math.round(calculateOverallProgress())}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Progress</p>
              </div>
            </div>
          </div>

          {/* Dynamic Text Summary - 3 Unique Paragraphs */}
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-red-500/5 via-red-600/5 to-transparent border border-red-500/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-400">Roadmap Summary</h4>
              <Badge variant="outline" className="text-[10px] ml-auto border-gray-700 text-gray-400">
                AI Generated • Version {generationCount + 1}
              </Badge>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="text-gray-300">{learningPath.summary?.paragraph1 || generateUniqueSummary(learningPath, selectedGoal, Date.now()).paragraph1}</p>
              <p className="text-gray-300">{learningPath.summary?.paragraph2 || generateUniqueSummary(learningPath, selectedGoal, Date.now()).paragraph2}</p>
              <p className="text-gray-300">{learningPath.summary?.paragraph3 || generateUniqueSummary(learningPath, selectedGoal, Date.now()).paragraph3}</p>
            </div>
          </div>

          {/* Learning Steps */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-red-500" />
                Learning Path Steps
              </h4>
              <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                AI Generated • {new Date().toLocaleDateString()}
              </Badge>
            </div>
            <div className="space-y-3">
              {learningPath.steps.map((step) => (
                <div
                  key={step.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    progress[step.id]
                      ? 'bg-green-500/5 border-green-500/30'
                      : 'bg-gray-900/50 border-gray-800 hover:border-red-500/30'
                  }`}
                  onClick={() => toggleStepComplete(step.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        progress[step.id]
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {progress[step.id] ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h5 className="font-semibold text-white">{step.title}</h5>
                        <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                      
                      {step.skills && step.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {step.skills.map((skill) => (
                            <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {step.resources && step.resources.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Resources:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded bg-red-500/5 text-red-400">
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${
                      progress[step.id] ? 'opacity-0' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Technologies */}
          {learningPath.recommendedTech && learningPath.recommendedTech.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-500/5 to-red-600/5 border border-red-500/10">
              <h4 className="font-bold text-lg flex items-center gap-2 mb-3 text-white">
                <Cpu className="w-4 h-4 text-red-500" />
                Recommended Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {learningPath.recommendedTech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 bg-gray-800 text-gray-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Career Opportunities */}
          {learningPath.careerOpportunities && learningPath.careerOpportunities.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <h4 className="font-bold text-lg flex items-center gap-2 mb-3 text-white">
                <Trophy className="w-4 h-4 text-red-500" />
                Career Opportunities
              </h4>
              <div className="flex flex-wrap gap-2">
                {learningPath.careerOpportunities.map((job) => (
                  <Badge key={job} variant="outline" className="px-3 py-1 border-gray-700 text-gray-300">
                    {job}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Regenerate Button */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={regenerateLearningPath}
              disabled={loading}
              variant="outline"
              className="rounded-full gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Generate Different Roadmap
            </Button>
            <Button
              onClick={() => {
                setLearningPath(null);
                setSelectedGoal('');
                setProgress({});
              }}
              variant="outline"
              className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Start Over
            </Button>
          </div>
          
          {/* AI Attribution */}
          <p className="text-center text-[10px] text-gray-600 mt-4">
            🤖 Generated by AI • Each generation creates a unique learning path with different summary text • Refresh for completely new content
          </p>
        </div>
      )}
    </div>
  );
}