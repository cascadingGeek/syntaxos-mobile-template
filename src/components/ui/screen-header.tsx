import { ArrowLeft, type LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: { icon: LucideIcon; label: string; onPress: () => void };
  className?: string;
};

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  action,
  className,
}: ScreenHeaderProps) {
  return (
    <View className={cn("min-h-16 flex-row items-center gap-3 py-3", className)}>
      {onBack ? (
        <IconButton icon={ArrowLeft} label="Go back" onPress={onBack} />
      ) : null}
      <View className="min-w-0 flex-1">
        <Text variant="title" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action ? (
        <IconButton
          icon={action.icon}
          label={action.label}
          onPress={action.onPress}
        />
      ) : null}
    </View>
  );
}
