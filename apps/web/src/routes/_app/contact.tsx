import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { cn } from "@/lib/utils";
import { type LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@hugeicons/core-free-icons";

const APP_EMAIL = "email";
const APP_PHONE = "+250 788 303 030";
const APP_PHONE_2 = "+250 788 303 031";

type ContactBox = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const Route = createFileRoute("/_app/contact")({
  component: ContactPage,
});

function ContactPage() {
  const socialLinks = [
    {
      icon: InstagramIcon,
      href: "https://github.com/vizit-africa",
      label: "GitHub",
    },
    {
      icon: XIcon,
      href: "https://twitter.com/vizitafrica",
      label: "Twitter",
    },
  ];
  return (
    <PageWrapper>
      <div className="mx-auto h-full min-h-screen max-w-5xl lg:border-x">
        <div className="flex grow flex-col justify-center px-4 py-18 md:items-center">
          <h1 className="font-bold text-4xl md:text-5xl">Contact Us</h1>
          <p className="mb-5 text-base text-muted-foreground">
            Contact our team at vizitafric for any inquiries.
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          <Box
            description="We respond to all emails within 24 hours."
            icon={Mail}
            title="Email"
          >
            <a
              className="font-medium font-mono text-sm tracking-wide hover:underline"
              href={`mailto:${APP_EMAIL}`}
            >
              {APP_EMAIL}
            </a>
          </Box>
          <Box
            description="Drop by our office for a chat."
            icon={MapPin}
            title="Office"
          >
            <span className="font-medium font-mono text-sm tracking-wide">
              Office # 100, 101 Second Floor Kohinoor 1, Faisalabad, Pakistan
            </span>
          </Box>
          <Box
            className="border-b-0 md:border-r-0"
            description="We're available Mon-Fri, 9am-5pm."
            icon={Phone}
            title="Phone"
          >
            <div>
              <a
                className="block font-medium font-mono text-sm tracking-wide hover:underline"
                href={`tel:${APP_PHONE}`}
              >
                {APP_PHONE}
              </a>
              <a
                className="block font-medium font-mono text-sm tracking-wide hover:underline"
                href={`tel:${APP_PHONE_2}`}
              >
                {APP_PHONE_2}
              </a>
            </div>
          </Box>
        </div>

        <div className="z-1 flex h-full flex-col items-center justify-center gap-4 py-24">
          <h2 className="text-center font-medium text-2xl text-muted-foreground tracking-tight md:text-3xl">
            Socials
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => (
              <a
                className="flex items-center gap-x-2 rounded-full border bg-card px-3 py-1.5 shadow hover:bg-accent"
                href={link.href}
                key={link.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-medium font-mono text-xs tracking-wide">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function Box({
  title,
  description,
  className,
  children,
  ...props
}: ContactBox) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border-b md:border-r md:border-b-0",
        className,
      )}
    >
      <div className="flex items-center gap-x-3 border-b bg-secondary/50 p-4 dark:bg-secondary/20">
        <props.icon className="size-5 text-muted-foreground" strokeWidth={1} />
        <h2 className="font-heading font-medium text-lg tracking-wider">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t p-4">
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X icon</title>
    <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
  </svg>
);
