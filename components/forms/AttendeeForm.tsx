// components/forms/AttendeeForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  attendeeSchema,
  AttendeeInput,
} from "@/lib/validators/attendee.schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAttendee  } from "@/lib/api/attendees";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function AttendeeForm({ eventId }: { eventId: string }) {
  const queryClient = useQueryClient();

  const form = useForm<AttendeeInput>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      name: "",
      email: "",
      eventId,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const mutation = useMutation({
    mutationFn: registerAttendee,
    onSuccess: () => {
      toast.success("You’re registered!");
      queryClient.invalidateQueries({
        queryKey: ["event", eventId],
      });
      reset({ name: "", email: "", eventId });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Registration failed");
    },
  });

  return (
    <div className="space-y-4">
      {/* Context */}
      <div>
        <h3 className="font-medium">Register for this event</h3>
        <p className="text-sm text-muted-foreground">
          Enter your details below to secure your spot.
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        {/* NAME */}
        <div className="space-y-1">
          <input
            {...register("name")}
            placeholder="Full name"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.name && (
            <p className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <input
            {...register("email")}
            placeholder="Email address"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            We’ll only use this to identify your registration.
          </p>
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register("eventId")} />

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? "Registering..." : "Confirm Registration"}
        </Button>
      </form>
    </div>
  );
}
