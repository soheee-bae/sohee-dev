import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site.config";
import { themeConfig } from "@/lib/theme.config";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="space-y-6 py-10">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {themeConfig.brand.name}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex gap-3">
          <Button render={<Link href="/blog" />} nativeButton={false}>
            Read the blog
          </Button>
          <Button render={<Link href="/admin" />} nativeButton={false} variant="outline">
            Admin
          </Button>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Long-form notes and essays.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>TIL</CardTitle>
            <CardDescription>Today I Learned — micro logs.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Code and side experiments.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
