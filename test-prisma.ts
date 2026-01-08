// test-prisma.ts (at project root)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.event.findMany();
prisma.attendee.findMany();
