import { SuggestionForm } from "@/components/suggestion-form";

export default function SuggestionsPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Connection Suggestions</h1>
        <p className="text-muted-foreground mt-1">
          Let AI help you break the ice and build meaningful connections.
        </p>
      </div>
      <SuggestionForm />
    </div>
  );
}
