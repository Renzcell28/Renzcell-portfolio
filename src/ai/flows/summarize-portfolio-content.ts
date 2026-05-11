'use server';
/**
 * @fileOverview An AI agent that summarizes portfolio content (projects or learning logs).
 *
 * - summarizePortfolioContent - A function that generates a concise summary of the provided content.
 * - SummarizePortfolioContentInput - The input type for the summarizePortfolioContent function.
 * - SummarizePortfolioContentOutput - The return type for the summarizePortfolioContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePortfolioContentInputSchema = z.object({
  content: z.string().describe('The project description or learning log entry to be summarized.'),
});
export type SummarizePortfolioContentInput = z.infer<typeof SummarizePortfolioContentInputSchema>;

const SummarizePortfolioContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided content.'),
});
export type SummarizePortfolioContentOutput = z.infer<typeof SummarizePortfolioContentOutputSchema>;

export async function summarizePortfolioContent(input: SummarizePortfolioContentInput): Promise<SummarizePortfolioContentOutput> {
  return summarizePortfolioContentFlow(input);
}

const summarizePortfolioContentPrompt = ai.definePrompt({
  name: 'summarizePortfolioContentPrompt',
  input: {schema: SummarizePortfolioContentInputSchema},
  output: {schema: SummarizePortfolioContentOutputSchema},
  prompt: `You are an AI assistant tasked with creating concise summaries of technical content.

Summarize the following content into a brief, easy-to-understand paragraph. Focus on the key takeaways and main points, ensuring the summary is suitable for a quick overview.

Content:
{{{content}}}`,
});

const summarizePortfolioContentFlow = ai.defineFlow(
  {
    name: 'summarizePortfolioContentFlow',
    inputSchema: SummarizePortfolioContentInputSchema,
    outputSchema: SummarizePortfolioContentOutputSchema,
  },
  async (input) => {
    const {output} = await summarizePortfolioContentPrompt(input);
    return output!;
  }
);
