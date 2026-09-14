/**
 * GENERATED PRIMITIVE — baked once at template build. DO NOT HAND-EDIT
 * (structure contract, invariant 8).
 */
import { AlertCircle, Inbox } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

type StateViewProps = React.ComponentProps<typeof View> & {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

function StateView({
  title,
  description,
  actionLabel,
  onAction,
  className,
  children,
  ...props
}: StateViewProps) {
  return (
    <View
      className={cn("flex-1 items-center justify-center gap-3 px-6 py-10", className)}
      {...props}
    >
      {children}
      <View className="max-w-sm items-center gap-1.5">
        <Text variant="title" className="text-center">
          {title}
        </Text>
        {description ? (
          <Text variant="muted" className="text-center">
            {description}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} className="mt-2" />
      ) : null}
    </View>
  );
}

export type LoadingStateProps = Omit<StateViewProps, "children"> & {
  title?: string;
};

export function LoadingState({
  title = "Loading",
  accessibilityLabel = "Loading",
  ...props
}: LoadingStateProps) {
  return (
    <StateView
      title={title}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      {...props}
    >
      <ActivityIndicator className="text-primary" size="large" />
    </StateView>
  );
}

export type EmptyStateProps = Omit<StateViewProps, "children">;

export function EmptyState(props: EmptyStateProps) {
  return (
    <StateView {...props}>
      <View className="rounded-full bg-muted p-4">
        <Icon as={Inbox} size={28} className="text-muted-foreground" />
      </View>
    </StateView>
  );
}

export type ErrorStateProps = Omit<StateViewProps, "children">;

export function ErrorState(props: ErrorStateProps) {
  return (
    <StateView accessibilityRole="alert" {...props}>
      <View className="rounded-full bg-destructive/10 p-4">
        <Icon as={AlertCircle} size={28} className="text-destructive" />
      </View>
    </StateView>
  );
}
