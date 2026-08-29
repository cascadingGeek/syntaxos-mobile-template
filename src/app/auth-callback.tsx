/**
 * Email-confirmation deep link → session.
 *
 * Supabase sends the user to `<scheme>://auth-callback#access_token=...`.
 * detectSessionInUrl is off for native (there is no address bar), so the
 * tokens are read off the deep link and handed to the client here.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { tokens } from "@/core/theme";
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

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: tokens.color.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
