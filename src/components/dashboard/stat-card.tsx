import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <CardTitle className="text-3xl">{value}</CardTitle>
        </div>
        <div className="rounded-full bg-primary/12 p-2 text-primary">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Mock activity for the MVP dashboard.</p>
      </CardContent>
    </Card>
  );
}
