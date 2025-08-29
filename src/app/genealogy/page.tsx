
import { GenealogyChart } from "@/components/genealogy-chart";

export default function GenealogyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Kazakh Genealogy (Шежіре)</h1>
        <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
          Discover the ancient tradition of Shejire, the genealogical records of Kazakh tribes and clans. Our interactive chart allows you to explore the lineages that form the backbone of the Kazakh nation.
        </p>
      </div>
      
      <div className="w-full overflow-x-auto p-4 bg-card rounded-lg shadow-lg">
          <GenealogyChart />
      </div>
    </div>
  );
}
