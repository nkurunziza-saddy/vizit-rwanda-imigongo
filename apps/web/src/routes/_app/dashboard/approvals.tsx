import { useState, useMemo, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";
import type { Vendor } from "@/schemas/vendor.schema";
import { DataTable } from "@/components/data-table/data-table";
import { approvalColumns } from "@/components/dashboard/tables/approvals-columns";
import type { ColumnDef } from "@tanstack/react-table";

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

  // Count by status
  const counts = {
    pending: vendors.filter((v) => v.status === "pending").length,
    under_review: vendors.filter((v) => v.status === "under_review").length,
    approved: vendors.filter((v) => v.status === "approved").length,
    rejected: vendors.filter((v) => v.status === "rejected").length,
  };

  const handleApprove = useCallback(
    (vendorId: string, commissionRate: number) => {
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
    },
    [],
  );

  const handleReject = useCallback((vendorId: string, reason: string) => {
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
  }, []);

  const filters = [
    {
      columnKey: "status",
      title: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Under Review", value: "under_review" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      columnKey: "vendorType",
      title: "Type",
      options: [
        { label: "Hotel", value: "hotel" },
        { label: "BnB", value: "bnb" },
        { label: "Car Rental", value: "car_rental" },
        { label: "Tour Operator", value: "tour_operator" },
        { label: "Guide", value: "guide" },
      ],
    },
  ];

  const columns = useMemo<ColumnDef<Vendor>[]>(
    () => [
      ...approvalColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const vendor = row.original;
          if (vendor.status === "approved" || vendor.status === "rejected") {
            return null;
          }
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
                <DropdownMenuItem onClick={() => handleApprove(vendor.id, 10)}>
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleReject(vendor.id, "Manually rejected")}
                  variant="destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Approvals</h2>
          <p className="text-muted-foreground">
            Manage vendor applications and approvals.
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

      <DataTable
        columns={columns}
        data={vendors}
        searchKey="businessName"
        searchPlaceholder="Filter vendors..."
        filters={filters}
        rowSize="md"
      />
    </div>
  );
}

export default ApprovalsPage;
