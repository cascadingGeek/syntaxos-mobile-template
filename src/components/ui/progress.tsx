import { View } from "react-native";

import { cn } from "@/lib/cn";

export type ProgressProps = {
  value: number;
  className?: string;
  indicatorClassName?: string;
  label?: string;
};

export function Progress({
  value,
  className,
  indicatorClassName,
  label,
}: ProgressProps) {
  const normalized = Math.min(100, Math.max(0, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: normalized }}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <View
        className={cn("h-full rounded-full bg-primary", indicatorClassName)}
        style={{ width: `${normalized}%` }}
      />
    </View>
  );
}
