import { TimelineEvent } from '@/app/lib/types';
import { cn } from '@/lib/utils';
import { Milestone, Trophy, Code } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-red-500/30 before:to-transparent">
      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        const Icon = event.type === 'milestone' ? Milestone : event.type === 'achievement' ? Trophy : Code;

        return (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Icon circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-gradient-to-r from-red-600 to-red-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-white z-10">
              <Icon className="w-5 h-5" />
            </div>

            {/* Content card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-headline font-bold text-red-500">{event.title}</div>
                <time className="font-code text-xs text-gray-500 whitespace-nowrap">{event.date}</time>
              </div>
              <div className="text-gray-400 text-sm">{event.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}