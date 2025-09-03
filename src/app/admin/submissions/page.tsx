
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllSubmissions } from "@/lib/firebase-service";
import { Badge } from "@/components/ui/badge";

export const revalidate = 10; // Revalidate every 10 seconds

const typeTranslations: { [key: string]: string } = {
  person: "Тұлға",
  news: "Жаңалық",
  article: "Мақала",
  other: "Басқа",
};

const statusTranslations: { [key: string]: string } = {
    new: "Жаңа",
    viewed: "Қаралған",
    archived: "Архивтелген",
};

const statusColors: { [key: string]: "default" | "secondary" | "outline" } = {
    new: "default",
    viewed: "secondary",
    archived: "outline",
};

export default async function SubmissionsPage() {
  const submissions = await getAllSubmissions();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Пайдаланушы ұсыныстары</h1>
        <p className="text-muted-foreground">Пайдаланушылар жіберген ақпараттар мен ұсыныстар тізімі.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Барлық ұсыныстар</CardTitle>
          <CardDescription>Сайтқа қосу үшін жіберілген ақпараттар.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Күні</TableHead>
                <TableHead>Жіберуші</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Түрі</TableHead>
                <TableHead>Мазмұны</TableHead>
                <TableHead className="text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium whitespace-nowrap">{submission.createdAt}</TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{typeTranslations[submission.type] || submission.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[400px] truncate">{submission.content}</TableCell>
                   <TableCell className="text-right">
                    <Badge variant={statusColors[submission.status] || 'secondary'}>
                        {statusTranslations[submission.status] || submission.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {submissions.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Әзірге ешқандай ұсыныс келіп түскен жоқ.
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
