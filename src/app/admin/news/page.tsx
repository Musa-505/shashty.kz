
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { getAllNewsItems } from "@/lib/firebase-service";
import { DeleteNewsButton } from "@/components/admin/delete-news-button";

export default async function AdminNewsPage() {
  const newsItems = await getAllNewsItems();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңалықтарды басқару</h1>
            <p className="text-muted-foreground">Веб-сайттағы жаңалықтарды қосыңыз, өңдеңіз немесе жойыңыз.</p>
        </div>
        <Link href="/admin/news/new">
            <Button>
                <PlusCircle className="mr-2" />
                Жаңалық қосу
            </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Барлық жаңалықтар</CardTitle>
          <CardDescription>Сайттағы барлық жаңалықтардың тізімі.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тақырыбы</TableHead>
                <TableHead>Категориясы</TableHead>
                <TableHead>Күні</TableHead>
                <TableHead className="text-right">Әрекеттер</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                     <Link href={`/admin/news/${item.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Өңдеу</span>
                        </Button>
                     </Link>
                     <DeleteNewsButton newsId={item.id} />
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
