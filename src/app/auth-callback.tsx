/**
 * Email-confirmation deep link → session.
 *
 * Supabase sends the user to `<scheme>://auth-callback#access_token=...`.
 * detectSessionInUrl is off for native (there is no address bar), so the
 * tokens are read off the deep link and handed to the client here.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

import { LoadingState } from "@/components/loading-state";
import { Screen } from "@/components/ui/screen";
import { setSessionFromTokens } from "@/data/auth";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    access_token?: string;
    refresh_token?: string;
  }>();

  useEffect(() => {
    const { access_token: accessToken, refresh_token: refreshToken } = params;
    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    void setSessionFromTokens(accessToken, refreshToken)
      .then(() => router.replace("/"))
      .catch(() => router.replace("/login"));
  }, [params, router]);

  // Wrapped, like every other route: `Screen` applies the safe-area insets,
  // and a bare root paints under the status bar and the camera cutout. This
  // is the only route in the template that was missing it, so it failed the
  // safe-area gate on every app the platform generated.
  return (
    <Screen>
      <LoadingState label="Signing you in…" />
    </Screen>
  );
}
