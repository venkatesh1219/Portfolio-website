import Link from "next/link";
import { LayoutDashboard, FileText, ExternalLink, LogOut, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/admin/login/actions";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-border lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 px-6 py-5 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
              <Cloud className="h-5 w-5" />
            </span>
            Admin
          </div>
          <nav className="flex gap-1 px-4 pb-4 lg:flex-col">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </a>
          </nav>
          <div className="hidden px-4 lg:mt-auto lg:block lg:py-4">
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </form>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
