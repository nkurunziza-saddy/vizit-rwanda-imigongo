import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "@/components/layouts/page-wrapper";

export const Route = createFileRoute("/_app/contact")({
  component: ContactPage,
});

export function ContactPage() {
  return (
    <PageWrapper>
      <h1>Contact Page</h1>
    </PageWrapper>
  );
}
