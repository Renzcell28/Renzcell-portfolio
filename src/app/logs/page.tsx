import Link from 'next/link';
import { getLogs } from '@/app/lib/data-service';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';

export default async function LogsPage() {
  const logs = await getLogs();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto mb-16 space-y-6">
        <h1 className="font-headline font-black text-5xl md:text-6xl tracking-tight">Activity Logs</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          Weekly reflections, technical deep-dives, and documentation of my learning process.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {logs.map((log) => (
          <Link key={log.slug} href={`/logs/${log.slug}`} className="block group">
            <Card className="hover:shadow-md transition-all border-border/50 group-hover:border-primary/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4 text-xs font-code text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(log.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        5 min read
                      </div>
                    </div>
                    <h2 className="font-headline font-bold text-2xl group-hover:text-primary transition-colors">
                      {log.title}
                    </h2>
                    <p className="text-muted-foreground text-base line-clamp-2">
                      {log.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {log.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}