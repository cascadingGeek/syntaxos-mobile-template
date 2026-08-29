/**
 * Email + password sign-in. Auth goes through data/auth (invariant 1); the
 * screen owns only presentation and local form state.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { isAppError } from "@/core/app-error";
import { tokens } from "@/core/theme";
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <Text style={styles.heading}>Sign in</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={tokens.color.textMuted}
          autoCapitalize="none"
          autoComplete="email"
          inputMode="email"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={tokens.color.textMuted}
          autoCapitalize="none"
          autoComplete="current-password"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={styles.button}
          onPress={handleSignIn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={tokens.color.text} />
          ) : (
            <Text style={styles.buttonLabel}>Continue</Text>
          )}
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
    marginBottom: tokens.space.sm,
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
