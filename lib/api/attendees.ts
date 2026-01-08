// lib/api/attendees.ts
export async function registerAttendee(data: {
  name: string;
  email: string;
  eventId: string;
}) {
  const res = await fetch("/api/attendees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error ?? "Failed to register attendee");
  }

  return res.json();
}
