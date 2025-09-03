
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { getAllGenealogyMembers } from "@/lib/firebase-service";
import { DeleteGenealogyMemberButton } from "@/components/admin/delete-genealogy-button";

export const revalidate = 0;

export default async function AdminGenealogyPage() {
  const members = await getAllGenealogyMembers();
  const memberMap = new Map(members.map(m => [m.id, m.name]));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Шежірені басқару</h1>
            <p className="text-muted-foreground">Шежіреге жаңа аталарды қосыңыз, өңдеңіз немесе жойыңыз.</p>
        </div>
        <Link href="/admin/genealogy/new">
            <Button>
                <PlusCircle className="mr-2" />
                Жаңа ата қосу
            </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Барлық аталар</CardTitle>
          <CardDescription>Шежіредегі барлық тұлғалардың тізімі.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Аты-жөні</TableHead>
                <TableHead>Ата-тегі (әкесі)</TableHead>
                <TableHead className="text-right">Әрекеттер</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.parentId ? memberMap.get(member.parentId) || 'Белгісіз' : 'Түпкі Ата'}</TableCell>
                  <TableCell className="text-right">
                     <Link href={`/admin/genealogy/${member.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Өңдеу</span>
                        </Button>
                     </Link>
                    <DeleteGenealogyMemberButton memberId={member.id} />
                  </TableCell>
                </TableRow>
              ))}
               {members.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center p-8 text-muted-foreground">
                        Әзірге ешкім қосылмаған.
                    </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
