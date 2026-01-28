import type { Addon } from "@/utils/mock-db";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface AddonSelectorProps {
	addon: Addon;
	onSelect: (quantity: number) => void;
	initialQuantity?: number;
}

export function AddonSelector({
	addon,
	onSelect,
	initialQuantity = 0,
}: AddonSelectorProps) {
	const [quantity, setQuantity] = useState(initialQuantity);

	const handleToggle = (checked: boolean) => {
		const newQty = checked ? 1 : 0;
		setQuantity(newQty);
		onSelect(newQty);
	};

	const handleIncrement = () => {
		const newQty = quantity + 1;
		setQuantity(newQty);
		onSelect(newQty);
	};

	const handleDecrement = () => {
		if (quantity > 0) {
			const newQty = quantity - 1;
			setQuantity(newQty);
			onSelect(newQty);
		}
	};

	return (
		<div className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
			<div className="flex items-start gap-3">
				<Checkbox
					id={`addon-${addon.id}`}
					checked={quantity > 0}
					onCheckedChange={handleToggle}
					className="mt-1"
				/>
				<div className="space-y-1">
					<Label
						htmlFor={`addon-${addon.id}`}
						className="font-medium cursor-pointer"
					>
						{addon.name}
					</Label>
					<p className="text-sm text-muted-foreground">{addon.description}</p>
					<div className="pt-1">
						<Badge variant="secondary" className="text-xs font-normal">
							${addon.price}{" "}
							<span className="text-muted-foreground ml-1">
								/ {addon.price_type.replace("_", " ")}
							</span>
						</Badge>
					</div>
				</div>
			</div>

			{/* If checked, show quantity controls if needed. For now, assuming standard toggle unless specified otherwise 
          But wait, if price_type is per_person, user might want different quantity than total guests? 
          Usually "Breakfast" is X guests.
          Let's verify if we need detailed quantity control per addon.
          For this MVP, simplicity: Quantity follows logic or manual override?
          Let's allow manual override if it's selected.
      */}
			{quantity > 0 && (
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						className="h-6 w-6"
						onClick={handleDecrement}
					>
						<Minus className="h-3 w-3" />
					</Button>
					<span className="text-sm w-4 text-center">{quantity}</span>
					<Button
						variant="outline"
						size="icon"
						className="h-6 w-6"
						onClick={handleIncrement}
					>
						<Plus className="h-3 w-3" />
					</Button>
				</div>
			)}
		</div>
	);
}
