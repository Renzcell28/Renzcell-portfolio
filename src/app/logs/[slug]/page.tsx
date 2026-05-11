import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLogBySlug, getLogs } from '@/app/lib/data-service';
import { Badge } from '@/components/ui/badge';
import { AISummaryTool } from '@/components/portfolio/ai-summary-tool';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const logs = await getLogs();
  return logs.map((log) => ({
    slug: log.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const log = await getLogBySlug(params.slug);
  if (!log) return { title: 'Not Found' };
  
  return {
    title: `${log.title} | DevVault`,
    description: log.excerpt,
  };
}

export default async function LogDetailPage({ params }: { params: { slug: string } }) {
  const log = await getLogBySlug(params.slug);

  if (!log) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Back Link */}
        <Button variant="ghost" asChild className="p-0 hover:bg-transparent text-muted-foreground hover:text-primary">
          <Link href="/logs" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Logs
          </Link>
        </Button>

        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {log.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-3">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tight leading-tight">
            {log.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(log.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Renzcell Rick
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </div>
          </div>
        </header>

        {/* AI Summary Tool */}
        <AISummaryTool content={log.content} />

        {/* Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/90 prose-li:text-foreground/90 prose-a:text-primary">
          <div className="whitespace-pre-line text-lg md:text-xl">
            {log.content}
          </div>
        </article>

        {/* Navigation Footer */}
        <div className="pt-16 border-t mt-16">
          <div className="bg-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-lg">Thanks for reading!</h4>
              <p className="text-muted-foreground">Check out more of my weekly internship insights.</p>
            </div>
            <Button asChild className="rounded-full h-12 px-8 font-bold">
              <Link href="/logs">
                Explore More Logs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}