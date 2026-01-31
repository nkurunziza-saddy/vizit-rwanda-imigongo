import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Building2, Banknote, CheckCircle, AlertCircle } from "lucide-react";
import {
  vendorRegistrationSchema,
  vendorBankDetailsSchema,
  type VendorRegistrationInput,
  type VendorBankDetailsInput,
  type VendorType,
} from "@/schemas/vendor.schema";

interface VendorRegistrationFormProps {
  onSubmit: (data: {
    registration: VendorRegistrationInput;
    bankDetails: VendorBankDetailsInput;
  }) => void;
  isLoading?: boolean;
}

const steps = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Bank Details", icon: Banknote },
  { id: 3, label: "Review", icon: CheckCircle },
];

const vendorTypes: { value: VendorType; label: string }[] = [
  { value: "hotel", label: "Hotel" },
  { value: "bnb", label: "B&B / Guesthouse" },
  { value: "car_rental", label: "Car Rental" },
  { value: "guide", label: "Tour Guide" },
  { value: "tour_operator", label: "Tour Operator" },
];

export function VendorRegistrationForm({
  onSubmit,
  isLoading,
}: VendorRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const registrationForm = useForm<VendorRegistrationInput>({
    resolver: zodResolver(vendorRegistrationSchema),
    defaultValues: {
      businessName: "",
      bio: "",
      email: "",
      phone: "",
      address: "",
      website: "",
    },
  });

  const bankDetailsSchema = vendorBankDetailsSchema.omit({ vendorId: true });
  const bankForm = useForm<z.infer<typeof bankDetailsSchema>>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
      bankSwiftCode: "",
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = async () => {
    setSubmitError(null);

    if (currentStep === 1) {
      const valid = await registrationForm.trigger();
      if (!valid) return;
    }

    if (currentStep === 2) {
      const valid = await bankForm.trigger();
      if (!valid) return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    const registrationData = registrationForm.getValues();
    const bankData = bankForm.getValues();

    onSubmit({
      registration: registrationData,
      bankDetails: {
        ...bankData,
        vendorId: "",
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Become a Vendor</CardTitle>
        <CardDescription>
          Complete the form below to register as a vendor on Vizit Africa
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <step.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                {...registrationForm.register("businessName")}
                placeholder="Your business name"
              />
              {registrationForm.formState.errors.businessName && (
                <p className="text-sm text-destructive mt-1">
                  {registrationForm.formState.errors.businessName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="vendorType">Business Type *</Label>
              <Select
                onValueChange={(value) =>
                  registrationForm.setValue("vendorType", value as VendorType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {vendorTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {registrationForm.formState.errors.vendorType && (
                <p className="text-sm text-destructive mt-1">
                  {registrationForm.formState.errors.vendorType.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                type="email"
                {...registrationForm.register("email")}
                placeholder="contact@yourbusiness.com"
              />
              {registrationForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {registrationForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...registrationForm.register("phone")}
                placeholder="+250 788 123 456"
              />
              {registrationForm.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {registrationForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                {...registrationForm.register("address")}
                placeholder="Your business address"
              />
            </div>

            <div>
              <Label htmlFor="bio">Business Description</Label>
              <Textarea
                id="bio"
                {...registrationForm.register("bio")}
                placeholder="Tell us about your business..."
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {registrationForm.watch("bio")?.length || 0}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                {...registrationForm.register("website")}
                placeholder="https://yourbusiness.com"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Bank details are required for receiving payouts from bookings.
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="bankAccountName">Account Holder Name *</Label>
              <Input
                id="bankAccountName"
                {...bankForm.register("bankAccountName")}
                placeholder="Full name as on bank account"
              />
              {bankForm.formState.errors.bankAccountName && (
                <p className="text-sm text-destructive mt-1">
                  {bankForm.formState.errors.bankAccountName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                {...bankForm.register("bankName")}
                placeholder="e.g., Bank of Kigali"
              />
              {bankForm.formState.errors.bankName && (
                <p className="text-sm text-destructive mt-1">
                  {bankForm.formState.errors.bankName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bankAccountNumber">Account Number *</Label>
              <Input
                id="bankAccountNumber"
                {...bankForm.register("bankAccountNumber")}
                placeholder="Your bank account number"
              />
              {bankForm.formState.errors.bankAccountNumber && (
                <p className="text-sm text-destructive mt-1">
                  {bankForm.formState.errors.bankAccountNumber.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bankSwiftCode">SWIFT Code (Optional)</Label>
              <Input
                id="bankSwiftCode"
                {...bankForm.register("bankSwiftCode")}
                placeholder="e.g., BKIGRWRW"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Business Information</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Name:</strong>{" "}
                  {registrationForm.getValues("businessName")}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {
                    vendorTypes.find(
                      (t) =>
                        t.value === registrationForm.getValues("vendorType"),
                    )?.label
                  }
                </p>
                <p>
                  <strong>Email:</strong> {registrationForm.getValues("email")}
                </p>
                <p>
                  <strong>Phone:</strong> {registrationForm.getValues("phone")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bank Details</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Account Name:</strong>{" "}
                  {bankForm.getValues("bankAccountName")}
                </p>
                <p>
                  <strong>Bank:</strong> {bankForm.getValues("bankName")}
                </p>
                <p>
                  <strong>Account:</strong> ****
                  {bankForm.getValues("bankAccountNumber")?.slice(-4)}
                </p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting, you agree to our terms and conditions. Your
                application will be reviewed within 2-3 business days.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
          >
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext}>Continue</Button>
          ) : (
            <Button onClick={handleFinalSubmit} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default VendorRegistrationForm;
