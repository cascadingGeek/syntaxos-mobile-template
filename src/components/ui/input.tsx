/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 */
import { TextInput } from "react-native";

import { cn } from "@/lib/cn";

export type InputProps = React.ComponentProps<typeof TextInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground",
        className,
      )}
      // RN does not inherit a placeholder colour from CSS variables, so it is
      // passed explicitly to keep light/dark legible.
      placeholderTextColor="rgb(140 140 150)"
      {...props}
    />
  );
}
