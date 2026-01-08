//event-portal\components\forms\EventForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventSchema,
  EventFormInput,
  EventInput,
} from "@/lib/validators/event.schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/lib/api/events";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EventForm() {
  const queryClient = useQueryClient();

  const form = useForm<EventFormInput, any, EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      capacity: 1,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      reset();
    },
    onError: () => {
      toast.error("Failed to create event");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new event</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in the details below. You can edit this later.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {/* BASIC INFO */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Event Title</label>
              <input
                {...register("title")}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-ring"
                placeholder="e.g. React Meetup 2026"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Description</label>
              <textarea
                {...register("description")}
                className="w-full rounded-md border px-3 py-2 min-h-[90px] focus:ring-2 focus:ring-ring"
                placeholder="What is this event about?"
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* META */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Event Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-ring"
              />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Capacity</label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-ring"
                min={1}
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of attendees.
              </p>
              {errors.capacity && (
                <p className="text-sm text-destructive">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating event..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

