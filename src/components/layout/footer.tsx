
import { Logo } from "@/components/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold font-headline text-lg">Shashty.kz</span>
          </div>
          <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end gap-2">
             <p>
                © {new Date().getFullYear()} Shashty.kz. Сайт "ТорыШашты ата" қоғамдық қорының қолдауымен жасалған.
             </p>
             <Link href="/admin" className="text-xs hover:underline">
                Admin Panel
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
