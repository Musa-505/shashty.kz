
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";
import { Menu } from "lucide-react";


const navLinks = [
  { href: "/history", label: "Тарих" },
  { href: "/people", label: "Тұлғалар" },
  { href: "/genealogy", label: "Шежіре" },
  { href: "/news", label: "Жаңалықтар" },
  { href: "/articles", label: "Мақалалар" },
  { href: "/contribute", label: "Үлес қосу" },
  { href: "/contact", label: "Байланыс" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-foreground/80",
          isActive ? "text-foreground font-semibold" : "text-foreground/60"
        )}
      >
        {label}
      </Link>
    );
  };

  const MobileNavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          "block py-2 text-lg",
          isActive ? "text-primary font-bold" : "text-foreground"
        )}
      >
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
          <span className="font-bold font-headline text-lg">Shashty.kz</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="sr-only">Негізгі меню</SheetTitle>
                </SheetHeader>
                <div className="p-6">
                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                        <Logo />
                        <span className="font-bold font-headline text-lg">Shashty.kz</span>
                    </Link>
                  <nav className="flex flex-col space-y-4">
                     {navLinks.map((link) => (
                        <MobileNavLink key={link.href} {...link} />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
