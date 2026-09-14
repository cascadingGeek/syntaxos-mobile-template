import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type ListItemProps = Omit<
  React.ComponentProps<typeof Pressable>,
  "children"
> & {
  title: string;
  description?: string;
  leadingIcon?: LucideIcon;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showChevron?: boolean;
};

export function ListItem({
  title,
  description,
  leadingIcon,
  leading,
  trailing,
  showChevron = false,
  className,
  ...props
}: ListItemProps) {
  return (
    <Pressable
      accessibilityRole={props.onPress ? "button" : undefined}
      className={cn("min-h-16 flex-row items-center gap-3 py-3", className)}
      {...props}
    >
      {leading ??
        (leadingIcon ? (
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-secondary">
            <Icon as={leadingIcon} size={20} className="text-foreground" />
          </View>
        ) : null)}
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="font-semibold" numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text variant="muted" numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      {trailing}
      {showChevron ? (
        <Icon as={ChevronRight} size={18} className="text-muted-foreground" />
      ) : null}
    </Pressable>
  );
}
