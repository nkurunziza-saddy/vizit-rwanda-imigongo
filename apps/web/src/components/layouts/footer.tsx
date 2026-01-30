"use client";

import {
	FacebookIcon,
	InstagramIcon,
	TwitterIcon,
	YoutubeIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import { Link } from "@tanstack/react-router";

type FooterLink = {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
};
type FooterLinkGroup = {
	label: string;
	links: FooterLink[];
};

export function Footer() {
	return (
		<footer
			className="relative h-[560px] w-full border-t"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="fixed bottom-0 h-[560px] w-full">
				<div className="sticky top-[calc(100vh-560px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 px-4">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 opacity-50 contain-strict dark:opacity-100"
						>
							<div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
							<div className="-rotate-45 absolute top-0 left-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
							<div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
						</div>
						<div className="flex flex-col gap-8 pt-12 md:flex-row">
							<AnimatedContainer className="w-full min-w-2xs max-w-sm space-y-4">
								<div className="flex items-center gap-2 text-xl font-bold">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<Logo className="size-4" />
									</div>
									Vizit Africa
								</div>
								<p className="mt-8 text-muted-foreground text-sm md:mt-0">
									Your gateway to authentic African adventures. Discover
									Rwanda's beauty with trusted accommodations, premium
									transport, and expert local guides.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link, index) => (
										<a
											key={`social-${link.href}-${index}`}
											href={link.href}
											className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
										>
											<link.icon className="size-4" />
										</a>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									className="w-full"
									delay={0.1 + index * 0.1}
									key={group.label}
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm uppercase font-semibold">
											{group.label}
										</h3>
										<ul className="mt-4 space-y-2 text-muted-foreground text-sm md:text-xs lg:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<Link
														className="inline-flex items-center transition-all duration-300 hover:text-foreground"
														to={link.href}
													>
														{link.icon && <link.icon className="me-1 size-4" />}
														{link.title}
													</Link>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="flex flex-col items-center justify-between gap-2 border-t py-4 text-muted-foreground text-sm md:flex-row">
							<p>
								&copy; {new Date().getFullYear()} Vizit Africa, All rights
								reserved.
							</p>
							<div className="flex gap-4">
								<Link className="hover:text-foreground" to="/privacy">
									Privacy Policy
								</Link>
								<Link className="hover:text-foreground" to="/terms">
									Terms of Service
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: "Facebook", href: "#", icon: FacebookIcon },
	{ title: "Instagram", href: "#", icon: InstagramIcon },
	{ title: "Twitter", href: "#", icon: TwitterIcon },
	{ title: "Youtube", href: "#", icon: YoutubeIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: "Explore",
		links: [
			{ title: "Hotels", href: "/listings?category=hotel" },
			{ title: "Apartments", href: "/listings?category=bnb" },
			{ title: "Car Rentals", href: "/listings?category=car" },
			{ title: "Tours & Guides", href: "/listings?category=tour" },
			{ title: "Packages", href: "/listings?category=package" },
		],
	},
	{
		label: "Support",
		links: [
			{ title: "Help Center", href: "/contact" },
			{ title: "Safety Information", href: "/safety" },
			{ title: "Cancellation Options", href: "/cancellations" },
			{ title: "Report a Concern", href: "/contact" },
			{ title: "Contact Us", href: "/contact" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "About Us", href: "/about" },
			{ title: "Careers", href: "/careers" },
			{ title: "Partners", href: "/partners" },
			{ title: "Press", href: "/press" },
			{ title: "Blog", href: "/blog" },
			{ title: "Become a Vendor", href: "/become-vendor" },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
			transition={{ delay, duration: 0.8 }}
			viewport={{ once: true }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
