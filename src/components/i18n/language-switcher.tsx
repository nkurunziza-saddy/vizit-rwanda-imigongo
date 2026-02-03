import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
];

export function LanguageSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 h-9 px-3 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer outline-none text-sm font-medium">
        <Globe className="h-4 w-4" />
        <span className="text-xs uppercase">USA</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded border-foreground/20"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="gap-2 cursor-pointer rounded focus:bg-foreground/5"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
