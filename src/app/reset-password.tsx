/**
 * Recovery deep link → new password. The recovery link establishes a session
 * first (auth-callback), so this screen only has to set the new password.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { isAppError } from "@/core/app-error";
import { updatePassword } from "@/data/auth";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);
    try {
      await updatePassword(password);
      router.replace("/");
    } catch (cause) {
      setError(
        isAppError(cause) ? cause.message : "Could not update your password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center gap-4 p-6">
        <Text variant="heading" className="mb-2">
          Choose a new password
        </Text>

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="New password"
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
        />

        {error ? <Text variant="destructive">{error}</Text> : null}

        <Button
          label="Update password"
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
