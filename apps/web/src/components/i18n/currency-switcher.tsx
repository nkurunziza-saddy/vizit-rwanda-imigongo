import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";

export function CurrencySwitcher() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="gap-2">
          <Banknote className="h-4 w-4" />
          <span className="text-xs">USD</span>
        </Button>
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
