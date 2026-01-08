// lib/hooks/useEvent.ts
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/lib/api/events";
import { EventWithAttendees } from "@/lib/types/event";

export function useEvent(eventId: string) {
  return useQuery<EventWithAttendees>({
    queryKey: ["events", eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId, // important for Next.js routing
  });
}
