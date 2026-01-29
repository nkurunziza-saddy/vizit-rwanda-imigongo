import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "@/schemas/user.schema";
import type { z } from "zod";
import type { User as UserType } from "@/utils/mock-db";

/**
 * User Profile Page
 *
 * Allows users to view and edit their profile information,
 * change password, and manage preferences.
 */

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

type ProfileFormData = z.infer<typeof updateProfileSchema>;
type PasswordFormData = z.infer<typeof changePasswordSchema>;

function ProfilePage() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      preferredCurrency: user?.preferred_currency || "USD",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      // TODO: Call API to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local storage
      const storedUser = localStorage.getItem("vizit_current_user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        localStorage.setItem(
          "vizit_current_user",
          JSON.stringify({
            ...currentUser,
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            preferred_currency: data.preferredCurrency,
          }),
        );
      }

      setUpdateSuccess(true);
    } catch (error) {
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      // TODO: Call API to change password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUpdateSuccess(true);
      passwordForm.reset();
    } catch (error) {
      setUpdateError("Failed to change password. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please sign in to view your profile
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Alerts */}
      {updateSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Changes saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {updateError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    />
                    <AvatarFallback className="text-2xl">
                      {user.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-semibold">{user.full_name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>

                <Badge className="mt-2" variant="secondary">
                  {user.role}
                </Badge>

                <Separator className="my-4" />

                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>
                      Member since {new Date(user.created_at).getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Account Active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          {...profileForm.register("fullName")}
                        />
                        {profileForm.formState.errors.fullName && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...profileForm.register("email")}
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" {...profileForm.register("phone")} />
                        {profileForm.formState.errors.phone && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Preferred Currency</Label>
                        <select
                          id="currency"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...profileForm.register("preferredCurrency")}
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="RWF">RWF - Rwandan Franc</option>
                        </select>
                      </div>
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register("currentPassword")}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-destructive">
                          {
                            passwordForm.formState.errors.currentPassword
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register("newPassword")}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-destructive">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        {...passwordForm.register("confirmNewPassword")}
                      />
                      {passwordForm.formState.errors.confirmNewPassword && (
                        <p className="text-sm text-destructive">
                          {
                            passwordForm.formState.errors.confirmNewPassword
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Change Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification and display preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">
                          Booking confirmations and updates
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">
                          Promotional offers and deals
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">
                          Newsletter and travel tips
                        </span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Language & Region
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Language
                        </Label>
                        <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="rw">Kinyarwanda</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Timezone
                        </Label>
                        <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="Africa/Kigali">
                            Africa/Kigali (GMT+2)
                          </option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
