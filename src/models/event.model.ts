import { z } from "zod";

export const EventSchema = z.object({
  eventId: z.uuid().optional(),
  equipmentId: z.string(),
  prevState: z.string().optional(),
  newState: z.enum(["red", "yellow", "green"]),
  timestampClient: z.string().optional()
});

export type EventInput = z.infer<typeof EventSchema>;