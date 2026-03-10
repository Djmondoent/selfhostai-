import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CheckoutForm({
  planKey,
  label,
  className
}: {
  planKey: string;
  label: string;
  className?: string;
}) {
  return (
    <form action="/api/stripe/checkout" method="POST">
      <input type="hidden" name="planKey" value={planKey} />
      <button className={cn(buttonVariants({ size: "lg" }), "w-full", className)} type="submit">
        {label}
      </button>
    </form>
  );
}
