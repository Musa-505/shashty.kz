
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Home, Users, FileText, Send, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Басқару тақтасы", icon: <Home /> },
    { href: "/admin/people", label: "Тұлғалар", icon: <Users /> },
    { href: "/admin/articles", label: "Мақалалар", icon: <FileText /> },
    { href: "/admin/news", label: "Жаңалықтар", icon: <FileText /> },
    { href: "/admin/submissions", label: "Ұсыныстар", icon: <Send /> },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
        <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <Logo />
                <span className="font-bold font-headline text-lg">Admin Panel</span>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}>
                            {item.icon}
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <main className="flex-1 flex flex-col">
             <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6">
                <div className="flex-1">
                     <div className="md:hidden">
                        <SidebarTrigger />
                     </div>
                </div>
                <h1 className="text-xl font-semibold md:text-2xl font-headline flex-1">
                    {navItems.find(item => pathname.startsWith(item.href))?.label || 'Басқару'}
                </h1>
                <div className="flex flex-1 items-center justify-end">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <LogOut className="mr-2 h-4 w-4" /> Шығу
                        </Link>
                    </Button>
                </div>
            </header>
            <div className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </div>
        </main>
        </SidebarProvider>
    </div>
  );
}
