/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 */
import { View } from "react-native";

import { cn } from "@/lib/cn";

export type CardProps = React.ComponentProps<typeof View>;

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn("rounded-2xl border border-border bg-card p-4", className)}
      {...props}
    />
  );
}
