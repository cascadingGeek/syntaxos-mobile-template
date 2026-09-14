import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

const badgeVariants = cva("self-start rounded-full px-2.5 py-1", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      outline: "border border-border bg-transparent",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  label: string;
  className?: string;
};

export function Badge({ label, variant, className }: BadgeProps) {
  const foreground =
    variant === "default"
      ? "text-primary-foreground"
      : variant === "destructive"
        ? "text-destructive-foreground"
        : "text-foreground";

  return (
    <View className={cn(badgeVariants({ variant }), className)}>
      <Text className={cn("text-xs font-semibold", foreground)}>{label}</Text>
    </View>
  );
}
