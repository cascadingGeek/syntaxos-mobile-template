/**
 * Shared, feature-agnostic UI. (components/ui/ is reserved for the baked
 * primitives and is never hand-edited — invariant 8.)
 */
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

export function EmptyState({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <View className="flex-1 items-center justify-center gap-2">
      <Icon size={32} color="rgb(140 140 150)" />
      <Text variant="muted">{title}</Text>
    </View>
  );
}
