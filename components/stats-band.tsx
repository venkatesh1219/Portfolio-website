import { stats } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/motion";

export function StatsBand() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <RevealItem
          key={stat.label}
          className="rounded-xl border border-border bg-card/40 p-6 text-center"
        >
          <p className="text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 text-sm font-medium">{stat.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
