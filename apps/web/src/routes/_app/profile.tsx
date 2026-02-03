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
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/landing/section-title";
import {
  User,
  Shield,
  Camera,
  CheckCircle,
  AlertCircle,
  Lock,
  Globe,
  Mail,
} from "lucide-react";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "@/schemas/user.schema";
import type { z } from "zod";
import { Reveal } from "@/components/ui/reveal";

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
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      preferredCurrency: user?.preferredCurrency || "USD",
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUser = localStorage.getItem("vizit_current_user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        localStorage.setItem(
          "vizit_current_user",
          JSON.stringify({
            ...currentUser,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            preferred_currency: data.preferredCurrency,
          }),
        );
      }

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (_data: PasswordFormData) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUpdateSuccess(true);
      passwordForm.reset();
      setTimeout(() => setUpdateSuccess(false), 3000); // clear after 3s
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
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>

      {updateSuccess && (
        <Alert className="mb-6 bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="font-medium ml-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Reveal>
            <Card className="rounded-xl border border-border/50 shadow-sm overflow-hidden">
              <div className="h-32 bg-primary/10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
              <CardContent className="pt-0 relative px-6 pb-6">
                <div className="flex flex-col items-center -mt-12 mb-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 rounded-full ring-4 ring-background shadow-lg">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      />
                      <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                        {user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h2 className="mt-4 text-xl font-bold tracking-tight text-center">
                    {user.fullName}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Mail className="h-3 w-3" /> {user.email}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Badge
                      className="rounded-full px-3 bg-primary/10 text-primary hover:bg-primary/20 border-0"
                      variant="secondary"
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      className="rounded-full px-3 bg-muted text-muted-foreground hover:bg-muted/80 border-0"
                      variant="secondary"
                    >
                      <Shield className="h-3 w-3 mr-1" /> Active
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6 opacity-50" />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Member Since</span>
                    <span className="font-medium text-foreground">
                      {new Date(user.createdAt).getFullYear()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Currency</span>
                    <span className="font-medium text-foreground">
                      {user.preferredCurrency || "USD"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full lg:w-[400px] grid-cols-3 mb-6 bg-muted/40 p-1 rounded-lg">
                <TabsTrigger
                  value="profile"
                  className="rounded-md text-xs font-bold uppercase tracking-wide"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="rounded-md text-xs font-bold uppercase tracking-wide"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="rounded-md text-xs font-bold uppercase tracking-wide"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0">
                <Card className="rounded-xl border border-border/50 shadow-sm">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-lg font-bold uppercase tracking-tight">
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your identity details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form
                      onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="fullName"
                            className="text-xs uppercase font-bold text-muted-foreground tracking-widest"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            className="h-11 bg-muted/30"
                            {...profileForm.register("fullName")}
                          />
                          {profileForm.formState.errors.fullName && (
                            <p className="text-sm text-destructive mt-1">
                              {profileForm.formState.errors.fullName.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-xs uppercase font-bold text-muted-foreground tracking-widest"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            className="h-11 bg-muted/30"
                            {...profileForm.register("email")}
                          />
                          {profileForm.formState.errors.email && (
                            <p className="text-sm text-destructive mt-1">
                              {profileForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-xs uppercase font-bold text-muted-foreground tracking-widest"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            className="h-11 bg-muted/30"
                            {...profileForm.register("phone")}
                          />
                          {profileForm.formState.errors.phone && (
                            <p className="text-sm text-destructive mt-1">
                              {profileForm.formState.errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="currency"
                            className="text-xs uppercase font-bold text-muted-foreground tracking-widest"
                          >
                            Preferred Currency
                          </Label>
                          <div className="relative">
                            <select
                              id="currency"
                              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                              {...profileForm.register("preferredCurrency")}
                            >
                              <option value="USD">USD - US Dollar</option>
                              <option value="EUR">EUR - Euro</option>
                              <option value="GBP">GBP - British Pound</option>
                              <option value="RWF">RWF - Rwandan Franc</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={isUpdating}
                          className="h-11 px-8 rounded-lg uppercase tracking-widest font-bold text-xs shadow-md"
                        >
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card className="rounded-xl border border-border/50 shadow-sm">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">
                          Change Password
                        </CardTitle>
                        <CardDescription>
                          Ensure your account is using a strong password.
                        </CardDescription>
                      </div>
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form
                      onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                      className="space-y-4 max-w-lg"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="h-11 bg-muted/30"
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
                          className="h-11 bg-muted/30"
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
                          className="h-11 bg-muted/30"
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

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={isUpdating}
                          className="h-11 px-8 rounded-lg uppercase tracking-widest font-bold text-xs shadow-md"
                        >
                          {isUpdating ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="rounded-xl border border-border/50 shadow-sm">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-bold uppercase tracking-tight">
                          System Preferences
                        </CardTitle>
                        <CardDescription>
                          Customize your notification and regional settings.
                        </CardDescription>
                      </div>
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-6">
                    <div>
                      <h4 className="text-sm uppercase font-bold tracking-widest text-muted-foreground mb-4">
                        Email Notifications
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            id="notif-booking"
                            className="mt-0.5 rounded border-gray-300 accent-primary h-4 w-4"
                          />
                          <div className="grid gap-0.5">
                            <label
                              htmlFor="notif-booking"
                              className="font-medium text-sm"
                            >
                              Booking Updates
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Receive emails about your booking status changes.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            id="notif-promo"
                            className="mt-0.5 rounded border-gray-300 accent-primary h-4 w-4"
                          />
                          <div className="grid gap-0.5">
                            <label
                              htmlFor="notif-promo"
                              className="font-medium text-sm"
                            >
                              Promotions & Deals
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Get notified about special offers and new
                              destinations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="opacity-50" />

                    <div>
                      <h4 className="text-sm uppercase font-bold tracking-widest text-muted-foreground mb-4">
                        Regional Settings
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground font-medium">
                            Display Language
                          </Label>
                          <div className="relative">
                            <select className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                              <option value="en">English (US)</option>
                              <option value="fr">Français</option>
                              <option value="rw">Kinyarwanda</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground font-medium">
                            Timezone
                          </Label>
                          <div className="relative">
                            <select className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                              <option value="Africa/Kigali">
                                Africa/Kigali (GMT+2)
                              </option>
                              <option value="UTC">UTC</option>
                              <option value="US/Pacific">US/Pacific</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button className="h-11 px-8 rounded-lg uppercase tracking-widest font-bold text-xs shadow-md">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Down Arrow</title>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default ProfilePage;
