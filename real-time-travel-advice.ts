'use server';

/**
 * @fileOverview A real-time travel advice AI agent.
 *
 * - getRealTimeTravelAdvice - A function that provides real-time travel advice.
 * - RealTimeTravelAdviceInput - The input type for the getRealTimeTravelAdvice function.
 * - RealTimeTravelAdviceOutput - The return type for the getRealTimeTravelAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimeTravelAdviceInputSchema = z.object({
  routeCharacteristics: z.string().describe('Characteristics of the route, such as distance, terrain, and typical weather conditions.'),
  localPointsOfInterest: z.string().describe('Local points of interest along the route.'),
  userPreferences: z.string().describe('User preferences for travel, such as preferred type of transportation, budget, and interests.'),
  predictedTrafficConditions: z.string().describe('Predicted traffic conditions along the route.'),
});
export type RealTimeTravelAdviceInput = z.infer<typeof RealTimeTravelAdviceInputSchema>;

const RealTimeTravelAdviceOutputSchema = z.object({
  travelAdvice: z.string().describe('Real-time advice for the user, taking into account route characteristics, local points of interest, user preferences, and predicted traffic conditions.'),
});
export type RealTimeTravelAdviceOutput = z.infer<typeof RealTimeTravelAdviceOutputSchema>;

export async function getRealTimeTravelAdvice(input: RealTimeTravelAdviceInput): Promise<RealTimeTravelAdviceOutput> {
  return realTimeTravelAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeTravelAdvicePrompt',
  input: {schema: RealTimeTravelAdviceInputSchema},
  output: {schema: RealTimeTravelAdviceOutputSchema},
  prompt: `You are a travel expert providing real-time advice to users based on various factors.

  Consider the following information to generate relevant and helpful travel advice:

  Route Characteristics: {{{routeCharacteristics}}}
  Local Points of Interest: {{{localPointsOfInterest}}}
  User Preferences: {{{userPreferences}}}
  Predicted Traffic Conditions: {{{predictedTrafficConditions}}}

  Based on these factors, provide specific and actionable advice to enhance the user's travel experience. Focus on potential issues, opportunities, and recommendations to optimize their journey.`,
});

const realTimeTravelAdviceFlow = ai.defineFlow(
  {
    name: 'realTimeTravelAdviceFlow',
    inputSchema: RealTimeTravelAdviceInputSchema,
    outputSchema: RealTimeTravelAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
