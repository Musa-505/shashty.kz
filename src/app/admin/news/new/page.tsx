
import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңалық қосу</h1>
        <p className="text-muted-foreground">Форманы толтырып, жаңалықты қосыңыз.</p>
      </div>
      <NewsForm />
    </div>
  );
}
