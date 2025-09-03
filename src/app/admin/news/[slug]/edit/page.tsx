
import { NewsForm } from "@/components/admin/news-form";
import { getNewsItemById } from "@/lib/firebase-service";
import { notFound } from "next/navigation";


export default async function EditNewsPage({ params }: { params: { slug: string } }) {
  const newsItem = await getNewsItemById(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңалықты өңдеу</h1>
        <p className="text-muted-foreground">{newsItem.title} туралы ақпаратты жаңартыңыз.</p>
      </div>
      <NewsForm newsItem={newsItem} />
    </div>
  );
}
