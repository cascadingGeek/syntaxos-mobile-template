import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  label,
  children,
  hint,
  error,
  required,
  className,
}: FormFieldProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Text className="text-sm font-semibold">
        {label}
        {required ? " *" : ""}
      </Text>
      {children}
      {error ? (
        <Text variant="destructive" accessibilityRole="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text variant="muted">{hint}</Text>
      ) : null}
    </View>
  );
}
