
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllPeople } from "@/lib/firebase-service";
import { Edit, Trash2, Users } from "lucide-react";
import Link from 'next/link';

export default async function AdminDashboard() {
  const allFigures = await getAllPeople();
  const recentFigures = allFigures.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Басқару тақтасы</h1>
            <p className="text-muted-foreground">Веб-сайт мазмұнын басқарыңыз.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Соңғы тұлғалар</CardTitle>
            <CardDescription>Жақында қосылған атақты тұлғалардың тізімі.</CardDescription>
          </div>
          <Link href="/admin/people">
            <Button variant="outline">
                <Users className="mr-2" />
                Барлық тұлғаларды көру
            </Button>
        </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Аты-жөні</TableHead>
                <TableHead className="text-right">Әрекеттер</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFigures.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/people/${person.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Өңдеу</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Жою</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
