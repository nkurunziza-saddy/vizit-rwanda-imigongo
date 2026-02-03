import { api } from "@/api";
import { userColumns } from "@/components/dashboard/tables/users-columns";
import { DataTable } from "@/components/data-table/data-table";
import type { User } from "@/schemas";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/dashboard/users")({
  component: UsersPage,
});

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await api.getAdminUsers();
        const usersList = Array.isArray(data) ? data : [];
        setUsers(usersList as User[]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage system users and their roles.
          </p>
        </div>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-64 bg-muted animate-pulse rounded" />
              <div className="h-10 w-32 bg-muted animate-pulse ml-auto rounded" />
            </div>
            <div className="border rounded">
              <div className="h-12 bg-muted/50 border-b" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 border-b last:border-0 flex items-center px-4 gap-4"
                >
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-8 w-8 bg-muted animate-pulse ml-auto rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DataTable
            data={users}
            columns={userColumns}
            searchKey="fullName"
            searchPlaceholder="Filter users..."
          />
        )}
      </div>
    </div>
  );
}
