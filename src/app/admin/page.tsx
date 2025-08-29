
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notableFigures } from "@/lib/placeholder-data";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Басқару тақтасы</h1>
            <p className="text-muted-foreground">Веб-сайт мазмұнын басқарыңыз.</p>
        </div>
        <Link href="#">
            <Button>
                <PlusCircle className="mr-2" />
                Жаңасын қосу
            </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Атақты тұлғалар</CardTitle>
          <CardDescription>Сайттағы атақты тұлғалардың тізімі.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Аты-жөні</TableHead>
                <TableHead>Атағы</TableHead>
                <TableHead className="text-right">Әрекеттер</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notableFigures.map((person) => (
                <TableRow key={person.slug}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.title}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Өңдеу</span>
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
