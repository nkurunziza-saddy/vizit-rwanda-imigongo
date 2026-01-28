import { Link as RouterNavLink, type LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
	className?: string;
	activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
	({ className, activeClassName, to, ...props }, ref) => {
		return (
			<RouterNavLink
				ref={ref}
				to={to}
				activeProps={{ className: activeClassName }}
				{...props}
			/>
		);
	},
);

NavLink.displayName = "NavLink";

export { NavLink };
