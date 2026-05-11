import { TimelineEvent } from '@/app/lib/types';
import { cn } from '@/lib/utils';
import { Milestone, Trophy, Code } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        const Icon = event.type === 'milestone' ? Milestone : event.type === 'achievement' ? Trophy : Code;

        return (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Icon circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-primary-foreground z-10">
              <Icon className="w-5 h-5" />
            </div>

            {/* Content card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-headline font-bold text-primary">{event.title}</div>
                <time className="font-code text-xs text-muted-foreground whitespace-nowrap">{event.date}</time>
              </div>
              <div className="text-muted-foreground text-sm">{event.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}