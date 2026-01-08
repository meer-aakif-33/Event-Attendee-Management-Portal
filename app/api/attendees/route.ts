// app/api/attendees/route.ts
import { prisma } from "@/lib/prisma";
import { attendeeSchema } from "@/lib/validators/attendee.schema";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = attendeeSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(parsed.error, { status: 400 });
  }

  const { name, email, eventId } = parsed.data;

  try {
    const attendee = await prisma.attendee.create({
      data: { name, email, eventId },
    });

    return Response.json(attendee, { status: 201 });
  } catch (error) {
    // Handle duplicate registration
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { error: "This email is already registered for this event." },
        { status: 409 }
      );
    }

    // Fallback
    return Response.json(
      { error: "Failed to register attendee" },
      { status: 500 }
    );
  }
}
