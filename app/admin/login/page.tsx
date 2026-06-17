import { Cloud, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudBackground } from "@/components/cloud-background";
import { adminConfigured } from "@/lib/auth";
import { login } from "./actions";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

const field =
  "w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;
  const configured = adminConfigured();

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <CloudBackground showTools={false} />
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Cloud className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Admin access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage analytics and blog content.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
          {!configured && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Set <code className="font-mono">ADMIN_USERNAME</code> and{" "}
                <code className="font-mono">ADMIN_PASSWORD</code> in your Vercel
                environment variables to enable sign in.
              </span>
            </div>
          )}

          {error === "invalid" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Invalid username or password.
            </div>
          )}

          <form action={login} className="space-y-4">
            <input type="hidden" name="from" value={from ?? "/admin"} />
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium">
                Username
              </label>
              <input id="username" name="username" required autoComplete="username" className={field} />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={field}
              />
            </div>
            <Button type="submit" variant="gradient" size="lg" className="w-full">
              <Lock className="h-4 w-4" />
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
