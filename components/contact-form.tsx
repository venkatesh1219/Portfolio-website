"use client";

import * as React from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // If no endpoint is configured, fall back to a mailto: so the form
    // is always functional out of the box.
    if (!endpoint) {
      const name = data.get("name");
      const email = data.get("email");
      const message = data.get("message");
      window.location.href = `mailto:venkateshaws22@gmail.com?subject=${encodeURIComponent(
        `Portfolio inquiry from ${name}`
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        <h3 className="mt-4 text-lg font-semibold">Message on its way</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you shortly.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" required placeholder="Jane Doe" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
          Company <span className="text-muted-foreground">(optional)</span>
        </label>
        <input id="company" name="company" placeholder="Acme Inc." className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, team, or project…"
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please email me directly at venkateshaws22@gmail.com.
        </p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
