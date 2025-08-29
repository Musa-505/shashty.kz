
import { PersonProfileGenerator } from "@/components/person-profile-generator";

export default function GeneratePersonPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
       <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Profile Generator</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Enter the name of a notable Kazakh figure to generate a comprehensive profile using AI. You can add extra context to guide the generation process.
        </p>
      </div>
      <PersonProfileGenerator />
    </div>
  );
}
