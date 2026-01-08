import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Event & Attendee Management
          </h1>
          <p className="text-muted-foreground">
            Create events, manage registrations, and track attendees with ease.
          </p>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Steps */}
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-md border p-3">
                <p className="font-medium">1. Create Event</p>
                <p className="text-muted-foreground">
                  Set up your event details in seconds.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="font-medium">2. Register Attendees</p>
                <p className="text-muted-foreground">
                  Collect and manage registrations easily.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="font-medium">3. Track & Manage</p>
                <p className="text-muted-foreground">
                  View attendee lists and updates in one place.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events" className="flex-1">
                <Button className="w-full">
                  View Events
                </Button>
              </Link>

              <Link href="/events/new" className="flex-1">
                <Button variant="outline" className="w-full">
                  Create Event
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
