//event-portal\app\events\page.tsx
"use client";

import Link from "next/link";
import { useEvents } from "@/lib/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const { data, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load events</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 space-y-2">
        <h2 className="text-xl font-semibold">No events yet</h2>
        <p className="text-muted-foreground">
          Create your first event to get started.
        </p>
        <Link href="/events/new">
          <Button>Create Event</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((event) => {
        const isFull =
          event._count.attendees >= event.capacity;

        return (
          <div
            key={event.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            {/* LEFT */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">
                {event.title}
              </h3>
<div className="text-sm text-muted-foreground">
  Capacity:{" "}
  <span className="font-medium text-foreground">
    {event._count.attendees}
  </span>
  {" / "}
  {event.capacity}
</div>
              <p className="text-sm">
                {event._count.attendees}/{event.capacity} attendees
              </p>
            </div>

            {/* RIGHT */}
            <Link href={`/events/${event.id}`}>
              <Button
                variant={isFull ? "outline" : "default"}
                disabled={isFull}
              >
                {isFull ? "Full" : "View"}
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
