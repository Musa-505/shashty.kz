
import { GenealogyChart } from "@/components/genealogy-chart";

export default function GenealogyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Қазақ шежіресі</h1>
        <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
          Қазақ рулары мен тайпаларының генеалогиялық жазбалары – шежіренің ежелгі дәстүрімен танысыңыз. Біздің интерактивті сызбамыз қазақ ұлтының негізін құрайтын ата-тектерді зерттеуге мүмкіндік береді.
        </p>
      </div>
      
      <div className="w-full h-[600px] bg-card rounded-lg shadow-lg">
          <GenealogyChart />
      </div>
    </div>
  );
}
