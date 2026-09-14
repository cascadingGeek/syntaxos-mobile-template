import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export type IconButtonProps = Omit<
  React.ComponentProps<typeof Pressable>,
  "children"
> & {
  icon: LucideIcon;
  label: string;
  size?: number;
  iconClassName?: string;
};

export function IconButton({
  icon,
  label,
  size = 20,
  className,
  iconClassName,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      className={cn(
        "h-11 w-11 items-center justify-center rounded-full border border-border bg-card",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <Icon as={icon} size={size} className={cn("text-foreground", iconClassName)} />
    </Pressable>
  );
}
