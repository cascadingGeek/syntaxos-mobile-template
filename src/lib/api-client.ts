/**
 * Calls to our own +api.ts edge.
 *
 * A relative fetch("/api/notes") works in a browser and fails on a device —
 * there is no origin to resolve against. The app and its server are two
 * deploy artifacts from one repo (doc §1), so the client must be told where
 * the server lives: EXPO_PUBLIC_API_URL is the EAS Hosting deployment URL.
 */
import { AppError } from "@/core/app-error";
import { config } from "@/core/config";

const DEFAULT_TIMEOUT_MS = 15_000;

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { accessToken?: string } = {},
): Promise<T> {
  const { accessToken, ...rest } = init;

  // Workers isolates are not long-running; a hung request should fail fast
  // rather than hold a spinner forever.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${config.apiUrl}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...rest.headers,
      },
    });
  } catch (cause) {
    throw new AppError("network", "Could not reach the server.", cause);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    throw new AppError(
      response.status === 401
        ? "unauthorized"
        : response.status === 403
          ? "forbidden"
          : response.status === 404
            ? "not_found"
            : response.status === 400
              ? "validation"
              : "unknown",
      body?.error ?? `Request failed (${response.status}).`,
    );
  }

  return (await response.json()) as T;
}
