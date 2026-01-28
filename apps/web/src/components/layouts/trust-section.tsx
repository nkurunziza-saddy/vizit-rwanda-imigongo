import { Award, Clock, CreditCard, Shield } from "lucide-react";
import { SectionContainer } from "@/components/ui/section";

const features = [
	{
		icon: Shield,
		title: "Verified Partners",
		description: "Every listing is vetted by our team.",
	},
	{
		icon: CreditCard,
		title: "Secure Payments",
		description: "Safe and secure transactions.",
	},
	{
		icon: Clock,
		title: "24/7 Support",
		description: "Round-the-clock assistance.",
	},
	{
		icon: Award,
		title: "Best Price Guarantee",
		description: "Competitive pricing for all adventures.",
	},
];

export const TrustSection = () => {
	return (
		<SectionContainer
			title="Why Vizit Africa"
			description="Experience safety, reliability, and best prices."
			align="start"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{features.map((feature) => (
					<div key={feature.title} className="flex flex-col gap-3">
						<div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-foreground">
							<feature.icon className="h-4 w-4" strokeWidth={1.5} />
						</div>
						<div>
							<h3 className="text-sm font-medium mb-1 text-foreground">
								{feature.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</SectionContainer>
	);
};

export default TrustSection;
