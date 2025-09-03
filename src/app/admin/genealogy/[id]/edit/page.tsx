
import { GenealogyForm } from "@/components/admin/genealogy-form";
import { getGenealogyMemberById, getAllGenealogyMembers } from "@/lib/firebase-service";
import { notFound } from "next/navigation";


export default async function EditGenealogyMemberPage({ params }: { params: { id: string } }) {
  const member = await getGenealogyMemberById(params.id);
  const allMembers = await getAllGenealogyMembers();

  if (!member) {
    notFound();
  }

  // Prevent self-parenting
  const potentialParents = allMembers.filter(p => p.id !== member.id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Атаны өңдеу</h1>
        <p className="text-muted-foreground">{member.name} туралы ақпаратты жаңартыңыз.</p>
      </div>
      <GenealogyForm member={member} allMembers={potentialParents} />
    </div>
  );
}
