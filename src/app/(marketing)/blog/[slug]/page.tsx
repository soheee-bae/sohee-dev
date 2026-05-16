import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Post: {slug}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          MDX rendering will live here. See `next-mdx-remote` integration in the next phase.
        </CardContent>
      </Card>
    </div>
  );
}
