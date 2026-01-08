// app/events/[eventId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEvent } from "@/lib/hooks/useEvent";
import { AttendeeForm } from "@/components/forms/AttendeeForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, isLoading, isError } = useEvent(eventId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="text-red-500">Failed to load event</p>;
  }

  const isFull = data.attendees.length >= data.capacity;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <p className="text-muted-foreground">{data.description}</p>
        <p className="text-sm text-muted-foreground">
          {data.attendees.length}/{data.capacity} registered
        </p>
      </header>

      <section>
        <h2 className="font-medium mb-2">Attendees</h2>

        {data.attendees.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No attendees yet. Be the first to register.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.attendees.map((a) => (
              <li
                key={a.id}
                className={`border p-2 rounded ${
                  a.optimistic ? "opacity-60" : ""
                }`}
              >
                {a.name} — {a.email}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        {/* <h2 className="font-medium mb-2">Register Attendee</h2> */}

        {isFull ? (
          <div className="border border-destructive/30 bg-destructive/10 text-destructive rounded p-3">
            Event capacity reached. Registration is closed.
          </div>
        ) : (
          <AttendeeForm eventId={eventId} />
        )}
      </section>
    </div>
  );
}
