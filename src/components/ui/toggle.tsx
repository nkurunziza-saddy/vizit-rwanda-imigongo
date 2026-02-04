import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-1 text-sm font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-foreground data-[state=on]:text-white hover:bg-foreground/10",
	{
		variants: {
			variant: {
				default: "bg-transparent border-2 border-transparent",
				outline:
					"border-2 border-foreground bg-transparent hover:bg-foreground hover:text-white",
			},
			size: {
				default: "h-9 min-w-9 px-3",
				sm: "h-8 min-w-8 px-2 text-xs",
				lg: "h-10 min-w-10 px-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
