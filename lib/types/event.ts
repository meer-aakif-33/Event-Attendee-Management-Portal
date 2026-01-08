// lib/types/event.ts
export type Attendee = {
  id: string;
  name: string;
  email: string;
  optimistic?: boolean;
};

export type EventWithCount = {
  id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  _count: {
    attendees: number;
  };
};

export type EventWithAttendees = {
  id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  attendees: Attendee[];
};
