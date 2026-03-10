import { Badge } from "@/components/ui/badge";

export function PageHeader({
  badge,
  title,
  description
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow backdrop-blur-sm">
      <Badge variant="secondary" className="w-fit uppercase tracking-[0.28em]">
        {badge}
      </Badge>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
      </div>
    </div>
  );
}
