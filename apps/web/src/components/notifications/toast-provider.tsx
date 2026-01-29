import { Toaster } from "sonner";

/**
 * Toast Provider Component
 *
 * Wraps the Sonner toast library for consistent toast notifications
 * throughout the application.
 */

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={5000}
      toastOptions={{
        classNames: {
          toast:
            "group rounded-lg border shadow-lg bg-background text-foreground",
          title: "text-sm font-semibold",
          description: "text-sm text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton: "bg-muted text-muted-foreground hover:bg-muted/90",
        },
      }}
    />
  );
}

export default ToastProvider;
