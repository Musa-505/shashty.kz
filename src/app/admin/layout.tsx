
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Home, Users, FileText, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo />
            <span className="font-bold font-headline text-lg">Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 <Link href={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
         <header className="flex items-center gap-4 mb-6 md:hidden">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold font-headline">Admin</h1>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
