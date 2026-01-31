import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { VendorRegistrationForm } from "@/components/vendor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Building2 } from "lucide-react";
import type {
  VendorRegistrationInput,
  VendorBankDetailsInput,
} from "@/schemas/vendor.schema";
import { api } from "@/api/client";

export const Route = createFileRoute("/_app/become-vendor")({
  component: BecomeVendorPage,
});

function BecomeVendorPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <Card>
          <CardHeader className="text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Become a Vendor</CardTitle>
            <CardDescription>
              Please sign in to register as a vendor
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate({ to: "/login" })}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (data: {
    registration: VendorRegistrationInput;
    bankDetails: VendorBankDetailsInput;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await api.registerVendor({
        businessName: data.registration.businessName,
        vendorType: data.registration.vendorType,
        bio: data.registration.bio || "",
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(
        err.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Application Submitted!</CardTitle>
            <CardDescription>
              Thank you for your interest in becoming a vendor. We'll review
              your application and get back to you within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You'll receive an email notification once your application is
                reviewed.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate({ to: "/" })} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Become a Vendor</h1>
        <p className="text-muted-foreground">
          Join our network of trusted tourism providers and grow your business
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <VendorRegistrationForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />

      {/* sections */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reach More Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect with tourists from around the world looking for authentic
              Rwandan experiences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Easy Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your listings, bookings, and availability all in one place.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Secure Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Receive secure payments directly to your bank account with
              transparent commission rates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BecomeVendorPage;
