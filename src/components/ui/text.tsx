/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8). Regenerate the template to change it.
 */
import { cva, type VariantProps } from "class-variance-authority";
import { Text as RNText } from "react-native";

import { cn } from "@/lib/cn";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-base",
      muted: "text-sm text-muted-foreground",
      heading: "text-2xl font-bold",
      title: "text-lg font-semibold",
      destructive: "text-sm text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

export type TextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textVariants>;

export function Text({ className, variant, ...props }: TextProps) {
  return (
    <RNText className={cn(textVariants({ variant }), className)} {...props} />
  );
}
