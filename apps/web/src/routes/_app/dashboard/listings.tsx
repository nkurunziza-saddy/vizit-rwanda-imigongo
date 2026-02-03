import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { useListings } from "@/hooks/use-listings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, DollarSign, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import type { Listing } from "@/schemas";
import { DB_KEYS, type Listing as DBListing } from "@/utils/mock-db";

export const Route = createFileRoute("/_app/dashboard/listings")({
  component: VendorListings,
});

function VendorListings() {
  const { user } = useAuth();
  const { data: allListings } = useListings();

  const myListings = allListings?.filter((l) => l.vendorId === user?.id) || [];
  const displayListings =
    myListings.length > 0 ? myListings : allListings?.slice(0, 4) || [];

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const stored = localStorage.getItem(DB_KEYS.LISTINGS);
      if (stored) {
        const listings = JSON.parse(stored);
        const updated = listings.filter((l: DBListing) => l.id !== id);
        localStorage.setItem(DB_KEYS.LISTINGS, JSON.stringify(updated));
        toast.success("Listing deleted");
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Listings</h2>
          <p className="text-muted-foreground">
            Manage your properties and services.
          </p>
        </div>
        <AddListingDialog vendorId={Number(user?.id) || 1} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayListings.map((listing) => (
          <ListingItem
            key={listing.id}
            listing={listing}
            onDelete={() => handleDelete(listing.id)}
          />
        ))}
      </div>
      {myListings.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-8 p-12 border border-dashed rounded bg-muted/20">
          <p>No listings found.</p>
          <p className="text-xs mt-1">
            (Displaying demo listings if available. Add a listing to see your
            own.)
          </p>
        </div>
      )}
    </div>
  );
}

function ListingItem({
  listing,
  onDelete,
}: {
  listing: Listing;
  onDelete: () => void;
}) {
  return (
    <Card className="rounded border-[3px] border-foreground/10 overflow-hidden">
      <div className="aspect-video w-full bg-muted relative overflow-hidden rounded">
        <img
          src={
            listing.imageUrl ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
          }
          alt={listing.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className="absolute top-2 right-2 uppercase rounded tracking-wide"
          variant="secondary"
        >
          {listing.listingType?.replace("_", " ")}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold line-clamp-1">
            {listing.title}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3" /> Location {listing.locationId}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {listing.basePrice}{" "}
            <span className="font-normal text-muted-foreground">/ night</span>
          </span>

          <Badge
            variant={listing.status === "active" ? "default" : "outline"}
            className="rounded uppercase tracking-wide"
          >
            {listing.status}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded uppercase tracking-wider font-bold"
            disabled
          >
            <Edit className="h-3 w-3 mr-2" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AddListingDialog({ vendorId }: { vendorId: number }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const newListing: DBListing = {
      id: Date.now(),
      vendor_id: vendorId,
      location_id: 1,
      title: formData.get("title") as string,
      listing_type: formData.get("type") as
        | "hotel_room"
        | "bnb"
        | "car"
        | "tour"
        | "guide"
        | "ticket",
      description: formData.get("description") as string,
      base_price: Number(formData.get("price")),
      currency: "USD",
      capacity: 2,
      status: "active",
      image_url: "",
      created_at: new Date().toISOString(),
      addons: [],
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const stored = localStorage.getItem(DB_KEYS.LISTINGS);
    const listings = stored ? JSON.parse(stored) : [];
    listings.push(newListing);
    localStorage.setItem(DB_KEYS.LISTINGS, JSON.stringify(listings));

    toast.success("Listing created successfully!");
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded uppercase tracking-wider font-bold" />
        }
      >
        <Plus /> Add New Listing
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Add a new property or service to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Ocean View Villa"
              className="col-span-3 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
              <Select name="type" required defaultValue="hotel_room">
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel_room">Hotel Room</SelectItem>
                  <SelectItem value="bnb">BnB</SelectItem>
                  <SelectItem value="car">Car Rental</SelectItem>
                  <SelectItem value="tour">Tour</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="100"
              className="col-span-3 rounded"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your listing..."
              className="col-span-3 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded uppercase tracking-wider font-bold"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Listing
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
