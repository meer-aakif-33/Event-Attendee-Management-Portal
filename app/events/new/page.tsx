// app/events/new/page.tsx
import { EventForm } from "@/components/forms/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Create Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create a new event.
        </p>
      </header>

      <EventForm />
    </div>
  );
}
