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
import { SectionTitle } from "@/components/landing/section-title";
import {
  CheckCircle,
  AlertCircle,
  Building2,
  Globe,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import type {
  VendorRegistrationInput,
  VendorBankDetailsInput,
} from "@/schemas/vendor.schema";
import { api } from "@/api/client";
import { Reveal } from "@/components/ui/reveal";
import { PatternDiamond, PatternZigZag } from "@/components/ui/patterns";

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
      <div className="min-h-screen bg-background pb-20">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden mb-16">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1542259659484-9d106606362d?q=80&w=2670&auto=format&fit=crop"
              alt="Become a Vendor Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent z-10" />

          <div className="relative z-20 text-center container px-4 mt-8">
            <Reveal>
              <PatternDiamond className="w-12 h-12 text-primary mx-auto mb-6" />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
                Join the <span className="text-primary">Alliance</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 font-serif text-xl max-w-xl mx-auto">
                Partner with Vizit Africa to showcase your authentic experiences
                to a global audience.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container max-w-2xl mx-auto px-4 -mt-24 relative z-30">
          <Card className="border-0 shadow-2xl shadow-black/20 bg-background/95 backdrop-blur-sm">
            <CardHeader className="text-center pt-10 pb-2">
              <Building2 className="h-12 w-12 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl font-black uppercase tracking-tight">
                Partner Login Required
              </CardTitle>
              <CardDescription className="text-base font-serif">
                Please sign in to register as a secure vendor partner.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-10">
              <Button
                onClick={() => navigate({ to: "/login" })}
                className="w-full max-w-xs h-12 text-sm uppercase tracking-widest font-bold"
              >
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
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
      <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <Card className="border-border shadow-2xl">
            <CardHeader className="text-center pt-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-black uppercase tracking-tighter mb-2">
                Application Submitted
              </CardTitle>
              <CardDescription className="text-lg font-serif">
                Thank you for your interest in joining our network. We'll review
                your application and get back to you within 2-3 business days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-12 px-12">
              <Alert className="bg-muted/50 border-primary/20">
                <PatternZigZag className="h-4 w-4 text-primary" />
                <AlertDescription className="ml-2 font-medium">
                  You'll receive an email notification once your application is
                  reviewed by our curation team.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => navigate({ to: "/" })}
                className="w-full h-12 uppercase tracking-widest font-bold text-xs"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden mb-16">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1542259659484-9d106606362d?q=80&w=2670&auto=format&fit=crop"
            alt="Become a Vendor Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent z-10" />

        <div className="relative z-20 text-center container px-4 mt-8">
          <Reveal>
            <PatternDiamond className="w-12 h-12 text-primary mx-auto mb-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
              Become a <span className="text-primary">Partner</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/80 font-serif text-xl max-w-xl mx-auto">
              Join our curated network of trusted tourism providers and grow
              your business with Vizit Africa.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-card border border-border/50 p-8 rounded-sm shadow-sm">
              <h2 className="text-lg font-bold uppercase tracking-widest text-foreground mb-8 border-b border-border pb-4 flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                Application Form
              </h2>
              <VendorRegistrationForm
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Why Partner With Us?
              </h3>

              <div className="space-y-4">
                <Card className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <Globe className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-base font-bold uppercase tracking-tight">
                      Global Reach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Connect with discerning travelers from around the world
                      looking for authentic Rwandan experiences.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <BarChart3 className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-base font-bold uppercase tracking-tight">
                      Easy Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Powerful tools to manage your listings, bookings, and
                      availability all in one dashboard.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-base font-bold uppercase tracking-tight">
                      Secure Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Receive direct, secure payments to your bank account with
                      transparent commission rates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeVendorPage;
