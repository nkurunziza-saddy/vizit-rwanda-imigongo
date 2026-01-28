import { createFileRoute } from "@tanstack/react-router";
import { DB_KEYS, User } from "@/utils/mock-db";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_app/dashboard/users")({
	component: UsersPage,
});

const fetchUsers = async (): Promise<User[]> => {
	const usersStr = localStorage.getItem(DB_KEYS.USERS);
	return usersStr ? JSON.parse(usersStr) : [];
};

function UsersPage() {
	const { data: users, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	if (isLoading) return <div>Loading users...</div>;

	return (
		<div className="space-y-6">
			<div>
				<p className="text-muted-foreground uppercase text-sm">
					Manage system users and their roles.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>User Directory</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Joined</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users?.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
											/>
											<AvatarFallback>
												{user.full_name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<span className="font-medium">{user.full_name}</span>
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={
												user.role === "admin"
													? "bg-red-50 text-red-700 border-red-200"
													: user.role === "vendor"
														? "bg-blue-50 text-blue-700 border-blue-200"
														: "bg-gray-50 text-gray-700 border-gray-200"
											}
										>
											{user.role}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{user.email}
									</TableCell>
									<TableCell className="text-muted-foreground text-xs">
										{new Date(user.created_at).toLocaleDateString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
