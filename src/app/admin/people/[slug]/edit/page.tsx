
import { PersonForm } from "@/components/admin/person-form";
import { getPersonById } from "@/lib/firebase-service";
import { notFound } from "next/navigation";


export default async function EditPersonPage({ params }: { params: { slug: string } }) {
  // We use the ID (slug) from the URL to fetch the person
  const person = await getPersonById(params.slug);

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
