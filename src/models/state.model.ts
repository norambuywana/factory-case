import { z } from "zod";

export const StateSchema = z.object({
  equipmentId: z.string(),
  state: z.enum(["red", "yellow", "green"]),
  lastChangedAt: z.coerce.date(),
  lastEventId: z.string()
});

export type StateInput = z.infer<typeof StateSchema>;