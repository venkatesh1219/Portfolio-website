import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudBackground } from "@/components/cloud-background";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <CloudBackground />
      <div className="container-balanced text-center">
        <p className="text-7xl font-bold tracking-tight text-gradient sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          This route failed to reconcile
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for drifted out of the cluster. Let&apos;s
          get you back to a healthy node.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gradient">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              See projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
