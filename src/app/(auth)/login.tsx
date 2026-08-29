/**
 * Email + password sign-in. Auth goes through data/auth (invariant 1); the
 * screen owns only presentation and local form state.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { isAppError } from "@/core/app-error";
import { signInWithPassword } from "@/data/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn() {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithPassword(email.trim(), password);
      router.replace("/");
    } catch (cause) {
      setError(
        isAppError(cause) ? cause.message : "Could not sign in. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center gap-4 p-6">
        <Text variant="heading" className="mb-2">
          Sign in
        </Text>

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          inputMode="email"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="current-password"
          secureTextEntry
        />

        {error ? <Text variant="destructive">{error}</Text> : null}

        <Button label="Continue" isLoading={isSubmitting} onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
}
