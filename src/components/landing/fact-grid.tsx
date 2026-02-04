import { SectionTitle } from "./section-title";

interface FactItem {
	label: string;
	value: string;
}

const facts: FactItem[] = [
	{ label: "Capital City", value: "Kigali" },
	{ label: "Population", value: "~14.1 Million" },
	{ label: "Size", value: "26,338 km²" },
	{ label: "Currency", value: "Rwandan Franc" },
	{ label: "Languages", value: "Kinyarwanda, English, French" },
	{ label: "Time Zone", value: "CAT (UTC +2)" },
];

export function FactGrid() {
	return (
		<div className="bg-white py-24 border-y border-foreground">
			<div className="container mx-auto px-4 max-w-7xl">
				<SectionTitle
					title={
						<>
							Quick <span className="text-primary">Facts</span>
						</>
					}
				/>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/10 border border-foreground/10">
					{facts.map((fact, i) => (
						<div
							key={i}
							className="bg-white p-6 hover:bg-foreground/2 transition-colors group relative overflow-hidden"
						>
							<div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 blur-xl group-hover:scale-110 transition-transform duration-700" />

							<h3 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">
								{fact.label}
							</h3>
							<p className="text-foreground font-serif text-lg font-medium leading-tight">
								{fact.value}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
