import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/cn";

export type ScreenProps = React.ComponentProps<typeof SafeAreaView> & {
  scroll?: boolean;
  contentClassName?: string;
};

export function Screen({
  scroll = false,
  className,
  contentClassName,
  children,
  ...props
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={cn("flex-1 bg-background", className)}
      {...props}
    >
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName={cn("grow px-5 pb-8", contentClassName)}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn("flex-1 px-5", contentClassName)}>{children}</View>
      )}
    </SafeAreaView>
  );
}
