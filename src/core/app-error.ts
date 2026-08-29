/**
 * One error type the whole app agrees on, so a screen can decide what to show
 * without knowing whether the failure came from PostgREST, an API route, or
 * the network. `core/` imports nothing.
 */

export type AppErrorKind =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "conflict"
  | "network"
  | "unknown";

export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly cause?: unknown;

  constructor(kind: AppErrorKind, message: string, cause?: unknown) {
    super(message);
    this.name = "AppError";
    this.kind = kind;
    this.cause = cause;
  }

  /** True for failures worth retrying automatically. */
  get isTransient(): boolean {
    return this.kind === "network";
  }
}

export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}
