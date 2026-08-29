/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 */
import { cva, type VariantProps } from "class-variance-authority";
import { ActivityIndicator, Pressable } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-xl px-4 py-3",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        default: "py-3",
        sm: "px-3 py-2",
        lg: "px-6 py-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const labelVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      ghost: "text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    label: string;
    isLoading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  label,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size }),
        (disabled || isLoading) && "opacity-50",
        className,
      )}
      // A button that looks disabled but still fires is worse than one that
      // never disables, so the loading state gates the press too.
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text className={cn(labelVariants({ variant }))}>{label}</Text>
      )}
    </Pressable>
  );
}
