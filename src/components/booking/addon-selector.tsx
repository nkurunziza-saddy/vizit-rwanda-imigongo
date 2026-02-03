import type { Addon } from "@/utils/mock-db";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "flex items-start justify-between p-4 border border-foreground/10 hover:border-foreground transition-colors bg-white",
        quantity > 0 && "border-foreground bg-accent/20",
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={`addon-${addon.id}`}
          checked={quantity > 0}
          onCheckedChange={handleToggle}
          className="mt-1 rounded data-[state=checked]:bg-foreground data-[state=checked]:text-primary"
        />
        <div className="space-y-1">
          <Label
            htmlFor={`addon-${addon.id}`}
            className="font-bold uppercase tracking-tight cursor-pointer text-foreground"
          >
            {addon.name}
          </Label>
          <p className="text-sm text-muted-foreground font-serif italic">
            {addon.description}
          </p>
          <div className="pt-1">
            <Badge
              variant="outline"
              className="text-xs font-bold rounded border-foreground/20 uppercase tracking-wider"
            >
              ${addon.price}{" "}
              <span className="text-muted-foreground ml-1">
                / {addon.price_type.replace("_", " ")}
              </span>
            </Badge>
          </div>
        </div>
      </div>

      {quantity > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded border-foreground hover:bg-foreground hover:text-white"
            onClick={handleDecrement}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-bold w-4 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded border-foreground hover:bg-foreground hover:text-white"
            onClick={handleIncrement}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
