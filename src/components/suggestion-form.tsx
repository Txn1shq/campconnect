"use client";

import { useState } from "react";
import {
  ConnectionSuggestionInput,
  ConnectionSuggestionOutput,
  getConnectionSuggestions,
} from "@/ai/flows/connection-suggestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/lib/data";
import { Loader2, Lightbulb, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialMessages = `Message from Brenda Smith: "Hi! Are you the CS major? I was actually wondering if you wanted to grab coffee."
Message from Charlie Brown: "Yeah it was great! We should connect and discuss some ideas I have."`;

export function SuggestionForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<ConnectionSuggestionOutput | null>(null);

  const [formData, setFormData] = useState<ConnectionSuggestionInput>({
    userProfile: `Name: ${currentUser.name}, College: ${currentUser.college}, About: ${currentUser.about}`,
    recentMessages: initialMessages,
    instructions: "Focus on finding common ground for a first conversation. Suggest a casual meeting place like a coffee shop on campus.",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);

    try {
      const result = await getConnectionSuggestions(formData);
      setOutput(result);
    } catch (error) {
      console.error("Error getting suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Connection Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userProfile">Your Profile Summary</Label>
              <Textarea
                id="userProfile"
                name="userProfile"
                value={formData.userProfile}
                onChange={handleInputChange}
                rows={4}
                className="bg-muted"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recentMessages">Recent Messages from Peers</Label>
              <Textarea
                id="recentMessages"
                name="recentMessages"
                value={formData.recentMessages}
                onChange={handleInputChange}
                rows={6}
                placeholder="Copy-paste some recent messages here..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions for AI</Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows={4}
                placeholder="e.g., 'Suggest study group topics' or 'Find casual hangout ideas'"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Get Suggestions"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        {loading && (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )}
        {output && (
          <>
            <Card className="animate-fade-in">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Lightbulb className="w-8 h-8 text-accent" />
                <CardTitle>Conversation Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {output.topicSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="animate-fade-in">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <UserPlus className="w-8 h-8 text-primary" />
                <CardTitle>Connection Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {output.connectionOpportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
