
import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңа мақала қосу</h1>
        <p className="text-muted-foreground">Форманы толтырып, жаңа мақаланы қосыңыз.</p>
      </div>
      <ArticleForm />
    </div>
  );
}
