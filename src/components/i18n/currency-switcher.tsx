import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Banknote } from "lucide-react";

export function CurrencySwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 h-9 px-3 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer outline-none text-sm font-medium">
        <Banknote className="h-4 w-4" />
        <span className="text-xs">USD</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["USD", "EUR", "RWF", "GBP"].map((code) => (
          <DropdownMenuItem
            key={code}
            className="gap-2 cursor-pointer rounded focus:bg-foreground/5"
          >
            <span className="font-medium">{code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
