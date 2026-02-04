import { format } from "date-fns";
import { Building, Globe, Key } from "lucide-react";
import type { Vendor } from "@/schemas/vendor.schema";

interface VendorApplicationDetailsProps {
	row: { original: Vendor };
}

export function VendorApplicationDetails({
	row,
}: VendorApplicationDetailsProps) {
	const vendor = row.original;

	return (
		<div className="p-4 grid gap-6 md:grid-cols-2 bg-zinc-50 rounded mx-4 mb-4 border border-foreground/10">
			<div className="space-y-4">
				<div>
					<h4 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-foreground">
						<Building className="h-4 w-4 text-primary" />
						Business Details
					</h4>
					<div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
						<span className="text-muted-foreground font-serif italic">
							Bio:
						</span>
						<span className="text-foreground">
							{vendor.bio || "No bio provided."}
						</span>

						<span className="text-muted-foreground font-serif italic">
							Address:
						</span>
						<span>{vendor.address || "N/A"}</span>

						<span className="text-muted-foreground font-serif italic">
							Website:
						</span>
						<span>
							{vendor.website ? (
								<a
									href={vendor.website}
									target="_blank"
									rel="noreferrer"
									className="text-primary hover:underline flex items-center gap-1 font-bold"
								>
									{vendor.website} <Globe className="h-3 w-3" />
								</a>
							) : (
								"N/A"
							)}
						</span>
					</div>
				</div>

				<div>
					<h4 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-foreground">
						<Key className="h-4 w-4 text-primary" />
						Bank Information
					</h4>
					<div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
						<span className="text-muted-foreground font-serif italic">
							Bank Name:
						</span>
						<span className="font-bold">{vendor.bankName || "N/A"}</span>

						<span className="text-muted-foreground font-serif italic">
							Account Name:
						</span>
						<span className="font-bold">{vendor.bankAccountName || "N/A"}</span>

						<span className="text-muted-foreground font-serif italic">
							Account No:
						</span>
						<div className="flex items-center gap-2">
							<code className="bg-white px-1.5 py-0.5 rounded border border-foreground/10 font-mono text-xs">
								{vendor.bankAccountNumber || "N/A"}
							</code>
						</div>

						<span className="text-muted-foreground font-serif italic">
							Swift Code:
						</span>
						<span className="font-mono">{vendor.bankSwiftCode || "N/A"}</span>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
						Application Timeline
					</h4>
					<div className="text-sm text-muted-foreground font-mono text-xs">
						Applied on {format(new Date(vendor.createdAt), "PPP")}
					</div>
				</div>
			</div>
		</div>
	);
}
