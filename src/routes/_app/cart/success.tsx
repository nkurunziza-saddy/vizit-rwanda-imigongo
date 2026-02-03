import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home, Printer } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/_app/cart/success")({
  component: CheckoutSuccessPage,
  validateSearch: (search) => searchSchema.parse(search),
});

function CheckoutSuccessPage() {
  const { orderId } = useSearch({ from: "/_app/cart/success" });

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
      <section>
        <Card className="max-w-md mx-auto text-center shadow-lg border-[3px] border-foreground/10 rounded">
          <CardContent className="pt-10 pb-10 space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100  flex items-center justify-center text-green-600 animate-in zoom-in duration-300">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Thank you for your booking. Your adventure awaits.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Reference</span>
                <span className="font-mono font-medium">
                  {orderId || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-medium">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Email Confirmation
                </span>
                <span className="font-medium">Sent</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button className="w-full rounded" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Receipt
              </Button>
              <Link to="/dashboard" className="w-full">
                <Button variant="outline" className="w-full rounded">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full rounded">
                  <Home className="mr-2 h-4 w-4" /> Back Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
