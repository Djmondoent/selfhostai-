import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

export function CommandBlock({
  command,
  className
}: {
  command: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-black/40 p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Command</span>
        <CopyButton value={command} />
      </div>
      <pre className="overflow-x-auto text-sm text-primary">
        <code>{command}</code>
      </pre>
    </div>
  );
}
