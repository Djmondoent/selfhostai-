import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <PageHeader
        badge="Admin"
        title="Sign in to the billing dashboard."
        description="Use the admin access token stored on the server to review purchases, plan mix, and support requests."
      />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="text-sm text-red-300">The admin token was not accepted.</p> : null}
          <form action="/api/admin/login" method="POST" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Admin token</Label>
              <Input id="token" name="token" type="password" />
            </div>
            <Button type="submit">Open admin dashboard</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
