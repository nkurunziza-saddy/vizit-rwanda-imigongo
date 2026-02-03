import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/landing/section-title";

export const Route = createFileRoute("/_app/legal/terms")({
  component: Terms,
});

function Terms() {
  return (
    <section className="py-8">
      <SectionTitle title="Terms of Service" className="mb-8" />
      <div className="p-8 border border-border bg-card">
        Terms of Service Placeholder
      </div>
    </section>
  );
}
