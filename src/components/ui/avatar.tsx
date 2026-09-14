import { Image, type ImageProps } from "expo-image";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type AvatarProps = {
  source?: ImageProps["source"];
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-11 w-11",
  lg: "h-16 w-16",
} as const;

export function Avatar({ source, name, size = "md", className }: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <View
      className={cn(
        "items-center justify-center overflow-hidden rounded-full bg-secondary",
        sizes[size],
        className,
      )}
      accessibilityLabel={name}
    >
      {source ? (
        <Image source={source} contentFit="cover" className="h-full w-full" />
      ) : (
        <Text className="font-semibold">{initials || "?"}</Text>
      )}
    </View>
  );
}
