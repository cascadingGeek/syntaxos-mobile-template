import { Search, X } from "lucide-react-native";
import { View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export type SearchFieldProps = InputProps & {
  onClear?: () => void;
  containerClassName?: string;
};

export function SearchField({
  value,
  onClear,
  className,
  containerClassName,
  ...props
}: SearchFieldProps) {
  return (
    <View
      className={cn(
        "h-12 flex-row items-center gap-2 rounded-xl border border-input bg-card px-3",
        containerClassName,
      )}
    >
      <Icon as={Search} size={18} className="text-muted-foreground" />
      <Input
        value={value}
        returnKeyType="search"
        className={cn("h-full flex-1 border-0 bg-transparent px-0 py-0", className)}
        {...props}
      />
      {value && onClear ? (
        <IconButton
          icon={X}
          label="Clear search"
          size={16}
          onPress={onClear}
          className="h-8 w-8 border-0 bg-transparent"
        />
      ) : null}
    </View>
  );
}
