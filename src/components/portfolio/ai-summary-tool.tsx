"use client";

import { useState } from 'react';
import { summarizePortfolioContent } from '@/ai/flows/summarize-portfolio-content';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AISummaryToolProps {
  content: string;
}

export function AISummaryTool({ content }: AISummaryToolProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    setLoading(true);
    try {
      const result = await summarizePortfolioContent({ content });
      setSummary(result.summary);
    } catch (error) {
      console.error("AI Summarization failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-red-500/20 bg-red-500/5 shadow-none rounded-2xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-red-500/10 border-b border-red-500/20 py-4 px-6">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-500 uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          AI Smart Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {summary ? (
          <div className="space-y-4 animate-in fade-in duration-700">
            <p className="text-gray-200 leading-relaxed font-medium italic">
              "{summary}"
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSummarize} 
              disabled={loading}
              className="rounded-full text-xs h-8 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <RefreshCw className="w-3 h-3 mr-2" />}
              Regenerate
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <p className="text-gray-400 text-sm max-w-sm">
              Tired of long logs? Use our AI assistant to generate a quick, digestible takeaway for this entry.
            </p>
            <Button 
              onClick={handleSummarize} 
              disabled={loading}
              className="rounded-full shadow-lg hover:shadow-red-500/20 transition-all font-bold bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
                  Summarize Entry
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}