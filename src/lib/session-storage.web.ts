/**
 * Web has no Keychain, and the web bundle also renders on the server (EAS
 * Hosting), where `window` does not exist. Returning undefined lets
 * supabase-js fall back to its own environment detection instead of throwing
 * at import time during SSR.
 */
export const sessionStorage = undefined;
