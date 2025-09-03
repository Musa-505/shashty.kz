
import { GenealogyChart } from "@/components/genealogy-chart";
import { MainLayout } from "@/components/layout/main-layout";

export default function GenealogyPage() {
  return (
    <MainLayout>
        <div className="flex flex-col h-[calc(100vh_-_64px)]">
            <div className="w-full flex-grow">
                <GenealogyChart />
            </div>
        </div>
    </MainLayout>
  );
}
