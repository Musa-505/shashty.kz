'use server';

/**
 * @fileOverview Generates a profile of a notable Kazakh figure.
 *
 * - generatePersonProfile - A function that generates a person profile.
 * - GeneratePersonProfileInput - The input type for the generatePersonProfile function.
 * - GeneratePersonProfileOutput - The return type for the generatePersonProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonProfileInputSchema = z.object({
  name: z.string().describe('The name of the Kazakh figure.'),
  additionalContext: z
    .string()
    .optional()
    .describe('Additional context about the person.'),
});
export type GeneratePersonProfileInput = z.infer<typeof GeneratePersonProfileInputSchema>;

const GeneratePersonProfileOutputSchema = z.object({
  biography: z.string().describe('A detailed biography of the Kazakh figure.'),
  keyFacts: z.array(z.string()).describe('Key facts about the Kazakh figure.'),
  historicalImportanceSummary: z
    .string()
    .describe('A summary of the historical importance of the Kazakh figure.'),
});
export type GeneratePersonProfileOutput = z.infer<typeof GeneratePersonProfileOutputSchema>;

export async function generatePersonProfile(
  input: GeneratePersonProfileInput
): Promise<GeneratePersonProfileOutput> {
  return generatePersonProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonProfilePrompt',
  input: {schema: GeneratePersonProfileInputSchema},
  output: {schema: GeneratePersonProfileOutputSchema},
  prompt: `You are an expert in Kazakh history and culture.
  Your task is to generate a comprehensive profile of a notable Kazakh figure.

  Name: {{name}}
  Additional Context: {{additionalContext}}

  Instructions:
  1.  Write a detailed biography of the figure, highlighting their significant contributions and achievements.
  2.  Extract and list key facts about the figure.
  3.  Summarize the historical importance of the figure, emphasizing their lasting impact on Kazakh society and culture.

  Output the biography, key facts, and historical importance summary in the specified JSON format.`,
});

const generatePersonProfileFlow = ai.defineFlow(
  {
    name: 'generatePersonProfileFlow',
    inputSchema: GeneratePersonProfileInputSchema,
    outputSchema: GeneratePersonProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
