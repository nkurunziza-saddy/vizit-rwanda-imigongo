import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
	PatternVerticalDiamond,
	PatternZigZag,
} from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/_app/contact")({
	component: ContactPage,
});

function ContactPage() {
	const heroRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

	return (
		<div className="bg-background min-h-screen relative">
			<section
				ref={heroRef}
				className="relative h-[60vh] min-h-[500px] flex items-end justify-start bg-foreground overflow-hidden"
			>
				<motion.div style={{ y }} className="absolute inset-0 z-0 opacity-60">
					<img
						src="https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=2600"
						alt="Contact Us Background"
						className="w-full h-full object-cover grayscale contrast-125"
					/>
				</motion.div>

				<div className="absolute inset-0 z-10 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />

				<div className="container mx-auto px-4 pb-16 relative z-20">
					<Reveal>
						<span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
							Get In Touch
						</span>
					</Reveal>
					<Reveal delay={0.1}>
						<h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
							Start The <br />{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
								Journey
							</span>
						</h1>
					</Reveal>
				</div>

				<div className="absolute top-0 right-12 bottom-0 w-32 opacity-10 pointer-events-none hidden lg:block">
					<PatternVerticalDiamond className="w-full h-full text-white" />
				</div>
			</section>

			<section className="py-24 relative -mt-20 z-30">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
						<div className="space-y-12 pt-20 lg:pt-0">
							<Reveal>
								<p className="text-xl font-serif text-muted-foreground leading-relaxed max-w-md">
									We are ready to curate your African odyssey. Whether you have
									a simple question or need a complex itinerary, our concierge
									team is at your service.
								</p>
							</Reveal>

							<div className="grid gap-6">
								<Reveal delay={0.1}>
									<a
										href="https://wa.me/250788123456"
										target="_blank"
										rel="noreferrer"
										className="block group"
									>
										<div className="bg-white border border-foreground/10 hover:border-primary/50 text-foreground p-6 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-lg">
											<div className="flex items-center gap-6">
												<div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
													<MessageSquare className="w-6 h-6 fill-current" />
												</div>
												<div>
													<span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
														WhatsApp Us
													</span>
													<span className="text-xl font-black uppercase tracking-tight">
														+250 (788) 123 456
													</span>
												</div>
											</div>
											<ArrowRight className="w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
										</div>
									</a>
								</Reveal>

								<Reveal delay={0.2}>
									<a href="mailto:hello@vizit.africa" className="block group">
										<div className="bg-foreground text-white p-6 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-lg group-hover:bg-primary">
											<div className="flex items-center gap-6">
												<div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
													<Mail className="w-6 h-6" />
												</div>
												<div>
													<span className="block text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">
														Email Us
													</span>
													<span className="text-xl font-black uppercase tracking-tight">
														hello@vizit.africa
													</span>
												</div>
											</div>
											<ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
										</div>
									</a>
								</Reveal>
							</div>

							<div className="relative group overflow-hidden border border-foreground/10 bg-muted/20 h-80">
								<img
									src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=2000"
									alt="Map Location"
									className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
								/>
								<div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
								<div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-6 border border-white/20 shadow-xl max-w-xs">
									<div className="flex items-start gap-4">
										<MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
										<div>
											<h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-2">
												Headquarters
											</h3>
											<p className="text-sm text-muted-foreground font-serif leading-relaxed">
												Norrsken House Kigali
												<br />1 KN 78 St, Kigali, Rwanda
											</p>
											<div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
												<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
												Open Now
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -top-4 -right-4 w-full h-full border-2 border-foreground/5 z-0 lg:block hidden" />
							<div className="bg-background border border-foreground/10 p-8 md:p-12 relative z-10 shadow-2xl">
								<div className="mb-10">
									<h3 className="text-3xl font-black uppercase tracking-tight mb-2">
										Send a Message
									</h3>
									<p className="text-muted-foreground font-serif">
										Tell us about your dream trip.
									</p>
								</div>

								<form className="space-y-8">
									<div className="space-y-2 group">
										<label
											htmlFor="name"
											className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
										>
											Name
										</label>
										<InputGroup className="bg-transparent border-b border-foreground/20 focus-within:border-primary transition-colors">
											<InputGroupInput
												id="name"
												placeholder="John Doe"
												className="pl-0 font-bold text-lg h-12 shadow-none"
											/>
										</InputGroup>
									</div>

									<div className="space-y-2 group">
										<label
											htmlFor="email"
											className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
										>
											Email
										</label>
										<InputGroup className="bg-transparent border-b border-foreground/20 focus-within:border-primary transition-colors">
											<InputGroupInput
												id="email"
												type="email"
												placeholder="john@example.com"
												className="pl-0 font-bold text-lg h-12 shadow-none"
											/>
										</InputGroup>
									</div>

									<div className="space-y-2 group">
										<label
											htmlFor="type"
											className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
										>
											Interest
										</label>
										<InputGroup className="bg-transparent border-b border-foreground/20 focus-within:border-primary transition-colors">
											<select
												id="type"
												className="w-full bg-transparent border-none outline-none font-bold uppercase tracking-wide h-12 text-lg cursor-pointer appearance-none text-foreground"
											>
												<option>General Inquiry</option>
												<option>Booking a Tour</option>
												<option>Corporate Partnership</option>
												<option>Press & Media</option>
											</select>
										</InputGroup>
									</div>

									<div className="space-y-2 group">
										<label
											htmlFor="message"
											className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors"
										>
											Message
										</label>
										<textarea
											id="message"
											className="w-full h-32 bg-muted/30 border border-transparent focus:border-primary outline-none font-serif text-lg resize-none p-4 placeholder:italic placeholder:text-muted-foreground/50 transition-colors"
											placeholder="I'm interested in..."
										/>
									</div>

									<Button className="w-full bg-primary hover:bg-foreground text-white font-bold uppercase tracking-[0.2em] h-14 mt-4 transition-all duration-300 group flex items-center justify-between px-8 rounded-none">
										<span>Send Inquiry</span>
										<ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
									</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="h-24 bg-foreground flex items-center justify-center overflow-hidden relative">
				<PatternZigZag className="text-white/5 w-[120%] h-full absolute top-0" />
			</div>
			<section className="py-24 bg-background">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
						<div className="col-span-1 lg:col-span-4">
							<span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">
								Support
							</span>
							<h2 className="text-4xl font-black uppercase text-foreground mb-6">
								FAQ
							</h2>
							<p className="text-muted-foreground font-serif leading-relaxed mb-8">
								Common questions about our tours, booking process, and cultural
								etiquette. Can't find what you need? Send us a message above.
							</p>
							<Button
								variant="outline"
								className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-white uppercase tracking-widest text-xs font-bold h-12 px-8"
							>
								View Full FAQ
							</Button>
						</div>

						<div className="col-span-1 lg:col-span-8">
							<Accordion className="border-t border-foreground/10">
								<AccordionItem value="item-1">
									<AccordionTrigger className="uppercase font-bold tracking-tight text-lg hover:text-primary transition-colors py-6">
										How do I book a private tour?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground font-serif text-lg leading-relaxed">
										You can book a private tour directly through our specialized
										"Custom Journey" page or by contacting us via the form
										above. We'll arrange a consultation to tailor the itinerary
										to your specific interests.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger className="uppercase font-bold tracking-tight text-lg hover:text-primary transition-colors py-6">
										What is included in the price?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground font-serif text-lg leading-relaxed">
										Most of our tours include transportation, entry fees, a
										professional guide, and water. Multi-day tours also include
										accommodation and meals as specified in the itinerary.
										Personal expenses and tips are generally not included.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger className="uppercase font-bold tracking-tight text-lg hover:text-primary transition-colors py-6">
										Is transportation provided?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground font-serif text-lg leading-relaxed">
										Yes, we provide comfortable, air-conditioned transportation
										for all our tours. For airport transfers, please provide
										your flight details during booking.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-4">
									<AccordionTrigger className="uppercase font-bold tracking-tight text-lg hover:text-primary transition-colors py-6">
										What is your cancellation policy?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground font-serif text-lg leading-relaxed">
										We offer a full refund for cancellations made at least 48
										hours in advance for day tours. For multi-day experiences,
										please refer to the specific terms and conditions provided
										during booking, as they may vary based on accommodation
										policies.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</div>
			</section>

			<div className="h-px w-full bg-foreground/10" />
		</div>
	);
}
