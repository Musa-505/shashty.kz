
import { notableFigures } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = notableFigures.find(p => p.slug === params.slug);

  if (!person) {
    return {
      title: 'Figure Not Found',
    };
  }

  return {
    title: `${person.name} | Shashty.kz`,
    description: person.summary,
  };
}


export default function PersonProfilePage({ params }: { params: { slug: string } }) {
  const person = notableFigures.find(p => p.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <div className="relative aspect-w-1 aspect-h-1 w-full">
               <Image
                src={person.imageUrl}
                alt={person.name}
                width={400}
                height={400}
                className="rounded-t-lg object-cover w-full"
                data-ai-hint={person.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">{person.name}</CardTitle>
              <p className="text-center text-muted-foreground">{person.title}</p>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Biography</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <p>{person.biography}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Key Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {person.contributions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Historical Importance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{person.summary}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return notableFigures.map(person => ({
    slug: person.slug,
  }));
}
