
import { PersonForm } from "@/components/admin/person-form";
import { notableFigures } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";


export default function EditPersonPage({ params }: { params: { slug: string } }) {
  const person = notableFigures.find(p => p.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Тұлғаны өңдеу</h1>
        <p className="text-muted-foreground">{person.name} туралы ақпаратты жаңартыңыз.</p>
      </div>
      <PersonForm person={person} />
    </div>
  );
}
