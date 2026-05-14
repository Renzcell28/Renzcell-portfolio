import { NextResponse } from 'next/server';

const MODELS = [
  'openai/gpt-3.5-turbo',
  'openai/gpt-3.5-turbo-0125',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-7b-instruct:free',
];

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }
    
    // More specific, detailed prompt to ensure high-quality responses
    const prompt = `You are an expert career advisor. Create a UNIQUE, DETAILED learning roadmap for a ${goal} developer.

    CRITICAL: Return ONLY valid JSON. No markdown, no backticks, no explanations.

    Use this EXACT structure with 6 SPECIFIC steps:

    {
      "title": "The Complete ${goal} Developer Roadmap (2026)",
      "description": "A comprehensive, step-by-step learning path with specific technologies and real-world resources",
      "totalDuration": "6-10 months",
      "steps": [
        {
          "title": "Step 1: [Specific Technology/Framework] Fundamentals",
          "description": "Detailed description of what to learn with specific technologies",
          "duration": "X weeks",
          "resources": ["Specific course or website 1", "Specific course or website 2", "Specific book or tutorial 3"],
          "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"]
        }
      ],
      "recommendedTech": ["Tech 1", "Tech 2", "Tech 3", "Tech 4", "Tech 5", "Tech 6"],
      "careerOpportunities": ["Job Title 1", "Job Title 2", "Job Title 3", "Job Title 4", "Job Title 5"]
    }

    Requirements:
    - Use SPECIFIC technology names (not generic terms like "Problem-solving")
    - Include REAL course names and websites
    - Each step must have 3 specific resources
    - Each step must have 3 specific skills
    - Make it unique for ${goal} developer
    
    For Frontend: Focus on React, Next.js, TypeScript, Tailwind, Vite, Zustand, etc.
    For Backend: Focus on Node.js, Express, PostgreSQL, MongoDB, Docker, AWS, etc.
    For Fullstack: Combine both with MERN/PERN stack
    For DevOps: Focus on Docker, Kubernetes, Terraform, AWS/GCP, CI/CD, Linux, etc.
    For Mobile: Focus on React Native, Expo, Firebase, App Store deployment
    For AI/ML: Focus on Python, TensorFlow, PyTorch, Hugging Face, LangChain`;

    for (const model of MODELS) {
      try {
        console.log(`Trying: ${model}`);
        
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
                content: 'You are a JSON generator. Return ONLY valid JSON. No markdown, no backticks, no explanations. Generate unique, specific content with real technology names and real resources.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.8,
            max_tokens: 4000,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || `HTTP ${response.status}`);
        }
        
        let content = data.choices[0].message.content;
        
        // Clean up JSON
        content = content.replace(/```json\n?/g, '');
        content = content.replace(/```\n?/g, '');
        content = content.replace(/`/g, '');
        content = content.trim();
        
        // Extract JSON
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          content = jsonMatch[0];
        }
        
        const roadmap = JSON.parse(content);
        
        // Validate
        if (!roadmap.title || !roadmap.steps || !Array.isArray(roadmap.steps) || roadmap.steps.length < 5) {
          throw new Error('Invalid response');
        }
        
        console.log(`✅ Success with: ${model}`);
        
        // Process steps
        roadmap.steps = roadmap.steps.slice(0, 6).map((step: any, index: number) => ({
          title: step.title || `Step ${index + 1}`,
          description: step.description || 'Learn essential skills',
          duration: step.duration || '4-6 weeks',
          resources: Array.isArray(step.resources) ? step.resources.slice(0, 3) : [],
          skills: Array.isArray(step.skills) ? step.skills.slice(0, 3) : [],
        }));
        
        roadmap.recommendedTech = Array.isArray(roadmap.recommendedTech) ? roadmap.recommendedTech.slice(0, 6) : [];
        roadmap.careerOpportunities = Array.isArray(roadmap.careerOpportunities) ? roadmap.careerOpportunities.slice(0, 5) : [];
        
        return NextResponse.json(roadmap);
        
      } catch (error: any) {
        console.log(`❌ ${model} failed:`, error.message);
      }
    }
    
    return NextResponse.json({ error: 'All models failed' }, { status: 500 });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}