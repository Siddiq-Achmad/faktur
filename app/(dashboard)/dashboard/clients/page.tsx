import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No clients yet</CardTitle>
          <CardDescription>
            Add your first client to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Clients you add will appear here
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Client
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
