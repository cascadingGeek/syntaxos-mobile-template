import { X } from "lucide-react-native";
import { Modal, Pressable, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-black/60 p-6">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
          onPress={onClose}
          className="absolute inset-0"
        />
        <View
          accessibilityViewIsModal
          className={cn(
            "w-full max-w-md gap-4 rounded-3xl border border-border bg-card p-5",
            className,
          )}
        >
          <View className="flex-row items-start gap-3">
            <View className="min-w-0 flex-1 gap-1">
              <Text variant="title">{title}</Text>
              {description ? <Text variant="muted">{description}</Text> : null}
            </View>
            <IconButton
              icon={X}
              label="Close"
              size={18}
              onPress={onClose}
              className="h-9 w-9 border-0 bg-transparent"
            />
          </View>
          {children}
          {footer ? <View className="gap-2 pt-1">{footer}</View> : null}
        </View>
      </View>
    </Modal>
  );
}
