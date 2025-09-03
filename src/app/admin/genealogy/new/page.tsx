
import { GenealogyForm } from "@/components/admin/genealogy-form";
import { getAllGenealogyMembers } from "@/lib/firebase-service";

export default async function NewGenealogyMemberPage() {
  const allMembers = await getAllGenealogyMembers();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Жаңа ата қосу</h1>
        <p className="text-muted-foreground">Форманы толтырып, шежіреге жаңа тұлғаны қосыңыз.</p>
      </div>
      <GenealogyForm allMembers={allMembers} />
    </div>
  );
}
