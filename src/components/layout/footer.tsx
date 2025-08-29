
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold font-headline text-lg">Shashty.kz</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shashty.kz. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
