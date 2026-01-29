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
import {
  Building2,
  User,
  FileText,
  Banknote,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";
import {
  vendorRegistrationSchema,
  vendorDocumentUploadSchema,
  vendorBankDetailsSchema,
  type VendorRegistrationInput,
  type VendorDocumentUploadInput,
  type VendorBankDetailsInput,
  type VendorType,
} from "@/schemas/vendor.schema";

/**
 * Vendor Registration Form
 *
 * Multi-step form for vendor onboarding:
 * 1. Business Information
 * 2. Document Upload
 * 3. Bank Details
 * 4. Review & Submit
 */

interface VendorRegistrationFormProps {
  onSubmit: (data: {
    registration: VendorRegistrationInput;
    documents: File[];
    bankDetails: VendorBankDetailsInput;
  }) => void;
  isLoading?: boolean;
}

const steps = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Documents", icon: FileText },
  { id: 3, label: "Bank Details", icon: Banknote },
  { id: 4, label: "Review", icon: CheckCircle },
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
  const [documents, setDocuments] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form for business information
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

  // Form for bank details
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

    if (currentStep === 2 && documents.length === 0) {
      setSubmitError("Please upload at least one document");
      return;
    }

    if (currentStep === 3) {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments((prev) => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    const registrationData = registrationForm.getValues();
    const bankData = bankForm.getValues();

    onSubmit({
      registration: registrationData,
      documents,
      bankDetails: {
        ...bankData,
        vendorId: "", // Will be set by backend
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
        {/* Progress */}
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

        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Business Information */}
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

        {/* Step 2: Document Upload */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please upload the following documents: Business Registration,
                Tax Certificate, and ID Proof.
              </AlertDescription>
            </Alert>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Select Files
                </span>
              </Label>
            </div>

            {documents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Documents</h4>
                {documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Bank Details */}
        {currentStep === 3 && (
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

        {/* Step 4: Review */}
        {currentStep === 4 && (
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
              <h3 className="font-semibold mb-2">Documents</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  {documents.length} document(s) uploaded
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

        {/* Navigation Buttons */}
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
