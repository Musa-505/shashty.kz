
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { notableFigures } from "@/lib/placeholder-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PeoplePage() {
  return (
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
                src={person.imageUrl}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={person.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline">{person.name}</CardTitle>
              <CardDescription>{person.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{person.summary}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href={`/people/${person.slug}`}>
                  Профильді көру <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
