import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { Row } from "@tanstack/react-table";

interface ActionMenuProps<TData> {
  row: Row<TData>;
  onEdit?: (original: TData) => void;
  onDelete?: (original: TData) => void;
}

export function ActionMenu<TData>({
  row,
  onEdit,
  onDelete,
}: ActionMenuProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(row.original))
          }
        >
          Copy Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(row.original)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
