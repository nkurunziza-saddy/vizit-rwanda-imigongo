"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  MultiplicationSignCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-foreground group-[.toaster]:text-white group-[.toaster]:border-2 group-[.toaster]:border-primary group-[.toaster]:shadow-lg group-[.toaster]:font-sans group-[.toaster]:rounded",
          description: "group-[.toast]:text-white/80",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-foreground font-bold uppercase tracking-widest",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white font-bold uppercase tracking-widest",
        },
      }}
      icons={{
        success: (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={2}
            className="size-5 text-primary"
          />
        ),
        info: (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="size-5 text-white"
          />
        ),
        warning: (
          <HugeiconsIcon
            icon={Alert02Icon}
            strokeWidth={2}
            className="size-5 text-primary"
          />
        ),
        error: (
          <HugeiconsIcon
            icon={MultiplicationSignCircleIcon}
            strokeWidth={2}
            className="size-5 text-red-500"
          />
        ),
        loading: (
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className="size-5 animate-spin text-white"
          />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
