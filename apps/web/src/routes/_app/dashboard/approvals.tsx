import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { VendorApprovalCard } from "@/components/vendor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { Vendor, VendorStatus } from "@/schemas/vendor.schema";

/**
 * Admin Approvals Dashboard
 *
 * Manage vendor applications, user approvals, and content moderation.
 * Accessible only to admin users.
 */

export const Route = createFileRoute("/_app/dashboard/approvals")({
  component: ApprovalsPage,
});

// Mock data for demonstration
const mockVendors: Vendor[] = [
  {
    id: "v-1",
    userId: "u-3",
    businessName: "Kigali Heights Hotel",
    vendorType: "hotel",
    bio: "Luxury hotel in the heart of Kigali with stunning city views",
    email: "info@kigaliheights.com",
    phone: "+250 788 111 222",
    address: "KN 3 Rd, Kigali",
    status: "pending",
    isApproved: false,
    documents: [
      {
        id: "d-1",
        vendorId: "v-1",
        documentType: "business_registration",
        fileName: "business_reg.pdf",
        fileUrl: "/docs/business_reg.pdf",
        uploadedAt: new Date().toISOString(),
        status: "pending",
      },
      {
        id: "d-2",
        vendorId: "v-1",
        documentType: "tax_certificate",
        fileName: "tax_cert.pdf",
        fileUrl: "/docs/tax_cert.pdf",
        uploadedAt: new Date().toISOString(),
        status: "pending",
      },
    ],
    bankAccountName: "Kigali Heights Ltd",
    bankAccountNumber: "1234567890",
    bankName: "Bank of Kigali",
    commissionRate: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v-2",
    userId: "u-4",
    businessName: "Rwanda Car Rentals",
    vendorType: "car_rental",
    bio: "Premium car rental service for tourists and business travelers",
    email: "bookings@rwandacars.com",
    phone: "+250 788 333 444",
    address: "Airport Road, Kigali",
    status: "under_review",
    isApproved: false,
    documents: [
      {
        id: "d-3",
        vendorId: "v-2",
        documentType: "business_registration",
        fileName: "reg.pdf",
        fileUrl: "/docs/reg.pdf",
        uploadedAt: new Date().toISOString(),
        status: "approved",
      },
      {
        id: "d-4",
        vendorId: "v-2",
        documentType: "insurance",
        fileName: "insurance.pdf",
        fileUrl: "/docs/insurance.pdf",
        uploadedAt: new Date().toISOString(),
        status: "pending",
      },
    ],
    bankAccountName: "Rwanda Car Rentals Ltd",
    bankAccountNumber: "0987654321",
    bankName: "Equity Bank",
    commissionRate: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v-3",
    userId: "u-5",
    businessName: "Volcanoes Tours",
    vendorType: "tour_operator",
    bio: "Expert guides for gorilla trekking and volcano hikes",
    email: "tours@volcanoes.rw",
    phone: "+250 788 555 666",
    address: "Musanze, Northern Province",
    status: "approved",
    isApproved: true,
    approvedBy: "u-1",
    approvedAt: new Date().toISOString(),
    documents: [],
    bankAccountName: "Volcanoes Tours Ltd",
    bankAccountNumber: "555566667777",
    bankName: "GT Bank",
    commissionRate: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function ApprovalsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VendorStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filter vendors
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;
    const matchesType =
      typeFilter === "all" || vendor.vendorType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Count by status
  const counts = {
    pending: vendors.filter((v) => v.status === "pending").length,
    under_review: vendors.filter((v) => v.status === "under_review").length,
    approved: vendors.filter((v) => v.status === "approved").length,
    rejected: vendors.filter((v) => v.status === "rejected").length,
  };

  const handleApprove = (vendorId: string, commissionRate: number) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? {
              ...v,
              status: "approved",
              isApproved: true,
              approvedAt: new Date().toISOString(),
              approvedBy: "admin",
              commissionRate,
            }
          : v,
      ),
    );
  };

  const handleReject = (vendorId: string, reason: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? {
              ...v,
              status: "rejected",
              rejectionReason: reason,
            }
          : v,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Approvals</h1>
          <p className="text-muted-foreground">
            Manage vendor applications and approvals
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="flex items-center gap-2 text-yellow-700 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{counts.pending}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Under Review</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">
            {counts.under_review}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Approved</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{counts.approved}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center gap-2 text-red-700 mb-1">
            <XCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Rejected</span>
          </div>
          <p className="text-2xl font-bold text-red-800">{counts.rejected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as VendorStatus | "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value || "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="bnb">B&B</SelectItem>
            <SelectItem value="car_rental">Car Rental</SelectItem>
            <SelectItem value="guide">Tour Guide</SelectItem>
            <SelectItem value="tour_operator">Tour Operator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">
            Vendors
            {counts.pending + counts.under_review > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.pending + counts.under_review}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No vendors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorApprovalCard
                  key={vendor.id}
                  vendor={vendor}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="listings">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Listing approvals coming soon
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Review moderation coming soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ApprovalsPage;
