
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { getAllArticles } from "@/lib/firebase-service";

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Мақалаларды басқару</h1>
            <p className="text-muted-foreground">Веб-сайттағы мақалаларды қосыңыз, өңдеңіз немесе жойыңыз.</p>
        </div>
        <Link href="/admin/articles/new">
            <Button>
                <PlusCircle className="mr-2" />
                Жаңа мақала қосу
            </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Барлық мақалалар</CardTitle>
          <CardDescription>Сайттағы барлық мақалалардың тізімі.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тақырыбы</TableHead>
                <TableHead>Авторы</TableHead>
                <TableHead>Күні</TableHead>
                <TableHead className="text-right">Әрекеттер</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell className="text-right">
                     <Link href={`/admin/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Өңдеу</span>
                        </Button>
                     </Link>
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
