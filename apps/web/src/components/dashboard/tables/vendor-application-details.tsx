import { Vendor } from "@/schemas/vendor.schema";
import { format } from "date-fns";
import { Globe, Key, Building } from "lucide-react";

interface VendorApplicationDetailsProps {
  row: { original: Vendor };
}

export function VendorApplicationDetails({
  row,
}: VendorApplicationDetailsProps) {
  const vendor = row.original;

  return (
    <div className="p-4 grid gap-6 md:grid-cols-2 bg-muted/30 rounded-lg mx-4 mb-4 border border-border/50">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            Business Details
          </h4>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="text-muted-foreground">Bio:</span>
            <span className="text-foreground">
              {vendor.bio || "No bio provided."}
            </span>

            <span className="text-muted-foreground">Address:</span>
            <span>{vendor.address || "N/A"}</span>

            <span className="text-muted-foreground">Website:</span>
            <span>
              {vendor.website ? (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
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
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            Bank Information
          </h4>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="text-muted-foreground">Bank Name:</span>
            <span className="font-medium">{vendor.bankName || "N/A"}</span>

            <span className="text-muted-foreground">Account Name:</span>
            <span className="font-medium">
              {vendor.bankAccountName || "N/A"}
            </span>

            <span className="text-muted-foreground">Account No:</span>
            <div className="flex items-center gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded border">
                {vendor.bankAccountNumber || "N/A"}
              </code>
            </div>

            <span className="text-muted-foreground">Swift Code:</span>
            <span>{vendor.bankSwiftCode || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Application Timeline</h4>
          <div className="text-sm text-muted-foreground">
            Applied on {format(new Date(vendor.createdAt), "PPP")}
          </div>
        </div>
      </div>
    </div>
  );
}
