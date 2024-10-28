import * as Sentry from "@sentry/nextjs";

type AdditionalContext = {
  [key: string]: unknown;
};

export function logErrorToSentry(
  error: unknown,
  componentName: string,
  errorType: string,
  additionalContext: AdditionalContext = {},
  userId?: string
): void {
  Sentry.withScope((scope: Sentry.Scope) => {
    scope.setExtra("componentName", componentName);
    if (userId) scope.setExtra("userId", userId);
    scope.setTag("errorType", errorType);

    Object.entries(additionalContext).forEach(([key, value]) => {
      scope.setExtra(key, value);
    });

    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage("Non-Error object thrown", {
        level: "error",
        extra: { error },
      });
    }
  });
}
