"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRealTimeTravelAdvice } from "@/ai/flows/real-time-travel-advice";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";

const formSchema = z.object({
  routeCharacteristics: z
    .string()
    .min(10, "Please describe the route in more detail."),
  localPointsOfInterest: z
    .string()
    .min(10, "Please list some points of interest."),
  userPreferences: z.string().min(10, "Please describe your preferences."),
  predictedTrafficConditions: z
    .string()
    .min(5, "Please describe traffic conditions."),
});

type TravelAdviceProps = {
  routeInfo: {
    from: string | null;
    to: string | null;
  };
};

export function TravelAdvice({ routeInfo }: TravelAdviceProps) {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeCharacteristics: `Route from ${routeInfo.from} to ${routeInfo.to}. Typically a 4-6 hour journey via expressway, with some hilly sections.`,
      localPointsOfInterest:
        "Local viewpoints, famous temples, and popular dams along the way.",
      userPreferences:
        "Prefers scenic routes, budget-friendly food stops, and avoiding heavy traffic.",
      predictedTrafficConditions:
        "Moderate traffic expected on weekends, especially in the evening.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAdvice("");
    try {
      const result = await getRealTimeTravelAdvice(values);
      setAdvice(result.travelAdvice);
    } catch (error) {
      console.error(error);
      setAdvice(
        "Sorry, I couldn't get any travel advice at the moment. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI Travel Advisor
        </CardTitle>
        <CardDescription>
          Get personalized tips for your journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I like window seats, quiet environments, and places with good local food."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Get Travel Tips
            </Button>
          </form>
        </Form>
        {advice && (
          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <h4 className="font-semibold text-accent-foreground mb-2">
              Your Personalized Advice:
            </h4>
            <p className="text-sm text-foreground/80 whitespace-pre-wrap">
              {advice}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
