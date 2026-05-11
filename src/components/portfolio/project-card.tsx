import Image from 'next/image';
import { Project } from '@/app/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="shadow-sm backdrop-blur-sm bg-background/80">
            {project.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <Calendar className="w-3 h-3" />
          {new Date(project.completionDate).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
        <h3 className="font-headline font-bold text-xl leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {project.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="outline" className="text-[10px] font-medium py-0 h-5">
            {tech}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}