/**
 * Shared, feature-agnostic UI.
 *
 * The "waiting for data" treatment. It fills its container and paints the
 * screen background, so a route guard or a first fetch never flashes an
 * unstyled white frame before the real screen arrives.
 */
import { ActivityIndicator, View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label, className }: LoadingStateProps) {
  return (
    <View
      className={cn(
        "flex-1 items-center justify-center gap-3 bg-background",
        className,
      )}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? "Loading"}
    >
      <ActivityIndicator size="large" className="text-primary" />
      {label ? <Text variant="muted">{label}</Text> : null}
    </View>
  );
}
