
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleById } from "@/lib/firebase-service";
import { notFound } from "next/navigation";


export default async function EditArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleById(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Мақаланы өңдеу</h1>
        <p className="text-muted-foreground">{article.title} туралы ақпаратты жаңартыңыз.</p>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
