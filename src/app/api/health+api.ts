/**
 * GET /api/health — the deploy's heartbeat.
 *
 * Dependency-free on purpose, so it answers exactly one question: did
 * `eas deploy` put this server on EAS Hosting and is it serving? Internal QA
 * (WS-B11) hits this against the Workers runtime before preview or release.
 */
export function GET(): Response {
  return Response.json({ ok: true, checkedAt: new Date().toISOString() });
}
