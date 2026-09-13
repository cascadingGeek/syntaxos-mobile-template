/**
 * Shared, feature-agnostic UI.
 *
 * The "that failed" treatment. It takes the raw error and decides the copy
 * from `AppError.kind`, so no screen shows a PostgREST message to a user and
 * no screen has to rewrite the same switch. Retry appears only when the
 * caller can actually retry.
 */
import {
  CircleAlert,
  Lock,
  SearchX,
  WifiOff,
  type LucideIcon,
} from "lucide-react-native";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { isAppError, type AppErrorKind } from "@/core/app-error";
import { cn } from "@/lib/cn";

type Copy = { icon: LucideIcon; title: string; description: string };

const COPY: Record<AppErrorKind, Copy> = {
  network: {
    icon: WifiOff,
    title: "You're offline",
    description: "Check your connection and try again.",
  },
  unauthorized: {
    icon: Lock,
    title: "Your session ended",
    description: "Sign in again to pick up where you left off.",
  },
  forbidden: {
    icon: Lock,
    title: "You don't have access",
    description: "This belongs to another account.",
  },
  not_found: {
    icon: SearchX,
    title: "We couldn't find that",
    description: "It may have been moved or deleted.",
  },
  // Validation and conflict messages are written for people by data/, so
  // they are shown as-is below instead of a generic line.
  validation: {
    icon: CircleAlert,
    title: "Check the details",
    description: "",
  },
  conflict: {
    icon: CircleAlert,
    title: "That changed in the meantime",
    description: "",
  },
  unknown: {
    icon: CircleAlert,
    title: "Something went wrong",
    description: "Please try again in a moment.",
  },
};

export type ErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  title?: string;
  className?: string;
};

export function ErrorState({ error, onRetry, title, className }: ErrorStateProps) {
  const kind: AppErrorKind = isAppError(error) ? error.kind : "unknown";
  const copy = COPY[kind];
  const description =
    copy.description || (isAppError(error) ? error.message : "");

  return (
    <View
      className={cn("flex-1 items-center justify-center gap-3 px-8", className)}
      accessibilityRole="alert"
    >
      <View className="mb-1 rounded-full bg-muted p-4">
        <Icon as={copy.icon} size={28} className="text-destructive" />
      </View>
      <Text variant="title" className="text-center">
        {title ?? copy.title}
      </Text>
      {description ? (
        <Text variant="muted" className="text-center">
          {description}
        </Text>
      ) : null}
      {onRetry ? (
        <Button
          label="Try again"
          variant="outline"
          onPress={onRetry}
          className="mt-2 self-stretch"
        />
      ) : null}
    </View>
  );
}
