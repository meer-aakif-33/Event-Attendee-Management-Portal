// lib/hooks/useEvents.ts
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api/events";
import { EventWithCount } from "@/lib/types/event";

export function useEvents() {
  return useQuery<EventWithCount[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
