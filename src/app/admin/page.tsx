import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Command Center</h1>
        <p className="text-muted-foreground">
          Stats, drafts pipeline, quick actions and engagement at a glance.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Today's visitors" value="—" />
        <StatCard title="Likes" value="—" />
        <StatCard title="Drafts" value="—" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Drafts pipeline</CardTitle>
            <CardDescription>Idea → Writing → Review</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Kanban board placeholder. Backed by Firestore in the next phase.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Idea bank · GitHub status</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Idea capture form placeholder.
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
            <CardDescription>Recent comments and replies.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Comment feed placeholder.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
