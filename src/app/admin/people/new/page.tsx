
import { PersonForm } from "@/components/admin/person-form";

export default function NewPersonPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңа тұлға қосу</h1>
        <p className="text-muted-foreground">Форманы толтырып, жаңа атақты тұлғаны қосыңыз.</p>
      </div>
      <PersonForm />
    </div>
  );
}
