/**
 * Shared, feature-agnostic UI. (components/ui/ is reserved for the baked
 * primitives and is never hand-edited — invariant 8.)
 *
 * The "nothing here yet" treatment. An empty list is the first thing a new
 * user sees, so it says what will appear and, when there is one, offers the
 * action that fills it.
 */
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <View
      className={cn("flex-1 items-center justify-center gap-3 px-8", className)}
    >
      <View className="mb-1 rounded-full bg-muted p-4">
        <Icon as={icon} size={28} className="text-muted-foreground" />
      </View>
      <Text variant="title" className="text-center">
        {title}
      </Text>
      {description ? (
        <Text variant="muted" className="text-center">
          {description}
        </Text>
      ) : null}
      {action ? (
        <Button
          label={action.label}
          onPress={action.onPress}
          className="mt-2 self-stretch"
        />
      ) : null}
    </View>
  );
}
