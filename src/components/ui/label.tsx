import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
	"text-xs font-bold uppercase tracking-widest text-foreground/60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

function Label({
	className,
	...props
}: React.ComponentProps<"label"> & VariantProps<typeof labelVariants>) {
	return (
		<label
			data-slot="label"
			className={cn(labelVariants(), className)}
			{...props}
		/>
	);
}

export { Label };
