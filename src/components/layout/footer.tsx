import Link from "next/link";

import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link className="hover:text-foreground" href="/blog">
            Blog
          </Link>
          {siteConfig.links.github ? (
            <a
              className="hover:text-foreground"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
