// app/api/summarize/route.ts
import { NextResponse } from 'next/server';

// Models to try in order
const MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'openai/gpt-3.5-turbo',
  'mistralai/mistral-7b-instruct:free',
  'anthropic/claude-3-haiku',
  'meta-llama/llama-3.2-3b-instruct:free',
];

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured. Please add OPENROUTER_API_KEY to .env.local' }, { status: 500 });
    }
    
    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'No content provided to summarize' }, { status: 400 });
    }

    // Truncate content if too long (max 3500 chars for free tier)
    const truncatedContent = content.length > 3500 ? content.slice(0, 3500) + '...' : content;

    const prompt = `You are an expert technical writer and summarizer. Create a CONCISE, INSIGHTFUL summary of this activity log entry.

Requirements for the summary:
- 2-3 sentences maximum
- Focus on KEY accomplishments and progress made
- Mention specific TECHNOLOGIES or TOOLS used
- Highlight any notable FEATURES implemented or PROBLEMS solved
- Use professional yet engaging language
- DO NOT use phrases like "This entry covers" or "The user worked on"
- Write in third person, past tense

Example good summary: "Implemented new priority task filtering and blocker priority views. Enhanced the Sprint Planner with workload balancing features and integrated Google Gemini AI for intelligent task suggestions. Fixed sidebar synchronization issues to improve team switching experience."

Bad summary: "This entry covers adding buttons and fixing things."

Content to summarize:
${truncatedContent}

Return ONLY the summary text. No quotes, no markdown, no explanations.`;

    let lastError = null;

    for (const model of MODELS) {
      try {
        console.log(`🤖 Trying model: ${model} for summarization...`);
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:9002',
            'X-Title': 'DevVault Portfolio',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'system',
                content: 'You are a technical content summarizer. Return ONLY the summary text. No quotes, no markdown, no explanations, no introductory phrases. Just 2-3 sentences.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.6,
            max_tokens: 250,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || `HTTP ${response.status}`);
        }
        
        let summary = data.choices[0].message.content;
        
        // Clean up the summary
        summary = summary.replace(/^["']|["']$/g, '');
        summary = summary.replace(/^Summary:?\s*/i, '');
        summary = summary.replace(/^Here's a summary:?\s*/i, '');
        summary = summary.replace(/^This entry:?\s*/i, '');
        summary = summary.trim();
        
        // Validate summary quality
        if (summary.length < 30) {
          throw new Error('Summary too short');
        }
        
        if (summary.length > 400) {
          summary = summary.slice(0, 397) + '...';
        }
        
        console.log(`✅ Successfully generated summary with: ${model}`);
        
        return NextResponse.json({ summary });
        
      } catch (error: any) {
        console.log(`❌ ${model} failed:`, error.message);
        lastError = error;
      }
    }
    
    // All models failed - return error
    console.error('All AI models failed to generate summary');
    return NextResponse.json({ 
      error: 'AI service temporarily unavailable. Please try again in a moment.' 
    }, { status: 503 });
    
  } catch (error) {
    console.error('Summarization API Error:', error);
    return NextResponse.json({ error: 'Failed to generate summary. Please try again.' }, { status: 500 });
  }
}