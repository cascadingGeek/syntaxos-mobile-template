import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

import { cn } from "@/lib/cn";

export type SkeletonProps = React.ComponentProps<typeof Animated.View>;

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  const [opacity] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn("rounded-xl bg-muted", className)}
      style={[{ opacity }, style]}
      {...props}
    />
  );
}
