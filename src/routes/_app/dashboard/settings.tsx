import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<p className="text-muted-foreground uppercase text-sm font-medium tracking-wide">
					Manage your account settings and preferences.
				</p>
			</div>

			<Card className="rounded border-[3px] border-foreground/10">
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>Update your personal details.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Full Name</Label>
						<Input id="name" placeholder="Your name" className="rounded" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Your email"
							disabled
							className="rounded"
						/>
					</div>
					<Button className="rounded uppercase tracking-widest font-bold">
						Save Changes
					</Button>
				</CardContent>
			</Card>

			<Card className="rounded border-[3px] border-foreground/10">
				<CardHeader>
					<CardTitle>Password</CardTitle>
					<CardDescription>Change your password.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="current">Current Password</Label>
						<Input id="current" type="password" className="rounded" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="new">New Password</Label>
						<Input id="new" type="password" className="rounded" />
					</div>
					<Button
						variant="outline"
						className="rounded uppercase tracking-widest font-bold"
					>
						Update Password
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
