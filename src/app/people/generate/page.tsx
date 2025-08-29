
import { PersonProfileGenerator } from "@/components/person-profile-generator";

export default function GeneratePersonPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
       <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Профиль Генераторы</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          AI көмегімен жан-жақты профиль жасау үшін белгілі қазақ тұлғасының атын енгізіңіз. Генерация процесін бағыттау үшін қосымша контекст қосуға болады.
        </p>
      </div>
      <PersonProfileGenerator />
    </div>
  );
}
