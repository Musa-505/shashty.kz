
import { GenealogyChart } from "@/components/genealogy-chart";
import { MainLayout } from "@/components/layout/main-layout";
import { getRootGenealogyMember, getChildrenForMember } from "@/lib/firebase-service";

export const revalidate = 0; // Disable caching to ensure fresh data

export default async function GenealogyPage() {
  const rootMember = await getRootGenealogyMember();
  
  if (!rootMember) {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 md:px-6 text-center">
                <h1 className="text-2xl font-bold font-headline mb-4">Шежіре табылмады</h1>
                <p className="text-muted-foreground">
                    Бастау алу үшін админ-панель арқылы түпкі атаны қосыңыз.
                </p>
            </div>
        </MainLayout>
    )
  }

  return (
    <MainLayout>
        <div className="flex flex-col h-[calc(100vh_-_64px)]">
            <div className="w-full flex-grow">
                <GenealogyChart 
                    initialMember={rootMember}
                    fetchChildren={getChildrenForMember} 
                />
            </div>
        </div>
    </MainLayout>
  );
}
