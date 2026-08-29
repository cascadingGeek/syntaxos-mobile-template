/**
 * POST /api/notes — the reference server edge.
 *
 * THIN BY CONTRACT (invariant 3): parse, validate with `schemas/`, delegate
 * to `server/`. No business logic here.
 *
 * Runs on Cloudflare Workers via EAS Hosting, which means: no `node:`
 * imports, no fs, no raw TCP, no long-running work, and no module-scope
 * mutable state — isolates are shared and recycled, so anything cached in a
 * module variable is either lost or leaked across users.
 */
import { isAppError } from "@/core/app-error";
import { CreateNoteInput } from "@/schemas/note";
import { createNote, resolveUserId } from "@/server/notes";

export async function POST(request: Request): Promise<Response> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Missing bearer token" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const parsed = CreateNoteInput.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const userId = await resolveUserId(authHeader.slice("Bearer ".length));
    const note = await createNote(userId, parsed.data);
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    const status = isAppError(error) && error.kind === "unauthorized" ? 401 : 500;
    return Response.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status },
    );
  }
}
