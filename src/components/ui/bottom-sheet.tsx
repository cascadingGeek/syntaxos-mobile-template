import { Modal, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: BottomSheetProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end bg-black/60">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close sheet"
          onPress={onClose}
          className="absolute inset-0"
        />
        <SafeAreaView
          edges={["bottom"]}
          className={cn(
            "max-h-[85%] rounded-t-3xl border border-b-0 border-border bg-card px-5 pb-2 pt-3",
            className,
          )}
        >
          <View className="mb-4 h-1 w-10 self-center rounded-full bg-border" />
          {title ? (
            <Text variant="title" className="mb-4">
              {title}
            </Text>
          ) : null}
          {children}
        </SafeAreaView>
      </View>
    </Modal>
  );
}
