import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { AtSignIcon, ChevronLeftIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ImigongoFloatingPaths } from "@/components/ui/imigongo-floating-paths";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/context/auth-context";
import { z } from "zod";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/imigongo-login")({
  component: ImigongoLoginPage,
  validateSearch: (search) => searchSchema.parse(search),
});

function ImigongoLoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/imigongo-login" });

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
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-imigongo-black font-sans">
      {/* LEFT COL: The "Wall" */}
      <div className="relative hidden h-full flex-col border-r border-white/10 bg-imigongo-black p-12 lg:flex overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
          <ImigongoFloatingPaths position={1} />
        </div>

        <Link to="/" className="z-10 w-fit">
          <div className="flex items-center gap-3 font-bold text-xl text-white uppercase tracking-widest">
            <div className="flex aspect-square size-10 items-center justify-center border-2 border-imigongo-ochre bg-imigongo-black text-imigongo-ochre">
              <Logo className="size-6" />
            </div>
            Vizit Africa
          </div>
        </Link>

        <div className="z-10 mt-auto border-l-2 border-imigongo-ochre pl-6">
          <blockquote className="space-y-4">
            <p className="text-2xl font-light text-white leading-relaxed tracking-wide">
              &ldquo;Architecture begins where engineering ends. Verify your
              identity to access the archives.&rdquo;
            </p>
            <footer className="font-mono text-xs text-imigongo-ochre uppercase tracking-widest">
              ~ System Administrator
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT COL: The "Control Panel" Form */}
      <div className="relative flex min-h-screen flex-col justify-center p-8 bg-zinc-50">
        <Link to="/" className="absolute top-8 left-8">
          <Button
            variant="ghost"
            className="gap-2 text-imigongo-black hover:bg-imigongo-black/5 hover:text-imigongo-ochre uppercase tracking-widest text-xs font-bold"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Return
          </Button>
        </Link>

        <div className="mx-auto w-full max-w-lg border-2 border-imigongo-black/10 bg-white p-12 shadow-2xl shadow-imigongo-black/5 relative">
          {/* Tech Decoration */}
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-imigongo-ochre" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-imigongo-ochre" />

          <div className="flex flex-col space-y-2 mb-8 border-b-2 border-imigongo-black pb-4">
            <div className="flex items-center justify-between">
              <h1 className="font-black text-2xl uppercase tracking-tighter text-imigongo-black">
                Access Portal
              </h1>
              <span className="text-[10px] font-mono text-imigongo-ochre border border-imigongo-ochre px-1">
                AUTH.v2
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Enter credentials to proceed.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full rounded-none border-2 border-imigongo-black bg-white text-imigongo-black hover:bg-imigongo-black hover:text-white transition-colors font-bold uppercase tracking-widest text-xs h-12 shadow-none"
              type="button"
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google Access
            </Button>
          </div>

          <div className="flex w-full items-center justify-center my-6">
            <div className="h-px w-full bg-imigongo-black/20" />
            <span className="px-3 text-imigongo-black/40 text-[10px] font-bold uppercase">
              OR
            </span>
            <div className="h-px w-full bg-imigongo-black/20" />
          </div>

          <form className="space-y-4">
            <InputGroup className="rounded-none">
              <InputGroupInput
                placeholder="USER.ID / EMAIL"
                type="email"
                className="rounded-none border-2 border-imigongo-black/20 focus:border-imigongo-ochre bg-transparent font-mono text-sm placeholder:uppercase placeholder:text-xs h-12"
              />
              <InputGroupAddon className="rounded-none border-t-2 border-b-2 border-r-2 border-imigongo-black/20 bg-zinc-50 text-imigongo-black/50">
                <AtSignIcon className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <Button
              className="w-full rounded-none bg-imigongo-ochre text-white hover:bg-imigongo-black transition-colors font-black uppercase tracking-widest text-xs h-12 shadow-none"
              type="button"
            >
              Authenticate
            </Button>
          </form>

          {/* Test Accounts Panel */}
          <div className="mt-8 pt-8 border-t border-dashed border-imigongo-black/20">
            <span className="block text-[10px] font-mono text-center text-imigongo-black/40 mb-4 uppercase">
              Test Environments
            </span>
            <div className="grid grid-cols-3 gap-2">
              {["Tourist", "Vendor", "Admin"].map((role) => (
                <button
                  key={role}
                  onClick={() =>
                    handleTestLogin(
                      `${role.toLowerCase()}@vizit.rw`,
                      `${role.toLowerCase()}123`,
                    )
                  }
                  disabled={isLoading}
                  className="px-2 py-2 border border-imigongo-black/20 text-[10px] uppercase font-bold text-imigongo-black hover:border-imigongo-ochre hover:text-imigongo-ochre transition-colors disabled:opacity-50"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] uppercase text-imigongo-black/40 max-w-xs mx-auto">
          Authorized Personnel Only. <br /> Access logged and monitored.
        </p>
      </div>
    </main>
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
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);
