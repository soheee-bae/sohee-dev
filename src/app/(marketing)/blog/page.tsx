import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts, notes and TIL.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Post listing will appear here once Firestore is wired up.
      </p>

      <div className="mt-8 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
            <CardDescription>
              Connect Firebase and start drafting from the admin command center.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The post pipeline (idea → writing → review → published) is defined in
            <code className="ml-1 rounded bg-muted px-1 py-0.5 text-xs">src/types/post.ts</code>.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
