import type { LucideIcon } from "lucide-react-native";
import { Switch } from "react-native";

import { ListItem } from "@/components/ui/list-item";

export type SwitchRowProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function SwitchRow({
  title,
  description,
  icon,
  value,
  onValueChange,
  disabled,
  className,
}: SwitchRowProps) {
  return (
    <ListItem
      title={title}
      description={description}
      leadingIcon={icon}
      className={className}
      onPress={() => !disabled && onValueChange(!value)}
      trailing={
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          accessibilityLabel={title}
        />
      }
    />
  );
}
