import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

function NavigationMenu({
	className,
	children,
	...props
}: NavigationMenuPrimitive.Root.Props) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPositioner />
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center space-x-1",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center border-b-2 border-transparent bg-transparent px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:border-foreground hover:text-primary focus:border-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:border-foreground data-[state=open]:border-foreground",
);

function NavigationMenuTrigger({
	className,
	children,
	...props
}: NavigationMenuPrimitive.Trigger.Props) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}
		>
			{children}{" "}
			<HugeiconsIcon
				icon={ArrowDown01Icon}
				strokeWidth={2}
				className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-full md:absolute md:w-auto h-full",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuPositioner({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "center",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"absolute left-0 top-full z-[1] flex justify-center",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border-2 border-foreground bg-popover text-popover-foreground shadow-lg animate-in zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]">
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-foreground hover:text-white focus:bg-foreground focus:text-white",
				className,
			)}
			{...props}
		/>
	);
}

// function NavigationMenuIndicator({
//   className,
// }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
//   return null;
// }
function NavigationMenuIndicator() {
	return null;
}

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuPositioner,
};
