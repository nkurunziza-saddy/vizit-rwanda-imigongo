use of these styles:

```css
@layer utilities {
  .container {
    @apply mx-auto w-full max-w-7xl;
  }

  .cpx {
    @apply px-4 lg:px-6;
  }
}
```

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export function BorderSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "-translate-x-1/2 pointer-events-none absolute left-1/2 w-screen border-t",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DashedLines({
  width = 20,
  height = 50,
  x = 10,
  className,
  ...props
}: React.ComponentProps<"svg">) {
  const id = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none size-full stroke-border", className)}
      {...props}
    >
      <pattern
        height={height}
        id={id}
        patternUnits="userSpaceOnUse"
        width={width}
        x={x}
      >
        <path d={`M.5 0 V${height}`} fill="none" strokeDasharray={2.5} />
      </pattern>
      <rect fill={`url(#${id})`} height="100%" strokeWidth={0} width="100%" />
    </svg>
  );
}
```

Example of a page:

```tsx
import Link from "next/link";
import { BorderSeparator } from "@/components/sheard";
import { Tweets } from "@/components/tweets";
import { getAllCategories } from "@/lib/utils/blocks-data";
import type { Category } from "@/types";

export default function Page() {
  const categories = getAllCategories();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-secondary/40 supports-[overflow:clip]:overflow-clip dark:bg-background">
      <SiteHeader />
      <main
        className={cn(
          "container relative grow",
          "before:-inset-y-20 before:-left-px before:absolute before:z-1 before:border-border before:border-dashed xl:before:border-l",
          "after:-inset-y-20 after:-right-px after:absolute after:z-1 after:border-border after:border-dashed xl:after:border-r",
        )}
      >
        <div className="min-h-screen">
          <div className="cpx space-y-2 py-5">
            <h1 className="font-bold font-heading text-4xl">
              Beautiful Shadcn Blocks
            </h1>
            <p className="text-muted-foreground text-sm">
              Beautiful Shadcn UI blocks and components for modern web apps.
            </p>
          </div>
          <BorderSeparator />
          <div className="cpx grid grid-cols-2 gap-4 py-5 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
            <div className="flex aspect-video flex-col items-center justify-center rounded-md border p-2">
              <p className="font-heading font-semibold text-muted-foreground text-sm md:text-lg">
                Coming Soon
              </p>
            </div>
          </div>
          <BorderSeparator />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
```
