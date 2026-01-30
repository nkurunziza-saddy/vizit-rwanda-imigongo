import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Banknote } from "lucide-react";

export function CurrencySwitcher() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 cursor-pointer")}>
          <Banknote className="h-4 w-4" />
          <span className="text-xs">USD</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["USD", "EUR", "RWF", "GBP"].map((code) => (
          <DropdownMenuItem
            key={code}
            className="gap-2 cursor-pointer"
          >
            <span className="font-medium">{code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
