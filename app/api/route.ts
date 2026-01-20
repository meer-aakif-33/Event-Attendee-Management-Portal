
// app/api/events/route.ts
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validators/event.schema";

export async function GET() {
  const events = await prisma.event.findMany({
    include: {
      _count: {
        select: { attendees: true },
      },
    },
    orderBy: { date: "asc" },
  });

  return Response.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const event = await prisma.event.create({
    data: parsed.data,
  });

  return Response.json(event, { status: 201 });
}
