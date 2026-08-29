/**
 * Shared, feature-agnostic UI. (components/ui/ is reserved for the generated
 * gluestack primitives and is never hand-edited — invariant 8.)
 */
import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/core/theme";

export function EmptyState({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <View style={styles.container}>
      <Icon size={32} color={tokens.color.textMuted} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: tokens.space.sm,
    justifyContent: "center",
  },
  title: { color: tokens.color.textMuted, fontSize: tokens.fontSize.md },
});
