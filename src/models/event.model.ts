import { z } from "zod";

export const EventSchema = z.object({
  eventId: z.uuid().optional(),
  equipmentId: z.string(),
  prevState: z.string().optional().nullable(),
  newState: z.enum(["red", "yellow", "green"]),
  timestampClient: z.coerce.date(),
  timestampServer: z.coerce.date().optional().nullable(),
});

export type EventInput = z.infer<typeof EventSchema>;