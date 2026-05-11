import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjects, getTimeline } from '@/app/lib/data-service';
import { ProjectCard } from '@/components/portfolio/project-card';
import { Timeline } from '@/components/portfolio/timeline';

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const timelineEvents = await getTimeline();

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold mb-6 animate-pulse">
            <Zap className="w-3 h-3" />
            <span>OPEN FOR FULL-TIME OPPORTUNITIES</span>
          </div>
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-foreground leading-[1.1]">
            Engineering the <span className="text-primary">Future</span> <br className="hidden md:block" /> with Modular Data.
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-10 font-body">
            I'm Renzcell Rick, an engineering intern specializing in building scalable, SEO-optimized web experiences through clean code and SOLID architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 rounded-full font-bold group">
              <Link href="/work">
                View My Projects
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="h-12 px-8 rounded-full font-bold">
              <Link href="/logs">
                Read Learning Logs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              <Code2 className="w-4 h-4" />
              Selected Work
            </div>
            <h2 className="font-headline font-bold text-4xl">Featured Highlights</h2>
          </div>
          <Button variant="link" asChild className="p-0 text-primary h-auto font-bold group">
            <Link href="/work" className="flex items-center">
              Explore All Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-card py-24 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              <Rocket className="w-4 h-4" />
              Journey
            </div>
            <h2 className="font-headline font-bold text-4xl">Internship Roadmap</h2>
            <p className="text-muted-foreground">
              A record of major milestones and professional growth throughout my tenure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-background/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="font-headline font-bold text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
              Ready to collaborate on something amazing?
            </h2>
            <p className="max-w-xl mx-auto opacity-90 text-lg">
              I'm always looking for new challenges and opportunities to apply my technical skills. Let's build something together.
            </p>
            <div className="pt-4">
              <Button size="lg" variant="secondary" className="h-12 px-10 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}