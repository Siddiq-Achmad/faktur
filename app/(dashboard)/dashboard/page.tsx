"use client";

import { useSession } from "@/lib/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              Your invoice management system is ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Email: {session?.user?.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your business overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Total Invoices:</span> 0
              </p>
              <p className="text-sm">
                <span className="font-medium">Pending Payments:</span> $0.00
              </p>
              <p className="text-sm">
                <span className="font-medium">Total Clients:</span> 0
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Get started with Faktur</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Authentication setup complete</li>
              <li>✓ Dashboard layout ready</li>
              <li>• Set up your business profile</li>
              <li>• Add your first client</li>
              <li>• Create your first invoice</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
