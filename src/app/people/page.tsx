
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPeople } from "@/lib/firebase-service";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PeoplePage() {
  const notableFigures = await getAllPeople();

  return (
    <MainLayout>
        <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="space-y-4 text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Атақты тұлғалар</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Қазақ тарихы мен мәдениетін айқындаған ақындарды, батырларды, көшбасшыларды және ойшылдарды таныңыз.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {notableFigures.map((person) => (
            <Card key={person.slug} className="overflow-hidden group flex flex-col">
                <div className="relative h-64 w-full">
                <Image
                    src={person.imageUrls?.[0] || 'https://picsum.photos/400/400'}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </div>
                <CardHeader>
                <CardTitle className="font-headline">{person.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">{person.biography}</p>
                </CardContent>
                <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/people/${person.slug}`}>
                    Толығырақ <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>
    </MainLayout>
  );
}
