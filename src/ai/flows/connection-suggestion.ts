'use server';

/**
 * @fileOverview AI tool that suggests conversation topics and connection opportunities based on other students' messages.
 *
 * - getConnectionSuggestions - A function that handles the connection suggestion process.
 * - ConnectionSuggestionInput - The input type for the getConnectionSuggestions function.
 * - ConnectionSuggestionOutput - The return type for the getConnectionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConnectionSuggestionInputSchema = z.object({
  userProfile: z.string().describe('A description of the user profile, including interests, major, and college.'),
  recentMessages: z.string().describe('The recent messages from other students that the user has interacted with.'),
  instructions: z.string().describe('Specific instructions or preferences for connection suggestions.'),
});
export type ConnectionSuggestionInput = z.infer<typeof ConnectionSuggestionInputSchema>;

const ConnectionSuggestionOutputSchema = z.object({
  topicSuggestions: z.array(z.string()).describe('Suggested conversation topics based on the recent messages and user profile.'),
  connectionOpportunities: z.array(z.string()).describe('Potential connection opportunities with other students.'),
});
export type ConnectionSuggestionOutput = z.infer<typeof ConnectionSuggestionOutputSchema>;

export async function getConnectionSuggestions(input: ConnectionSuggestionInput): Promise<ConnectionSuggestionOutput> {
  return connectionSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'connectionSuggestionPrompt',
  input: {schema: ConnectionSuggestionInputSchema},
  output: {schema: ConnectionSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to suggest conversation topics and connection opportunities for college students.

  Based on the user's profile, recent messages from other students, and specific instructions, provide relevant and engaging suggestions.

  User Profile: {{{userProfile}}}
  Recent Messages: {{{recentMessages}}}
  Instructions: {{{instructions}}}

  Consider the user's interests, the context of the messages, and any specific preferences mentioned in the instructions.
  Provide suggestions that are likely to lead to meaningful and productive conversations.
  Output should be formatted as arrays of strings.

  Topic Suggestions:
  - [suggestion 1]
  - [suggestion 2]
  Connection Opportunities:
  - [opportunity 1]
  - [opportunity 2]`,
});

const connectionSuggestionFlow = ai.defineFlow(
  {
    name: 'connectionSuggestionFlow',
    inputSchema: ConnectionSuggestionInputSchema,
    outputSchema: ConnectionSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
