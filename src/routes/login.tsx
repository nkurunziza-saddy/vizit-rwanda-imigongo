import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { AtSignIcon, ChevronLeftIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/auth-context";
import { z } from "zod";
import {
  PatternHorizontalDiamonds,
  PatternVerticalDiamond,
} from "@/components/ui/patterns";
import { Lenis } from "@/components/ui/lenis";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search) => searchSchema.parse(search),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });

  const handleTestLogin = async (email: string, pass: string) => {
    try {
      await login(email, pass);
      if (search.redirect) {
        navigate({ to: search.redirect });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Lenis>
      <main className="relative min-h-screen bg-foreground font-sans flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-0 left-10 h-full opacity-10 pointer-events-none hidden lg:block">
          <PatternVerticalDiamond className="w-24 h-full text-background" />
        </div>
        <div className="absolute bottom-0 right-10 h-full opacity-10 pointer-events-none hidden lg:block">
          <PatternVerticalDiamond className="w-24 h-full text-background rotate-180" />
        </div>

        <Link to="/" className="absolute top-8 left-8 z-50">
          <Button
            variant="ghost"
            className="gap-2 text-background/50 hover:bg-background/10 hover:text-primary uppercase tracking-widest text-xs font-bold"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Home
          </Button>
        </Link>

        <div className="relative w-full max-w-4xl bg-card shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-background/10">
          <div className="relative w-full md:w-1/3 bg-primary p-8 flex flex-col justify-between border-r-2 border-dashed border-foreground/20 text-foreground">
            <div className="absolute -right-3 top-[-10px] w-6 h-6 bg-foreground rounded-full" />
            <div className="absolute -right-3 bottom-[-10px] w-6 h-6 bg-foreground rounded-full" />

            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center rotate-45">
                  <div className="w-4 h-4 bg-foreground rotate-0" />
                </div>
                <span className="font-black uppercase tracking-tighter text-2xl">
                  Vizit
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tighter mb-4 text-white">
                Admit <br /> One
              </h1>
              <p className="font-serif italic text-lg leading-tight opacity-80">
                To the land of a thousand hills.
              </p>
            </div>

            <div className="mt-8 md:mt-0">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">
                Date
              </div>
              <div className="text-xl font-mono font-bold border-b-2 border-foreground pb-1 mb-6">
                {new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="barcode h-12 w-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAABCAYAAAC7x/WqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+/Pp/mixwAAAA2SURBVHjaYvz//z8D0xQgyIikmpEBCwOlwnhQwCgWAgX//2fAIOYA4z8GqEIQGwMjiL0AAgwA3y0P0/40r6YAAAAASUVORK5CYII=')] bg-repeat-x opacity-80 mix-blend-multiply" />
            </div>
          </div>

          <div className="flex-1 bg-background p-8 md:p-12 relative flex flex-col justify-center">
            <div className="absolute top-0 left-0 right-0 h-4 opacity-10">
              <PatternHorizontalDiamonds className="text-foreground w-full h-full" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-4 opacity-10">
              <PatternHorizontalDiamonds className="text-foreground w-full h-full" />
            </div>

            <div className="max-w-md mx-auto w-full relative z-10">
              <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-8 text-center flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-foreground/20" />
                Portal Access
                <span className="h-px w-12 bg-foreground/20" />
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2"
                  >
                    Account / Email
                  </label>
                  <InputGroup>
                    <InputGroupInput
                      id="email"
                      placeholder="ENTER YOUR EMAIL"
                      type="email"
                    />
                    <InputGroupAddon>
                      <AtSignIcon className="h-4 w-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <Button
                  className="w-full h-14 text-xs flex items-center justify-between px-6 group"
                  type="button"
                >
                  <span>Access Portal</span>
                  <div className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>

                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="w-full h-10 gap-3 text-[10px]"
                    type="button"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    Continue with Google
                  </Button>
                  <Button
                    className="w-full h-10 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-transparent hover:text-white gap-3 text-[10px]"
                    type="button"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-dashed border-foreground/20">
                  <p className="text-[10px] font-mono text-center text-muted-foreground mb-4 uppercase tracking-widest">
                    Test Access (Will be Removed)
                  </p>
                  <div className="flex justify-center gap-2">
                    {["Tourist", "Vendor", "Admin"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() =>
                          handleTestLogin(
                            `${role.toLowerCase()}@vizit.rw`,
                            `${role.toLowerCase()}123`,
                          )
                        }
                        className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-border hover:bg-foreground hover:text-background transition-colors text-muted-foreground"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Lenis>
  );
}

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google Icon</title>
    <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
  </svg>
);

const FacebookIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Facebook Icon</title>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.791 1.657-2.791 3.48v1.065h3.917l-.523 3.667h-3.394v7.98H9.101Z" />
  </svg>
);
