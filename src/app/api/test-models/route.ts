import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say "Hello"' }],
      max_tokens: 10,
    }),
  });
  
  const data = await response.json();
  
  return NextResponse.json({ 
    status: response.status,
    success: response.ok,
    message: data.choices?.[0]?.message?.content || data.error?.message
  });
}