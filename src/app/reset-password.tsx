/**
 * Recovery deep link → new password. The recovery link establishes a session
 * first (auth-callback), so this screen only has to set the new password.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { isAppError } from "@/core/app-error";
import { tokens } from "@/core/theme";
import { updatePassword } from "@/data/auth";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    try {
      await updatePassword(password);
      router.replace("/");
    } catch (cause) {
      setError(
        isAppError(cause) ? cause.message : "Could not update your password.",
      );
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <Text style={styles.heading}>Choose a new password</Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="New password"
          placeholderTextColor={tokens.color.textMuted}
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonLabel}>Update password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: tokens.color.background, flex: 1 },
  form: {
    flex: 1,
    gap: tokens.space.md,
    justifyContent: "center",
    padding: tokens.space.lg,
  },
  heading: {
    color: tokens.color.text,
    fontSize: tokens.fontSize.xl,
    fontWeight: "700",
  },
  input: {
    backgroundColor: tokens.color.surface,
    borderColor: tokens.color.border,
    borderRadius: tokens.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    color: tokens.color.text,
    fontSize: tokens.fontSize.md,
    padding: tokens.space.md,
  },
  button: {
    alignItems: "center",
    backgroundColor: tokens.color.accent,
    borderRadius: tokens.radius.md,
    padding: tokens.space.md,
  },
  buttonLabel: {
    color: tokens.color.text,
    fontSize: tokens.fontSize.md,
    fontWeight: "600",
  },
  error: { color: tokens.color.danger, fontSize: tokens.fontSize.sm },
});
