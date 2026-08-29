/**
 * The single validation source, shared by the client and the +api.ts route
 * (invariant 6) — the server validates with the same schema the client does,
 * so a payload that passes in the app cannot fail differently at the edge.
 *
 * zod/mini is the standard: same semantics as zod, smaller bundle, which
 * matters twice over here because this ships in BOTH the app and a Workers
 * isolate.
 */
import * as z from "zod/mini";

export const CreateNoteInput = z.object({
  title: z.string().check(z.minLength(1), z.maxLength(200)),
  body: z.string().check(z.maxLength(10_000)),
});

export type CreateNoteInput = z.infer<typeof CreateNoteInput>;
