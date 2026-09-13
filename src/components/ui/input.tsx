/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 */
import { cssInterop } from "nativewind";
import { TextInput } from "react-native";

import { cn } from "@/lib/cn";

// RN takes the placeholder colour as a PROP, which CSS variables cannot reach
// on their own. Mapping a class onto it keeps the placeholder on the approved
// tokens instead of a literal no design can restyle. `className` keeps the
// mapping NativeWind registers for TextInput by default.
const StyledTextInput = cssInterop(TextInput, {
  className: { target: "style", nativeStyleToProp: { textAlign: true } },
  placeholderClassName: {
    target: false,
    nativeStyleToProp: { color: "placeholderTextColor" },
  },
});

export type InputProps = React.ComponentProps<typeof StyledTextInput>;

export function Input({ className, placeholderClassName, ...props }: InputProps) {
  return (
    <StyledTextInput
      className={cn(
        "rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
}
