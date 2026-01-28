import { Star, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionContainer } from "../ui/section";

const testimonials = [
	{
		id: 1,
		content:
			"The best way to explore Rwanda. We booked a 3-day Akagera safari and the local guides were incredible. Everything was handled professionally.",
		author: "Sarah Jenkins",
		role: "Traveler from UK",
		rating: 5,
		image:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
		referral: "Akagera Safari Package",
		date: "Oct 2023",
	},
	{
		id: 2,
		content:
			"Seamless booking process for our stay in Kiyovu. I loved that I could pay securely online. The property matched the photos exactly.",
		author: "David M.",
		role: "Digital Nomad",
		rating: 5,
		image:
			"https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
		referral: "Stayed at The Retreat",
		date: "Dec 2023",
	},
	{
		id: 3,
		content:
			"I use Vizit Africa for all my business car rentals. The Toyota RAV4 was pristine and dropped off at the airport on time.",
		author: "Anita K.",
		role: "Business Traveler",
		rating: 5,
		image:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
		referral: "Rented Toyota RAV4",
		date: "Jan 2024",
	},
];

export const TestimonialsSection = () => {
	return (
		<SectionContainer
			title="Traveler Stories"
			description="Hear from community members who have explored with us."
			align="start"
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{testimonials.map((item) => (
					<div
						key={item.id}
						className="p-6 rounded-lg border border-border/60 bg-transparent flex flex-col gap-4 hover:border-border transition-colors group"
					>
						<div className="flex justify-between items-start">
							<div className="flex gap-0.5 text-primary">
								{[...Array(item.rating)].map((_, i) => (
									<Star
										key={i}
										className="h-3 w-3 fill-foreground text-foreground"
									/>
								))}
							</div>
							<span className="text-xs text-muted-foreground">{item.date}</span>
						</div>

						<p className="text-sm text-foreground/80 italic leading-relaxed">
							"{item.content}"
						</p>

						<div className="w-full h-px bg-border/40 my-2" />

						<div className="mt-auto flex items-center gap-3">
							<Avatar className="h-10 w-10 border border-border">
								<AvatarImage
									src={item.image}
									alt={item.author}
									className="object-cover"
								/>
								<AvatarFallback>
									<UserCircle2 className="h-6 w-6 text-muted-foreground" />
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-semibold text-sm text-foreground">
									{item.author}
								</div>
								<div className="text-xs text-muted-foreground mb-0.5">
									{item.role}
								</div>
								{item.referral && (
									<div className="text-[10px] uppercase tracking-wider text-primary font-medium">
										{item.referral}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</SectionContainer>
	);
};

export default TestimonialsSection;
